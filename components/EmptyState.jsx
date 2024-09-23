import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="px-4 items-center justify-center">
      <Image source={images.empty} className="w-[250px] h-[190px]" resizeMode="contain" />

      <Text className="font-psemibold text-xl text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100 ">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        containerStyles="w-full my-4"
        handlePress={() => router.push("/create")}
      />
    </View>
  );
};

export default EmptyState;
