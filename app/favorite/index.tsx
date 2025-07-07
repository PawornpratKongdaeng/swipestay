import { useFavoriteStore } from '@/store/favoriteStore';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCartStore } from '../../store/cartStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const CONTENT_MAX_WIDTH = 500

export default function FavoritePage() {
  const { favorites } = useFavoriteStore()
  const { cart, addCart } = useCartStore()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['undefined']}>
      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Icon name="star-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
          <Text className="text-lg text-gray-400 mt-2 text-center font-semibold">ยังไม่มีรายการที่ชอบ</Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ marginTop: 24, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {favorites.map((item) => {
            const inCart = !!cart.find((d) => d.id === item.id)
            const images = item.images || [item.image]
            const mainImage = images[0]
            const subImages = images.slice(1, 4)
            const moreCount = images.length - 4
            return (
              <View
                key={item.id}
                className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                style={{ maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center', width: '100%', padding: 16 }}
              >

                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>

                  <View style={{ flex: 2, aspectRatio: 1, borderRadius: 14, overflow: 'hidden' }}>
                    <Image source={{ uri: mainImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  </View>

                  <View style={{ flex: 1, gap: 8, justifyContent: 'space-between' }}>
                    {subImages.map((img: any, idx: any) => (
                      <View key={idx} style={{ flex: 1, borderRadius: 10, overflow: 'hidden', marginBottom: idx < subImages.length - 1 ? 8 : 0 }}>
                        <Image source={{ uri: img }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
  
                        {idx === 2 && moreCount > 0 && (
                          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>+{moreCount}</Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
   
                <View className="mb-2">
                  <View className="flex-row items-center mb-2">
                    <Text className="bg-gray-200 text-xs px-2 py-0.5 rounded mr-2">{item.type || 'Condo'}</Text>
                    <Text className="bg-gray-200 text-xs px-2 py-0.5 rounded">For Rent</Text>
                    <Text className="flex-1 text-right text-xl font-bold text-gray-800">{item.price?.toLocaleString()} <Text className="text-base font-normal text-gray-500">บาท/เดือน</Text></Text>
                  </View>
                  <Text className="text-xl font-bold text-gray-900 mb-1">{item.name}</Text>
                  <View className="flex-row items-center mb-2">
                    <Icon name="google-maps" size={16} color="#888" />
                    <Text className="text-sm text-gray-500 ml-1">{item.address || '-'}</Text>
                  </View>
              
                  <View className="mb-2 flex-row justify-between items-center">
                    <Text className="font-bold text-base text-gray-700">Facilities</Text>

                  </View>
                  <View className="flex-row flex-wrap gap-2 mb-2">
                    {item.facilities?.map?.((f: any, i: any) => (
                      <View key={i} className="flex-row items-center mr-4 mb-1">
                        <Icon name={f.icon as any} size={16} color="#888" style={{ marginRight: 2 }} />
                        <Text className="text-xs text-gray-600">{f.label}</Text>
                      </View>
                    ))}
                  </View>

                  <Text className="font-bold text-base text-gray-700 mb-1">Description</Text>
                  <Text className="text-xs text-gray-600 leading-relaxed">{item.description || '-'}</Text>
                </View>

                <TouchableOpacity
                  className={`w-full py-3 rounded-xl bg-gray-600`}
                  style={{ marginTop: 12 }}
                  onPress={() => {}}
                >
                  <Text className="text-white text-lg font-bold text-center">
                    ติดต่อผู้ให้เช่า
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
