import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import History from "../screens/History";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
            name="Home"
            component={Home}
        />
        <Stack.Screen
            name="History"
            component={History}
            options={{
                presentation: "modal",
            }}
        />
    </Stack.Navigator>
  )
}

export default Navigation;
