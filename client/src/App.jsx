import React from 'react';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div>
        <h1>MERN Bug Tracker</h1>
        <BugList />
      </div>
    </ErrorBoundary>
  );
}

export default App;
