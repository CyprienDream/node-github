import React, { FormEvent, useState } from 'react';
import { IRepository } from './IRepository'
import { IUser } from './IUser'
import RepositoryComponent from './RepositoryComponent';
import UserComponent from './UserComponent';
import './App.css';


function App() {

  const [reposFound, setReposFound] = useState<IRepository[]>([]);
  const [repoSearch, setRepoSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<IUser>();

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
