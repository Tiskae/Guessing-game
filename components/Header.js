import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

import colors from "../constants/colors";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText
        style={Platform.select({
          ios: styles.headerTitleIOS,
          android: styles.headerTitleAndroid,
        })}
      >
        Guess a number
      </TitleText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerBase: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerIOS: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  headerAndroid: {
    backgroundColor: colors.primary,
  },
  headerTitleIOS: {
    color: colors.primary,
  },
  headerTitleAndroid: {
    color: "white",
  },
});
