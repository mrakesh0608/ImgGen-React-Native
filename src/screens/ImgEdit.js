import { useState } from 'react';
import { Button, Image, View, Text, TextInput, Alert } from 'react-native';
import ScreenDesc from '../components/ScreenDesc';

import gStyles from '../styles/globalStyles';

import util from '../util';

export default function ImgEdit({ route }) {

    const { title } = route.params;

    const [inputEle, setInputEle] = useState(null);
    const [searchText, setSearchText] = useState(null);

    const [searchOn, setSearchOn] = useState(false);

    const [image, setImage] = useState(null);
    const [resImg, setResImg] = useState(null);
    const [error, setError] = useState(null);

    async function pickImage() {
        const res = await util.pickImage();
        if (!res.canceled) setImage(res.assets[0]);
        else {
            setImage(null);
            setResImg(null);
            setError(null);
            Alert.alert('Alert', 'Picking Image cancelled')
        }
    };

    async function getImg() {
        inputEle.blur();
        console.log('gen', searchText, image);

        if (!searchText || !image) return;

        setSearchOn(true);

        const id = "id" + Math.random().toString(16).slice(2);
        let formData = new FormData();
        formData.append("Img", {
            name: `openai_${id}.jpg`,
            uri: image.uri,
            type: 'image/jpg',
        });

        try {
            const res = await fetch(`${util.serverAPI}/imgEdit?prompt=${searchText}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            const json = await res.json();
            // console.log(res);
            console.log(json);

            if (json.data) {
                setResImg(json.data);
                setError(null);
            }
            else throw Error(json.error.message);
        }
        catch (err) {
            setError(err.message);
            setResImg(null);
        }

        setSearchOn(false);
    }

    return (
        <>
            <ScreenDesc text={title} />
            <View style={gStyles.container}>
                <View style={gStyles.btnContainer}>
                    <Button title="Pick an image" onPress={pickImage} />
                </View>
                {image &&
                    <Image source={{ uri: image.uri }}
                        style={{ width: 100, height: 100 }}
                    />
                }

                <TextInput
                    ref={inputEle => { setInputEle(inputEle) }}
                    style={gStyles.input}
                    onChangeText={val => setSearchText(val)}
                    placeholder='Enter text to generate img'
                />

                <Button title={searchOn ? 'Generating ...' : 'Generate'} onPress={getImg} disabled={true} />
                <Text style={gStyles.error}>This feature is not implemented properly, so you can't use for now.</Text>
                {!searchOn && resImg && (img.length === 0 ?

                    <Text style={{ marginTop: 40, fontSize: 20 }}>Empty</Text> :
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={resImg}
                        renderItem={({ item }) => {
                            console.log(item);
                            return <Image source={{ uri: item.url }} style={gStyles.img} />
                        }}
                    />
                )}
            </View>
        </>
    );
}