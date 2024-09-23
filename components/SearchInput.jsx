import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ value, handleChangeText, placeholder }) => {
  return (
    <View className="flex-row border-2 border-black-200 w-full h-16 px-4  bg-black-100 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white text-base mt-0.5 font-pregular"
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChange={handleChangeText}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
