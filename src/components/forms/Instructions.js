import { Text, View, StyleSheet } from 'react-native';

export default function Instructions() {

    return (
        <View style={styles.instructions}>
            <Text style={styles.instructText}>Instructions : </Text>
            <Text style={styles.descText}>If non required fields are empty, then default values are considered.</Text>
            <Text style={styles.descText}>Default values are shown in parenthesis.</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    instructions: {
        paddingVertical: 10,
        marginVertical: 30,
        backgroundColor: '#ddd',
    },
    instructText: {
        color: 'black',
        fontStyle: 'italic',
        paddingLeft: 10,
        marginBottom: 15,
    },
    descText: {
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'justify',
        paddingHorizontal: 10,
    }
})