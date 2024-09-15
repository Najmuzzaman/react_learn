import React, { useState, useEffect } from 'react';

const FirstPage: React.FC = () => {
  // State to hold data from an API or some other source
  const [data, setData] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  // useEffect hook that runs when the component mounts
  useEffect(() => {
    console.log('Component mounted');

      // Simulate fetching data from an API
    setTimeout(() => {
      setData('Hello from useEffect on First Page!');
    }, 1000);

    // Cleanup function (optional)
    return () => {
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array means this runs once, when the component mounts

  // useEffect that runs whenever 'count' changes
  useEffect(() => {
    console.log(`Count changed: ${count}`);
  }, [count]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>First Page</h1>
      <p>{data ? data : 'Loading...'}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default FirstPage;
