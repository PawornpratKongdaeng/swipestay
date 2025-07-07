import { Image, Text, TouchableOpacity, View } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring
} from 'react-native-reanimated';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dorm } from '../store/favoriteStore';

interface SwipeCardProps {
  dorm: Dorm;
  width?: number;
  height?: number;
  onImagePress?: () => void;
}

export default function SwipeCard({ dorm, width, height, onImagePress }: SwipeCardProps) {
  const heartScale = useSharedValue(1);
  const closeScale = useSharedValue(1);
  const heartOpacity = useSharedValue(1);
  const closeOpacity = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
    opacity: heartOpacity.value,
  }));

  const closeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: closeScale.value }],
    opacity: closeOpacity.value,
  }));

  const handleHeartPress = () => {
    heartScale.value = withSequence(
      withSpring(1.2, { duration: 150 }),
      withSpring(1, { duration: 150 })
    );
    heartOpacity.value = withSequence(
      withSpring(0.7, { duration: 150 }),
      withSpring(1, { duration: 150 })
    );
  };

  const handleClosePress = () => {
    closeScale.value = withSequence(
      withSpring(1.2, { duration: 150 }),
      withSpring(1, { duration: 150 })
    );
    closeOpacity.value = withSequence(
      withSpring(0.7, { duration: 150 }),
      withSpring(1, { duration: 150 })
    );
  };

  return (
    <View
      className="bg-white rounded-2xl overflow-hidden relative"
      style={{
        width: width ?? 350,
        height: height ?? 420,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 16,
        elevation: 10,
      }}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={onImagePress} className="flex-1">
        <Image
          source={{ uri: dorm.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </TouchableOpacity>
   
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          padding: 12,
        }}
      >
        <Text
          className="text-white text-2xl font-bold mb-2"
          style={{
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}
        >
          {dorm.name}
        </Text>
        <View className="flex-row items-center mb-1">
          <Icon name="google-maps" size={18} color="#fff" style={{ marginRight: 4 }} />
          <Text className="text-white text-base mr-3">{dorm.distance} กม.</Text>
          <Icon name="cash" size={18} color="#fff" style={{ marginRight: 4 }} />
          <Text className="text-white text-base">{dorm.price.toLocaleString()} บาท/เดือน</Text>
        </View>
        {dorm.facilities?.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 }}>
            {dorm.facilities.map((f: any, i: number) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 4 }}>
                <Icon name={f.icon} size={14} color="#fff" style={{ marginRight: 2 }} />
                <Text style={{ color: '#fff', fontSize: 12 }}>{f.label}</Text>
              </View>
            ))}
          </View>
        )}
        <Text className="text-white text-xs" numberOfLines={2} ellipsizeMode="tail" style={{marginBottom: 0, paddingBottom: 0}}>
          {dorm.description || '-'}
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: '#ffffff',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
          zIndex: 10,
        }}
      >
        <Text style={{ color: dorm.available ? '#10B981' : '#ff5e3b', fontWeight: 'bold', fontSize: 16 }}>
          {dorm.available ? 'ห้องว่าง' : 'ห้องเต็ม'}
        </Text>
      </View>

      <View className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex-row space-x-4 z-50">
      </View>
    </View>
  );
}
