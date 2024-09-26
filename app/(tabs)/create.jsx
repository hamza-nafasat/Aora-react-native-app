import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-semibold">Upload Video</Text>
        <FormField
          title="Video"
          value={form.title}
          placeholder="Give your video a catchy title"
          otherStyles={"mt-10"}
          handleChangeText={(text) => setForm({ ...form, title: text })}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
