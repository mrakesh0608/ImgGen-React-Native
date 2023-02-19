import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function MyButton({ title, onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={disabled && styles.disabled}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.6,
    },
    button: {
        backgroundColor: "#1e90ff",
        borderRadius: 8,

        alignSelf: 'center',

        paddingHorizontal: 10,
        paddingVertical: 14,

        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.4
    },
})