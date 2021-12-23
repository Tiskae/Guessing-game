import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from "react-native";

import Input from "../components/Input";
import colors from "../constants/colors";
import NumberContainer from "../components/NumberComponent";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");

  // UI updates on orientation change
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const numberInputHandler = (inputText) =>
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));

  // Proper style update on change in Dimensions
  useEffect(() => {
    const updateLayout = () =>
      setButtonWidth(Dimensions.get("window").width / 4);

    Dimensions.addEventListener("change", updateLayout);
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue("");
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number",
        "Number has to be a number between 1 and 99 inclusive",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    Keyboard.dismiss();
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
  };

  let confirmedOutput = null;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected:</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStart(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30000}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start new game</Text>
            <Card style={styles.inputContainer}>
              <Text style={styles.cardText}>Select a number</Text>
              <Input
                style={styles.input}
                placeholder="Enter your secret number"
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.btnContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={colors.accent}
                    title="Reset"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={colors.primary}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cardText: {},
  input: {
    width: 150,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
