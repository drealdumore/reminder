
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
} from "react-native";
import { ArrowLeftIcon } from "../../assets/icons";
import { router } from "expo-router";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <View style={styles.view} className="w-full">
          <View
            className="flex justify-between flex-row items-center mt-8"
            style={{ marginTop: 12 }}
          >
            <View className="flex gap-4 items-center flex-row w-full">
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeftIcon className="size-14" style={{ padding: 14 }} />
              </TouchableOpacity>

              <Text
                className="font-rubik-medium flex-1 text-[24px]"
                style={{ textAlign: "center" }}
              >
                Settings
              </Text>
            </View>
          </View>

          <View
            style={{ marginTop: 20 }}
            className="flex flex-col justify-center gap-8"
          >
            <View className="flex flex-col justify-center gap-3">
              <View
                className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-4"
                style={{ height: 60 }}
              >
                <View className="flex-1 flex flex-row items-center justify-between z-50">
                  <Text className="text-sm font-rubik text-neutral-950   ">
                    Language
                  </Text>
                  <Text className="text-sm font-rubik text-neutral-950   ">
                    English
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <View
                className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-4"
                style={{ height: 60 }}
              >
                <View className="flex-1 flex flex-row items-center justify-between z-50">
                  <Text className="text-sm font-rubik text-neutral-950">
                    Reminder Notification Sound
                  </Text>
                  <Text className="text-sm font-rubik text-neutral-950   ">
                    Default
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <View
                className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-4"
                style={{ height: 60 }}
              >
                <View className="flex-1 flex flex-row items-center justify-between z-50">
                  <Text className="text-sm font-rubik text-neutral-950">
                    Show Description in Notifications
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <View
                className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-4"
                style={{ height: 60 }}
              >
                <View className="flex-1 flex flex-row items-center justify-between z-50">
                  <Text className="text-sm font-rubik text-neutral-950">
                    Show Past Reminders
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <View
                className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-4"
                style={{ height: 60 }}
              >
                <View className="flex-1 flex flex-row items-center justify-between z-50">
                  <Text className="text-sm font-rubik text-neutral-950">
                    Sort By Time
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <View
                className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-4"
                style={{ height: 60 }}
              >
                <View className="flex-1 flex flex-row items-center justify-between z-50">
                  <Text className="text-sm font-rubik text-neutral-950   ">
                    Version
                  </Text>
                  <Text className="text-sm font-rubik text-neutral-950   ">
                    1.3.1
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    width,
    height,
    padding: 20,
  },
});
