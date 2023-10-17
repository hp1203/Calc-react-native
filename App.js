import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from "./store";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
enableScreens();
const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;