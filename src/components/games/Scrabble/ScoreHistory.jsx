import React from 'react';
import { ScrollView, Text } from 'react-native';

/**
 *
 * @param {history} array of numbers
 * @returns {JSX.Element}
 */
export const ScoreHistory = ({ history }) => {
  return (
    <ScrollView>
      {history.map((score, index) => (
        <Text key={index}>{score}</Text>
      ))}
    </ScrollView>
  );
};
