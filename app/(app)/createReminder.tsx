import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { ArrowLeftIcon, CalendarDays, ClockIcon } from "../../assets/icons";
import { router } from "expo-router";
import { useState } from "react";
import ColorPicker from "../../components/colorPicker";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

interface ReminderForm {
  name: string;
  description: string;
  day: Date;
  dayString: string;
  hour: Date;
  hourString: string;
  color: string | null;
}

export default function CreateReminder() {
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState<ReminderForm>({
    name: "",
    description: "",
    day: new Date(),
    dayString: "",
    hour: new Date(),
    hourString: "",
    color: "purple",
  });

  const updateField = (field: keyof ReminderForm, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDatePicker = () => setShowPicker(!showPicker);
  const toggleTimePicker = () => setShowTimePicker(!showTimePicker);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "set" && selectedDate) {
      updateField("day", selectedDate);
      updateField("dayString", selectedDate.toDateString());
    }
    setShowPicker(false);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (event.type === "set" && selectedTime) {
      updateField("hour", selectedTime);
      updateField(
        "hourString",
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    setShowTimePicker(false);
  };

  const confirmIOSDate = () => {
    updateField("dayString", formData.day.toDateString());
    toggleDatePicker();
  };

  const confirmIOSTime = () => {
    updateField(
      "hourString",
      formData.hour.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    toggleTimePicker();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      day: new Date(),
      dayString: "",
      hour: new Date(),
      hourString: "",
      color: "purple",
    });
  };

  const onPress = () => {
    console.log("Form Data:", formData);
  };

  return (
    <SafeAreaView className="h-full min-h-screen bg-white">
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
                className="font-rubik-medium flex-1 text-[22px]"
                style={{ textAlign: "center" }}
              >
                Create Reminder
              </Text>
            </View>
          </View>

          <View
            style={{ marginTop: 20 }}
            className="flex flex-col justify-center gap-8"
          >
            <InputField
              label="Reminder Name"
              value={formData.name}
              onChangeText={(text) => updateField("name", text)}
              placeholder="I want to..."
              multiline={true}
              maxLength={40}
            />

            <InputField
              label="Description (Optional)"
              value={formData.description}
              onChangeText={(text) => updateField("description", text)}
              placeholder="Type details here"
              multiline
              style={{ height: 90 }}
            />

            <DateTimeField
              label="Day"
              value={formData.dayString}
              showPicker={showPicker}
              togglePicker={toggleDatePicker}
              onChange={onDateChange}
              confirmIOS={confirmIOSDate}
              mode="date"
            />

            <DateTimeField
              label="Hour"
              value={formData.hourString}
              showPicker={showTimePicker}
              togglePicker={toggleTimePicker}
              onChange={onTimeChange}
              confirmIOS={confirmIOSTime}
              mode="time"
            />

            <ColorPicker
              selectedColor={formData.color}
              onColorChange={(color) => updateField("color", color)}
            />
          </View>

          <View
            className="flex w-full mt-10 flex-row items-center gap-4"
            style={{ justifyContent: "flex-end" }}
          >
            <TouchableOpacity
              onPress={resetForm}
              className="flex px-8 py-4 items-center bg-neutral-200 rounded-2xl"
            >
              <Text className={`text-lg font-rubik-medium text-neutral-700`}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              className="flex px-8 py-4 items-center rounded-2xl bg-neutral-700"
            >
              <Text className={`text-lg font-rubik-medium text-white`}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  style = {},
  maxLength,
}) => (
  <View className="flex flex-col justify-center gap-3">
    <Text className="font-rubik">{label}</Text>
    <View
      className="flex flex-row items-start justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-2"
      style={style}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="text-sm font-rubik text-neutral-950 flex-1"
        multiline={multiline}
        maxLength={maxLength}
      />
    </View>
  </View>
);

const DateTimeField = ({
  label,
  value,
  showPicker,
  togglePicker,
  onChange,
  confirmIOS,
  mode,
}) => (
  <View className="flex flex-col justify-center gap-3">
    <Text className="font-rubik">{label}</Text>
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-2">
      <View
        className="flex-1 flex flex-row items-center justify-start z-50"
        style={{ height: 40 }}
      >
        {showPicker && (
          <DateTimePicker
            mode={mode}
            display="spinner"
            value={new Date()}
            onChange={onChange}
            style={styles.datePicker}
            minimumDate={new Date()}
          />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View style={styles.iosPickerContainer}>
            <TouchableOpacity
              style={styles.iosPickerButton}
              activeOpacity={0.6}
              onPress={togglePicker}
            >
              <Text style={styles.iosPickerCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iosPickerButtonConfirm}
              activeOpacity={0.6}
              onPress={confirmIOS}
            >
              <Text style={styles.iosPickerConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={togglePicker}>
            <TextInput
              value={value}
              placeholder={mode === "date" ? "Tue Mar 24 2025" : "6:06PM"}
              className="text-sm font-rubik text-neutral-950 flex-1"
              editable={false}
              onPressIn={togglePicker}
            />
          </Pressable>
        )}
      </View>
      <TouchableOpacity>
        {mode === "date" ? (
          <CalendarDays style={{ padding: 12 }} />
        ) : (
          <ClockIcon style={{ padding: 12 }} />
        )}
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  view: {
    width,
    height,
    padding: 20,
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  iosPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  iosPickerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  iosPickerButtonConfirm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  iosPickerCancelText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  iosPickerConfirmText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
