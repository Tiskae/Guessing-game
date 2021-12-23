import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";

const MainButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
    textAlign: "center",
  },
});
