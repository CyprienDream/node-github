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

  const search = (event: FormEvent<HTMLFormElement>) => {
    console.log("clicked search");

    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;

    setRepoSearch(input.value);
    console.log("input value", input.value);


    }
  };


  return (
    <div className="App">
      <h1>Github Lookup</h1>
      <form className="searchForm" onSubmit={event => search(event)}>
        <input id="searchText" type="text" placeholder="GitHub username" />
        <button>Search</button>
      </form>

    </div>
  );
}

export default App;
