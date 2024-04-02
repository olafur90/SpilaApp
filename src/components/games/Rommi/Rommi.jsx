import React from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';

export default function Rommi() {
  // TODO: Find better image to use
  const gameBackgroundImageURI = {
    uri: 'https://www.sedgarssport.co.za/cdn/shop/files/Scrabble_Set.jpg?v=1688151594',
  };
  return (
    <ImageBackground
      resizeMethod="auto"
      style={styles.gameBackground}
      imageStyle={styles.gameBackgroundImage}
      source={gameBackgroundImageURI}>
      <Text>HÆ</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gameBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  gameBackgroundImage: {
    opacity: 0.3,
  },
});
