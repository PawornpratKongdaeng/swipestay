import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, FlatList, Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { default as Ionicons } from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import dorms from "../data/dormList";
import "../global.css";
import { useFavoriteStore } from "../store/favoriteStore";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CARD_WIDTH = SCREEN_WIDTH;

// Type for dorm
type Dorm = typeof dorms[number];

// Props for FavoriteCardItem
interface FavoriteCardItemProps {
  item: Dorm;
  onFavorite: (item: Dorm) => void;
  cardHeight: number;
}

function FavoriteCardItem({ item, onFavorite, cardHeight }: FavoriteCardItemProps) {
  const mainImage = (item.images && item.images[0]) || item.image;
  const heartScale = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleHeartPress = () => {
    heartScale.value = withSequence(
      withSpring(1.3, { stiffness: 200 }),
      withSpring(1)
    );
    onFavorite(item);
  };

  return (
    <View
      className="mb-6 bg-white rounded-2xl  border border-gray-100 shadow-2xl elevation-18 max-w-[350px] self-center w-full p-0 overflow-hidden"
    >
      <View>
        <Image
          source={{ uri: mainImage }}
          className="w-full h-[180px]"
          resizeMode="cover"
        />
      </View>

      <View className="p-4">
        <Text className="text-lg font-bold text-gray-900 mb-1">{item.name}</Text>
        <Text className="text-xs text-gray-500 mb-3">{item.address || '-'}</Text>
        <View className="flex-row items-center mb-3">
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text className="text-sm text-yellow-600 font-bold ml-1">{item.rating || '4.5'}</Text>
        </View>
        <View className="mb-2 flex-row justify-between items-center">
          <Text className="font-bold text-base text-gray-700">Facilities</Text>
        </View>
        {item.facilities?.length > 0 && (
          <View className="flex-row flex-wrap gap-2 mb-2">
            {item.facilities.map((f: any, i: any) => (
              <View key={i} className="flex-row items-center mr-4 mb-1">
                <Icon name={f.icon as any} size={16} color="#888" style={{ marginRight: 2 }} />
                <Text className="text-xs text-gray-600">{f.label}</Text>
              </View>
            ))}
          </View>
        )}
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xl font-bold text-gray-900">
            {item.price?.toLocaleString() || '1,050.00'} <Text className="text-base font-normal text-gray-500">บาท/เดือน</Text>
          </Text>
          <View className="flex-row items-center">
            <Pressable
              className={`px-4 py-2 rounded-xl ${item.available ? 'bg-gray-100' : 'bg-gray-200'} border border-[#eee] ${item.available ? 'opacity-100' : 'opacity-50'}`}
              onPress={() => item.available && onFavorite(item)}
              disabled={!item.available}
            >
              <Text className={item.available ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                {item.available ? "ห้องว่าง" : "ห้องเต็ม"}
              </Text>
            </Pressable>
            <Animated.View
              style={[
                { marginLeft: 12, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 20, padding: 6, borderWidth: 1, borderColor: '#eee' },
                heartAnimatedStyle,
              ]}
            >
              <Pressable onPress={handleHeartPress}>
                <Ionicons name="heart" size={22} color="#10b981" />
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function SelectDomPage() {
  const { addFavorite } = useFavoriteStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();


  const TOP_BAR_HEIGHT = 30;
  const NAV_BAR_HEIGHT = 90;

  const CARD_HEIGHT = 300;

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={dorms}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <FavoriteCardItem item={item} onFavorite={addFavorite} cardHeight={CARD_HEIGHT} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 24, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-5" />}
      />
    </View>
  );
}
