import { IUser } from "./IUser";

const UserComponent = (props: { user: IUser }) => {
  const { user } = props;
  return (
    <div className="user-container">
      <div className="user-picture-container">
        <img src={'' + user.avatar_url} alt="" className="user-picture" />
      </div>
      <div className="user-info">
        <a href={"https://api.github.com/users/" + user.login} target="_bla">{user.name}</a>
        <p>{user.bio}</p>
        <p>Public repos : {user.public_repos}</p>
      </div>
    </div>
  )
};

export default UserComponent;
