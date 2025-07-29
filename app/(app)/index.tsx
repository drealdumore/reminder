import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import OnboardingScreens from "../../components/onBoarding";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // Render nothing while checking AsyncStorage
  } else if (isFirstLaunch === true) {
    return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView contentContainerClassName="h-full">
          <OnboardingScreens />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <Redirect href="/home" />; // Properly return the Redirect component
  }
}