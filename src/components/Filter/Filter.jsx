import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter } from '../../redux/filtersSlice'; // doğru import
import styles from './Filter.module.css';


const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name); // Redux store'dan mevcut filtre değerini alıyoruz

  const handleFilterChange = (e) => {
    dispatch(setNameFilter(e.target.value)); // setNameFilter'ı dispatch ediyoruz
  };

  return (
    <div className={styles.filterBox}>
      <p>Find Contacts by name</p>
      <input className={styles.filterInput}
        type="text"
        value={filter} // Mevcut filtre değeri input'un değerine atanıyor
        onChange={handleFilterChange} // input değiştikçe filtreyi güncelliyoruz
      />
    </div>
  );
};

export default Filter;
