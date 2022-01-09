import React, { useState } from 'react';
import { IRepository } from './interfaces/IRepository'
import { IUser } from './interfaces/IUser'
import RepositoryComponent from './components/RepositoryComponent';
import UserComponent from './components/UserComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import './App.css';


function App() {

  const [reposFound, setReposFound] = useState<IRepository[]>([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [repositoryInput, setRepositoryInput] = useState('');
  const [user, setUser] = useState<IUser>();

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

  return (
    <div className="App">
      <HeaderComponent  setReposFound={setReposFound} setUsernameInput={setUsernameInput} setUser={setUser}></HeaderComponent>
      <div className="main">
        {foundInfo()}
        <div className="repos-container">
          {(reposFound.length || '') &&
            reposFound.filter(val => {
              if (repositoryInput === '') {
                return val
              } else if (val.name.toLowerCase().includes(repositoryInput.toLowerCase())) {
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
