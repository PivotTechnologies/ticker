import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavBar from './NavBar.jsx';

injectTapEventPlugin();

const App = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <NavBar />
      {children}
    </div>
  </MuiThemeProvider>
);

export default App;
