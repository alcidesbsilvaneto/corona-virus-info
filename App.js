// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Views/SplashScreen';
import Home from './src/Views/Home';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ title: '', headerStyle: { height: 0 } }} />
        <Stack.Screen name="Home" component={Home} options={{ title: '', headerStyle: { height: 0 } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;