import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CurrentPlayerScores({ playerScores }) {
  return (
    playerScores && (
      <View style={styles.playerScoreContainer}>
        <Text style={styles.playerScoreText}>{playerScores[0].score}</Text>
        <Text style={styles.playerScoreText}>{playerScores[1].score}</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  playerScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 40,
  },
  playerScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
