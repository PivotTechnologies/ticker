import React from 'react';
import NavBar from './NavBar.jsx';

const App = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
);

export default App;
