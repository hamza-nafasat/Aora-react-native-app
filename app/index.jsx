import { Text, View } from "react-native";
import React from "react";
import { StatusBar } from "react-native-web";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <StatusBar style="auto" />
      <Link href={"/home"} style={{ color: "red" }}>
        Home
      </Link>
    </View>
  );
};

export default Index;
