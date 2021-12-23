import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import NumberContainer from "../components/NumberComponent";
import BodyText from "../components/BodyText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOver = (props) => {
  return (
    // <SafeAreaView>
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignContent: "center" }}>
      <View style={styles.screen}>
        <NumberContainer>The game is over</NumberContainer>
        <View style={styles.imageContainer}>
          <Image
            // source={require("../assets/success.png")}
            source={{
              uri: "https://images.wallpapersden.com/image/download/ford-mustang-drift-racing_bWVnZ2iUmZqaraWkpJRnbW1lrWZtZWU.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.summary}>
          <BodyText style={styles.summaryText}>
            It took your phone{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 40,
  },
  summary: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
    justifyContent: "center",
  },
  summaryText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: Dimensions.get("window").width < 400 ? 16 : 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
});
