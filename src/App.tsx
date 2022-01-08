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

  const FoundInfo = () => {
    if (!repoSearch.length && !reposFound.length) return <p>Enter a GitHub username</p>;
    if (!reposFound.length && repoSearch.length > 0) return <p>No results for {repoSearch}.</p>;
    return (
      <div>
        <p>Results for {repoSearch}...</p>
        <UserComponent user={user as IUser}></UserComponent>
      </div>
    )
  }

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
      {FoundInfo()}
      <div className="repos-container">
        {(reposFound.length || '') &&
          reposFound.filter(val => {
            if (searchTerm === '') {
              return val
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          })
            .map(repo =>
              (<RepositoryComponent key={repo.clone_url} repo={repo}></RepositoryComponent>))
        }
      </div>
    </div>
  );
}

export default App;
