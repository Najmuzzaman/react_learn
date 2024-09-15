import React, { useState, useEffect } from 'react';

const ApiCheck: React.FC = () => {
  // State to hold the list of users
  const [users, setUsers] = useState<any[]>([]);
  // State to manage loading state
  const [loading, setLoading] = useState<boolean>(true);
  // State to handle any errors during fetching
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch data from the API when the component mounts
  useEffect(() => {
    // Fetching user data from an API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data); // Set the fetched users in state
      } catch (err) {
        //setError(err.message); // Set error if fetching fails
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };
    fetchUsers(); // Call the fetch function
    // Cleanup function (if needed) would go here
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Display a loading message while fetching
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error if something goes wrong
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li> // Display the user name for each fetched user
        ))}
      </ul>
    </div>
  );
};

export default ApiCheck;
