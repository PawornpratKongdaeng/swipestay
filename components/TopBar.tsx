import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TopBarProps {
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSwipe = pathname === "/" || pathname === "/index";
  const isSelectDom = pathname === "/selectdom";
  const toggleTo = isSwipe ? "/selectdom" : "/";
  const toggleLabel = isSwipe ? "เลื่อน" : "ปัด";
  const toggleIcon = isSwipe ? "swap-vertical" : "gesture-swipe-horizontal";

  return (
      <View
        className="w-full h-[64px] bg-white flex-row items-center border-b px-4 border-gray-200"
        style={Platform.select({
          ios: {
            shadowColor: "#E4E4E4",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
          },
          android: {
            elevation: 8,
          },
        })}
      >
        <View className="flex-1 ml-4">
          <Text
            className="text-[24px] font-bold font-lato text-left "
            style={{ color: "#969696" }}
          >
            {title}
          </Text>
        </View>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => router.push(toggleTo)} style={{ marginRight: 12 }}>
            <Icon name={toggleIcon} size={25} color="#10b981" />
            <Text style={{ color: "#10b981", fontSize: 12, fontWeight: "bold" }}>{toggleLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="bell-outline" size={25} color="#969696" />
          </TouchableOpacity>
          <View className="w-4"></View>
          <TouchableOpacity>
            <Icon name="cog-outline" size={25} color="#969696" />
          </TouchableOpacity>
          <View className="w-4"></View>
        </View>
      </View>
  );
};

export default TopBar;
