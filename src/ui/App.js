import React from "react";
import Clima from "./controls/Clima";
import Setup from "./controls/Setup";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
/*
const Tabs = TabNavigator({
  Clima: {
    screen: Clima,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-bonfire" size={32} color={tintColor} />
      ),
    },
  },
  Setup: {
    screen: Setup,
    navigationOptions: {
      tabBarLabel: "Setup",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-settings" size={32} color={tintColor} />
      ),
    },
  },
});
*/
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Clima}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="ios-bonfire" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Setup"
            component={Setup}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name="ios-settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
