import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import InputOutput from "../components/InputOutput";
import { Octicons } from "@expo/vector-icons";
import { getFontSize } from "../utils";
import { removeHistory } from "../store/history";

const History = ({ route, navigation }) => {
  const { history } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const deleteHistory = (item) => {
    return Alert.alert(
      "Delete Item?",
      "Are you sure you want to remove this item?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(removeHistory(item));
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900">
      <View className="flex flex-row items-center justify-between p-2 shadow bg-gray-100 dark:bg-gray-900">
        <Text className="text-2xl font-semibold text-gray-700 dark:text-white">
          History
        </Text>
        <TouchableOpacity
          className="p-2 text-gray-700 dark:text-white"
          onPress={() => navigation.goBack()}
        >
          <Octicons name="x" size={getFontSize(24)} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="border-b border-gray-300 dark:border-gray-800"
              onPress={() => deleteHistory(item)}
            >
              <InputOutput
                firstInput={item.firstInput}
                secondInput={item.secondInput}
                operation={item.operation}
                result={item.result}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default History;
