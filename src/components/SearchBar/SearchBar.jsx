import { useState } from 'react';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
