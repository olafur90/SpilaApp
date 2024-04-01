import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

/**
 *
 * @param {history} array of numbers
 * @returns {JSX.Element}
 */
export const ScoreHistory = ({ history }) => {
  return (
    history[0] && (
      <ScrollView style={styles.scoreHistory}>
        {history
          .slice()
          .reverse()
          .map((score, index) => (
            <Text style={styles.scoreHistoryText} key={index}>
              {score}
            </Text>
          ))}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  scoreHistory: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 5,
  },
  scoreHistoryText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
