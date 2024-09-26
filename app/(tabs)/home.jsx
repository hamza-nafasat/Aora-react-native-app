import React, { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import { images } from "../../constants";
import useAppwrite from "../../hooks/useAppwrite";
import { fetchAllPosts, fetchLatestPosts } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(fetchAllPosts);
  const { data: latestPosts, refetch: refetchLatest } = useAppwrite(fetchLatestPosts);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [playingStates, setPlayingStates] = useState({});

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchLatest(), refetch()]);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
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
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard post={item} isPlaying={playingStates[item.$id]} onPlay={handlePlay} />
        )}
        ListHeaderComponent={() => (
          <View className="my-3 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-4">
              <View>
                <Text className="font-pmedium text-sm text-gray-100 ">Welcome back</Text>
                <Text className="font-psemibold text-xl text-white">{user?.username}</Text>
              </View>
              <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
            </View>
            <SearchInput />
            <View className="w-full pt-0 flex-1">
              <Text className="text-gray-100 text-lg mb-2 font-pregular ">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title={"No Videos found"} subtitle={"Be the first one to upload video"} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
