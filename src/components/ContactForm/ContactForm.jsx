import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { addContact } from '../../redux/contactsOps'; // operations'tan eylemler
import styles from './ContactForm.module.css';



const ContactForm = ({ contactToEdit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhone(contactToEdit.phone);
    }
  }, [contactToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactToEdit) {
      // Eğer düzenleme yapılıyorsa, güncelleme işlemi yapılacak
      // API veya backend üzerinden güncelleme yapılabilir
    } else {
      // Yeni bir kişi ekleniyor
      dispatch(addContact({ name, phone }));
    }

    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
       <div className={styles.inputText}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        required
        />
        </div>
      <div className={styles.inputNumber}>
      <label>Phone</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone"
        required
        />
        </div>
      <button className={styles.submit} type="submit">{contactToEdit ? 'Update' : 'Add Contact'}</button>
    </form>
  );
};

export default ContactForm;
