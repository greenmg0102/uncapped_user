import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  passedTime: 0,
  total: 0,
  complete: 0,
  rejected: 0,
  current: 0,
  fileStatus: {
    filename: '',
    fileSize: '',
  }
};

const initialState = {
  total: defaultState.total,
  current: defaultState.current,
  passedTime: defaultState.passedTime,
  fileData: defaultState.fileStatus,
  complete: defaultState.complete,
  rejected: defaultState.rejected,
};

const uploadingStatusSlice = createSlice({
  name: "uploading",
  initialState: initialState,
  reducers: {
    uploadingStatus(state, percent) {
      state.current = percent.payload;
    },
    completedStatus(state, percent) {
      state.complete = percent.payload;
    },
    rejectedStatus(state, percent) {
      state.rejected = percent.payload;
    },
    totalHands(state, percent) {
      state.total = percent.payload;
    },
    passedTime(state) {
      state.passedTime = state.passedTime + 1;
    },
    fileStatusAccept(state, fileData) {
      console.log("fileStatusAccept", fileData);
      state.fileData = fileData.payload;
    }
  },
});

export const {
  uploadingStatus,
  totalHands,
  passedTime,
  fileStatusAccept,
  completedStatus,
  rejectedStatus
} = uploadingStatusSlice.actions;

export default uploadingStatusSlice.reducer;
