import React, { useEffect, useState } from 'react';

const BugList = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetch('/api/bugs')
      .then((res) => res.json())
      .then((data) => setBugs(data))
      .catch((err) => console.error('Error fetching bugs:', err));
  }, []);

  return (
    <div>
      <h2>Bug List</h2>
      <ul>
        {bugs.map((bug) => (
          <li key={bug._id}>
            <strong>{bug.title}</strong> - {bug.status} - {bug.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;
