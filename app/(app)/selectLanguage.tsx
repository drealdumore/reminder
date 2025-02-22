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
  onPress?: () => void;
}

const LanguageItem = ({ title, onPress }: LanguageItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className=" flex flex-row w-full px-8 py-4 items-center justify-between  bg-neutral-200 rounded-md"
    // change the bg color to #404040 and text collor to white when language is selected
  >
    <View className="flex flex-row items-center gap-3 w-full justify-center">
      <Text className={`text-lg font-rubik-medium text-neutral-700`}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function SelectLanguage() {
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect href="/home" />;

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
        <Text className="font-rubik font-semibold text-[24px] text-center">
          Please select language
        </Text>
      </View>

      <View className="flex flex-col mt-10 gap-4">
        {languages.map((item, i) => (
          <LanguageItem title={item} key={i} />
        ))}
      </View>

      <TouchableOpacity
        className="bg-neutral-800 flex items-center justify-center rounded-2xl absolute right-10 bottom-20 "
        onPress={() => router.push("/home")}
        // onPress={() => setRedirect(true)}
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
