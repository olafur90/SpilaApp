import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  typeItemTitle: {
    alignSelf: 'center',
    flex: 4,
    color: 'black',
    fontWeight: 'bold',
    maxWidth: 70,
  },
  scoreCheckButton: {
    color: 'blue',
  },
  scoreCheckTouchableButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedScores: {
    color: 'red',
    height: 50,
    justifyContent: 'center',
    paddingRight: 40,
    textAlign: 'center',
  },
  scoreText: {
    color: 'black',
    fontSize: 20,
  },
  typeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  scoreInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    color: 'black',
    flex: 4,
    height: 40,
    maxHeight: 50,
    marginLeft: 15,
    marginVertical: 5,
    textAlign: 'center',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 20,
  },
});
