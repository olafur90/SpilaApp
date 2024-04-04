import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayerNameContainer } from '../../util/PlayerNameContainer';

/**
 * View for the player name and edit name button
 * @param {*} param0 the player object received from upper level component
 * @param {*} playerNumber the number of the player
 * @param {*} onPlayerNameChange a function that is called when the player name is changed
 * @returns {JSX.Element}
 */
export const PlayerInfo = ({ player, playerNumber, onPlayerNameChange }) => {
  return (
    <View style={styles.playerNameContainer}>
      <PlayerNameContainer
        playerName={player.playerName}
        playerNumber={playerNumber}
        onPlayerNameChange={onPlayerNameChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerNameContainer: {
    marginVertical: 10,
    marginLeft: 20,
  },
});
