import React from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export const GAMES = [
  {
    name: 'Yatzy',
    image:
      'https://dl.memuplay.com/new_market/img/com.playvalve.yatzy.icon.2023-09-15-09-18-26.png',
  },
  {
    name: 'Scrabble',
    image:
      'https://www.sedgarssport.co.za/cdn/shop/files/Scrabble_Set.jpg?v=1688151594',
  },
  {
    name: 'Rommi',
    image:
      'https://kalifano.com/cdn/shop/products/kalifano-playing-cards-las-vegas-gold-playing-cards-gpc-lv-29767908425922.jpg?v=1698746719&width=3000',
  },
];

export const Game = ({ navigation, game }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: game.image }}
        style={styles.imageBackground}>
        <TouchableOpacity style={styles.playButton}>
          <Button
            title={`Spila ${game.name}`}
            onPress={() => navigation.navigate(game)}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default function Home({ navigation }) {
  return (
    <View style={styles.home}>
      {GAMES.map(game => (
        <Game key={game.name} navigation={navigation} game={game} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#f5f5f5',
    marginTop: 15,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    height: '30%',
    justifyContent: 'center',
    marginVertical: 9,
    width: '90%',
  },
  imageBackground: {
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  playButton: {
    borderTopColor: 'white',
    borderTopWidth: 1,
    color: 'white',
    opacity: 0.96,
    width: '100%',
  },
});
