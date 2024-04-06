import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { styles } from './TypeItemStyles';

/**
 * View for each score in the typeOfScore array
 * @param {*} index The index of the type item in the typeOfScore array
 * @param {*} setScore A function that updates the score in the typeOfScore array
 * @param {*} scoreType The type of score
 * @param {*} handleScoreChange A function that updates the score in the typeOfScore array
 * @returns {JSX.Element}
 */
export const TypeItem = ({
  upper,
  index,
  setScore,
  scoreType,
  handleScoreChange,
}) => {
  return (
    <>
      <View style={[styles.typeItem]}>
        <Text style={styles.typeItemTitle}>{scoreType.type}</Text>
        {scoreType.canEdit ? (
          <>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              value={
                scoreType.score <= scoreType.maxScore && scoreType.score > 0
                  ? `${scoreType.score}`
                  : ''
              }
              onChangeText={value => handleScoreChange(upper, index, value)}
              style={[styles.scoreInput]}
            />
            <TouchableOpacity
              onPress={() => setScore(upper, index)}
              style={styles.scoreCheckTouchableButton}>
              <Icon style={styles.scoreCheckButton} name="check" />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.confirmedScores}>
            <Text style={styles.confirmedScoresText}>{scoreType.score}</Text>
          </View>
        )}
      </View>
    </>
  );
};
