import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberComponent";
import BodyText from "../components/BodyText";

import * as ScreenOrientation from "expo-screen-orientation";

import { Ionicons } from "@expo/vector-icons";

import defaultStyles from "../constants/defaultStyles";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item.value}</BodyText>
    </View>
  );
};

const GameScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_DOWN);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([
    { id: new Date().toISOString(), value: initialGuess },
  ]);

  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );

  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const { onGameOver, userChoice } = props;

  useEffect(() => {
    const setLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", setLayout);

    return () => Dimensions.removeEventListener("change", setLayout);
  });

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, onGameOver, userChoice]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      generateRandomBetween();
      currentHigh.current = currentGuess;
    } else if (direction === "greater") {
      generateRandomBetween();
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((prevGuesses) => [
      { id: new Date().toISOString(), value: nextNumber },
      ...prevGuesses,
    ]);
  };

  let listStyles = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listStyles = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text style={defaultStyles.titleText}>Opponent's guess </Text>
        <View style={styles.controlLandscape}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listStyles}>
          <FlatList
            contentContainerStyle={styles.list}
            data={pastGuesses}
            renderItem={renderListItem.bind(null, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.titleText}>Opponent's guess </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      {/* <ScrollView>
        {pastGuesses.map((el, idx) => (
          <Card>
            <Text key={el.id}>{el.value}</Text>
          </Card>
        ))}
      </ScrollView> */}
      <View style={listStyles}>
        <FlatList
          contentContainerStyle={styles.list}
          data={pastGuesses}
          renderItem={renderListItem.bind(null, pastGuesses.length)}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  controlLandscape: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 20,
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: "60%",
  },
  listContainerBig: {
    flex: 1,
    width: "80%",
  },
  list: {
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
