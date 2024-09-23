import React, { useRef, useState } from "react";
import { FlatList, Image, ImageBackground, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../constants";

const Trending = ({ posts }) => {
  const [active, setActive] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setActive(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return <TrendingItem activeItem={active} item={item} />;
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};
const zoomOut = {
  0: { scale: 1.1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  console.log(item.video);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setPlay(false);
    }
  };

  return (
    <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {play ? (
        <Video
          ref={videoRef}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={play}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          className="h-72 w-52 rounded-[35px] mt-3 bg-white/10 "
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)} // Set play state to true on press
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="h-72 w-52 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
