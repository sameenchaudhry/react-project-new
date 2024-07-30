import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './components/searchbar/SearchBar';
import UserCard from './components/usercards/UserCard';
import UserDetail from './components/userdetails/UserDetail';
import Logo from './components/logo/Logo';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
 
  const navigate = useNavigate();

  const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

  useEffect(() => {
    fetchInitialUsers();
  }, []);



  const fetchInitialUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Fetch a list of users from the GitHub API
      const { data } = await axios.get('https://api.github.com/users', {
        headers: {
          Authorization: `token ${accessToken}`
        }
      });

      // Fetch detailed information for each user
      const userDetails = await Promise.all(
        data.map(user =>
          axios.get(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `token ${accessToken}`
            }
          })
        )
      );

      const detailedUsers = userDetails.map(response => response.data);
      setUsers(detailedUsers);
      setSearchResults(detailedUsers);
    } catch (error) {
      console.error("Error fetching initial users:", error);
      setError('Error fetching initial users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (username) => {
    setError('');
  
    if (username.trim()) {
      const cachedUser = localStorage.getItem(username);
      if (cachedUser) {
        setSearchResults([JSON.parse(cachedUser)]);
      } else {
        try {
          const { data } = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
              Authorization: `token ${accessToken}`
            }
          });
          localStorage.setItem(username, JSON.stringify(data));
          setSearchResults([data]);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setSearchResults([]);
          setError('User not found');
        }
      }
    } 
    else {
      fetchInitialUsers();
    }
  };

  const handleCardClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="home-screen">
      {window.location.pathname === '/' && <Logo />}
      {window.location.pathname === '/' && <SearchBar onSearch={handleSearch} fetchInitialUsers={fetchInitialUsers} error={error} />}
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
       <Routes>
        <Route path="/" element={
        <div className="user-container">
        {searchResults.map((user) => (
          <div key={user.id} className="user-card-link" onClick={() => handleCardClick(user.login)}>
            <UserCard user={user} />
          </div>
        ))}
      </div>} />
        <Route path="/user/:username" element={<UserDetail />} />
      </Routes>
    </div>
    
  );
};

export default App;
