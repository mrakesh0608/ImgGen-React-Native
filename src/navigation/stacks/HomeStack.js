import { createStackNavigator } from '@react-navigation/stack';

import ImgEdit from '../../screens/ImgEdit';
import ImgGen from '../../screens/ImgGen';
import ImgVar from '../../screens/ImgVar';
import Home from '../../screens/Home';

const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc',
                height: 80
            },
            headerTitleAlign: 'center'
        }}>
            <Stack.Screen name="Home" component={Home} options={{
                title:'Image Generation'
            }}/>
            <Stack.Screen name="ImgEdit" component={ImgEdit} />
            <Stack.Screen name="ImgGen" component={ImgGen} />
            <Stack.Screen name="ImgVar" component={ImgVar} />
        </Stack.Navigator>
    );
}