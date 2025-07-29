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
  RefreshControl,
} from "react-native";
import { Plus, SettingIcon, SearchIcon } from "../../assets/icons";
import { useLocalSearchParams, router, Link, Redirect } from "expo-router";
import { useState, useMemo } from "react";
import Reminders from "../../components/reminders";
import NoReminder from "../../components/noReminder";
import images from "../../constants/images";
import { reminderData } from "../../constants/data";
import { format, isValid, parse } from "date-fns";

const { width } = Dimensions.get("window");

export default function Home() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");
  const [filter, setFilter] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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
    const today = format(new Date(), "EEE MMM dd yyyy");

    // First, filter reminders based on the search term
    const searchFilteredReminders = reminderData.filter((reminder) =>
      reminder.title.toLowerCase().includes(search.toLowerCase())
    );

    // If there is a search term, return the search results
    if (search) {
      return searchFilteredReminders;
    }

    // Otherwise, apply the date-based filter to all reminders
    return reminderData.filter((reminder) => {
      const reminderDateTime = new Date(`${reminder.date} ${reminder.time}`);
      const isValidDate = isValid(reminderDateTime);
      return (
        filter === "all" ||
        (filter === "today" &&
          isValidDate &&
          format(reminderDateTime, "EEE MMM dd yyyy") === today) ||
        (filter === "passed" && isValidDate && reminderDateTime < new Date())
      );
    });
  }, [search, filter]);

  const hasReminders = reminderData.length > 0;

  // THIS SHOULD REFRESH AND GET MORE REMINDERS IF MORE OR STH LIKE THAT
  const onRefresh = () => {
    setRefreshing(true);
    filteredReminders;
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#404040"]}
          />
        }
      >
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

          <View
            className={`flex flex-row rounded-2xl items-center border justify-between w-full px-4 mt-5 py-2 ${
              isFocused
                ? "bg-neutral-200 border-neutral-400"
                : "bg-[#f1f1f1] border-primary-100"
            }`}
          >
            <View className="flex-1 flex flex-row items-center justify-start z-50">
              <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="Search"
                maxLength={25}
                className="text-sm font-rubik text-neutral-950 ml-2 flex-1"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <TouchableOpacity>
              <SearchIcon className="size-5" />
            </TouchableOpacity>
          </View>

          <View className="flex w-full mt-10 flex-row items-center gap-2">
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

            <TouchableOpacity
              onPress={() => handleFilterChange("passed")}
              className={`flex px-8 py-3 items-center rounded-2xl ${
                filter === "passed" ? "bg-neutral-700" : "bg-neutral-200"
              }`}
            >
              <Text
                className={`text-lg font-rubik-medium ${
                  filter === "passed" ? "text-white" : "text-neutral-700"
                }`}
              >
                Passed
              </Text>
            </TouchableOpacity>
          </View>

          {hasReminders ? (
            filteredReminders.length > 0 ? (
              <Reminders reminderData={filteredReminders} />
            ) : (
              <NoReminder
                message={
                  search
                    ? "No reminders found for your search"
                    : filter === "today"
                    ? "No reminders for today"
                    : filter === "passed"
                    ? "No passed reminders found"
                    : "No reminders found"
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
