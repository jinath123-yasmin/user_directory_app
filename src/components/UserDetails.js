import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import DigitalClock from './DigitalClock';

function UserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [countryList, setCountryList] = useState([]);
  const [currentTime, setCurrentTime] = useState(''); //in string
  const [userPosts, setUserPosts] = useState([]);
  const [clockPaused, setClockPaused] = useState(false);
  const [recentTime, setRecentTime] = useState('');



  useEffect(() => {
    // Fetch user details based on userId
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(user => setUserDetails(user))
      .catch(error => console.error('Error fetching user details:', error));

    // Fetch user posts based on userId
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(response => response.json())
      .then(posts => setUserPosts(posts))
      .catch(error => console.error('Error fetching user posts:', error));
  }, [userId]);

  useEffect(() => {
    // Fetch the list of countries
    fetch('https://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(timezones => {
        setCountryList(timezones);
       
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);


  const handleCountryChange = async (e) => {

    let countryData = e.target.value;
    let country = countryData.split("/")
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${country[0]}/${country[1]}`);
      const data = await response.json();
      console.log(data);
      setCurrentTime(String(data.unixtime)+'000');
      
      // Set recent time to the current time when the country is changed
      setRecentTime(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching current time:', error);
    }    
  };

  useEffect(() => {
    setCurrentTime(Date.now())
  }, [])
  

  const handlePauseResumeClick = () => {
    setClockPaused(!clockPaused);
  };

  return (
    <div>

    <div className='flex-container user-header'>
          <button onClick={() => navigate(-1)} className=' button-back'>Back</button>
          <div className='user-header'>
              <select onChange={(e) => handleCountryChange(e)}>
                {countryList.map((country, index) => (
                    <option key={country+index+1} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div><DigitalClock initialTime={currentTime} clockPaused={clockPaused} /></div> 
          </div>
      </div> 
      <h1  className='text-center'> Profile Page</h1>
      <div className='user-details'>
        <div>
            <h3 className='text-decoration'>Name:<span>{userDetails.name}</span></h3>
            <h3 className='text-decoration'>UserName: <span>{userDetails.username}</span></h3>
        </div>
        <div>
            <h3 className='text-decoration'>Address: <span> {userDetails.address && userDetails.address.city}, {userDetails.address && userDetails.address.country}</span></h3>
            <h3 className='text-decoration'>Email: <span>{userDetails.email}</span></h3>
        </div>
        </div>
        <h2  className='text-center'>Posts</h2>
        <div className="posts-container">
          {userPosts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    
  );
}

export default UserDetails;




