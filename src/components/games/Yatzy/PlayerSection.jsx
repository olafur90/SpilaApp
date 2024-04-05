import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
  onScoreUpdate,
  playerNumber,
  player,
}) => {
  /*
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
      type: `Bónus 50 stig f. ${bonus} eða meira`,
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
  */

  const [typeOfScore, setTypeOfScore] = useState([
    { canEdit: true, type: 'Ásar', score: 0, maxScore: 6 },
    { canEdit: true, type: 'Tvistar', score: 0, maxScore: 12 },
    { canEdit: true, type: 'Þristar', score: 0, maxScore: 18 },
    { canEdit: true, type: 'Fjarkar', score: 0, maxScore: 24 },
    { canEdit: true, type: 'Fimmur', score: 0, maxScore: 30 },
    { canEdit: true, type: 'Sexur', score: 0, maxScore: 36 },
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

  /*
  const [typeOfScore, setTypeOfScore] = useState([
    { canEdit: false, type: 'Ásar', score: 0, maxScore: 6 },
    { canEdit: false, type: 'Tvistar', score: 0, maxScore: 12 },
    { canEdit: false, type: 'Þristar', score: 0, maxScore: 18 },
    { canEdit: false, type: 'Fjarkar', score: 0, maxScore: 24 },
    { canEdit: false, type: 'Fimmur', score: 0, maxScore: 30 },
    { canEdit: false, type: 'Sexur', score: 0, maxScore: 36 },
    { canEdit: false, type: 'Summa', score: 0, maxScore: 126 },
    {
      canEdit: false,
      type: `Bónus 50 stig f. ${scoreNeededForBonus} eða meira`,
      score: 0,
      maxScore: 50,
    },
    { canEdit: false, type: '1 Par', score: 0, maxScore: 12 },
    { canEdit: false, type: '2 Pör', score: 0, maxScore: 24 },
    { canEdit: false, type: 'Þrír eins', score: 0, maxScore: 18 },
    { canEdit: false, type: 'Fjórir eins', score: 0, maxScore: 24 },
    { canEdit: false, type: 'Fullt hús', score: 0, maxScore: 36 },
    { canEdit: false, type: 'Lág röð', score: 0, maxScore: 15 },
    { canEdit: false, type: 'Há röð', score: 0, maxScore: 20 },
    { canEdit: false, type: 'Stór röð', score: 0, maxScore: 21 },
    { canEdit: false, type: 'Áhætta', score: 0, maxScore: 36 },
    { canEdit: true, type: 'Yatzy, 100 auka stig', score: 0, maxScore: 136 },
    { canEdit: false, type: 'Heildar stig', score: 0, maxScore: 482 },
  ]);
  */

  const [calculatedSumOfFirstSix, setCalculatedSumOfFirstSix] = useState(0);
  const [calculatedTotalSum, setCalculatedTotalSum] = useState(0);
  const [getsBonus, setGetsBonus] = useState(false);
  const scoreNeededForBonus = 63;

  /**
   * Updates the score value of the score in the typeOfScore[key] array
   * @param {*} key the index of the score to be changed
   * @param {*} value the new value
   */
  const handleScoreChange = (key, value) => {
    setTypeOfScore(prevState => {
      const newState = [...prevState];
      newState[key].score = parseInt(value, 10);
      return newState;
    });
  };

  /**
   * Submit the score if it is valid
   * @param {*} index the index of the score in the typeOfScore array
   */
  const submitScore = index => {
    if (typeOfScore[index].score <= typeOfScore[index].maxScore) {
      setTypeOfScore(prevState => {
        const newState = [...prevState];
        newState[index].canEdit = false;
        setSumOfFirstSix();
        calculateAndSetTotalSum();

        if (typeOfScore.every(score => !score.canEdit)) {
          onPlayerFinishedAllMoves(playerNumber);
          onScoreUpdate(playerNumber, typeOfScore[17].score);
        }
        return newState;
      });
    }
  };

  /**
   * Set the sum of the first six scores for the 'summa' field
   */
  const setSumOfFirstSix = () => {
    const firstSix = typeOfScore.slice(0, 6);
    let sum = 0;
    firstSix.forEach(score => {
      if (score.type === 'Summa') {
        return;
      }
      sum += score.score;
    });
    setCalculatedSumOfFirstSix(sum);
    checkIfBonusAndAdd();
  };

  useEffect(() => {
    setGetsBonus(calculatedSumOfFirstSix >= scoreNeededForBonus);
  }, [calculatedSumOfFirstSix]);

  /**
   * Add 50 bonus points if the sum of the first six scores is 50 or more
   */
  const checkIfBonusAndAdd = () => {
    if (typeOfScore[6].score >= scoreNeededForBonus) {
      setTypeOfScore(prevState => {
        const newState = [...prevState];
        newState[7].score = 50;
        return newState;
      });
    }
  };

  /**
   * Calculate and set the total sum of the scores for the field 'Heildar stig'
   */
  const calculateAndSetTotalSum = () => {
    let sum = 0;
    typeOfScore.forEach(score => {
      if (score.type !== 'Summa' && score.type !== 'Heildar stig') {
        sum += score.score;
      }
    });
    setTypeOfScore(prevState => {
      const newState = [...prevState];
      newState[18].score = sum;
      return newState;
    });
  };

  // Returns a view with the player information and all the input fields
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
          setScore={() => submitScore(index)}
          scoreType={scoreType}
        />
      ))}
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
});
