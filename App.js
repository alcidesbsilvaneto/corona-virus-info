// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Views/SplashScreen';
import Home from './src/Views/Home';
import StateDetails from './src/Views/StateDetails';
import InfoScreen from './src/Views/InfoScreen';

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
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            title: 'COVID-19',
            headerRight: ({ navigate }) => (
              <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('InfoScreen') }}>
                <Text>Info</Text>
              </TouchableOpacity>
            )
          })} />
        <Stack.Screen name="StateDetails" component={StateDetails} options={{ title: 'Dados do estado' }} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} options={{ title: 'Sobre o app' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;