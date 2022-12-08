import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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

export default function App() {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const renderOperation = () => {
    if (operation == "/") {
      return (
        <Text className="text-red-500 font-semibold">
          <Feather name="divide" size={30} />
        </Text>
      );
    }
    if (operation == "*") {
      return (
        <Text className="text-red-500 font-semibold">
          <Ionicons name="close-sharp" size={30} />
        </Text>
      );
    }
    if (operation == "+") {
      return (
        <Text className="text-red-500 font-semibold">
          <AntDesign name="plus" size={30} />
        </Text>
      );
    }
    if (operation == "-") {
      return (
        <Text className="text-red-500 font-semibold">
          <AntDesign name="minus" size={30} />
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
  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
        <View className="flex flex-row items-center justify-between mt-7 px-3">
          <TouchableOpacity onPress={toggleColorScheme}>
            <Text className="text-gray-400 dark:text-gray-100">
              {
                colorScheme === "dark" ? <Ionicons name="sunny" size={28}/> : <Ionicons name="moon" size={28}/>
              }
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Text className="text-gray-400 dark:text-gray-100">
              <MaterialCommunityIcons name="history" size={28}/>
            </Text>
          </TouchableOpacity> */}
        </View>
      <View className="flex-1 p-4 justify-end items-end space-y-2">
        <View className="flex flex-row items-center space-x-1">
          {firstInput && (
            <Text className="text-gray-700 dark:text-gray-100 text-3xl">{firstInput}</Text>
          )}
          {renderOperation()}
          {secondInput && (
            <Text className="text-gray-700 dark:text-gray-100 text-3xl">{secondInput}</Text>
          )}
        </View>
          {result !== null && <Text className="text-gray-700 dark:text-gray-100 font-semibold text-5xl">{result}</Text>}
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
  );
}