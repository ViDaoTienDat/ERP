import { CalendarWeekCheckIn, getCalendarCheckIn } from '@/app/axios/func/createCalendar';
import AppStyle from '@/constants/theme';
import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AppState,
    ImageBackground,
  } from 'react-native';
import { useSelector } from 'react-redux';
import CustomHeader from '../CustomHeader';
import { RowCalendar } from '../ComHisCheckIn';


const currdate = new Date();

  
  function HistoryCheckIn(): React.JSX.Element {
    const dateHisCheckIn = useSelector((state: any) => state.userdata.dateHisCheckIn);
    const [datamonth, setdatamonth] =  useState<CalendarWeekCheckIn[]>([]);
    const [currmonth, setcurrmonth] = useState(1);
    const [curryear, setcurryear] = useState(2024);

    const getNewMonth = async (newmonth: number, year: number) => {
      const calendardata = await getCalendarCheckIn(newmonth, year, dateHisCheckIn);
      setcurryear(calendardata.year);
      setcurrmonth(calendardata.month);
      setdatamonth(calendardata.calendar);
    }
    
    const handlePressBack = () => {
      if (currmonth - 1 <= 0){
        getNewMonth(12, curryear - 1);
      }else{ getNewMonth(currmonth - 1, curryear);}
    }
    const handlePressNext = () => {
      if (currmonth + 1 > 12){
        getNewMonth(1, curryear + 1);
      } else { getNewMonth(currmonth + 1, curryear);}
    }
    useEffect(() => {
      getNewMonth(currdate.getMonth() + 1, currdate.getFullYear());
    }, []);
      return (
        <View style={AppStyle.StyleCheckIn.boxContainer}>
            <View style={AppStyle.StyleHistory.boxmonth}>
                <TouchableOpacity style={[AppStyle.StyleHistory.button]} onPress={handlePressBack}>
                    <Image style={AppStyle.StyleHistory.icon} source={require('../../assets/images/arrow-sm-left.png')}/>
                </TouchableOpacity>
                <Text style={AppStyle.StyleHistory.text_large}>Tháng {currmonth}, {curryear}</Text>
                <TouchableOpacity style={[AppStyle.StyleHistory.button, {justifyContent: "flex-end", flexDirection: "row", alignItems: "center"}]} onPress={handlePressNext}>
                    <Image style={AppStyle.StyleHistory.icon} source={require('../../assets/images/arrow-sm-right.png')}/>
                </TouchableOpacity>
            </View>
            <View style={AppStyle.StyleHistory.calendar}>
                <View style={AppStyle.StyleHistory.dayofweek}>
                    <Text style={AppStyle.StyleHistory.text_medium}>CN</Text>
                    <Text style={AppStyle.StyleHistory.text_medium}>T2</Text>
                    <Text style={AppStyle.StyleHistory.text_medium}>T3</Text>
                    <Text style={AppStyle.StyleHistory.text_medium}>T4</Text>
                    <Text style={AppStyle.StyleHistory.text_medium}>T5</Text>
                    <Text style={AppStyle.StyleHistory.text_medium}>T6</Text>
                    <Text style={AppStyle.StyleHistory.text_medium}>T7</Text>
                </View>
                <ScrollView style={AppStyle.StyleHistory.boxcalendar} >
                    {datamonth.map((item: { [key: string]: any; }, idx) => (
                        <RowCalendar key={idx} data={item} month={currmonth} year={curryear}/>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
  }


  export default HistoryCheckIn;