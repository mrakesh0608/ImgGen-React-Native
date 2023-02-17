import { useState } from 'react';
import { Button, Image, View, Alert, FlatList, Text, TextInput } from 'react-native';

import ScreenDesc from '../components/ScreenDesc';

import gStyles from '../styles/globalStyles';
import util from '../util';

export default function ImageEdit({ route }) {
    const { title } = route.params;

    const [eleIpNumImg, setEleIpNumImg] = useState(null);
    const [searchOn, setSearchOn] = useState(false);

    const [image, setImage] = useState(null);
    const [numImg, setNumImg] = useState(1);

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

    function getNumImg() { return parseInt(numImg > 0 && numImg < 6 ? numImg : 1); }

    async function getImg() {
        if (!image) return;

        setSearchOn(true);
        eleIpNumImg.blur();

        const id = "id" + Math.random().toString(16).slice(2);
        let formData = new FormData();
        formData.append("Img", {
            name: `openai_${id}.jpg`,
            uri: image.uri,
            type: 'image/jpg',
        });
        // console.log(formData);


        try {
            const res = await fetch(`${util.serverAPI}/imgVariation?numImg=${getNumImg()}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            const json = await res.json();
            // console.log(res);
            // console.log(json);

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
                {!searchOn &&
                    <View style={gStyles.btnContainer}>
                        <Button title="Pick an image" onPress={pickImage} />
                    </View>
                }
                {image &&
                    <>
                        <Image source={{ uri: image.uri }}
                            style={{ width: 100, height: 100 }}
                        />
                        <TextInput
                            ref={inputEle => { setEleIpNumImg(inputEle) }}
                            style={gStyles.input}
                            onChangeText={val => setNumImg(val)}
                            placeholder='Enter Number of Img to be retrieved (1-5)'
                            keyboardType='numeric'
                            maxLength={1}
                        />
                        <View style={gStyles.btnContainer}>
                            <Button title={searchOn ? 'Generating ...' : 'Generate'} onPress={getImg} disabled={searchOn} />
                        </View>
                        {!searchOn && error && <Text style={gStyles.error}>{error}</Text>}
                    </>
                }

                {!searchOn && resImg && (resImg.length === 0 ?

                    <Text style={{ marginTop: 40, fontSize: 20 }}>Empty</Text> :
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={resImg}
                        renderItem={({ item }) => {
                            console.log(item);
                            return <Image source={{ uri: item.url }} style={gStyles.img} />
                        }}
                        style={gStyles.flatList}
                    />
                )}
            </View>
        </>
    );
}