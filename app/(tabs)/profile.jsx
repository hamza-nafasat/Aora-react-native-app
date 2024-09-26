import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalContext";
import useAppwrite from "../../hooks/useAppwrite";
import { getUserPosts, logoutUser } from "../../lib/appwrite";
import { TouchableOpacity } from "react-native";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user?.$id));
  const [loading, setIsLoading] = useState(false);

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

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    } catch (error) {
      console.log("error while logging out user", error);
    } finally {
      setIsLoading(false);
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
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <TouchableOpacity
              className={`w-full items-end mb-10 ${loading ? "opacity-50" : "opacity-100"} `}
              onPress={logoutHandler}
              activeOpacity={0.7}
              disabled={loading}
            >
              <Image source={icons.logout} className="w-6 h-6 rounded-full" resizeMode="contain" />
            </TouchableOpacity>
            <View className="w-16 h-16 border-2 border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                playingStates
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox title={user?.username} containerStyles="mt-3" titleStyles="text-lg" />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle={"Posts"}
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox title={"1.2k"} subtitle={"Followers"} titleStyles="text-xl" />
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

export default Profile;
