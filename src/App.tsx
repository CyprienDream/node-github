import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Github Lookup</h1>
      <form className="searchForm" >
        <input id="searchText" type="text" placeholder="GitHub username" />
        <button>Search</button>
      </form>

    </div>
  );
}

export default App;
