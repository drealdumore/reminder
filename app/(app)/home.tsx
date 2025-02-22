import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { Plus, SettingIcon, SearchIcon } from "../../assets/icons";
import { useLocalSearchParams, router, Link, Redirect } from "expo-router";
import { useState, useMemo } from "react";
import Reminders from "../../components/reminders";
import NoReminder from "../../components/noReminder";
import images from "../../constants/images"; // Import images
import { reminderData } from "../../constants/data";

const { width } = Dimensions.get("window");

export default function Home() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");
  const [filter, setFilter] = useState("all"); 

  const debouncedSearch = (text: string) => {
    router.setParams({ query: text });
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredReminders = useMemo(() => {
    return reminderData.filter((reminder) => {
      const matchesSearch = reminder.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" || (filter === "today" && reminder.isToday); // FIX THIS ERROR
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const hasReminders = reminderData.length > 0;

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          <View className="flex justify-between flex-row items-center pt-8">
            <View className="flex gap-4 items-center flex-row justify-center">
              <Pressable onPress={() => router.push("/settings")}>
                <SettingIcon className="size-14" />
              </Pressable>

              <Text className="font-rubik-medium text-[22px]">Reminder</Text>
            </View>

            <TouchableOpacity className="bg-neutral-700 flex cursor-pointer items-center justify-center rounded-2xl ">
              <Link href={"/createReminder"}>
                <View
                  className="bg-neutral-700 text-white rounded-xl flex items-center justify-center"
                  style={{ paddingHorizontal: 5, paddingVertical: 5 }}
                >
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
                className="text-sm font-rubik text-neutral-950 ml-2 flex-1"
              />
            </View>

            <TouchableOpacity>
              <SearchIcon className="size-5" />
            </TouchableOpacity>
          </View>

          <View className="flex w-full mt-10 flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => handleFilterChange("all")}
              className={`flex px-8 py-3 items-center rounded-2xl ${
                filter === "all" ? "bg-neutral-700" : "bg-neutral-200"
              }`}
            >
              <Text
                className={`text-lg font-rubik-medium ${
                  filter === "all" ? "text-white" : "text-neutral-700"
                }`}
              >
                All reminders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFilterChange("today")}
              className={`flex px-8 py-3 items-center rounded-2xl ${
                filter === "today" ? "bg-neutral-700" : "bg-neutral-200"
              }`}
            >
              <Text
                className={`text-lg font-rubik-medium ${
                  filter === "today" ? "text-white" : "text-neutral-700"
                }`}
              >
                Today
              </Text>
            </TouchableOpacity>
          </View>

          {hasReminders ? (
            filteredReminders.length > 0 ? (
              <Reminders reminderData={filteredReminders} />
            ) : (
              <NoReminder
                message={
                  filter === "today"
                    ? "No reminders for today"
                    : "No reminders found for your search"
                }
                imageSource={images.noResult}
              />
            )
          ) : (
            <NoReminder
              message="You have not yet created a reminder"
              imageSource={images.noResult}
            />
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  view: {
    flex: 1,
    width,
    padding: 20,
  },
});
