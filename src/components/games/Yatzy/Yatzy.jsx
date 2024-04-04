/**
 * Yatzy game
 * Author: Ólafur Pálsson
 * Date: 2024-02-04
 * Description: Yatzy game component
 * Reference: https://en.wikipedia.org/wiki/Yatzy
 */

import React, { useEffect, useState } from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import { PlayerSection } from './PlayerSection';
import { YatzyStyles } from './YatzyStyles';

export default function Yatzy() {
  const [players, setPlayers] = useState([
    { playerName: 'Óli', score: 0, finishedAllMoves: false },
    { playerName: 'Birna', score: 0, finishedAllMoves: false },
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

  const handlePlayerFinishedAllMoves = playerNumber => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].finishedAllMoves = true;
      return newState;
    });
  };

  return (
    <>
      <ImageBackground
        resizeMethod="auto"
        style={YatzyStyles.gameBackground}
        imageStyle={YatzyStyles.gameBackgroundImage}
        source={gameBackgroundImageURI}>
        {!gameOver ? (
          players.map((player, index) => (
            <PlayerSection
              key={index}
              player={player}
              playerNumber={index + 1}
              onScoreUpdate={handleScoreUpdate}
              onPlayerNameChange={handlePlayerNameChange}
              onPlayerFinishedAllMoves={handlePlayerFinishedAllMoves}
            />
          ))
        ) : (
          <View style={YatzyStyles.gameOverView}>
            <Text style={YatzyStyles.gameOverText}>Game over</Text>
            <Button style={YatzyStyles.playAgainButton} title="Spila aftur" />
          </View>
        )}
      </ImageBackground>
      <Button style={YatzyStyles.submitGame} title="Skrá niðurstöður" />
    </>
  );
}
