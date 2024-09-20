import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useCameraDevice, useCameraPermission, Camera } from 'react-native-vision-camera';
import { useDispatch } from 'react-redux';


const CustomCamera = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { hasPermission, requestPermission } = useCameraPermission();
    const device = useCameraDevice('front');
    const cameraRef = useRef<Camera>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        takePhoto: handleTakePhoto,
    }));

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, [hasPermission]);

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto();
            setPhoto(photo.path);
            return photo.path;
        }
        return null;
    };

    if (!hasPermission) {
        return <ActivityIndicator />;
    }
    if (!device) {
        return <Text>Camera not found</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true} // Enable photo mode
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxButton: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 50,
      backgroundColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    captureButton: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    captureButtonText: {
        color: '#000',
        fontSize: 16,
    },
    photoContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default CustomCamera;
