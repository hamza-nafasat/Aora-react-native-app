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

const Home = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, refetch } = useAppwrite(fetchAllPosts);
  const { data: latestPosts } = useAppwrite(fetchLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard post={item} />;
        }}
        ListHeaderComponent={() => {
          return (
            <View className="my-3 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-4">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100 ">Welcome back</Text>
                  <Text className="font-psemibold text-xl text-white">Hamza Nafasat</Text>
                </View>
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
              <SearchInput
                placeholder="Search for a video topic"
                value={search}
                handleChangeText={(e) => setSearch(e)}
              />
              <View className="w-full pt-0 flex-1">
                <Text className="text-gray-100 text-lg mb-2 font-pregular ">Latest Videos</Text>
                <Trending posts={latestPosts ?? []} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return <EmptyState title={"No Videos found"} subtitle={"Be the first one to upload video"} />;
        }}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
