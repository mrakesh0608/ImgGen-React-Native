import { FlatList, Text, View, StyleSheet } from 'react-native';

import useFetch from '../hooks/useFetch';

import ScreenDesc from '../components/ScreenDesc';
import FormImgGen from '../components/forms/FormImgGen';
import ImageWithOpenUrl from '../components/ImageWithOpenUrl';

import * as util from '../util';

export default function ImgGen({ route }) {

    const { title } = route.params;
    const { fetchData, isFetching, data, error, firstTimeFetched } = useFetch();

    async function generateImg({ prompt, numImg }) {
        fetchData({
            path: `${util.serverAPI}/imgGeneration?prompt=${prompt}&numImg=${numImg}`,
            options: {
                method: 'GET'
            }
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <ScreenDesc text={title} bgColor='#ddd' />
                        <FormImgGen generating={isFetching} error={error} onSubmit={generateImg} />
                    </>
                }

                keyExtractor={(item, index) => index}
                data={data}
                renderItem={({ item }) => <ImageWithOpenUrl url={item.url} />}

                ListEmptyComponent={isFetching && !error && firstTimeFetched && !data &&
                    <View>
                        < Text style={{ marginTop: 40, fontSize: 20 }}> Empty</Text >
                    </View>
                }

                contentContainerStyle={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        // paddingHorizontal: 20
        // alignItems: 'center',
        padding: 20,
    },
})