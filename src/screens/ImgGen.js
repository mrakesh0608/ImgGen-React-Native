import { useState } from 'react';
import { FlatList, Text, TextInput, View, Image, Button } from 'react-native';

import ScreenDesc from '../components/ScreenDesc';

import gStyles from '../styles/globalStyles';

import util from '../util';

export default function App({ route }) {

    const { title } = route.params;

    const [inputEle, setInputEle] = useState(null);
    const [eleIpNumImg, setEleIpNumImg] = useState(null);
    const [searchOn, setSearchOn] = useState(false);

    const [searchText, setSearchText] = useState(null);
    const [numImg, setNumImg] = useState(1);

    const [resImg, setResImg] = useState(null);
    const [error, setError] = useState(null);

    function getNumImg() { return parseInt(numImg > 0 && numImg < 6 ? numImg : 1); }

    async function getImg() {
        if (!searchText) return;

        setSearchOn(true);
        inputEle.blur();
        eleIpNumImg.blur();
        console.log(searchText);

        try {
            const response = await fetch(`${util.serverAPI}/imgGeneration?prompt=${searchText}&numImg=${getNumImg()}`)
            const json = await response.json();

            // console.log(JSON.stringify(response), JSON.stringify(json));

            if (json.data) {
                setResImg(json.data);
                setError(null);
            }
            else throw Error(json.error.message);

        } catch (err) {
            console.log(err);
            setError(err.message);
            setResImg(null);
        }
        setSearchOn(false);
    }

    return (
        <>
            <ScreenDesc text={title} />
            <View style={gStyles.container}>

                <TextInput
                    ref={inputEle => { setInputEle(inputEle) }}
                    style={gStyles.input}
                    onChangeText={val => setSearchText(val)}
                    placeholder='Enter text to generate img'
                />
                <TextInput
                    ref={inputEle => { setEleIpNumImg(inputEle) }}
                    style={gStyles.input}
                    onChangeText={val => setNumImg(val)}
                    placeholder='Enter Number of Img to be retrieved (1-5)'
                    keyboardType='numeric'
                    maxLength={1}
                />
                <Button title={searchOn ? 'Generating ...' : 'Generate'} onPress={getImg} disabled={searchOn} />
                {!searchOn && error && <Text style={gStyles.error}>{error}</Text>}
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