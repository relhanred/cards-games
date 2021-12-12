import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


export default store;
