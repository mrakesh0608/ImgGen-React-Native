import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';

export default {
    async pickImage() {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        return {
            canceled: result.canceled,
            assets: result.assets
        };
    },
    windowWidth: Dimensions.get('window').width,
    serverAPI: 'https://myserverapi.onrender.com/OpenAI',
    // serverAPI: 'http://192.168.0.115:8000/OpenAI',
}