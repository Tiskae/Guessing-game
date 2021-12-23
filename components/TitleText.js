import React from "react";
import { StyleSheet, Text } from "react-native";

const TitleText = (props) => {
  return (
    <Text style={{ ...styles.TitleText, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  TitleText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
