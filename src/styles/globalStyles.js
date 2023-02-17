import { StyleSheet } from 'react-native';

import util from '../util';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: util.windowWidth - 40,
        marginVertical: 15,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    },
    img: {
        resizeMode: 'contain',
        width: util.windowWidth - 40,
        height: util.windowWidth - 40,
        marginVertical: 20,
        backgroundColor: '#aaa',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#bbb',
    },
    btnContainer: {
        margin: 20,
    },
    error: {
        color: 'red',
        padding: 16,
        textAlign: 'justify',
    },
    flatList: {
        marginVertical: 20,
        width: util.windowWidth,
    }
});

export default styles;