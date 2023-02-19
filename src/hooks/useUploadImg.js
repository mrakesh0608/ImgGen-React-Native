import { View, Button, Image, StyleSheet } from 'react-native';
import { useState } from 'react';

import * as util from '../util';

export default function useUploadImg() {

    const [uploadImg, setUploadImg] = useState(null);

    async function uploadImage() {

        const res = await util.uploadImage();

        if (!res.canceled) setUploadImg(res.assets[0]);
        else {
            setUploadImg(null);
            alert('Uploading an Image cancelled')
        }
    };
    const UploadImgComp = () => (
        <View style={Styles.container}>
            <Button title="Upload an image" onPress={uploadImage} />
            {uploadImg &&
                <Image
                    source={{ uri: uploadImg.uri }}
                    style={Styles.uploadImgPreview}
                />
            }
        </View>
    );
    return ({ uploadImg, UploadImgComp });
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: 'pink',
        marginVertical: 20
    },
    uploadImgPreview: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
    }
})