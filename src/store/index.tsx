import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeConfigSlice from "./themeConfigSlice";
import utilConfigSlice from "./utilConfigSlice";
import uploadingStatusSlice from "./uploadingStatusSlice";

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  utilConfig: utilConfigSlice,
  uploadingStatusSlice: uploadingStatusSlice
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
