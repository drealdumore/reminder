import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Right } from "../assets/icons";
import { Redirect } from "expo-router";
import Animated from "react-native-reanimated"

const { width, height } = Dimensions.get("window");

const slides: Array<{
  id: string;
  // image: any;
  title: string;
}> = [
  {
    id: "1",
    // image: assets.gameNight,
    title: "Use your time more efficiently with Reminder",
  },
  {
    id: "2",
    // image: assets.timeManagement,
    title: "Don't miss important appointments, meetings and events",
  },
  {
    id: "3",
    // image: assets.noTime,
    title: "Organize your life with Reminder",
  },
];

export default function OnboardingScreens() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const index = viewableItems[0]?.index;
      if (index !== null && index !== undefined) {
        setCurrentIndex(index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setRedirect(true);
    }
  };

  if (redirect) return <Redirect href="/selectLanguage" />;

  const renderSlide = ({
    item,
  }: {
    item: { id: string; image: string; title: string; subtitle: string };
  }) => {
    return (
      <View
        style={styles.slide}
        className="relative flex justify-between flex-col items-center"
      >
        {/* <Image source={{uri: item.image}} style={styles.image} /> */}
        <View style={styles.textContainer}>
          <Text style={styles.title} className="font-rubik text-[10px]">
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-neutral-700 flex items-center justify-center rounded-2xl absolute right-10 bottom-20 "
          onPress={scrollTo}
        >
          <View className="bg-neutral-700 text-white rounded-xl size-12 flex items-center justify-center">
            <Right />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FF",
  },
  slide: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    // resizeMode: "contain",
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600", 
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 10,
  },
});
