/**
 * Yatzy game
 * Author: Ólafur Pálsson
 * Date: 2024-02-04
 * Description: Yatzy game component
 * Reference: https://en.wikipedia.org/wiki/Yatzy
 */

import React, { useState } from 'react';
import { Button, ImageBackground, Text, View } from 'react-native';
import { PlayerSection } from './PlayerSection';
import { YatzyStyles } from './YatzyStyles';

export default function Yatzy() {
  const [players, setPlayers] = useState([
    { playerName: 'Óli', score: 0, finishedAllMoves: false },
    { playerName: 'Birna', score: 0, finishedAllMoves: false },
  ]);
  const [gameOver, setGameOver] = useState(false);

  const gameBackgroundImageURI = {
    uri: 'https://play-lh.googleusercontent.com/AWFhjdqGOodPYMI8BtJssHkc93QCkVCnC5SZOr25YDp5e-4bNkNTKfOfXSwVtbfdsiVC',
  };

  /**
   * Update the name of the player when the edit name button is pressed
   * @param {*} playerNumber The player number
   * @param {*} value The new name
   */
  const handlePlayerNameChange = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].playerName = value;
      return newState;
    });
  };

  /**
   * Update the score input of the current player
   * @param {*} playerNumber The player number
   * @param {*} value The new score
   */
  const handleScoreUpdate = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].scoreInput = value;
      return newState;
    });
  };

  /**
   * Update the finishedAllMoves property of the player
   * @param {*} playerNumber The player number
   */
  const handlePlayerFinishedAllMoves = playerNumber => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].finishedAllMoves = true;
      console.log(players);
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
