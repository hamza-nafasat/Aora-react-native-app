import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import useAppwrite from "../../hooks/useAppwrite";
import { searchPosts } from "../../lib/appwrite";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => {
    const result = searchPosts({ query });
    return result;
  });

  console.log(query, posts);
  const [playingStates, setPlayingStates] = useState({});

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

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard post={item} isPlaying={playingStates[item.$id]} onPlay={handlePlay} />
        )}
        ListHeaderComponent={() => (
          <View className="my-3 px-4">
            <Text className="font-pmedium text-sm text-gray-100 ">Search Result</Text>
            <Text className="font-psemibold text-xl text-white">{query}</Text>
            <View className="my-3 mb-4">
              <SearchInput initialValue={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Videos found for this search query"}
            subtitle={"Be the first one to upload video"}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
