import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    visibleContacts(_, action) {
      return action.payload;
    },
  },
});

export const { visibleContacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;