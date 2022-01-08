import { IRepository } from "./IRepository";

const RepositoryComponent = (props: { repo: IRepository }) => {
  const { repo } = props;
  return (

    <div className="repo">
      <a href={repo.clone_url} className="card-link">
        <div className="card-body">
          <h3 className="card-title">{repo.name}</h3>
          <p className="card-text">{repo.description}</p>
          <p>{repo.language}</p>
          <p>Stars : {repo.watchers_count}</p>
        </div>
      </a>
    </div>

  )
};

export default RepositoryComponent;
