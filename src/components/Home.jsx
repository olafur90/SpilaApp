import { View, Button, StyleSheet, Image } from 'react-native';
import React from 'react';

export const PlayGameButton = ({ navigation, game }) => {
  return (
    <View style={styles.container}>
      <Button
        title={`Spila ${game}`}
        onPress={() => navigation.navigate(game)}
      />
    </View>
  );
};

export default function Home({ navigation }) {
  return (
    <View>
      <PlayGameButton navigation={navigation} game="Yatzy" />
      <PlayGameButton navigation={navigation} game="Scrabble" />
      <PlayGameButton navigation={navigation} game="Rommi" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#555',
    height: '32%',
    justifyContent: 'center',
    marginVertical: 2,
  },
});
