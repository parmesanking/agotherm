import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as thermo from "../thermoClient";
import { setInterval } from "core-js/library/web/timers";
import moment from "moment";
import DayButton from "./DayButton";
import Slot from "./Slot";

const days = ["D", "L", "M", "M", "G", "F", "S"];
const slot1 = new Array(18).fill(false);
const slot2 = new Array(18).fill(false);
const slot3 = new Array(18).fill(false);
const slot4 = new Array(18).fill(false);
export default class Setup extends React.Component {
  state = {
    day: moment().format("d"),
    conf: null
  };

  onDaySelected(day) {
    this.setState({ day: day });
    this.onGetConf();
  }

  onSlotSelected(section, slot, value) {
    if (this.state.conf != null) {
      let day = this.state.conf.chrono.week.filter(
        d => d.day == this.state.day
      )[0];

      if (section == 0) {
        slot1[slot] = !slot1[slot];
      }
      if (section == 1) {
        slot2[slot] = !slot2[slot];
      }
      if (section == 2) {
        slot3[slot] = !slot3[slot];
      }
      if (section == 3) {
        slot4[slot] = !slot4[slot];
      }

      day.ranges = [];
      slot1.reduce((acc, cur, ix) => {
        if ((ix == slot1.length - 1 && acc > 0) || (!cur && acc > 0)) {
          if (cur && ix == slot1.length - 1) {
            acc = acc + 20;
            ix++;
          }
          day.ranges.push({ at: ix * 20 - acc, duration: acc, mode: "H" });
        } else if (cur) {
          return acc + 20;
        }
        return 0;
      }, 0);

      slot2.reduce((acc, cur, ix) => {
        if ((ix == slot2.length - 1 && acc > 0) || (!cur && acc > 0)) {
          if (cur && ix == slot2.length - 1) {
            acc = acc + 20;
            ix++;
          }
          day.ranges.push({
            at: 1440 / 4 + ix * 20 - acc,
            duration: acc,
            mode: "H"
          });
        } else if (cur) {
          return acc + 20;
          i;
        }
        return 0;
      }, 0);

      slot3.reduce((acc, cur, ix) => {
        if ((ix == slot3.length - 1 && acc > 0) || (!cur && acc > 0)) {
          if (cur && ix == slot3.length - 1) {
            acc = acc + 20;
            ix++;
          }
          day.ranges.push({
            at: 1440 / 4 * 2 + ix * 20 - acc,
            duration: acc,
            mode: "H"
          });
        } else if (cur) {
          return acc + 20;
        }
        return 0;
      }, 0);

      slot4.reduce((acc, cur, ix) => {
        if ((ix == slot4.length - 1 && acc > 0) || (!cur && acc > 0)) {
          if (cur && ix == slot4.length - 1) {
            acc = acc + 20;
            ix++;
          }
          day.ranges.push({
            at: 1440 / 4 * 3 + ix * 20 - acc,
            duration: acc,
            mode: "H"
          });
        } else if (cur) {
          return acc + 20;
        }
        return 0;
      }, 0);

      let week = this.state.conf.chrono.week.filter(
        d => d.day != this.state.day
      );
      week.push(day);
      let conf = this.state.conf;
      conf.chrono.week = week;
      thermo.doSetConf(week).then(res => res && this.setState({ conf: conf })).catch(err => console.log(err))
      ;
    }
  }

  onGetConf() {
    thermo
      .doGetConf()
      .then(conf => this.setState({ ...conf }))
      .catch(err => console.log("error getting conf"));
  }
  componentDidMount() {
    this.onGetConf();
  }
  render() {
    if (this.state.conf != null) {
      let day = this.state.conf.chrono.week.filter(
        d => d.day == this.state.day
      )[0];
      slot1.fill(false);
      slot2.fill(false);
      slot3.fill(false);
      slot4.fill(false);
      day.ranges.map(range => {
        let isON = false;
        for (let i = range.at; i < range.at + range.duration; i++) {
          if (!isON) {
            isON = range.mode === "H";
          }
          if (i % 20 == 0) {
            if (i < 1440 / 4) {
              let a = i / 20;
              slot1[a] = isON;
            }
            if (i >= 1440 / 4 && i < 1440 / 4 * 2) {
              let a = (i - 1440 / 4) / 20;
              slot2[a] = isON;
            }
            if (i >= 1440 / 4 * 2 && i < 1440 / 4 * 3) {
              let a = (i - 1440 / 4 * 2) / 20;

              slot3[a] = isON;
            }
            if (i >= 1440 / 4 * 3 && i < 1440) {
              let a = (i - 1440 / 4 * 3) / 20;
              slot4[a] = isON;
            }
            isON = false;
          }
        }
      });
    }

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.week}>
          {days.map((d, i) => (
            <DayButton
              key={i}
              day={i}
              label={d}
              selected={this.state.day == i}
              onPress={d => this.onDaySelected(d)}
            />
          ))}
        </View>
        <View style={styles.timeslots}>
          {slot1.map((e, i) => (
            <Slot
              key={i}
              id={i}
              selected={e}
              section={0}
              onPress={(section, slot, value) =>
                this.onSlotSelected(section, slot, value)
              }
            />
          ))}
        </View>
        <View style={styles.timeslots}>
          {slot2.map((e, i) => (
            <Slot
              key={i}
              id={i}
              selected={e}
              section={1}
              onPress={(section, slot, value) =>
                this.onSlotSelected(section, slot, value)
              }
            />
          ))}
        </View>
        <View style={styles.timeslots}>
          {slot3.map((e, i) => (
            <Slot
              key={i}
              id={i}
              selected={e}
              section={2}
              onPress={(section, slot, value) =>
                this.onSlotSelected(section, slot, value)
              }
            />
          ))}
        </View>
        <View style={styles.timeslots}>
          {slot4.map((e, i) => (
            <Slot
              key={i}
              id={i}
              selected={e}
              section={3}
              onPress={(section, slot, value) =>
                this.onSlotSelected(section, slot, value)
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  },
  week: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    height: 60
  },
  timeslots: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 50
  }
});
