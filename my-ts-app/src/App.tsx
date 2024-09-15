import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ApiCheck from './ApiCheck';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>React useState Use</h1>

        {/* Navigation links */}
        <nav>
          <Link to="/first-page">
            <button style={{ margin: '10px' }}>Go to First Page</button>
          </Link>
          <Link to="/second-page">
            <button style={{ margin: '10px' }}>Go to Second Page</button>
          </Link>
          <Link to="/api-page">
            <button style={{ margin: '10px' }}>Go to Api Page</button>
          </Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/first-page" element={<FirstPage />} />
          <Route path="/second-page" element={<SecondPage />} />
          <Route path="/api-page" element={<ApiCheck />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
