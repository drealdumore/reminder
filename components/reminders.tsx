import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";

import {
  CalendarDays,
  ClockIcon,
  Threedots,
  NotificationIcon,
} from "../assets/icons";

import Animated, { LinearTransition } from "react-native-reanimated"


import { router } from "expo-router";

import { Reminder } from "../constants/data";

const Reminders = ({ reminderData }: { reminderData: Reminder[] }) => {


  const handlePress = (id: string | number) => {
    router.push(`/reminders/${id}`);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      contentContainerClassName="flex-1"
      horizontal
    >
      <Animated.View style={styles.container} >
        {reminderData.map((reminder, i) => (
          <ReminderItem
            key={Math.random()}
            title={reminder.title}
            date={reminder.date}
            time={reminder.time}
            onPress={() => handlePress(i + 1)}
          />
        ))}
      </Animated.View>

      {/* <Animated.FlatList data={reminderData} renderItem={ReminderItem} keyExtractor={reminder => reminder.date} itemLayoutAnimation={LinearTransition} keyboardDismissMode="on-drag" /> */}
    </ScrollView>
  );
};

const ReminderItem = ({
  title,
  date,
  time,
  onPress,
}: {
  title?: string;
  date?: string;
  time?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.reminderItem, { backgroundColor: "#f1f1f1" }]}
  >
    <View style={styles.reminderContent}>
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <NotificationIcon style={styles.sendIcon} fill={"#f1f1f1"} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={0}>
            {title}
          </Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <CalendarDays />
              <Text style={styles.infoText}>{date}</Text>
            </View>
            <View style={styles.infoItem}>
              <ClockIcon />
              <Text style={styles.infoText}>{time}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.moreIconContainer}>
        <Threedots />
      </View>
    </View>
  </TouchableOpacity>
);

export default Reminders;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 32,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  reminderItem: {
    width: "100%",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  reminderContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 999,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    padding: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontFamily: "Rubik-Medium",
    color: "#4a4a4a",
    flexWrap: "wrap",
  },
  infoRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#4a4a4a",
  },
  moreIconContainer: {
    paddingRight: 4,
  },
});
