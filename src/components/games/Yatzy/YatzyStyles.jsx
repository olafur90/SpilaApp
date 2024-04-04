import { StyleSheet } from 'react-native';

export const YatzyStyles = StyleSheet.create({
  gameBackground: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
  },
  gameBackgroundImage: {
    opacity: 0.3,
  },
  gameOverView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: 'black',
  },
  submitGame: {
    marginTop: 20,
  },
});
