import React from 'react';
import { Link } from 'react-router-dom';

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>This is a simple test page to verify routing</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ margin: '0 10px', color: 'blue' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 10px', color: 'blue' }}>About</Link>
        <Link to="/projects" style={{ margin: '0 10px', color: 'blue' }}>Projects</Link>
        <Link to="/contact" style={{ margin: '0 10px', color: 'blue' }}>Contact</Link>
      </div>
    </div>
  );
};

export default TestPage;