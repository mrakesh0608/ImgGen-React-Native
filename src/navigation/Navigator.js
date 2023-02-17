import { NavigationContainer } from '@react-navigation/native';
import HomeStack from "./stacks/HomeStack";

export default function Navigator() {
    return <NavigationContainer>
        <HomeStack />
    </NavigationContainer>
}