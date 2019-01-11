import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet
} from "react-native";

const DayButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.image}
        onPress={() => props.onPress(props.day)}
      >
        <ImageBackground
          style={styles.image}
          source={require("./images/calendar.png")}
          resizeMode="contain"
        >
          <Text
            style={[styles.title, props.selected ? styles.titleSelected : null]}
          >
            {props.label}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    margin: 5
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 15,
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  image: {
    flex: 1
  },
  titleSelected: {
    color: "red"
  }
});

export default DayButton;
