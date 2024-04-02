import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import CurrentPlayerScores from './CurrentPlayerScores';
import { PlayerScoreInputContainer } from './PlayerInputContainer';
import { ScoreHistory } from './ScoreHistory';

/**
 * The main game component for the Scrabble game.
 * @returns {JSX.Element}
 */
export default function Scrabble() {
  const [players, setPlayers] = useState([
    { playerName: 'Leikmaður 1', score: 0, scoreInput: '', history: [] },
    { playerName: 'Leikmaður 2', score: 0, scoreInput: '', history: [] },
  ]);
  const [playerTurn, setPlayerTurn] = useState(1);

  const gameBackgroundImageURI = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Scrabble_game_in_progress.jpg',
  };

  /**
   * Update the score input of the current player
   * @param {*} playerNumber
   * @param {*} value
   */
  const handleScoreUpdate = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].scoreInput = value;
      return newState;
    });
  };

  /**
   * Add the current player's score to their total score
   * @param {playerNumber} playerNumber string
   */
  const addScore = playerNumber => {
    setPlayers(prevState => {
      const newState = [...prevState];
      const currentPlayer = newState[playerNumber - 1];
      currentPlayer.score += Number(currentPlayer.scoreInput);
      currentPlayer.history.push(Number(currentPlayer.scoreInput));
      currentPlayer.scoreInput = '';
      playerTurn === 2 ? setPlayerTurn(1) : setPlayerTurn(2);
      return newState;
    });
  };

  const handlePlayerNameChange = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].playerName = value;
      return newState;
    });
  };

  return (
    <ImageBackground
      resizeMethod="auto"
      style={styles.gameBackground}
      imageStyle={styles.gameBackgroundImage}
      source={gameBackgroundImageURI}>
      <View style={styles.scoreHistoryContainer}>
        {players.map((player, index) => (
          <PlayerScoreInputContainer
            key={index}
            playerName={player.playerName}
            playerNumber={index + 1}
            playerTurn={playerTurn}
            onScoreUpdate={handleScoreUpdate}
            onAddScore={addScore}
            onPlayerNameChange={handlePlayerNameChange}
          />
        ))}
      </View>
      <CurrentPlayerScores playerScores={players} />
      <View style={styles.scoreHistoryContainer}>
        {players.map((player, index) => (
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
  gameBackground: {
    height: '100%',
  },
  gameBackgroundImage: {
    opacity: 0.3,
  },
});
