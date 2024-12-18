// store.js
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filtersSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // DevTools'u devre dışı bırakmak için üretim ortamında false yapabilirsiniz.
});

export default store;

