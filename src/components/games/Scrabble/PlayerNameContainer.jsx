import React from 'react';
import {
  StyleSheet,
  Text,
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
export const PlayerNameContainer = ({ playerName }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.playerNameContainer}>
      <TouchableOpacity style={[styles.editButton]}>
        <Icon style={[colorScheme === 'dark' && styles.darkText]} name="edit" />
      </TouchableOpacity>
      <Text
        style={[styles.playerName, colorScheme === 'dark' && styles.darkText]}>
        {playerName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
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
