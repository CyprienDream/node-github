import React, { FormEvent } from 'react';
import { IRepository } from '../interfaces/IRepository'
import { IUser } from '../interfaces/IUser';

// contains the logo and the username search form

// the setters are passed as pops to enable the search function
const HeaderComponent = (props: { setReposFound: React.Dispatch<React.SetStateAction<IRepository[]>>,
                                  setUsernameInput: React.Dispatch<React.SetStateAction<string>>,
                                  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> }) => {

  const search = (event: FormEvent<HTMLFormElement>,
                  setReposFound: React.Dispatch<React.SetStateAction<IRepository[]>>,
                  setUsernameInput: React.Dispatch<React.SetStateAction<string>>,
                  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>) => {

    // prevent page from refreshing
    event.preventDefault();

    // retrieve form input element from the DOM
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#username-search-text') as HTMLInputElement;
    setUsernameInput(input.value);

    // make requests to github api if the user provided an input
    if (input.value) {
      //request for github user data
      fetch(`https://api.github.com/users/${input.value}`)
        .then(res => res.json())
        .then(res => {
          setUser(res);
        })

      // request for repository data
      fetch(`https://api.github.com/users/${input.value}/repos?per_page=100`)
        .then(res => res.json())
        .then(res => {
          setReposFound(res);
        })
      // removes previous input from search
      input.value = '';
    }
  };

  return (
    <div className="header">
      <h1>Github Lookup</h1>
      <div className="search-block">
      <form className="search-form" onSubmit={event => search(event, props.setReposFound, props.setUsernameInput, props.setUser)}>
          <input id="username-search-text" className="search-text" type="search" placeholder="GitHub username" />
        <button className="search-button">Search</button>
      </form>
      </div>
    </div>
  )
};

export default HeaderComponent;
