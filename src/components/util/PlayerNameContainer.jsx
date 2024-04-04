import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { playerNameContainerStyles } from './PlayerNameContainerStyles';

/**
 * A component that displays the name of the player and an edit button
 * that allows the user to edit the name of the player.
 * @param {playerName} string
 * @returns {JSX.Element}
 */
export const PlayerNameContainer = ({
  playerName,
  playerNumber,
  onPlayerNameChange,
}) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState(playerName);

  const colorScheme = useColorScheme();

  const handlePlayerNameChange = newName => {
    onPlayerNameChange(playerNumber, newName);
    setInEditMode(false);
  };

  return (
    <View style={playerNameContainerStyles.playerNameContainer}>
      {!inEditMode ? (
        <TouchableOpacity
          onPress={() => setInEditMode(true)}
          style={[playerNameContainerStyles.editButton]}>
          <Icon
            style={[
              colorScheme === 'dark' && playerNameContainerStyles.darkText,
            ]}
            name="edit"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handlePlayerNameChange(newPlayerName)}
          style={[playerNameContainerStyles.editButton]}>
          <Icon
            style={[
              colorScheme === 'dark' && playerNameContainerStyles.darkText,
            ]}
            name="check"
          />
        </TouchableOpacity>
      )}
      {inEditMode ? (
        <TextInput
          value={newPlayerName}
          maxLength={12}
          onChangeText={value => setNewPlayerName(value)}
          style={[
            playerNameContainerStyles.editPlayerName,
            colorScheme === 'dark' && playerNameContainerStyles.darkText,
          ]}
        />
      ) : (
        <Text
          style={[
            playerNameContainerStyles.playerName,
            colorScheme === 'dark' && playerNameContainerStyles.darkText,
          ]}>
          {playerName}
        </Text>
      )}
    </View>
  );
};
