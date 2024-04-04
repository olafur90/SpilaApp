import React, { useState } from 'react';
import { Button, TextInput, TouchableOpacity, View } from 'react-native';
import { PlayerNameContainer } from '../../util/PlayerNameContainer';
import { playerScoreInputContainerStyles } from './PlayerScoreInputContainerSTyles';

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
    <View style={playerScoreInputContainerStyles.addScoreInput}>
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
          playerScoreInputContainerStyles.playerScoreInput,
          playerTurn !== playerNumber &&
            playerScoreInputContainerStyles.playerScoreInputDisabled,
        ]}
      />
      <TouchableOpacity
        disabled={playerTurn !== playerNumber || !scoreInput}
        style={playerScoreInputContainerStyles.addScoreButton}>
        <Button
          disabled={playerTurn !== playerNumber || !scoreInput}
          onPress={() => UpdateScore()}
          title="Skrá"
        />
      </TouchableOpacity>
    </View>
  );
};
