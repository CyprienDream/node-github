import { IUser } from "./IUser";

const UserComponent = (props: { user: IUser }) => {
  const { user } = props;
  return (
    <div className="user-container">
      <div className="user-picture-container">
        <img src={'' + user.avatar_url} alt="" className="user-picture" />
      </div>
      <div className="user-info">
        <a href={"https://github.com/" + user.login} target="_bla" className="user-link">{user.name}</a>
        <p>{user.bio}</p>
        <p><img src={"https://github-readme-stats.vercel.app/api/top-langs?username=" + user.login + "&show_icons=true&locale=en&layout=compact"} alt="" /></p>
        <p>Public repos : {user.public_repos}</p>
      </div>
    </div>
  )
};

export default UserComponent;
