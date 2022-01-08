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

    if (input.value) {
      fetch(`https://api.github.com/users/${input.value}`)
        .then(res => res.json())
        .then(res => {
          setUser(res);
          console.log("user", res);
        })

      fetch(`https://api.github.com/users/${input.value}/repos`)
        // the JSON body is taken from the response
        .then(res => res.json())
        .then(res => {
          setReposFound(res);
          console.log("repos", res);
        })
      input.value = '';
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
