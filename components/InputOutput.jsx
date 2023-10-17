import React from "react";
import { Feather, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { getFontSize } from "../utils";

const InputOutput = ({ firstInput, secondInput, result, operation }) => {
  const renderOperation = () => {

    if (operation == "/") {
      return (
        <Text
          className="text-red-500 font-semibold"
          style={{ fontSize: getFontSize(30) }}
        >
          <Feather name="divide" size={getFontSize(30)} />
        </Text>
      );
    }
    if (operation == "*") {
      return (
        <Text
          className="text-red-500 font-semibold"
          style={{ fontSize: getFontSize(30) }}
        >
          <Ionicons name="close-sharp" size={getFontSize(30)} />
        </Text>
      );
    }
    if (operation == "+") {
      return (
        <Text
          className="text-red-500 font-semibold"
          style={{ fontSize: getFontSize(30) }}
        >
          <AntDesign name="plus" size={getFontSize(30)} />
        </Text>
      );
    }
    if (operation == "-") {
      return (
        <Text
          className="text-red-500 font-semibold"
          style={{ fontSize: getFontSize(30) }}
        >
          <AntDesign name="minus" size={getFontSize(30)} />
        </Text>
      );
    }
  };

  return (
    <View className="flex-1 p-4 justify-end items-end space-y-2">
      <View className="flex flex-row items-center space-x-1">
        {firstInput && (
          <Text
            className="text-gray-700 dark:text-gray-100"
            style={{ fontSize: getFontSize(24) }}
          >
            {firstInput}
          </Text>
        )}
        {renderOperation()}
        {secondInput && (
          <Text
            className="text-gray-700 dark:text-gray-100"
            style={{ fontSize: getFontSize(24) }}
          >
            {secondInput}
          </Text>
        )}
      </View>
      {result !== null && (
        <Text
          className="text-gray-700 dark:text-gray-100 font-semibold"
          style={{ fontSize: getFontSize(30) }}
        >
          {result}
        </Text>
      )}
    </View>
  );
};

export default InputOutput;
