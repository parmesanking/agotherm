import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as thermo from "../thermoClient";
import { setInterval } from "core-js/library/web/timers";
import moment from "moment";
import "moment/locale/it";
import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export default class Clima extends React.Component {
  state = {
    poller: null,
    temperature: "-",
    status: "-",
    error: "", 
    orientation:'LANDSCAPE'
  };

  componentDidMount() {
    this.onGetStatus();
    let poller = setInterval(this.onGetStatus, 5000);
    this.setState({ poller });
  }
  componentWillUnmount() {
    this.clearInterval(this.state.poller);
  }

  onGetStatus = () => {
    console.log("Reading stat...");
    thermo
      .doGetStatus()
      .then(res => this.setState({ error: "", lastCheckOn: moment(), ...res }))
      .catch(err =>
        this.setState({ error: "Error reading status", lastCheckOn: moment() })
      );
  };

  onToggleStatus = () => {
    Alert.alert(
      "Controllo manuale",
      `${this.state.status === "ON" ? "Spegnere" : "Accendere"} la caldaia?`,
      [
        {
          text: "OK",
          onPress: () =>
            thermo
              .doManual(!(this.state.status === "ON"))
              .then(res => console.log(res))
        },
        { text: "Cancel", onPress: () => {}, style: "cancel" }
      ]
    );
  };

  _onLayout = event =>{
    const {width, height}= event.nativeEvent.layout
    this.setState({orientation: width>height ? 'LANDSCAPE':'PORTRAIT' })
  }

  render() {
    return (
      this.state.lastCheckOn != null && (
        <SafeAreaView
          style={[
            styles.container,
            this.state.error === ""
              ? styles.containerNoErr
              : styles.containerErr
          ]}
          onLayout={this._onLayout}
        >
          <TouchableOpacity onPress={() => this.onToggleStatus()}>
            <View style={[styles.button, styles[`button${this.state.orientation}`]]}>
              <Ionicons
                name="ios-thermometer"
                size={this.state.orientation === 'LANDSCAPE' ? 38: 44}
                color={this.state.status === "ON" ? "green" : "red"}
                adjustsFontSizeToFit={true}
              />
              <View style={{ margin: 10 }} />
              <Text style={styles.buttonText} adjustsFontSizeToFit={true}>
                {this.state.temperature}
              </Text>
            </View>
          </TouchableOpacity>
          <Text>
            {moment(this.state.timestamp)
              .locale("it")
              .format("LL LTS")}
          </Text>
        </SafeAreaView>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerNoErr: {
    backgroundColor: "#fff"
  },
  containerErr: {
    backgroundColor: "red"
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 15,
    borderColor: "#48A0B4",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: normalize(28),
    fontWeight: "bold"
  },
  buttonPORTRAIT:{
    flex: 0.25
  },
  buttonLANDSCAPE:{
    flex: 0.35
  }
});
