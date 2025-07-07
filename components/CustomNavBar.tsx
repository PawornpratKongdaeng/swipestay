import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CustomNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="flex-row justify-around items-center h-24 bg-white  border-[#eee]">
      <TouchableOpacity onPress={() => router.push("/")}
        className="items-center">
        <Icon name="home-outline" size={28} color={pathname === "/" ? "#10b981" : "#aaa"} />
        <Text className={pathname === "/" ? "text-emerald-500" : "text-gray-400"}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/favorite")}
        className="items-center">
        <Icon name="star-outline" size={28} color={pathname === "/favorite" ? "#10b981" : "#aaa"} />
        <Text className={pathname === "/favorite/index" ? "text-emerald-500" : "text-gray-400"}>Favorite</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/profile")}
        className="items-center">
        <Icon name="account-outline" size={28} color={pathname === "/profile" ? "#10b981" : "#aaa"} />
        <Text className={pathname === "/profile" ? "text-emerald-500" : "text-gray-400"}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
