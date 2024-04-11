/**
 * Yatzy game
 * Author: Ólafur Pálsson
 * Date: 2024-02-04
 * Description: Yatzy game component
 * Reference: https://en.wikipedia.org/wiki/Yatzy
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PlayerSection } from './PlayerSection';
import { YatzyStyles } from './YatzyStyles';

export default function Yatzy({ navigation, updateGameId, gameId }) {
  const [players, setPlayers] = useState([
    { playerName: 'Óli', score: 0, finishedAllMoves: false },
    { playerName: 'Birna', score: 0, finishedAllMoves: false },
  ]);

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const gameBackgroundImageURI = {
    uri: 'https://play-lh.googleusercontent.com/AWFhjdqGOodPYMI8BtJssHkc93QCkVCnC5SZOr25YDp5e-4bNkNTKfOfXSwVtbfdsiVC',
  };

  /**
   * Update the name of the player when the edit name button is pressed
   * @param {*} playerNumber The player number
   * @param {*} value The new name
   */
  const handlePlayerNameChange = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].playerName = value;
      return newState;
    });
  };

  /**
   * Update the score input of the current player
   * @param {*} playerNumber The player number
   * @param {*} value The new score
   */
  const handleScoreUpdate = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].score = value;
      return newState;
    });
  };

  /**
   * Check if the game is over and set the winner
   */
  useEffect(() => {
    if (players.every(player => player.finishedAllMoves)) {
      // winner is player with higher score
      if (players[0].score > players[1].score) {
        setWinner(players[0].playerName);
      } else if (players[1].score > players[0].score) {
        setWinner(players[1].playerName);
      } else {
        setWinner('Jafntefli');
      }
      setGameOver(true);
      navigation.navigate('Yatzy', { gameId: gameId + 1 });
    }
  }, [navigation, players, gameId]);

  /**
   * Update the finishedAllMoves property of the player
   * @param {*} playerNumber The player number
   */
  const handlePlayerFinishedAllMoves = (playerNumber, value) => {
    setPlayers(prevState => {
      const newState = [...prevState];
      newState[playerNumber - 1].finishedAllMoves = true;
      newState[playerNumber - 1].score = value;
      return newState;
    });
  };

  return (
    <>
      <ImageBackground
        resizeMethod="auto"
        style={YatzyStyles.gameBackground}
        imageStyle={YatzyStyles.gameBackgroundImage}
        source={gameBackgroundImageURI}>
        {players.map((player, index) => (
          <PlayerSection
            key={index}
            player={player}
            playerNumber={index + 1}
            onScoreUpdate={handleScoreUpdate}
            onPlayerNameChange={handlePlayerNameChange}
            onPlayerFinishedAllMoves={handlePlayerFinishedAllMoves}
          />
        ))}
      </ImageBackground>
      <GameOverButtonAndModal
        updateGameId={updateGameId}
        navigation={navigation}
        gameOver={gameOver}
        winner={winner}
      />
    </>
  );
}

const GameOverButtonAndModal = ({
  navigation,
  gameOver,
  winner,
  updateGameId,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const updateModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Button
        style={YatzyStyles.submitGame}
        title="Skrá niðurstöður"
        disabled={!gameOver}
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {winner !== 'Jafntefli'
                ? `Sigurvegari er: ${winner}`
                : 'Jafntefli'}
            </Text>
            <ReplayButton navigation={navigation} updateModal={updateModal} />
            <EndGameButton navigation={navigation} updateModal={updateModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const EndGameButton = ({ navigation, updateModal }) => {
  const handleCloseModalAndGoHome = () => {
    updateModal();
    navigation.navigate('Heim');
  };
  return (
    <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={handleCloseModalAndGoHome}>
      <Text style={styles.textStyle}>Hætta</Text>
    </Pressable>
  );
};

const ReplayButton = ({ navigation, updateModal }) => {
  const handleCloseModalAndReplay = () => {
    updateModal();
    navigation.navigate('Heim');
    navigation.navigate('Yatzy');
  };
  return (
    <Pressable
      style={[styles.button, styles.buttonReplay]}
      onPress={handleCloseModalAndReplay}>
      <Text style={styles.textStyle}>Nýr leikur</Text>
    </Pressable>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
    width: deviceWidth * 0.4,
  },
  buttonReplay: {
    backgroundColor: '#2196F3',
    marginBottom: 10,
    width: deviceWidth * 0.4,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
