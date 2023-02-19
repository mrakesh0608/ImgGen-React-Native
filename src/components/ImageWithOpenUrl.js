import { Image, TouchableOpacity, StyleSheet } from 'react-native';

import * as util from '../util';

export default function ImageWithOpenUrl({ url }) {
    return (
        <TouchableOpacity onPress={() => { util.handleOpenUrl({ url }) }}>
            <Image source={{ uri: url }} style={styles.img} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    img: {
        resizeMode: 'contain',
        width: util.windowWidth - 40,
        height: util.windowWidth - 40,
        marginVertical: 20,
        backgroundColor: '#aaa',
        // alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#bbb',
    },
})