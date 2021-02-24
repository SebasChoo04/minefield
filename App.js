import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './components/MainScreen';
import AddNewScoreScreen from './components/AddNewScoreScreen';
import MinesScreen from './components/MinesScreen';

export default function App() {

  const Stack = createStackNavigator();

  const linking = {
    prefixes: [],
    config: {
      screens: {
        Home: '',
        AddNewScore: '/unit-name',
        Answers: '/answers'
      }
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="AddNewScore" component={AddNewScoreScreen} />
        <Stack.Screen name="Answers" component={MinesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <MainScreen/>
  )
}