import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Yatzy from './games/Yatzy';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scrabble from './games/Scrabble';
import Rommi from './games/Rommi';
import Home from './Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scrabble" component={Scrabble} />
        <Stack.Screen name="Yatzy" component={Yatzy} />
        <Stack.Screen name="Rommi" component={Rommi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
