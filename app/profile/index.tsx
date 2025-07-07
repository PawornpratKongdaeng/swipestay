import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 items-center" edges={['top', 'bottom']}>
      <View className="w-full items-center mt-9 mb-6">
        <Image
          source={{ uri: '' }}
          className="w-24 h-24 rounded-full mb-4 border-4 border-white"
          style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }}
        />
        <Text className="text-2xl font-bold text-gray-800 mb-1">John Doe</Text>
        <Text className="text-base text-gray-400 mb-4">john.doe@email.com</Text>
        <TouchableOpacity className="flex-row items-center bg-gray-500 px-6 py-2 rounded-xl mb-2 shadow-md">
          <Icon name="pencil-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-base">แก้ไขโปรไฟล์</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-gray-200 px-6 py-2 rounded-xl mb-2 shadow" style={{ elevation: 1 }}>
          <Icon name="logout" size={20} color="#ef4444" style={{ marginRight: 8 }} />
          <Text className="text-red-500 font-bold text-base">ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full px-6 mt-6">
        <Text className="text-lg font-bold text-gray-700 mb-2">ข้อมูลส่วนตัว</Text>
        <View className="bg-white rounded-xl shadow p-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">เบอร์โทรศัพท์</Text>
            <Text className="text-gray-800 font-semibold">081-234-5678</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-400">ที่อยู่</Text>
            <Text className="text-gray-800 font-semibold">123/12 Sutap, Chiang Mai</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 