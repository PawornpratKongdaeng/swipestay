import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import SwipeCard from "../components/SwipeCard";
import dorms from "../data/dormList";
import "../global.css";
import { useFavoriteStore } from "../store/favoriteStore";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const { addFavorite } = useFavoriteStore();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const router = useRouter();
  const cardOpacity = useSharedValue(1);
  const cardScale = useSharedValue(1);
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const dorm = dorms[currentIndex];
  const nextDorm = dorms[(currentIndex + 1) % dorms.length];

  const nextCardStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD * 1.5],
      [0.5, 1]
    ),
    transform: [
      {
        scale: interpolate(
          Math.abs(translateX.value),
          [0, SWIPE_THRESHOLD],
          [0.95, 1]
        ),
      },
    ],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
    transform: [{ rotate: "-20deg" }],
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -SWIPE_THRESHOLD], [0, 1]),
    transform: [{ rotate: "20deg" }],
  }));

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") addFavorite(dorm);
    setHistory((prev) => [...prev, currentIndex]);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % dorms.length);
    }, 250);
  };

  const undo = () => {
    if (history.length === 0) return;
    const prevIndex = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentIndex(prevIndex);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotate.value = event.translationX / 20;
      opacity.value = 1 - Math.abs(event.translationX) / SCREEN_WIDTH;
    },
    onEnd: (event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH * 1.5);
        runOnJS(handleSwipe)("right");
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
        runOnJS(handleSwipe)("left");
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
        opacity.value = withSpring(1);
      }
    },
  });

  const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 350);
  const CARD_HEIGHT = Math.min(SCREEN_HEIGHT * 0.65, 592);

  function useButtonAnimation() {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    function onPressIn() {
      scale.value = withTiming(1.2, { duration: 100 });
    }
    function onPressOut() {
      scale.value = withTiming(1, { duration: 100 });
    }
    return { animatedStyle, onPressIn, onPressOut };
  }

  const leftBtnAnim = useButtonAnimation();
  const rightBtnAnim = useButtonAnimation();

  const swipeLeft = () => {
    translateX.value = withSpring(-SCREEN_WIDTH * 1.5);
    runOnJS(handleSwipe)("left");
  };

  const swipeRight = () => {
    translateX.value = withSpring(SCREEN_WIDTH * 1.5);
    runOnJS(handleSwipe)("right");
  };

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
    opacity.value = 1;
    cardOpacity.value = 0;
    cardScale.value = 1;
    cardOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    cardScale.value = withSpring(1, { stiffness: 120, damping: 3, mass: 1 });
  }, [currentIndex]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={undefined}>
      <View
        className="flex-1 items-center w-full max-w-md"
        style={{ marginTop: -46 }}
      >
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              cardAnimatedStyle,
              animatedStyle,
              { width: CARD_WIDTH, height: CARD_HEIGHT }
            ]}
            className="items-center justify-center"
          >
            <SwipeCard dorm={dorm} width={CARD_WIDTH} height={CARD_HEIGHT} />
            <Animated.View
              style={likeOpacity}
              className="absolute top-6 left-6 bg-green-500 px-6 py-3 rounded-xl shadow-lg"
            >
              <Text className="text-white font-bold text-xl">❤️ LIKE</Text>
            </Animated.View>
            <Animated.View
              style={nopeOpacity}
              className="absolute top-6 right-6 bg-red-500 px-6 py-3 rounded-xl shadow-lg"
            >
              <Text className="text-white font-bold text-xl">NOPE</Text>
            </Animated.View>

            <View
              style={{
                position: "absolute",
                bottom: -50,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animated.View style={leftBtnAnim.animatedStyle}>
                <Pressable
                  onPress={swipeLeft}
                  onPressIn={leftBtnAnim.onPressIn}
                  onPressOut={leftBtnAnim.onPressOut}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 24,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  <Ionicons name="close" size={36} color="#ef4444" />
                </Pressable>
              </Animated.View>
              <Animated.View style={rightBtnAnim.animatedStyle}>
                <Pressable
                  onPress={swipeRight}
                  onPressIn={rightBtnAnim.onPressIn}
                  onPressOut={rightBtnAnim.onPressOut}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 24,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 4,
                  }}
                >
                  <Ionicons name="heart" size={36} color="#10b981" />
                </Pressable>
              </Animated.View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
}
