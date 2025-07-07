import CustomNavBar from "@/components/CustomNavBar";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, usePathname } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
  });
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  // Animated values
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const appOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {

      const timer = setTimeout(() => {

        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(appOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setShowSplash(false);
          SplashScreen.hideAsync();
        });
      }, 1200); // splash แสดง 1.2 วินาที
      return () => clearTimeout(timer);
    } else {
      SplashScreen.preventAutoHideAsync();
    }
  }, [fontsLoaded]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "left", "right"]}>
      {showSplash && (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            opacity: logoOpacity,
            zIndex: 2,
          }}
        >
          <Animated.Image
            source={require("../assets/images/swipestay.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ marginTop: 16, fontSize: 24, fontWeight: "bold" }}>SwipeStay</Text>
        </Animated.View>
      )}
      <Animated.View style={{ flex: 1, opacity: appOpacity }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {pathname !== "/favorite/index" && <TopBar title="SwipeStay" />}
          <Slot />
          <CustomNavBar />
        </GestureHandlerRootView>
      </Animated.View>
    </SafeAreaView>
  );
}
