import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'; // reselect kütüphanesini import ediyoruz
import { selectNameFilter } from './filtersSlice'; // filtersSlice'dan selectNameFilter'ı import ediyoruz
import { fetchContacts, addContact, deleteContact } from './contactsOps'; // doğru importları yapıyoruz

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
    addContactDirect(state, action) {
      state.contacts.push(action.payload);
    },
    // Delete contact
    deleteContactDirect(state, action) {
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
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
      });
  },
});

// Reducer ve action'ları dışa aktar
export const { addContactDirect, deleteContactDirect, setLoading, setError } = contactsSlice.actions;

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
