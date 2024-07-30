// UserDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './UserDetail.css'

const UserDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
        const { data } = await axios.get(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });
        setUserDetails(data);
      } catch (error) {
        setError('Error fetching user details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleBack = () => {
    navigate('/');
  };

  if (isLoading) {
    return <p className='loading'>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <button onClick={handleBack} className='back-button'>Back</button>
      <div className='profile-det-main'>
      {userDetails && (
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-img'>
                    <img src={userDetails.avatar_url} alt='Avatar' className='profile-avatar'></img>
                </div>
                
                <div className='profile-details'>

                    <div className='profile-des'>
                        <h2 className='profile-name'>{userDetails.name}</h2>
                    <a href={userDetails.html_url} target='_blank' rel="noreferrer" className='profile-username'>@{userDetails.login}</a>
                    <p className='profile-bio'>{userDetails.bio}</p>
</div>
                    <div className='profile-stats'>
                        <p className='profile-repos'>Repositories<br/><span className='stats'>{userDetails.public_repos}</span></p>
                        <p className='profile-followers'>Followers<br/><span className='stats'>{userDetails.followers}</span></p>
                        <p className='profile-following'>Following<br/><span className='stats'>{userDetails.following}</span></p>
                    </div>

                </div>
            </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserDetail;
