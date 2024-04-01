import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayerInputContainer } from './PlayerInputContainer';
import { ScoreHistory } from './ScoreHistory';

/**
 * The main component of the Scrabble game.
 * @returns {JSX.Element}
 */
export default function Scrabble() {
  const [playerScores, setPlayerScores] = useState([
    { score: 0, scoreInput: '', history: [10, 20, 30, 40, 50] },
    { score: 0, scoreInput: '', history: [10, 30, 10, 20, 129, 10] },
  ]);

  /**
   * Update the score input
   * @param {*} playerNumber
   * @param {*} value
   */
  const handleScoreUpdate = (playerNumber, value) => {
    setPlayerScores(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].scoreInput = value;
      return newState;
    });
  };

  /**
   * Add the score to the player's score
   * @param {*} playerNumber
   */
  const addScore = playerNumber => {
    setPlayerScores(prevState => {
      const newState = [...prevState];
      const currentPlayer = newState[playerNumber - 1];
      currentPlayer.score += Number(currentPlayer.scoreInput);
      currentPlayer.history.push(Number(currentPlayer.scoreInput));
      currentPlayer.scoreInput = '';
      return newState;
    });
  };

  return (
    <View>
      <View style={styles.addScoreContainer}>
        {playerScores.map((player, index) => (
          <PlayerInputContainer
            key={index}
            playerName={`Spilari ${index + 1}`}
            playerNumber={index + 1}
            onScoreUpdate={handleScoreUpdate}
            onAddScore={addScore}
          />
        ))}
      </View>
      <View style={styles.addScoreContainer}>
        {playerScores.map((player, index) => (
          <ScoreHistory key={index} history={player.history} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingTop: 10,
  },
});
