import { checkInAPI, getHisCheckIn } from '@/app/axios/API/checkInApi';
import { getCurrentTime, getFormatDateTimeCheckIn, getFormattedDate } from '@/app/axios/func/getDateTime';
import { setDateHisCheckIn } from '@/app/state/reducers/dataSlice';
import CustomCamera from '@/components/CustomCamera';
import { CustomCheckBox } from '@/components/CustomCheckBox';
import CustomDropdown from '@/components/CustomDropDown';
import CustomHeader from '@/components/CustomHeader';
import CustomMessage from '@/components/CustomMessage';
import AppStyle from '@/constants/theme';
import Color from '@/constants/theme/Color';
import { useFocusEffect } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import RNFS from 'react-native-fs';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,

} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomMap from '../CustomMap';
import { getLocation } from '@/app/axios/func/getLocation';
import { handleSplitHisCheckIn } from '@/app/axios/func/createCalendar';


type CustomCameraRef = {
  takePhoto: () => string | null;
};


function CheckInDetail({ route, navigation }: any): React.JSX.Element {
  const cameraRef = useRef<CustomCameraRef>(null);
  const officeId = useSelector((state: any) => state.office.officeId);
  const dispatch = useDispatch();
  
  const workShift = useSelector((state: any) => state.userdata.workshift);
  const branchs = useSelector((state: any) => state.userdata.branch);
  const office = branchs.find((office: { id: any; }) => office.id === officeId);
  const location = useSelector((state: any) => state.location.coordinates);

  const [successTime, setSuccessTime] = useState(``);
  const [currentDate, setCurrentDate] = useState(``);
  const [currentTime, setCurrentTime] = useState(``);
  const [wsSelected, setWSSelected] = useState<string>(workShift[0].value);

  const [note, setNote] = useState('');
  const [position, setPosition] = useState([0, 0]);

  const [hasSuccess, sethasSuccess] = useState(false);
  const [hasFailure, sethasFailure] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  // useFocusEffect(
  //   React.useCallback(() => {
  //     navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } });
  //     return () => navigation.getParent().setOptions({ tabBarStyle: { display: 'flex' } });
  //   }, [navigation])
  // );

  useEffect(() => {
    const formattedDate = getFormattedDate();
    setCurrentDate(formattedDate);

    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    // Cleanup interval on component unmount
    return () => { clearInterval(interval)};
  }, []);

  const handlePressCheckIn = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto();
        const type = photo ? await photo.split('.').pop() : null;
        const base64String = photo ? await RNFS.readFile(photo, 'base64') : null;
        if (!base64String) {
          console.error('Failed to read file as base64');
          return;
        } else { 
          console.log('base64', base64String.substring(0, 100))
          saveImageDataToDownloads(base64String);
         }
        const image = "data:image/" + type + ";base64," + base64String;
        const time = getFormatDateTimeCheckIn();
        setSuccessTime(time);
        
        await checkInAPI(time, image, officeId, wsSelected,  note, location.lat, location.lng).then((result) => {
          if (result.code === 201) {
            sethasSuccess(true);
            setMessage("");
            getHisCheckIn().then(async (result)=> {
              if (result.code === 200){
                const datehis = await handleSplitHisCheckIn(result.data);
                dispatch(setDateHisCheckIn(datehis));
              }
            });
          }
          else if (result.code === 500) {
            setMessage(result.message);
            sethasFailure(true);
          }
          else {
            setMessage(result.message);
            sethasFailure(true);
          }
        }
        );
      }
      
    } catch (error) {
      console.error('Error in handlePressCheckIn:', error);
    }
  }
  const saveImageDataToDownloads = async (imageData: string, fileName = 'imageData1.txt') => {
    try {

      const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      await RNFS.writeFile(filePath, imageData, 'utf8');
      console.log('File written to:', filePath);
    } catch (error) {
      console.error('Error writing file:', error);
    }
  };
  
  const SuccessCheckIn = () => {
    sethasSuccess(false);
    navigation.goBack();
  }
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Reset the state of failure check-in to false
   */
/******  5bbebf24-08bf-4416-a96b-4cf9587b75ed  *******/
  const FailureCheckIn = () => {
    sethasFailure(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={[AppStyle.StyleCommon.container]}>
        <ScrollView style={AppStyle.StyleCheckIn.boxContent}
          contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <Text style={AppStyle.StyleCheckIn.textCamera}>Vị trí của tôi</Text>
          <View style={AppStyle.StyleCheckIn.boxMap}>
            <CustomMap showCir={checkbox} location_business={{ lat: office.latitude, lng: office.longitude }}  />
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <CustomCheckBox checked={checkbox} func={() => { setCheckbox(!checkbox) }} />
            <Text style={[AppStyle.StyleCheckIn.textNote, { paddingLeft: 5 }]}>Hiển thị bán kính và vị trí văn phòng</Text>
          </View>
          <Text style={AppStyle.StyleCheckIn.textCamera}>Chụp ảnh gương mặt</Text>
          <View style={AppStyle.StyleCheckIn.boxCamera}>
            <CustomCamera ref={cameraRef} />
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Thời gian</Text>
            <Text style={AppStyle.StyleCheckIn.ItemValue}>{currentTime} {currentDate}</Text>
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Văn phòng</Text>
            <View style={AppStyle.StyleCheckIn.ItemInfo}><Text style={AppStyle.StyleCheckIn.ItemValue}>{office.name}</Text></View>
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Ca làm việc</Text>
            <View style={AppStyle.StyleCheckIn.boxDropdown}>
              <CustomDropdown data={workShift} firstValue={workShift[0].value} onChange={(value: any)=>{setWSSelected(value)}}/>
            </View>
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Ghi chú</Text>
            <TextInput style={AppStyle.StyleCheckIn.ItemInput} value={note}
              placeholder='Ghi chú' placeholderTextColor={Color.color4}
              onChangeText={(text) => { setNote(text) }} />
          </View>
          <TouchableOpacity style={AppStyle.StyleCheckIn.buttonCheckIn}
            onPress={handlePressCheckIn}>
            <Text style={AppStyle.StyleCheckIn.textCheckIn}>Chấm Công</Text>
          </TouchableOpacity>
        </ScrollView>
        <CustomMessage hasVisible={hasSuccess} title={'Chấm công thành công'}
          content={'Dữ liệu của bạn đã được ghi nhận vào ' + successTime}
          func={SuccessCheckIn} textFunc={'OK'} />
        <CustomMessage hasVisible={hasFailure} title={'Chấm công thất bại'}
          content={message}
          func={FailureCheckIn} textFunc={'Quay lại'} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default CheckInDetail;
