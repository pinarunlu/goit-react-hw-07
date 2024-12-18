// src/redux/contactsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'; // reselect kütüphanesini import ediyoruz
import { selectNameFilter } from './filtersSlice'; // filtersSlice'dan selectNameFilter'ı import ediyoruz

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    // Add contact
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    // Delete contact
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Set error state
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Burada backend ile ilgili işlemler yapılacak
    builder
      .addCase('contacts/fetchContacts/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('contacts/fetchContacts/fulfilled', (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase('contacts/fetchContacts/rejected', (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Reducer ve action'ları dışa aktar
export const { addContact, deleteContact, setLoading, setError } = contactsSlice.actions;

// contactsReducer'ı dışa aktar
export const contactsReducer = contactsSlice.reducer;

// selector'ı dışa aktar
export const selectContacts = (state) => state.contacts.contacts;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Filtered contacts'ı hesaplamak için reselect ile selector
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);
