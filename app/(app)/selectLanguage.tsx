import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Right } from "../../assets/icons";
import images from "../../constants/images";
import { Redirect, router } from "expo-router";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const languages = ["Turkish", "English", "French"];

interface LanguageItemProps {
  title?: string;
  selected: boolean;
  onPress?: () => void;
}

const LanguageItem = ({ title, selected, onPress }: LanguageItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex flex-row w-full px-8 py-4 items-center justify-between rounded-md ${
      selected ? "bg-[#404040]" : "bg-neutral-200"
    }`}
  >
    <View className="flex flex-row items-center gap-3 w-full justify-center">
      <Text
        className={`text-lg font-rubik-medium ${
          selected ? "text-white" : "text-neutral-700"
        }`}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function SelectLanguage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    "English"
  );

  return (
    <View
      style={styles.view}
      className="relative flex justify-between flex-col items-center"
    >
      <View className="flex flex-row justify-center mt-5">
        <View className="flex flex-col items-center relative mt-5">
          <Image source={images.avatar} className="size-44 rounded-full mb-8" />
        </View>
      </View>
      <View>
        <Text className="font-rubik font-semibold text-[22px] text-center">
          Please select language
        </Text>
      </View>

      <View className="flex flex-col mt-10 gap-4">
        {languages.map((item, i) => (
          <LanguageItem
            title={item}
            key={i}
            selected={selectedLanguage === item}
            onPress={() => setSelectedLanguage(item)}
          />
        ))}
      </View>

      <TouchableOpacity
        className="bg-neutral-700 flex items-center justify-center rounded-2xl absolute right-10 bottom-20"
        onPress={() => router.push("/home")}
      >
        <View className="bg-neutral-700 text-white rounded-xl size-12 flex items-center justify-center">
          <Right />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
