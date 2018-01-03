import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as thermo from "../thermoClient";
import { setInterval } from "core-js/library/web/timers";
import moment from "moment";
import "moment/locale/it";

export default class Clima extends React.Component {
  state = {
    poller: null,
    temperature: "-",
    status: "-",
    error: ""
  };

  componentDidMount() {
    this.onGetStatus();
    let poller = setInterval(this.onGetStatus, 5000);
    this.setState({ poller });
  }
  c;
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

  render() {
    return (
      this.state.lastCheckOn != null && (
        <View
          style={[
            styles.container,
            this.state.error === ""
              ? styles.containerNoErr
              : styles.containerErr
          ]}
        >
          <TouchableOpacity onPress={() => this.onToggleStatus()}>
            <View style={styles.button}>
              <Ionicons
                name="ios-thermometer-outline"
                size={64}
                color={this.state.status === "ON" ? "green" : "red"}
              />
              <View style={{ margin: 10 }} />
              <Text style={styles.buttonText}>{this.state.temperature}</Text>
            </View>
          </TouchableOpacity>
          <Text>
            {moment(this.state.timestamp)
              .locale("it")
              .format("LL LTS")}
          </Text>
        </View>
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
    flex: 0.25,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    padding: 15,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 32,
    fontWeight: "bold"
  }
});
