import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, fetchInitialUsers, error }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (username.trim()) {
      onSearch(username);
    } else {
      fetchInitialUsers(); // Fetch initial users if the search bar is empty
    }
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Search GitHub username..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBar;
