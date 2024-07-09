import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from '../Pages/ChatScreen';
import HomeScreen from '../Pages/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeScreenNavigation = () => {
    return (
        
    // <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='home' component={HomeScreen}/>
            <Stack.Screen name='chat' component={ChatScreen} />
        </Stack.Navigator>
    // </NavigationContainer>
    )
}

export default HomeScreenNavigation