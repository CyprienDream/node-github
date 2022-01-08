import { IRepository } from "./IRepository";

const RepositoryComponent = (props: { repo: IRepository }) => {
  const { repo } = props;
  return (

    <div className="repo">
      <a href={repo.clone_url} className="card-link" target="_blank" rel="noreferrer">
        <div className="card-body">
          <div className="repo-info">
            <h3 className="card-title">{repo.name}</h3>
            <p className="card-text">{repo.description}</p>
          </div>

          <div className="favourites">
            <p>{repo.language}</p>
            <p>{repo.watchers_count} <i className="fas fa-star"></i></p>
          </div>
        </div>
      </a>
    </div>

  )
};

export default RepositoryComponent;
