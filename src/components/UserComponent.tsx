import { IUser } from "../interfaces/IUser";

// contains user picture, description, username and link as well as number of public repos and language graph

const UserComponent = (props: { user: IUser }) => {
  const { user } = props;
  return (
    <div>
      <div className="user-picture-container">
        <img src={'' + user.avatar_url} alt="" className="user-picture"/>
      </div>
      <div>
        <a href={"https://github.com/" + user.login} target="_blank" rel="noreferrer" className="user-link">{user.name}</a>
        <p>{user.bio}</p>
        <p>Public repos : {user.public_repos}</p>
        <p><img className="languages-picture" src={"https://github-readme-stats.vercel.app/api/top-langs?username=" + user.login + "&show_icons=true&locale=en&layout=compact"} alt="" /></p>
      </div>
    </div>
  )
};

export default UserComponent;
