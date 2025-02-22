// import { View, Text, Image } from "react-native";
// import images from "../constants/images";


// const NoReminder = () => {
//   return (
//     <View>
//       <View className="flex flex-row justify-center mt-5">
//         <View className="flex flex-col items-center relative mt-5">
//           <Image
//             source={images.noResult}
//             className="mb-8 h-80"
//             resizeMode="contain"
//           />
//         </View>
//       </View>
//       <View>
//         <Text className="text-xl font-rubik-semibold text-center font-bold">
//           You have not yet created a reminder
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default NoReminder;


import { View, Text, Image } from "react-native";
import images from "../constants/images";

interface NoReminderProps {
  message: string;
  imageSource: any;
}

const NoReminder = ({ message, imageSource }: NoReminderProps) => {
  return (
    <View>
      <View className="flex flex-row justify-center mt-5">
        <View className="flex flex-col items-center relative mt-5">
          <Image
            source={imageSource}
            className="mb-8 h-80"
            resizeMode="contain"
          />
        </View>
      </View>
      <View>
        <Text className="text-xl font-rubik-semibold text-center font-bold">
          {message}
        </Text>
      </View>
    </View>
  );
};

export default NoReminder;