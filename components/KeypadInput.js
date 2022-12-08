import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import React from "react";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

const Key = ({ value, display, type, handleKeyPress }) => (
  <TouchableHighlight
    className="flex-1 w-full items-center rounded-full hover:bg-gray-800 justify-center p-4 m-4 shadow-md "
    onPress={() => handleKeyPress(value, type)}
  >
    <Text className="text-2xl font-semibold text-gray-700 dark:text-gray-100">{display}</Text>
  </TouchableHighlight>
);

const KeypadInput = ({
  firstInput,
  secondInput,
  setFirstInput,
  setSecondInput,
  setOperation,
  operation,
  calculate,
  clearData,
}) => {
  const handleKeyPress = (value, type) => {
    if (type == "input") {
      if (operation !== "") {
        setSecondInput(secondInput + value);
      } else {
        setFirstInput(firstInput + value);
      }
    }
    if (type == "operation") {
      if (value == "+-") {
        if (secondInput !== "" && firstInput !== "" && operation !== "") {
          setSecondInput((prevState) => -1 * prevState);
        }

        if (secondInput == "" && firstInput !== "" && operation == "") {
          setFirstInput((prevState) => -1 * prevState);
        }
      } else if (value == "%") {
        if (secondInput !== "" && firstInput !== "" && operation !== "") {
          setSecondInput((prevState) => prevState / 100);
        }

        if (secondInput == "" && firstInput !== "" && operation == "") {
          setFirstInput((prevState) => prevState / 100);
        }
      } else {
        setOperation(value);
      }
    }
  };

  const deleteInput = () => {
    if (secondInput !== "" && firstInput !== "" && operation !== "") {
      setSecondInput(secondInput.slice(0, -1));
    }

    if (secondInput == "" && firstInput !== "" && operation !== "") {
      setOperation("");
    }

    if (secondInput == "" && firstInput !== "" && operation == "") {
      setFirstInput(firstInput.slice(0, -1));
    }

    if (secondInput == "" && firstInput == "" && operation == "") {
      clearData();
    }
  };

  return (
    <View className="rounded-3xl m-3 bg-gray-200 dark:bg-gray-800 p-2">
      <View className="flex-row">
        <Key
          value={"C"}
          display={<Text className="text-green-600 font-semibold">C</Text>}
          type="input"
          handleKeyPress={() => clearData()}
        />
        <Key
          value={"+-"}
          display={<Text className="text-green-600 font-semibold">+/-</Text>}
          type="operation"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"%"}
          display={
            <Text className="text-green-600 font-semibold">
              <Feather name="percent" size={30} />
            </Text>
          }
          type="operation"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"/"}
          display={
            <Text className="text-red-500 font-semibold">
              <Feather name="divide" size={30} />
            </Text>
          }
          type="operation"
          handleKeyPress={handleKeyPress}
        />
      </View>
      <View className="flex-row">
        <Key
          value={"1"}
          display={"1"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"2"}
          display={"2"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"3"}
          display={"3"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"*"}
          display={
            <Text className="text-red-500 font-semibold">
              <Ionicons name="close-sharp" size={30} />
            </Text>
          }
          type="operation"
          handleKeyPress={handleKeyPress}
        />
      </View>
      <View className="flex-row">
        <Key
          value={"4"}
          display={"4"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"5"}
          display={"5"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"6"}
          display={"6"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"-"}
          display={
            <Text className="text-red-500 font-semibold">
              <AntDesign name="minus" size={30} />
            </Text>
          }
          type="operation"
          handleKeyPress={handleKeyPress}
        />
      </View>
      <View className="flex-row">
        <Key
          value={"7"}
          display={"7"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"8"}
          display={"8"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"9"}
          display={"9"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"+"}
          display={
            <Text className="text-red-500 font-semibold">
              <AntDesign name="plus" size={30} />
            </Text>
          }
          type="operation"
          handleKeyPress={handleKeyPress}
        />
      </View>
      <View className="flex-row">
        <Key
          value={"delete"}
          display={
            <Text className="text-gray-700 dark:text-gray-100 font-semibold">
              <Ionicons name="arrow-back" size={30} />
            </Text>
          }
          type="delete"
          handleKeyPress={deleteInput}
        />
        <Key
          value={"0"}
          display={"0"}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"."}
          display={<Entypo name="dot-single" size={30} />}
          type="input"
          handleKeyPress={handleKeyPress}
        />
        <Key
          value={"="}
          display={
            <Text className="text-red-500 font-semibold">
              <MaterialCommunityIcons name="equal" size={30} />
            </Text>
          }
          type="operation"
          handleKeyPress={calculate}
        />
      </View>
    </View>
  );
};

export default KeypadInput;
