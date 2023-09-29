import styles from './SearchBar.module.css';
import { useState } from "react";

function SearchBar({ handleChange, handleSubmit }) {

  return (
    <div className={styles.div}>
      <input
        className={styles.input}
        type='search'
        onChange={(e)=>handleChange(e)}
      />
      <button className={styles.btn} onClick={handleSubmit}>Agregar</button>
    </div>
  );
}

export default SearchBar;
