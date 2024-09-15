import React, { useState, useEffect } from 'react';

const SecondPage: React.FC = () => {
    // Initialize the count from localStorage if it exists
    
    const [count, setCount] = useState<number>(() => {
      const savedCount = localStorage.getItem('count');
      return savedCount ? (parseInt(savedCount)<0 ? 0: parseInt(savedCount) ): 0;
    });
  
    // useEffect to update localStorage whenever 'count' changes
    useEffect(() => {
       console.log(`Count changed: ${count}`);       
      localStorage.setItem('count', count.toString());
    }, [count]);
  
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Second Page</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button> <button onClick={() => setCount(count - 1)}>Decrement</button>     
      </div>
    );
  };
  
  export default SecondPage;
