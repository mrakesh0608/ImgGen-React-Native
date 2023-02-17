import { View, Button, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Home({ navigation }) {

    const list = [
        { title: "Generate Images using Text", navigation: 'ImgGen' },
        { title: "Alter an Image using your own Images", navigation: "ImgVar" },
        { title: "Alter an Image using your own Images and Text", navigation: "ImgEdit" },
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({ item }) =>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate(item.navigation,item)}>
                            <Text style={styles.btnText}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    btnContainer: {
        margin: 20,
    },
    btn: {
        backgroundColor: "#1e90ff",
        padding: 15,
        borderRadius: 10,
    },
    btnText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width:150,
    }
})