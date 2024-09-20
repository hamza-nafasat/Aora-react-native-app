import { Link } from "expo-router";
import { Text, View } from "react-native";
import { StatusBar } from "react-native-web";

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold">profile</Text>
      <StatusBar style="auto" />
      <Link href={"/"} style={{ color: "red" }}>
        Go Back to Home
      </Link>
    </View>
  );
};

export default Profile;
