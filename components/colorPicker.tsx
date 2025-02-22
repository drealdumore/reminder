import { View, TouchableOpacity, Text } from "react-native";
import { colors } from "../constants/data";


interface ColorPickerProps {
  selectedColor: string | null;
  onColorChange: (color: string) => void;
}

export default function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <View className="flex flex-col justify-center gap-3">
      <Text className="font-rubik">Select Color</Text>
      <View className="flex flex-row items-center justify-start w-full ">
        <View className="flex-1 flex flex-row items-center gap-4">
          {colors.map((color) => (
            <TouchableOpacity
              key={color.id}
              onPress={() => onColorChange(color.id)}
              className={`size-14 rounded-full items-center justify-center`}
              style={{
                backgroundColor: color.value,
                borderWidth: selectedColor === color.id ? 2 : 0,
                borderColor: "#6366f1",
                padding: 2,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
