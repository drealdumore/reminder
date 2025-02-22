import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MenuIcon, Plus, Right, SettingIcon } from "../../assets/icons";
import icons from "../../constants/icons";
import { useLocalSearchParams, router, Link, Redirect } from "expo-router";
import { useState } from "react";
import Reminders from "../../components/reminders";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = (text: string) => {
    router.setParams({ query: text });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const onPress = () => console.log("on press ✅✅");

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerClassName="min-h-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.view} className="w-full">
          <View className="flex justify-between flex-row items-center pt-8">
            <View className="flex gap-4 items-center flex-row justify-center">
              <SettingIcon className="size-14" />

              <Text className="font-rubik-medium text-[24px]">Reminder</Text>
            </View>

            <TouchableOpacity className="bg-neutral-800 flex cursor-pointer items-center justify-center rounded-2xl ">
              <Link href={"/createReminder"}>
                <View className="bg-neutral-700 text-white rounded-xl size-12 flex items-center justify-center">
                  <Plus className="size-14 text-3xl" />
                </View>
              </Link>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
            <View className="flex-1 flex flex-row items-center justify-start z-50">
              <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="Search"
                maxLength={25}
                className="text-sm font-rubik text-neutral-950 ml-2 flex-1 "
              />
            </View>

            <TouchableOpacity>
              <Image source={icons.search} className="size-5" />
            </TouchableOpacity>
          </View>

          <View className="flex w-full mt-10 flex-row items-center gap-4">
            <TouchableOpacity
              onPress={onPress}
              className="flex px-8 py-3 items-center  rounded-2xl bg-neutral-800"
            >
              <Text className={`text-lg font-rubik-medium text-white`}>
                All reminders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPress}
              className="flex px-8  py-3 items-center   bg-neutral-200 rounded-2xl"
            >
              <Text className={`text-lg font-rubik-medium text-neutral-700`}>
                Today
              </Text>
            </TouchableOpacity>
          </View>

          <Reminders />
          {/* <NoReminder /> */}
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
