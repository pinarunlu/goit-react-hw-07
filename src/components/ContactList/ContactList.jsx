import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps'; // Silme işlemi için import
import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); // Redux'tan kontakları alıyoruz

  const handleDelete = (id) => {
    dispatch(deleteContact(id)); // Kişi silme işlemi
  };

  return (
    <div>
      <h2>Contact List</h2>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
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
