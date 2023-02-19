import { StyleSheet, Text } from "react-native";

export default function ScreenDesc({ text ,bgColor}) {
    return (
        <Text style={[styles.textDesc,{backgroundColor:bgColor}]}>{text}</Text>
    );
}
const styles = StyleSheet.create({
    textDesc: {
        padding: 10,
        textAlign: 'center'
    }
})