import { checkInAPI } from "@/app/axios/api/checkInApi";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraViewRef,
  CameraCapturedPicture,
  CameraProps,
  Camera,
} from "expo-camera";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";

const ExpoCustomCamera = forwardRef((props, ref) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [camera, setCamera] = useState<any>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    takePhoto: handleTakePhoto,
  }));

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleTakePhoto = async () => {
    // if (cameraRef.current) {
    //   const photo = await cameraRef.current.takePictureAsync();
    //   setPhoto(photo.path);
    //   return photo.path;
    // }
    let options = {
      quality: 1,
      base64: true,
    };
    if (camera) {
      const data = await camera.takePictureAsync(options);
      setPhoto(data.uri);
      return data;
    }

    // try {
    //   console.log("🚀🚀🚀🚀🚀🚀🚀🚀  try");
    //   await checkInAPI(image).then((result) => {
    //     console.log(
    //       "🚀 ~ ).then ~ result.code",
    //       result.code,
    //       "message:",
    //       result.message
    //     );
    //   });
    // } catch (err) {
    //   console.error("Error in handleTakePhoto:", err);
    // }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={(ref) => setCamera(ref)}
        style={styles.camera}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Image style={{width: 40, height: 40}} resizeMode="stretch" source={require("../assets/images/camera-rotate.png")} ></Image>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 5
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
export default ExpoCustomCamera;
