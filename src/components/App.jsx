// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../redux/contactsOps'; // Operations dosyasını import ediyoruz
import { selectFilteredContacts } from '../redux/contactsSlice'; // Filtrelenmiş kişiler için selector
import { setNameFilter } from '../redux/filtersSlice'; // Filtreyi güncellemek için slice'ı import ediyoruz
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter'; // Filter bileşenini import ediyoruz

function App() {
  const dispatch = useDispatch();

  // Filtrelenmiş kişileri seçmek için selector kullanıyoruz
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);

  // İlk renderda backend'den kişi verilerini almak için useEffect kullanıyoruz
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Phonebook</h1>

      {/* Yükleniyorsa loading göstergesi */}
      {loading && <p>Loading...</p>}

      {/* Hata varsa hata mesajı */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

       

      {/* Form ve kişi listesi */}
      <ContactForm />
       <Filter />
      <ContactList contacts={contacts} />

      
    </div>
  );
}

export default App;
