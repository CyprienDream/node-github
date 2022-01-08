import { IRepository } from "./IRepository";

const RepositoryComponent = (props: { repo: IRepository }) => {
  const { repo } = props;
  return (

    <div className="repo">
      <a href={repo.clone_url} className="card-link">
        <div className="card-body">
          <div className="repo-info">
            <h3 className="card-title">{repo.name}</h3>
            <p className="card-text">{repo.description}</p>
          </div>

          <div className="favourites">
            <p>{repo.language} - {repo.watchers_count}</p>
            <i className="fas fa-star"></i>
          </div>
        </div>
      </a>
    </div>

  )
};

export default RepositoryComponent;
