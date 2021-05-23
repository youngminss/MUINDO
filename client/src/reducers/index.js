import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import navbarReducer from './navbar';
import analysisClothesReducer from './analysisClothes';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ['navbar'],
  // blacklist -> 그것만 제외합니다
};

const allReducer = combineReducers({
  navbar: navbarReducer,
  analysisClothes: analysisClothesReducer,
});

export default persistReducer(persistConfig, allReducer);
