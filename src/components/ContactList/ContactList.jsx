import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';
import { selectNameFilter } from '../../redux/filtersSlice'; // Filtre seçici
import styles from './ContactList.module.css';



const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const nameFilter = useSelector(selectNameFilter); // Redux'tan filtre değeri alınıyor

  // Filtreleme işlemi
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      <h2>Contact List</h2>
      {filteredContacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <ul className={styles.contactList}>
          {filteredContacts.map((contact) => (
            <li  key={contact.id}>
              <p><strong>{contact.name}</strong></p>
              <p>Phone: {contact.number}</p>
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
