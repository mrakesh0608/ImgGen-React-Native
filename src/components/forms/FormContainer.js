import { ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

import Instructions from './Instructions';

export default function FormContainer(props) {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                <Instructions />
                {props.children}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        // paddingHorizontal: 20
        // alignItems: 'center',
        // padding: 20,
    },
})