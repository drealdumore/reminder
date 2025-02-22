import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
const { width, height } = Dimensions.get("window");

import { router, useLocalSearchParams } from "expo-router";

import images from "@/constants/images";
import { ArrowLeftIcon } from "../../../assets/icons";

export default function ReminderDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const onPress = () => console.log("on press ✅✅");

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
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
                Reminder Details
              </Text>
            </View>
          </View>

          <View
            style={{ marginTop: 20 }}
            className="flex flex-col justify-center gap-8"
          >
            <View className="flex flex-row justify-center mt-5">
              <View className="flex flex-col items-center relative mt-5">
                <Image
                  source={images.barChart}
                  className="size-44 rounded-full mb-8"
                />
              </View>
            </View>
          </View>

          <View
            style={{ marginTop: 20 }}
            className="flex flex-col justify-center gap-8 "
          >
            <View className="flex flex-col gap-4 mt-5 px-8 py-8 bg-neutral-200 rounded-2xl ">
              <View className="flex flex-col gap-2 p-4">
                <Text className="font-rubik text-neutral-600">
                  Reminder Name
                </Text>
                <Text className="font-rubik-medium text-xl text-neutral-800">
                  Send the project
                </Text>
              </View>

              <View className="flex flex-col gap-2 p-4">
                <Text className="font-rubik text-neutral-600">Description</Text>
                <Text className="font-rubik-medium text-xl text-neutral-800">
                  Send the project ASAP...
                </Text>
              </View>

              <View className="flex flex-col gap-2 p-4">
                <Text className="font-rubik text-neutral-600">Day & Hour</Text>
                <View className="flex flex-row gap-4 items-center">
                  <Text className="font-rubik-medium text-xl text-neutral-800">
                    12 February 2025
                  </Text>
                  <Text className="font-rubik-medium text-xl text-neutral-800">
                    10:00AM
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            className="flex w-full mt-10 flex-row items-center  gap-4"
            style={{ justifyContent: "flex-end" }}
          >
            <TouchableOpacity
              onPress={onPress}
              className="flex px-8 py-4 items-center   bg-neutral-200 rounded-2xl"
            >
              <Text className={`text-lg font-rubik-medium text-neutral-700`}>
                Delete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              className="flex px-8 py-4 items-center  rounded-2xl bg-neutral-800"
            >
              <Text className={`text-lg font-rubik-medium text-white`}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width,
    height,
    padding: 20,
  },
});
