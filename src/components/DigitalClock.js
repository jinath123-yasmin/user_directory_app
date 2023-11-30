import React, { useState, useEffect, useRef } from 'react';

const DigitalClock = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => Number(prevTime) + Number(1));
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    // Update the time when the initialTime prop changes
    setTime(initialTime);
  }, [initialTime]);


  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (time) => {
    const x = new Date(Date.now(String(time)));
    const hours = x.getHours();
    const minutes = x.getMinutes();
    const seconds = x.getSeconds();
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  

  return (
    <div className='clock-container'>
      <p className="clock-display">{formatTime(time)}</p>
      <button className='clock-controls' onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};


export default DigitalClock;