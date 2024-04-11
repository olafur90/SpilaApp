import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlayerInfo } from './PlayerInfo';
import { TypeItem } from './TypeItem';

/**
 * View for each player's section
 * @param {*} onPlayerNameChange a function that is called when the player name is changed
 * @param {*} playerNumber the number of the player
 * @param {*} player the player object
 * @returns {JSX.Element}
 */
export const PlayerSection = ({
  onPlayerFinishedAllMoves,
  onPlayerNameChange,
  playerNumber,
  player,
}) => {
  // TODO: REMEMBER TO CHANGE ALL CANEDIT TO TRUE AFTER TESTING
  const numberOfDice = 6;

  const [upperNumbers, setUpperNumbers] = useState([
    { canEdit: true, type: 'Ásar', score: 0, maxScore: 1 * numberOfDice },
    { canEdit: true, type: 'Tvistar', score: 0, maxScore: 2 * numberOfDice },
    { canEdit: true, type: 'Þristar', score: 0, maxScore: 3 * numberOfDice },
    { canEdit: true, type: 'Fjarkar', score: 0, maxScore: 4 * numberOfDice },
    { canEdit: true, type: 'Fimmur', score: 0, maxScore: 5 * numberOfDice },
    { canEdit: true, type: 'Sexur', score: 0, maxScore: 6 * numberOfDice },
  ]);

  const [lowerNumbers, setLowerNumbers] = useState([
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
  ]);

  const [calculatedSumOfFirstSix, setCalculatedSumOfFirstSix] = useState(0);
  const [calculatedTotalSum, setCalculatedTotalSum] = useState(0);
  const [getsBonus, setGetsBonus] = useState(false);
  const scoreNeededForBonus = 63;

  /**
   * Updates the score value of the score in the typeOfScore[key] array
   * On input change in the score input TextInput area
   * @param {*} key the index of the score to be changed
   * @param {*} value the new value
   */
  const handleScoreChange = (upper, key, value) => {
    upper
      ? setUpperNumbers(prevState => {
          if (value <= upperNumbers[key].maxScore) {
            const newState = [...prevState];
            newState[key].score = parseInt(value, 10);
            return newState;
          } else {
            return prevState;
          }
        })
      : setLowerNumbers(prevState => {
          if (value <= lowerNumbers[key].maxScore) {
            const newState = [...prevState];
            newState[key].score = parseInt(value, 10);
            return newState;
          } else {
            return prevState;
          }
        });
  };

  /**
   * Submit the score if it is valid
   * @param {*} upper true if the score is for the upper section else false
   * @param {*} index the index of the score in the typeOfScore array
   */
  const submitScore = (upper, index) => {
    upper
      ? setUpperNumbers(prevState => {
          if (upperNumbers[index].score <= upperNumbers[index].maxScore) {
            const newState = [...prevState];
            newState[index].canEdit = false;
            if (playerDone()) {
              onPlayerFinishedAllMoves(index, calculatedTotalSum);
            }
            return newState;
          }
        })
      : setLowerNumbers(prevState => {
          if (lowerNumbers[index].score <= lowerNumbers[index].maxScore) {
            const newState = [...prevState];
            newState[index].canEdit = false;
            if (playerDone()) {
              onPlayerFinishedAllMoves(playerNumber, calculatedTotalSum);
            }
            return newState;
          }
        });
  };

  const playerDone = () => {
    return (
      upperNumbers.every(score => !score.canEdit) &&
      lowerNumbers.every(score => !score.canEdit)
    );
  };

  /**
   * Calculate the sum of the first six scores
   * and the total sum of all scores
   * when any score changes
   */
  useEffect(() => {
    let accSumUpperSection = 0;
    upperNumbers &&
      upperNumbers.forEach(score => {
        accSumUpperSection += score.score;
      });
    setCalculatedSumOfFirstSix(accSumUpperSection);

    let accSumLowerSection = 0;
    lowerNumbers &&
      lowerNumbers.forEach(score => {
        accSumLowerSection += score.score;
      });
    setCalculatedTotalSum(
      accSumLowerSection + calculatedSumOfFirstSix + (getsBonus ? 50 : 0),
    );
    setGetsBonus(calculatedSumOfFirstSix >= scoreNeededForBonus);
  }, [upperNumbers, lowerNumbers, calculatedSumOfFirstSix, getsBonus]);

  // Returns a view with the player information and all the input fields
  return (
    <ScrollView style={styles.playerInfoSection}>
      <PlayerInfo
        player={player}
        playerNumber={playerNumber}
        onPlayerNameChange={onPlayerNameChange}
      />
      {upperNumbers &&
        upperNumbers.map((scoreType, index) => (
          <TypeItem
            handleScoreChange={handleScoreChange}
            key={index}
            upper={true}
            index={index}
            setScore={submitScore}
            scoreType={scoreType}
          />
        ))}
      <View style={styles.divider} />
      <View style={styles.scoreTextContainer}>
        <Text
          style={styles.scoreText}>{`Summa: ${calculatedSumOfFirstSix}`}</Text>
      </View>
      <View style={styles.scoreTextContainer}>
        <Text style={styles.scoreText}>{`Bónus: ${getsBonus ? 50 : 0}`}</Text>
      </View>
      <View style={styles.divider} />
      <View style={{ marginBottom: 15 }}>
        {lowerNumbers &&
          lowerNumbers.map((scoreType, index) => (
            <TypeItem
              handleScoreChange={handleScoreChange}
              key={index}
              index={index}
              upper={false}
              setScore={submitScore}
              scoreType={scoreType}
            />
          ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.scoreTextContainer}>
        <Text style={styles.scoreText}>Heildar stig: </Text>
        <Text style={styles.scoreText}>{calculatedTotalSum}</Text>
      </View>
    </ScrollView>
  );
};

/**
 * Styles for the components in this file
 */
const styles = StyleSheet.create({
  /* TODO: use css class instead of line, not working right now need chatGPT */
  disabledGreyColor: {
    color: '#ddd',
  },
  playerInfoSection: {
    flex: 1,
  },

  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flex: 1,
  },
  scoreTextContainer: {
    flexDirection: 'row',
    height: 40,
    paddingLeft: 20,
    paddingTop: 5,
  },
  scoreText: {
    color: 'black',
    fontSize: 20,
  },
});
