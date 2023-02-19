import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Navigator from "./src/navigation/Navigator";

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <Navigator />
            <StatusBar style='dark' />
        </View>
    );
}