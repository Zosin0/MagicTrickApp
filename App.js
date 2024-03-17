import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartMagicScreen from './StartMagicScreen';
import LockScreen from './LockScreen';

// Adding Deploy - 2

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartMagic">
        <Stack.Screen
          name="StartMagic"
          component={StartMagicScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LockScreen"
          component={LockScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
