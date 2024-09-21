import { images } from "../../constants";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser } from "../../lib/appwrite";
import { Alert } from "react-native";
import { useGlobalContext } from "../../context/GlobalContext";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill all the fields");
    }
    try {
      setIsLoading(true);
      await createUser(form.email, form.password, form.username);
      const user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[95vh] justify-center px-4 my-6 ">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain" />
          <Text className="text-2xl text-white font-psemibold mt-10">Sign Up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            placeholder={"Enter Your Username"}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            placeholder={"Enter Your Email"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType={"email-address"}
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder={"Enter Your Password"}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            isLoading={isLoading}
            title={"Sign Up"}
            handlePress={submit}
            containerStyles="w-full mt-7"
          />
          <View className="flex-row gap-2 pt-5 justify-center">
            <Text className="text-md text-gray-100 font-pregular">Already have an account? </Text>
            <Link href={"/sign-in"} className="text-secondary font-psemibold text-md">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
