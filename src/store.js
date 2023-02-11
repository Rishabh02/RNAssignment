import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import friendsListReducer from './reducers/friendsListReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const reducers = combineReducers({
  friendsListReducer: friendsListReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
