import React from 'react';
import logo from './logo.svg';
import './App.css';
import Team from './components/Team'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        NBA API, enter first and last name 
        <Team />
      </header>
    </div>
  );
}

export default App;
