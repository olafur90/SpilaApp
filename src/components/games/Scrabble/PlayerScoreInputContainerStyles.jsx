import { StyleSheet } from 'react-native';

export const playerScoreInputContainerStyles = StyleSheet.create({
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
