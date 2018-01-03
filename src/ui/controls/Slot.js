import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Slot = props => {
  return (
    <TouchableOpacity style={{ flex: 1}} onPress={() => props.onPress(props.section, props.id, !props.selected)}>
    <View
      style={[styles.slot, props.selected ? styles.slotFull : styles.slotEmpty]}
    >
        <Text style={[styles.hour, ! props.selected && styles.hourDark]}>
          {props.id % 3 == 0 &&
            `${(props.section * 6 * 60 + props.id * 20) / 60}`}
        </Text>
    </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slot: {
    borderWidth: 1,
    borderColor: "green",
    flex: 1,
    marginLeft: 1,
    marginRight: 1
  },
  slotEmpty: {
    backgroundColor: "transparent"
  },
  slotFull: {
    backgroundColor: "green"
  },
  hour: {
    color: "#FFF",
    alignSelf: "center",
    fontSize: 10,
    alignItems: "center",
    justifyContent: 'center', 
    fontWeight: "bold"
  }, 
  hourDark: {
    color: '#838383'
  }
});

export default Slot;
