import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';

const UserPage=()=>{


  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setUsers(users))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  return(
    <div>
    <h1 className='text-center'>User Directory</h1>
    <div className="user-container">
      {users && users.map(user => (
        <Link key={user.id} to={`/user/${user.id}`}>
          <UserCard user={user} />
        </Link>
      ))}
    </div>
      </div>
  )
}

export default UserPage