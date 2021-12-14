import React from 'react';
import logo from './logo.svg';
import { truncateSingleLine, prepareTruncateOptions } from '../../src/graphic/helper/parseText'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        { truncateSingleLine('test', prepareTruncateOptions(100, 'sans-serif', '...', { placeholder: '%'})) }
      </header>
    </div>
  );
}

export default App;
