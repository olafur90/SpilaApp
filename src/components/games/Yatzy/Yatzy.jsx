/**
 * Yatzy game
 * Author: Ólafur Pálsson
 * Date: 2024-02-04
 * Description: Yatzy game component
 * Reference: https://en.wikipedia.org/wiki/Yatzy
 */

import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { PlayerSection } from './PlayerSection';

export default function Yatzy() {
  const [players, setPlayers] = useState([
    { playerName: 'Leikmaður 1', score: 0 },
    { playerName: 'Leikmaður 2', score: 0 },
  ]);
  // TODO: Find better image to use
  const gameBackgroundImageURI = {
    uri: 'https://play-lh.googleusercontent.com/AWFhjdqGOodPYMI8BtJssHkc93QCkVCnC5SZOr25YDp5e-4bNkNTKfOfXSwVtbfdsiVC',
  };

  const handlePlayerNameChange = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].playerName = value;
      return newState;
    });
  };

  const handleScoreUpdate = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].scoreInput = value;
      return newState;
    });
  };

  return (
    <ImageBackground
      resizeMethod="auto"
      style={styles.gameBackground}
      imageStyle={styles.gameBackgroundImage}
      source={gameBackgroundImageURI}>
      {players.map((player, index) => (
        <PlayerSection
          key={index}
          player={player}
          onScoreUpdate={handleScoreUpdate}
          playerNumber={index + 1}
          onPlayerNameChange={handlePlayerNameChange}
          setPlayers={setPlayers}
        />
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gameBackground: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
  },
  gameBackgroundImage: {
    opacity: 0.3,
  },
});
