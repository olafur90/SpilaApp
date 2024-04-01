import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { connectToDatabase, createTables } from '../db/db';
import Home from './Home';
import Rommi from './games/Rommi';
import Scrabble from './games/Scrabble/Scrabble';
import Yatzy from './games/Yatzy';

const Stack = createNativeStackNavigator();

// TODO: Delete script when done debugging
// eslint-disable-next-line react/self-closing-comp
<script src="http://192.168.1.9:8097"></script>;

export default function App() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Connect to the database
        const db = await connectToDatabase();

        // Create tables if they don't exist
        await createTables(db);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerTintColor: '#000',
              headerStyle: { backgroundColor: '#fff' },
              headerTitleAlign: 'center',
              title: 'Spila Appið',
            }}
            name="Heim"
            component={Home}
          />
          <Stack.Screen name="Scrabble" component={Scrabble} />
          <Stack.Screen name="Yatzy" component={Yatzy} />
          <Stack.Screen name="Rommi" component={Rommi} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5',
  },
};
