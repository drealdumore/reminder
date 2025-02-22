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
import React, { useState } from "react";

const { width, height } = Dimensions.get("window");

interface SettingsItemProps {
  label: string;
  rightText?: string;
  isSwitch?: boolean;
  initialSwitchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
}

const SettingsItem = ({
  label,
  rightText,
  isSwitch = false,
  initialSwitchValue = false,
  onSwitchChange,
  onPress,
}: SettingsItemProps) => {
  const [switchValue, setSwitchValue] = useState(initialSwitchValue);

  const toggleSwitch = () => {
    setSwitchValue((prev) => {
      const newValue = !prev;
      if (onSwitchChange) {
        onSwitchChange(newValue);
      }
      return newValue;
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={styles.itemContainer}
    >
      <View style={styles.itemContent}>
        <Text style={styles.label}>{label}</Text>
        {isSwitch ? (
          <Switch
            trackColor={{ false: "#767577", true: "#000" }}
            thumbColor={switchValue ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={switchValue}
          />
        ) : (
          <Text style={styles.rightText}>{rightText}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function Settings() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.view}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeftIcon style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <View style={styles.itemsContainer}>
            <SettingsItem label="Language" rightText="English" />
            <SettingsItem
              label="Reminder Notification Sound"
              rightText="Default"
            />
            <SettingsItem
              label="Show Description in Notifications"
              isSwitch
              initialSwitchValue={false}
            />
            <SettingsItem
              label="Show Past Reminders"
              isSwitch
              initialSwitchValue={false}
            />
            <SettingsItem
              label="Sort By Time"
              isSwitch
              initialSwitchValue={false}
            />
            <SettingsItem label="Version" rightText="1.3.1" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  view: {
    width,
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  backIcon: {
    padding: 14,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Rubik-Medium",
  },
  itemsContainer: {
    marginTop: 20,
  },
  itemContainer: {
    height: 60,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    borderWidth: 1,
    borderColor: "#0061FF0A",
    marginBottom: 16,
    justifyContent: "center",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: "#1F2937",
    fontWeight: "900",
  },
  rightText: {
    fontSize: 14,
    fontFamily: "Rubik",
    color: "#1F2937",
  },
});
