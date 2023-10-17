import { combineReducers, configureStore } from "@reduxjs/toolkit";
import historyReducer from "./history";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({
    history: historyReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: []
};

export const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})