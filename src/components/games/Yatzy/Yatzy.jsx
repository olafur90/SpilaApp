/**
 * Yatzy game
 * Author: Ólafur Pálsson
 * Date: 2024-02-04
 * Description: Yatzy game component
 * Reference: https://en.wikipedia.org/wiki/Yatzy
 */

import React, { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PlayerSection } from './PlayerSection';

export default function Yatzy() {
  const [players, setPlayers] = useState([
    { playerName: 'Leikmaður 1', score: 0, finishedAllMoves: false },
    { playerName: 'Leikmaður 2', score: 0, finishedAllMoves: false },
  ]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (players.every(player => player.finishedAllMoves)) {
      setGameOver(true);
    }
  }, [players]);

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
    <>
      <ImageBackground
        resizeMethod="auto"
        style={styles.gameBackground}
        imageStyle={styles.gameBackgroundImage}
        source={gameBackgroundImageURI}>
        {gameOver ? (
          players.map((player, index) => (
            <PlayerSection
              key={index}
              player={player}
              playerNumber={index + 1}
              onScoreUpdate={handleScoreUpdate}
              onPlayerNameChange={handlePlayerNameChange}
              setPlayers={setPlayers}
            />
          ))
        ) : (
          <View style={styles.gameOverView}>
            <Text style={styles.gameOverText}>Game over</Text>
            <Button style={styles.playAgainButton} title="Spila aftur" />
          </View>
        )}
      </ImageBackground>
      <Button style={{ marginTop: 20 }} title="Skrá niðurstöður" />
    </>
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
  gameOverView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: 'black',
  },
});
