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
export const PlayerScoreInputContainer = ({
  playerName,
  playerNumber,
  playerTurn,
  onScoreUpdate,
  onAddScore,
  onPlayerNameChange,
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
      <PlayerNameContainer
        onPlayerNameChange={onPlayerNameChange}
        playerName={playerName}
        playerNumber={playerNumber}
      />
      <TextInput
        value={playerTurn === playerNumber ? scoreInput : ''}
        editable={playerTurn === playerNumber}
        keyboardType="numeric"
        maxLength={3}
        onChangeText={handleScoreUpdate}
        style={[
          styles.playerScoreInput,
          playerTurn !== playerNumber && styles.playerScoreInputDisabled,
        ]}
      />
      <TouchableOpacity
        disabled={playerTurn !== playerNumber || !scoreInput}
        style={styles.addScoreButton}>
        <Button
          disabled={playerTurn !== playerNumber || !scoreInput}
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
    color: 'black',
    height: 40,
    paddingLeft: 10,
    width: '100%',
  },
  playerScoreInputDisabled: {
    backgroundColor: '#ddd',
  },
});
