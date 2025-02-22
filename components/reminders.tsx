import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

import { CalendarDays, ClockIcon, Send, Threedots } from "../assets/icons";
import { router } from "expo-router";
import { reminderData } from "../constants/data";

const Reminders = () => {
  const handlePress = (id: string | number) => {
    console.log("routing...");
    // router.push(`/properties/${id}`);
    router.push(`/reminders/${id}`);
  };
  return (
    <ScrollView
      contentContainerClassName="min-h-screen"
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{ paddingBottom: 32, height: "auto" }}
    >
      <View className="flex flex-row justify-center mt-5">
        <View className="flex flex-col items-center relative mt-5 gap-4">
          {reminderData.map((reminder, i) => (
            <ReminderItem
              key={i}
              title={reminder.title}
              date={reminder.date}
              time={reminder.time}
              onPress={() => handlePress(i)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Reminders;

const ReminderItem = ({
  title,
  date,
  time,
  bg,
  onPress,
}: {
  title?: string;
  date?: string;
  time?: string;
  bg?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex flex-row w-full items-start  bg-neutral-200 rounded-2xl`}
    style={{ padding: 12 }}
  >
    <View className="flex flex-row items-start gap-3 w-full justify-between">
      <View className="flex gap-4 flex-row">
        <View
          className="rounded-full bg-white"
          style={{
            padding: 15,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Send style={{ padding: 12 }} />
        </View>

        <View className="flex justify-center flex-col">
          <Text className={`text-lg font-rubik-medium text-neutral-700`}>
            {title}
          </Text>
          <View className="flex flex-row gap-3 mt-2">
            <View className="flex flex-row gap-2 items-center">
              <CalendarDays />
              <Text className="text-sm">{date}</Text>
            </View>
            <View className="flex flex-row gap-2  items-center">
              <ClockIcon />
              <Text className="text-sm">{time}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingRight: 4 }}>
        <Threedots />
      </View>
    </View>
  </TouchableOpacity>
);
