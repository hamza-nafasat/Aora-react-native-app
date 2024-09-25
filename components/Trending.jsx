import React, { useState } from "react";
import { FlatList, Image, ImageBackground, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import WebView from "react-native-webview";
import { icons } from "../constants";

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};

const zoomOut = {
  0: { scale: 1.1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item, isPlaying, onPlay }) => {
  return (
    <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {isPlaying ? (
        <WebView
          source={{ uri: item.video }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo
          className="w-52 h-72 bg-transparent"
          useWebKit
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => onPlay(item.$id, true)} // Play video and mark as playing
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

const Trending = ({ posts }) => {
  const [active, setActive] = useState(posts[0]);
  const [playingStates, setPlayingStates] = useState({});

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setActive(viewableItems[0].key);
    }
  };

  const handlePlay = (id, isPlaying) => {
    setPlayingStates((prevStates) => ({
      ...prevStates,
      [id]: isPlaying,
    }));

    if (isPlaying) {
      setPlayingStates((prevStates) => {
        const newStates = {};
        for (const key in prevStates) {
          newStates[key] = key === id ? true : false;
        }
        return newStates;
      });
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={active}
          item={item}
          isPlaying={playingStates[item.$id]}
          onPlay={handlePlay}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
