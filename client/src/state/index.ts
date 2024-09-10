import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapse: boolean;
  isDarkMode: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapse: false,
  isDarkMode: false,
};

export const globalState = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapse: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapse = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapse } = globalState.actions;
export default globalState.reducer;
