import { StyleSheet, Text } from "react-native";

export default function ScreenDesc({ text }) {
    return (
        <Text style={styles.textDesc}>{text}</Text>
    );
}
const styles = StyleSheet.create({
    textDesc: {
        padding: 10,
        textAlign: 'center'
    }
})