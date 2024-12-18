// src/redux/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Başlangıç durumu
const initialState = {
  nameFilter: '', // Filtreleme için başlangıç değeri boş
};

// Slice oluşturuluyor
const filtersSlice = createSlice({
  name: 'filters',
  initialState, // Başlangıç durumu burada tanımlandı
  reducers: {
    // Filtreleme değerini güncelleyen reducer
    setNameFilter(state, action) {
      state.nameFilter = action.payload;
    },
  },
});

// Actions dışa aktarılıyor
export const { setNameFilter } = filtersSlice.actions;

// Selectors dışa aktarılıyor
export const selectNameFilter = (state) => state.filters.nameFilter;

// Reducer dışa aktarılıyor
export const filterReducer = filtersSlice.reducer;

// Varsayılan olarak reducer'ı dışa aktar
export default filtersSlice.reducer;
