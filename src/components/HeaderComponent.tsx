import React, { FormEvent } from 'react';
import { IRepository } from '../IRepository'
import { IUser } from '../IUser';


const HeaderComponent = (props: { reposFound: IRepository[], setReposFound: React.Dispatch<React.SetStateAction<IRepository[]>>,
                                  usernameInput: string, setUsernameInput: React.Dispatch<React.SetStateAction<string>>,
                                  user: IUser | undefined, setUser: React.Dispatch<React.SetStateAction<IUser | undefined>> }) => {
  // const { user } = props;

  const search = (event: FormEvent<HTMLFormElement>,
                  setReposFound: React.Dispatch<React.SetStateAction<IRepository[]>>,
                  setUsernameInput: React.Dispatch<React.SetStateAction<string>>,
                  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>) => {

    console.log("clicked search");

    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#search-text') as HTMLInputElement;

    setUsernameInput(input.value);
    console.log("input value", input.value);

    if (input.value) {
      fetch(`https://api.github.com/users/${input.value}`)
        .then(res => res.json())
        .then(res => {
          setUser(res);
          console.log("user", res);
        })

      fetch(`https://api.github.com/users/${input.value}/repos?per_page=100`)
        .then(res => res.json())
        .then(res => {
          setReposFound(res);
          console.log("repos", res);
        })
      input.value = '';
    }
  };

  return (
    <div className="navbar">
      <h1>Github Lookup</h1>
      <form className="search-form" onSubmit={event => search(event, props.setReposFound, props.setUsernameInput, props.setUser)}>
        <input id="search-text" type="search" placeholder="GitHub username" />
        <button className="search-button">Search</button>
      </form>
    </div>
  )
};

export default HeaderComponent;
