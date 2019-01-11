import React from "react";
import Clima from "./controls/Clima"
import Setup from "./controls/Setup"
import {TabNavigator} from 'react-navigation'
import { Ionicons } from "@expo/vector-icons";



const Tabs = TabNavigator({
  Clima: {
    screen: Clima, 
    navigationOptions:{
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <Ionicons name="ios-bonfire" size={32} color={tintColor} /> 
    }
  },
  Setup: {
    screen: Setup,
    navigationOptions:{
      tabBarLabel: 'Setup',
      tabBarIcon: ({tintColor}) => <Ionicons name="ios-settings" size={32} color={tintColor} /> 
    }
  },
  });

export default class App extends React.Component {
  render() {
    return (
      <Tabs />
    );
  }
}
