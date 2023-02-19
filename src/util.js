import * as ImagePicker from 'expo-image-picker';
import { Dimensions, Linking, Alert } from 'react-native';

// export const serverAPI: 'http://192.168.0.115:8000/OpenAI';
export const serverAPI = 'https://myserverapi.onrender.com/OpenAI';

export const windowWidth = Dimensions.get('window').width;

export async function handleOpenUrl({ url }) {

    url = url.toString();

    if (await Linking.canOpenURL(url)) await Linking.openURL(url);
    else Alert.alert(`Don't know how to open this URL:\n ${url}`);
}

export async function uploadImage() {

    const AsyncAlert = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(`Upload Image`, '', [
                {
                    text: 'Choose From Gallery',
                    onPress: () => { resolve('launchImageLibraryAsync') }
                },
                {
                    text: 'Take a Photo',
                    onPress: () => { resolve('launchCameraAsync') }
                },
            ],
                {
                    cancelable: true,
                    onDismiss: () => { resolve(null) }
                }
            );
        })
    }

    const type = await AsyncAlert();
    // console.log(type);

    if (!type) return { canceled: true };

    // No permissions request is necessary for launching the image library
    const result = await ImagePicker[type]({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    return {
        canceled: result.canceled,
        assets: result.assets
    };
}