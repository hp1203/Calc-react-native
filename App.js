import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import KeypadInput from "./components/KeypadInput";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { styled, useColorScheme } from "nativewind";
import { getFontSize } from "./utils";

import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from "react-native-google-mobile-ads";

const interstitialAdUnitId =  TestIds.INTERSTITIAL; 
const bannerAdUnitId =  TestIds.BANNER 
const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function App() {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  const renderOperation = () => {
    if (operation == "/") {
      return (
        <Text className="text-red-500 font-semibold" style={{ fontSize: getFontSize(30)}}>
          <Feather name="divide" size={getFontSize(30)} />
        </Text>
      );
    }
    if (operation == "*") {
      return (
        <Text className="text-red-500 font-semibold" style={{ fontSize: getFontSize(30)}}>
          <Ionicons name="close-sharp" size={getFontSize(30)} />
        </Text>
      );
    }
    if (operation == "+") {
      return (
        <Text className="text-red-500 font-semibold" style={{ fontSize: getFontSize(30)}}>
          <AntDesign name="plus" size={getFontSize(30)} />
        </Text>
      );
    }
    if (operation == "-") {
      return (
        <Text className="text-red-500 font-semibold" style={{ fontSize: getFontSize(30)}}>
          <AntDesign name="minus" size={getFontSize(30)} />
        </Text>
      );
    }
  };

  const clearData = () => {
    setFirstInput("");
    setSecondInput("");
    setOperation("");
    setResult("");
  }

  const calculate = () => {
    switch (operation) {
      case "/":
        setResult((parseFloat(firstInput)) / (parseFloat(secondInput)))
        break;
      case "*":
        setResult((parseFloat(firstInput)) * (parseFloat(secondInput)))
        break;
      case "+":
        setResult((parseFloat(firstInput)) + (parseFloat(secondInput)))
        break;
      case "-":
        setResult((parseFloat(firstInput)) - (parseFloat(secondInput)))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
    });
    // Start loading the interstitial straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);
  return (
    <>
    
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
        <View className="flex flex-row items-center justify-between mt-7 px-3">
          <TouchableOpacity onPress={toggleColorScheme}>
            <Text className="text-gray-400 dark:text-gray-100">
              {
                colorScheme === "dark" ? <Ionicons name="sunny" size={28}/> : <Ionicons name="moon" size={28}/>
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-gray-400 dark:text-gray-100">
              <MaterialCommunityIcons name="history" size={28}/>
            </Text>
          </TouchableOpacity>
        </View>
      <View className="flex-1 p-4 justify-end items-end space-y-2">
        <View className="flex flex-row items-center space-x-1">
          {firstInput && (
            <Text className="text-gray-700 dark:text-gray-100" style={{ fontSize: getFontSize(24)}}>{firstInput}</Text>
          )}
          {renderOperation()}
          {secondInput && (
            <Text className="text-gray-700 dark:text-gray-100" style={{ fontSize: getFontSize(24)}}>{secondInput}</Text>
          )}
        </View>
          {result !== null && <Text className="text-gray-700 dark:text-gray-100 font-semibold" style={{ fontSize: getFontSize(30)}}>{result}</Text>}
      </View>
      <View>
        <KeypadInput
          firstInput={firstInput}
          secondInput={secondInput}
          setFirstInput={setFirstInput}
          setSecondInput={setSecondInput}
          setOperation={setOperation}
          operation={operation}
          calculate={calculate}
          clearData={clearData}
        />
      </View>
      <StatusBar style="auto" />
    </View>
    <BannerAd 
        unitId={bannerAdUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true, // optional
        }}
      />
    </>
  );
}