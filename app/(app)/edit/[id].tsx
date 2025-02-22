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
import { ArrowLeftIcon, CalendarDays, ClockIcon } from "../../../assets/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorPicker from "../../../components/colorPicker";

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

export default function EditReminder() {
  // Get the id from route parameters
  const { id } = useLocalSearchParams<{ id: string }>();

  // In a real app, fetch the reminder based on id.
  // For demo, we simulate with dummy data:
  const dummyReminder: ReminderForm = {
    name: "Meeting with Team",
    description: "Discuss project updates",
    day: new Date(),
    dayString: new Date().toDateString(),
    hour: new Date(),
    hourString: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    color: "purple",
  };

  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formData, setFormData] = useState<ReminderForm>(dummyReminder);

  // If you were fetching data from an API or state store, you might load it here:
  useEffect(() => {
    // Example: fetchReminder(id) and then setFormData(data)
    // For demo, we assume dummyReminder is loaded.
    console.log("Editing reminder with id:", id);
  }, [id]);

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
    // Reset back to the loaded reminder data (or empty if you prefer)
    setFormData(dummyReminder);
  };

  const goBack = () => router.back();

  const onPressUpdate = () => {
    // Handle updating the reminder (save to state, call API, etc.)
    console.log("Updated Form Data:", formData);
    // Then navigate back or show a success message.
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
              <TouchableOpacity onPress={goBack}>
                <ArrowLeftIcon className="size-14" style={{ padding: 14 }} />
              </TouchableOpacity>
              <Text
                className="font-rubik-medium flex-1 text-[22px]"
                style={{ textAlign: "center" }}
              >
                Edit Reminder
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
              onPress={goBack}
              className="flex px-8 py-4 items-center bg-neutral-200 rounded-2xl"
            >
              <Text className={`text-lg font-rubik-medium text-neutral-700`}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressUpdate}
              className="flex px-8 py-4 items-center rounded-2xl bg-neutral-700"
            >
              <Text className={`text-lg font-rubik-medium text-white`}>
                Update
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
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  style?: any;
  maxLength?: number;
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
}: {
  label: string;
  value: string;
  showPicker: boolean;
  togglePicker: () => void;
  onChange: (event: any, selectedDate: Date | undefined) => void;
  confirmIOS: () => void;
  mode: "date" | "time";
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
