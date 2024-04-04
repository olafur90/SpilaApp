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
          <View style={styles.confirmedScores}>
            <Text
              style={[
                styles.scoreText,
                (scoreType.type === 'Summa' ||
                  scoreType.type === 'Heildar stig') && { fontWeight: 'bold' },
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
