import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { connectToDatabase, createTables } from '../db/db';
import Home from './Home';
import Rommi from './games/Rommi/Rommi';
import Scrabble from './games/Scrabble/Scrabble';
import Yatzy from './games/Yatzy/Yatzy';

// For navigation between game elements
const Stack = createNativeStackNavigator();

// TODO: Delete script when done debugging
// eslint-disable-next-line react/self-closing-comp
<script src="http://192.168.1.9:8097"></script>;

export default function App() {
  const appName = 'Spila Appið';
  const games = [Yatzy, Scrabble, Rommi];
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const db = await connectToDatabase();
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
              headerStyle: { backgroundColor: '#1CAFef' },
              headerTitleAlign: 'center',
              title: appName,
            }}
            name="Heim"
            component={Home}
          />
          {games.map((game, index) => (
            <Stack.Screen
              key={index}
              name={game.name}
              component={game}
              options={{
                headerTintColor: '#555',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold', fontSize: 26 },
                headerStyle: { backgroundColor: '#1CAFef' },
                title: game.name,
              }}
            />
          ))}
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
