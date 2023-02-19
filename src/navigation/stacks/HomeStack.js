import { createStackNavigator } from '@react-navigation/stack';

import ImgGen from '../../screens/ImgGen';
import ImgVar from '../../screens/ImgVar';
import ImgEdit from '../../screens/ImgEdit';
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
                title: 'ImgGen'
            }} />
            <Stack.Screen name="ImgGen" component={ImgGen} options={{
                title: 'Image Generation'
            }}/>
            <Stack.Screen name="ImgVar" component={ImgVar} options={{
                title: 'Image Variation'
            }}/>
            <Stack.Screen name="ImgEdit" component={ImgEdit} options={{
                title: 'Image Edit'
            }}/>
        </Stack.Navigator>
    );
}