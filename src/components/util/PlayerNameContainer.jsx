import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

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
    <View style={styles.playerNameContainer}>
      {!inEditMode ? (
        <TouchableOpacity
          onPress={() => setInEditMode(true)}
          style={[styles.editButton]}>
          <Icon
            style={[colorScheme === 'dark' && styles.darkText]}
            name="edit"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handlePlayerNameChange(newPlayerName)}
          style={[styles.editButton]}>
          <Icon
            style={[colorScheme === 'dark' && styles.darkText]}
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
            styles.editPlayerName,
            colorScheme === 'dark' && styles.darkText,
          ]}
        />
      ) : (
        <Text
          style={[
            styles.playerName,
            colorScheme === 'dark' && styles.darkText,
          ]}>
          {playerName}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editPlayerName: {
    borderWidth: 1,
    color: 'black',
  },
  playerNameDark: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editButton: {
    alignSelf: 'center',
    fontSize: 16,
    marginRight: 10,
  },
  playerNameContainer: {
    flexDirection: 'row',
  },
  darkText: {
    color: 'black',
  },
});
