import { FlatList, Text, View, StyleSheet } from 'react-native';

import useFetch from '../hooks/useFetch';

import ScreenDesc from '../components/ScreenDesc';
import FormImgEdit from '../components/forms/FormImgEdit';
import ImageWithOpenUrl from '../components/ImageWithOpenUrl';

import * as util from '../util';

export default function ImgEdit({ route }) {

    const { title } = route.params;
    const { fetchData, isFetching, data, error, firstTimeFetched } = useFetch();

    async function generateImg({ prompt, img, numImg }) {

        const id = "id" + Math.random().toString(16).slice(2);
        let formData = new FormData();
        formData.append("Img", {
            name: `openai_${id}.jpg`,
            uri: img.uri,
            type: 'image/jpg',
        });

        fetchData({
            path: `${util.serverAPI}/imgVariation??prompt=${prompt}&numImg=${numImg}`,
            options: {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            }
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <ScreenDesc text={title} bgColor='#ddd' />
                        <Text style={styles.errorText}>This feature is currently under development, so you can't use for now.</Text>
                        <FormImgEdit generating={isFetching} error={error} onSubmit={generateImg} disable={true}/>
                    </>
                }

                keyExtractor={(item, index) => index}
                data={data}
                renderItem={({ item }) => <ImageWithOpenUrl url={item.url} />}

                ListEmptyComponent={isFetching && !error && firstTimeFetched && !data &&
                    <View>
                        <Text style={{ marginTop: 40, fontSize: 20 }}> Empty</Text >
                    </View>
                }

                contentContainerStyle={styles.container}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    }
})