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
  onScoreUpdate,
  onAddScore,
}) => {
  const [scoreInput, setScoreInput] = useState('');

  const handleScoreUpdate = value => {
    setScoreInput(value);
    onScoreUpdate(playerNumber, value);
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
        <Button onPress={() => onAddScore(playerNumber)} title="Skrá" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addScoreInput: {
    width: '45%',
  },
  playerScoreInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    width: '100%',
    height: 40,
  },
});
