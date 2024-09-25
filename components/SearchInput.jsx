import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

const SearchInput = ({ initialValue }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initialValue || "");

  return (
    <View className="flex-row border-2 border-black-200 w-full h-14 px-4  bg-black-100 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white text-base mt-0.5 font-pregular"
        value={query}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Search for a video topic"}
        placeholderTextColor={"#cdcde0"}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          console.log("this is query", query);
          if (!query) {
            return Alert.alert("Missing Query", "Please enter a search query");
          }
          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
