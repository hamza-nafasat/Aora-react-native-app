import { View, Text, Image } from "react-native";

import { icons } from "../constants";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  post: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1 ">
            <Text className="text-white font-semibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-100 font-pregular text-xs" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="h-72 w-52 rounded-[35px] mt-3 bg-white/10 "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="contain"
          />
          <Image source={icons.play} className="w-12 h-12 absolute  " resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
