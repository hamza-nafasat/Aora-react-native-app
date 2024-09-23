import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }]}
        // data={[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text className="text-white text-2xl font-bold">{item.id}</Text>;
        }}
        ListHeaderComponent={({ item }) => {
          return (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
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
              <View className="w-full pt-5 flex-1">
                <Text className="text-gray-100 text-lg mb-3 font-pregular ">Latest Videos</Text>
                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] ?? []} />
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
