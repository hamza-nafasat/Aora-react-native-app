import { images } from "../../constants";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { getCurrentUser, signInUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalContext";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill all the fields");
    }
    try {
      setIsLoading(true);
      await signInUser(form.email, form.password, form.username);
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
          <Text className="text-2xl text-white font-psemibold mt-10">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder={"Enter Your Email"}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
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
            title={"Sign in"}
            handlePress={submit}
            containerStyles="w-full mt-7"
          />
          <View className="flex-row gap-2 pt-5 justify-center">
            <Text className="text-md text-gray-100 font-pregular">Don't have an account? </Text>
            <Link href={"/sign-up"} className="text-secondary font-psemibold text-md">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
