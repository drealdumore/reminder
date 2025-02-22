import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { ArrowLeftIcon, CalendarDays, ClockIcon } from "../../assets/icons";
import { router } from "expo-router";
import { useState } from "react";
import ColorPicker from "../../components/colorPicker";

const { width, height } = Dimensions.get("window");

interface ReminderForm {
  name: string;
  description: string;
  day: string;
  hour: string;
  color: string | null;
}

export default function Home() {
  const [formData, setFormData] = useState<ReminderForm>({
    name: "",
    description: "",
    day: "",
    hour: "",
    color: "purple",
  });

  const updateField = (field: keyof ReminderForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                className="font-rubik-medium flex-1 text-[24px]"
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
            <View className="flex flex-col justify-center gap-3">
              <Text className="font-rubik">Reminder Name</Text>

              <View className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-2">
                <View className="flex-1 flex flex-row items-center justify-start z-50">
                  <TextInput
                    value={formData.name}
                    onChangeText={(text) => updateField("name", text)}
                    placeholder="I want to..."
                    maxLength={35}
                    className="text-sm font-rubik text-neutral-950 flex-1"
                  />
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <Text className="font-rubik">Description (Optional)</Text>

              <View
                className="flex flex-row items-start justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-2"
                style={{ height: 90 }}
              >
                <View className="flex-1 flex flex-row items-center justify-start z-50">
                  <TextInput
                    value={formData.description}
                    onChangeText={(text) => updateField("description", text)}
                    placeholder="Type details here"
                    className="text-sm font-rubik text-neutral-950 flex-1 flex-wrap"
                    textBreakStrategy={"highQuality"}
                    lineBreakStrategyIOS={"standard"}
                    multiline
                  />
                </View>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <Text className="font-rubik">Day</Text>

              <View className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-2">
                <View className="flex-1 flex flex-row items-center justify-start z-50">
                  <TextInput
                    value={formData.day}
                    onChangeText={(text) => updateField("day", text)}
                    placeholder="12.04.2025"
                    maxLength={35}
                    className="text-sm font-rubik text-neutral-950 flex-1"
                  />
                  {/* <DatePicker/> */}
                </View>

                <TouchableOpacity>
                  <CalendarDays style={{ padding: 12 }} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex flex-col justify-center gap-3">
              <Text className="font-rubik">Hour</Text>

              <View className="flex flex-row items-center justify-between w-full px-4 rounded-2xl bg-neutral-200 border border-primary-100 py-2">
                <View className="flex-1 flex flex-row items-center justify-start z-50">
                  <TextInput
                    value={formData.hour}
                    onChangeText={(text) => updateField("hour", text)}
                    placeholder="10:00"
                    maxLength={35}
                    className="text-sm font-rubik text-neutral-950 flex-1"
                  />
                </View>

                <TouchableOpacity>
                  <ClockIcon style={{ padding: 12 }} />
                </TouchableOpacity>
              </View>
            </View>

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
              onPress={() => {
                // Reset form data
                setFormData({
                  name: "",
                  description: "",
                  day: "",
                  hour: "",
                  color: "purple",
                });
              }}
              className="flex px-8 py-4 items-center bg-neutral-200 rounded-2xl"
            >
              <Text className={`text-lg font-rubik-medium text-neutral-700`}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              className="flex px-8 py-4 items-center rounded-2xl bg-neutral-800"
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

const styles = StyleSheet.create({
  view: {
    width,
    height,
    padding: 20,
  },
});
