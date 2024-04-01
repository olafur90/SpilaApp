import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import CurrentPlayerScores from './CurrentPlayerScores';
import { PlayerInputContainer } from './PlayerInputContainer';
import { ScoreHistory } from './ScoreHistory';

/**
 * The main component of the Scrabble game.
 * @returns {JSX.Element}
 */
export default function Scrabble() {
  const [playerScores, setPlayerScores] = useState([
    { score: 0, scoreInput: '', history: [] },
    { score: 0, scoreInput: '', history: [] },
  ]);
  const [playerTurn, setPlayerTurn] = useState(1);

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
      playerTurn === 2 ? setPlayerTurn(1) : setPlayerTurn(2);
      return newState;
    });
  };

  // TODO: remove inline styles
  return (
    <ImageBackground
      resizeMethod="auto"
      style={{ height: '100%' }}
      imageStyle={{ opacity: 0.3 }}
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Scrabble_game_in_progress.jpg',
      }}>
      <View style={styles.scoreHistoryContainer}>
        {playerScores.map((player, index) => (
          <PlayerInputContainer
            key={index}
            playerName={`Spilari ${index + 1}`}
            playerNumber={index + 1}
            playerTurn={playerTurn}
            onScoreUpdate={handleScoreUpdate}
            onAddScore={addScore}
          />
        ))}
      </View>
      <CurrentPlayerScores playerScores={playerScores} />
      <View style={styles.scoreHistoryContainer}>
        {playerScores.map((player, index) => (
          <ScoreHistory key={index} history={player.history} />
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scoreHistoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingTop: 10,
  },
});
