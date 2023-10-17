import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import KeypadInput from "../components/KeypadInput";
import {
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome5
} from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { getFontSize } from "../utils";
import { useDispatch } from "react-redux";
import { addHistory } from "../store/history";
import InputOutput from "../components/InputOutput";

import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const interstitialAdUnitId = "ca-app-pub-1570613060494374/1656626828";
const bannerAdUnitId = "ca-app-pub-1570613060494374~6155810899";
const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const Home = ({ navigation }) => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const dispatch = useDispatch();


  const clearData = () => {
    setFirstInput("");
    setSecondInput("");
    setOperation("");
    setResult("");
  };

  const calculate = () => {
    let Opresult = null;
    switch (operation) {
      case "/":
        Opresult = parseFloat(firstInput) / parseFloat(secondInput);
        setResult(Opresult);
        break;
      case "*":
        Opresult = parseFloat(firstInput) * parseFloat(secondInput);
        setResult(Opresult);
        break;
      case "+":
        Opresult = parseFloat(firstInput) + parseFloat(secondInput);
        setResult(Opresult);
        break;
      case "-":
        Opresult = parseFloat(firstInput) - parseFloat(secondInput);
        setResult(Opresult);
        break;
      default:
        break;
    }
    dispatch(addHistory({
        firstInput: firstInput,
        secondInput: secondInput,
        operation: operation,
        result: Opresult
    }));
  };

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );
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
              {colorScheme === "dark" ? (
                <FontAwesome5 name="cloud-sun" size={getFontSize(24)} />
              ) : (
                <FontAwesome5 name="cloud-moon" size={getFontSize(24)} />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push("History")}
          >
            <Text className="text-gray-400 dark:text-gray-100">
              <FontAwesome5 name="history" size={getFontSize(24)} />
            </Text>
          </TouchableOpacity>
        </View>
        <InputOutput firstInput={firstInput} secondInput={secondInput} operation={operation} result={result}/>
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
};

export default Home;
