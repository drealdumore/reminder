import { SafeAreaView, ScrollView } from "react-native";
import OnboardingScreens from "../../components/OnboardingScreens";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <OnboardingScreens />
      </ScrollView>
    </SafeAreaView>
  );
}
