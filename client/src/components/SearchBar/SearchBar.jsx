
import styles from './SearchBar.module.css';
import React from 'react';

function SearchBar({ handleChange }) {
  return (
    <div className={styles.div}>
      <input
        className={styles.input}
        type='search'
        onChange={(e) => handleChange(e)}
        placeholder="Buscar..."
       
      />
     
    </div>
  );
}

export default SearchBar;
