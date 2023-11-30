import React,{useState,useEffect} from 'react';

function UserCard({ user,userId }) {
 
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Fetch user posts based on userId
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => setUserPosts(posts))
      .catch(error => console.error('Error fetching user posts:', error));
  }, [userId]);
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Total posts: {userPosts.length}</p> 
    </div>
  );
}

export default UserCard;
