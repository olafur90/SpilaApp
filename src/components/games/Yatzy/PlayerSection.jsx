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

export const PlayerSection = ({ index, player, setPlayers }) => {
  const [typeOfScore, setTypeOfScore] = useState([
    { canEdit: true, type: 'Ásar', score: 0, maxScore: 6 },
    { canEdit: true, type: 'Tvistar', score: 0, maxScore: 12 },
    { canEdit: true, type: 'Þristar', score: 0, maxScore: 18 },
    { canEdit: true, type: 'Fjarkar', score: 0, maxScore: 24 },
    { canEdit: true, type: 'Fimmur', score: 0, maxScore: 30 },
    { canEdit: true, type: 'Sexur', score: 0, maxScore: 36 },
    { canEdit: true, type: 'Summa', score: 0, maxScore: 126 },
    {
      canEdit: true,
      type: 'Bónus 50 stig f. 63 eða meira',
      score: 0,
      maxScore: 50,
    },
    { canEdit: true, type: '1 Par', score: 0, maxScore: 35 },
    { canEdit: true, type: '2 Pör', score: 0, maxScore: 35 },
    { canEdit: true, type: 'Þrír eins', score: 0, maxScore: 18 },
    { canEdit: true, type: 'Fjórir eins', score: 0, maxScore: 24 },
    { canEdit: true, type: 'Fullt hús', score: 0, maxScore: 36 },
    { canEdit: true, type: 'Lág röð', score: 0, maxScore: 15 },
    { canEdit: true, type: 'Há röð', score: 0, maxScore: 20 },
    { canEdit: true, type: 'Stór röð', score: 0, maxScore: 21 },
    { canEdit: true, type: 'Áhætta', score: 0, maxScore: 36 },
    { canEdit: true, type: 'Yatzy, 100 auka stig', score: 0, maxScore: 136 },
    { canEdit: true, type: 'Heildar stig', score: 0, maxScore: 482 },
  ]);

  const handleScoreChange = () => {
    const totalScore = typeOfScore.reduce((acc, curr) => acc + curr.score, 0);
  };

  return (
    <ScrollView>
      <PlayerInfo />
      {typeOfScore.map((scoreType, index) => (
        <TypeItem key={index} scoreType={scoreType} />
      ))}
      {/* TODO: */}
    </ScrollView>
  );
};

export const TypeItem = ({ scoreType, handleScoreChange }) => {
  const split = scoreType.type === 'Bónus 50 stig f. 63 eða meira';

  return (
    <>
      <View style={[styles.typeItem]}>
        <Text
          style={{
            alignSelf: 'center',
            flex: 4,
            color: 'black',
            fontWeight: 'bold',
            maxWidth: 70,
          }}>
          {scoreType.type}
        </Text>
        {scoreType.canEdit ? (
          <>
            <TextInput
              keyboardType="numeric"
              style={styles.scoreInput}
              onChangeText={handleScoreChange}
            />
            <TouchableOpacity
              style={{
                flex: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon style={{ color: 'blue' }} name="check" />
            </TouchableOpacity>
          </>
        ) : (
          <Text>{scoreType.score}</Text>
        )}
      </View>
      {split && (
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 20,
          }}
        />
      )}
    </>
  );
};

export const PlayerInfo = ({
  playerName,
  playerNumber,
  onPlayerNameChange,
}) => {
  return (
    <View>
      {/* TODO: Component for each player
                See if this component can be reused here */}
      <PlayerNameContainer
        playerNumber={playerNumber}
        onPlayerNameChange={onPlayerNameChange}
        playerName={playerName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    maxHeight: 50,
    marginLeft: 15,
    marginVertical: 5,
    textAlign: 'center',
  },
});
