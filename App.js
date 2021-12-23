import React, { useState } from "react";
import { StyleSheet, View, StatusBar, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import colors from "./constants/colors";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";

const fetchFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const Comp = (props) => {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded)
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => setGuessRounds(numberOfRounds);

  let content = <StartGameScreen onStart={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <Header />
      {content}
    </SafeAreaView>
  );
};
export default Comp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
