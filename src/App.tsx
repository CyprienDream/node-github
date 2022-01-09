import React, { useState } from 'react';
import { IRepository } from './interfaces/IRepository'
import { IUser } from './interfaces/IUser'
import RepositoryComponent from './components/RepositoryComponent';
import UserComponent from './components/UserComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import './App.css';


function App() {

  // defines a set of variables and their setters useful for storing api and user data
  const [reposFound, setReposFound] = useState<IRepository[]>([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [repositoryInput, setRepositoryInput] = useState('');
  const [user, setUser] = useState<IUser>();

  // renders user data if the request was successful and an informative message otherwise
  const foundInfo = () => {
    if (!usernameInput.length && !reposFound.length) return <p>Please enter a GitHub username</p>;
    if (!reposFound.length && usernameInput.length > 0) return <p>No results for {usernameInput}.</p>;
    return (
      <div className="user-container">
        <UserComponent user={user as IUser}></UserComponent>
        <div className="filter-repo">
          <input type="text" placeholder="Filter repositories..." className="search-text" onChange={event => { setRepositoryInput(event.target.value) }} />
        </div>
      </div>
    )
  }

  // displays repository components with user filtering functionality
  const displayRepos = () => {
    return (
    <div className="repos-container">
      {(reposFound.length || '') &&
        reposFound.filter(val => {
          // return all elements if there is no filtering input
          if (repositoryInput === '') {
            return val
            // return value if it matches filtering input
          } else if (val.name.toLowerCase().includes(repositoryInput.toLowerCase())) {
            return val
          }
        }).map(repo =>
          (<RepositoryComponent key={repo.clone_url} repo={repo}></RepositoryComponent>))
      }
    </div>
    )
  }

  return (
    <div className="App">
      <HeaderComponent  setReposFound={setReposFound} setUsernameInput={setUsernameInput} setUser={setUser}></HeaderComponent>
      <div className="main">
        {foundInfo()}
        {displayRepos()}
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
