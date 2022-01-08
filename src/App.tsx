import React, { FormEvent, useState } from 'react';
import { IRepository } from './IRepository'
import { IUser } from './IUser'
import RepositoryComponent from './RepositoryComponent';
import UserComponent from './UserComponent';
import FooterComponent from './FooterComponent';
import './App.css';


function App() {

  const [reposFound, setReposFound] = useState<IRepository[]>([]);
  const [repoSearch, setRepoSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<IUser>();

  const FoundInfo = () => {
    if (!repoSearch.length && !reposFound.length) return <p>Please enter a GitHub username</p>;
    if (!reposFound.length && repoSearch.length > 0) return <p>No results for {repoSearch}.</p>;
    return (
      <div>
        <UserComponent user={user as IUser}></UserComponent>
        <div>
          <input type="text" placeholder="Search repositories..." onChange={event => { setSearchTerm(event.target.value) }} />
        </div>
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
      <div className="navbar">
        <h1>Github Lookup</h1>
        <div>
          <form className="searchForm" onSubmit={event => search(event)}>
            <input id="searchText" type="text" placeholder="GitHub username" />
            <button className="search-button">Search</button>
          </form>
        </div>
      </div>
      <div className="main">
        {FoundInfo()}
        <div className="repos-container">
          {(reposFound.length || '') &&
            reposFound.filter(val => {
              if (searchTerm === '') {
                return val
              } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            }).map(repo =>
                (<RepositoryComponent key={repo.clone_url} repo={repo}></RepositoryComponent>))
          }
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
