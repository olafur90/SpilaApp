import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { PlayerNameContainer } from '../../util/PlayerNameContainer';

export const PlayerSection = ({ onPlayerNameChange, playerNumber, player }) => {
  const [typeOfScore, setTypeOfScore] = useState([
    { canEdit: true, type: 'Ásar', score: 0, maxScore: 6 },
    { canEdit: true, type: 'Tvistar', score: 0, maxScore: 12 },
    { canEdit: true, type: 'Þristar', score: 0, maxScore: 18 },
    { canEdit: true, type: 'Fjarkar', score: 0, maxScore: 24 },
    { canEdit: true, type: 'Fimmur', score: 0, maxScore: 30 },
    { canEdit: true, type: 'Sexur', score: 0, maxScore: 36 },
    { canEdit: false, type: 'Summa', score: 0, maxScore: 126 },
    {
      canEdit: false,
      type: 'Bónus 50 stig f. 63 eða meira',
      score: 0,
      maxScore: 50,
    },
    { canEdit: true, type: '1 Par', score: 0, maxScore: 12 },
    { canEdit: true, type: '2 Pör', score: 0, maxScore: 24 },
    { canEdit: true, type: 'Þrír eins', score: 0, maxScore: 18 },
    { canEdit: true, type: 'Fjórir eins', score: 0, maxScore: 24 },
    { canEdit: true, type: 'Fullt hús', score: 0, maxScore: 36 },
    { canEdit: true, type: 'Lág röð', score: 0, maxScore: 15 },
    { canEdit: true, type: 'Há röð', score: 0, maxScore: 20 },
    { canEdit: true, type: 'Stór röð', score: 0, maxScore: 21 },
    { canEdit: true, type: 'Áhætta', score: 0, maxScore: 36 },
    { canEdit: true, type: 'Yatzy, 100 auka stig', score: 0, maxScore: 136 },
    { canEdit: false, type: 'Heildar stig', score: 0, maxScore: 482 },
  ]);

  const handleScoreChange = (key, value) => {
    setTypeOfScore(prevState => {
      const newState = [...prevState];
      newState[key].score = parseInt(value);
      return newState;
    });
  };

  const submitScores = index => {
    if (typeOfScore[index].score <= typeOfScore[index].maxScore) {
      setTypeOfScore(prevState => {
        const newState = [...prevState];
        newState[index].canEdit = false;
        setSumOfFirstSix();
        setTotalSum();
        return newState;
      });
    }
  };

  const setSumOfFirstSix = () => {
    let sum = 0;
    typeOfScore.forEach(score => {
      if (score.type === 'Summa') {
        return;
      }
      sum += score.score;
    });
    setTypeOfScore(prevState => {
      const newState = [...prevState];
      newState[6].score = sum;
      return newState;
    });
    if (sum >= 50) {
      setTypeOfScore(prevState => {
        const newState = [...prevState];
        newState[7].score = 50;
        return newState;
      });
    }
  };

  const setTotalSum = () => {
    let sum = 0;
    typeOfScore.forEach(score => {
      if (
        score.type !== 'Summa' &&
        score.type !== 'Bónus 50 stig f. 63 eða meira' &&
        score.type !== 'Heildar stig'
      ) {
        sum += score.score;
      }
    });
    setTypeOfScore(prevState => {
      const newState = [...prevState];
      newState[17].score = sum;
      return newState;
    });
  };

  return (
    <ScrollView style={styles.playerInfoSection}>
      <PlayerInfo
        player={player}
        playerNumber={playerNumber}
        onPlayerNameChange={onPlayerNameChange}
      />
      {typeOfScore.map((scoreType, index) => (
        <TypeItem
          handleScoreChange={handleScoreChange}
          key={index}
          index={index}
          setScore={() => submitScores(index)}
          scoreType={scoreType}
        />
      ))}
    </ScrollView>
  );
};

export const TypeItem = ({ index, setScore, scoreType, handleScoreChange }) => {
  const split = scoreType.type === 'Bónus 50 stig f. 63 eða meira';

  return (
    <>
      <View style={[styles.typeItem]}>
        <Text style={styles.typeItemTitle}>{scoreType.type}</Text>
        {scoreType.canEdit ? (
          <>
            <TextInput
              keyboardType="numeric"
              editable={!split}
              onChangeText={value => handleScoreChange(index, value)}
              style={[styles.scoreInput, split && { backgroundColor: '#ddd' }]}
            />
            <TouchableOpacity
              onPress={() => setScore()}
              style={styles.scoreCheckTouchableButton}>
              <Icon style={styles.scoreCheckButton} name="check" />
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              height: 50,
              paddingRight: 40,
              textAlign: 'center',
            }}>
            <Text
              style={[
                styles.scoreText,
                scoreType.type === 'Summa' && { fontWeight: 'bold' },
              ]}>
              {scoreType.score}
            </Text>
          </View>
        )}
      </View>
      {split && <View style={styles.divider} />}
    </>
  );
};

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
  /* TODO: use css class instead of line, not working right now need chatGPT */
  disabledGreyColor: {
    color: '#ddd',
  },
  scoreText: {
    color: 'black',
    fontSize: 20,
  },
  playerInfoSection: {
    flex: 1,
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
  playerNameContainer: {
    marginVertical: 10,
    marginLeft: 20,
  },
});
