import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { images } from "../constants";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-[95vh] px-4 justify-center items-center   ">
          <Image source={images.logo} className="w-[130px] h-[60px]" resizeMode="contain" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[298px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-pbold text-center">
              Discover Endless{"\n"} Possibilities With <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora.{" "}
          </Text>
          <CustomButton
            title={"Continue with Email"}
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
