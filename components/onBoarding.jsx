import Onboarding from "react-native-onboarding-swiper";
import { View } from "react-native";
import { useRouter } from "expo-router";

const Dots = ({ selected }) => {
  let backgroundColor = selected ? "#000" : "#999";
  let height = selected ? 9 : 6;

  return (
    <View
      style={{
        width: 4,
        borderRadius: 2,
        height: height,
        marginHorizontal: 1.5,
        backgroundColor,
      }}
    />
  );
};

const OnboardingScreens = () => {
  const router = useRouter();

  return (
    <Onboarding
      DotComponent={Dots}
      onSkip={() => router.replace("/selectLanguage")}
      onDone={() => router.push("/selectLanguage")}
      showNext={false}
      showSkip={false}
      pages={[
        {
          backgroundColor: "#ffdeb3",
          title: "Welcome to Reminder",
          subtitle: "Your personal assistant to manage time effectively",
          titleStyles: { fontSize: 28, fontWeight: "bold" },
          subTitleStyles: { fontSize: 18 },
        },
        {
          backgroundColor: "#fdeb93",
          title: "Stay on Top of Your Schedule",
          subtitle: "Never miss appointments, meetings, or events again",
          titleStyles: { fontSize: 28, fontWeight: "bold" },
          subTitleStyles: { fontSize: 18 },
        },
        {
          backgroundColor: "#f0f0f0",
          title: "Simplify Your Life",
          subtitle: "Organize tasks and achieve your goals effortlessly",
          titleStyles: { fontSize: 28, fontWeight: "bold" },
          subTitleStyles: { fontSize: 18 },
        },
      ]}
    />
  );
};



export default OnboardingScreens;
