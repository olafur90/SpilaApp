import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PlayerNameContainer } from './PlayerNameContainer';

/**
 * A component that allows the user to add a score to a player
 * @param {*} {playerName, playerNumber, onScoreUpdate, onAddScore}
 * @returns {JSX.Element}
 */
export const PlayerInputContainer = ({
  playerName,
  playerNumber,
  playerTurn,
  onScoreUpdate,
  onAddScore,
}) => {
  const [scoreInput, setScoreInput] = useState('');

  const handleScoreUpdate = value => {
    setScoreInput(value);
    onScoreUpdate(playerNumber, value);
  };

  const UpdateScore = () => {
    onAddScore(playerNumber);
    setScoreInput('');
  };

  return (
    <View style={styles.addScoreInput}>
      <PlayerNameContainer playerName={playerName} />
      <TextInput
        value={scoreInput}
        onChangeText={handleScoreUpdate}
        style={styles.playerScoreInput}
      />
      <TouchableOpacity style={styles.addScoreButton}>
        <Button
          disabled={playerTurn !== playerNumber}
          onPress={() => UpdateScore()}
          title="Skrá"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addScoreButton: {
    marginTop: 5,
    width: '45%',
  },
  addScoreInput: {
    width: '45%',
  },
  playerScoreInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    height: 40,
    width: '100%',
  },
});
