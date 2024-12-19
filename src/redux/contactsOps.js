import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Backend URL'si
const API_URL = 'https://6762b2ef46efb37323759854.mockapi.io/contacts';  // URL'nizi buraya yazın

// fetchContacts işlemi
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// addContact işlemi
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// deleteContact işlemi
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/${contactId}`);
      return response.data; // Sadece id döndürmek yeterli
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
