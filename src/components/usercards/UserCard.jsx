import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => (
    
  <div className="user-card">
    <img src={user.avatar_url} alt={user.login} className="user-avatar" />
   
    <h3 className="user-name">{user.name || user.login}</h3>
    {/* <p className="user-bio">{user.bio}</p> */}
    <div className="followers-following">
        <p><span className='followers'>Followers: </span>{user.followers}</p>
        <p><span className='following'>Following: </span>{user.following}</p>
      </div>
  </div>

);

export default UserCard;
