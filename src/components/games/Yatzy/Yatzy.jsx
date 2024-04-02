/**
 * Yatzy game
 * Author: Ólafur Pálsson
 * Date: 2024-02-04
 * Description: Yatzy game component
 * Reference: https://en.wikipedia.org/wiki/Yatzy
 */

import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { PlayerSection } from './PlayerSection';

export default function Yatzy() {
  const [players, setPlayers] = useState([
    { playerName: 'Leikmaður 1', score: 0 },
    { playerName: 'Leikmaður 2', score: 0 },
  ])
  // TODO: Find better image to use
  const gameBackgroundImageURI = {
    uri: 'https://play-lh.googleusercontent.com/AWFhjdqGOodPYMI8BtJssHkc93QCkVCnC5SZOr25YDp5e-4bNkNTKfOfXSwVtbfdsiVC',
  }
  return (
    <ImageBackground
      resizeMethod="auto"
      style={styles.gameBackground}
      imageStyle={styles.gameBackgroundImage}
      source={gameBackgroundImageURI}>
      {players.map((player, index) => (
        <PlayerSection key={index} index={index} player={player} setPlayers={setPlayers} />
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gameBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  gameBackgroundImage: {
    opacity: 0.5,
  },
});
