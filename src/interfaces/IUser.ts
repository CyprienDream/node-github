// Interface designed to only retain important data from github api response for user info.

export interface IUser {
  avatar_url: String
  bio: String
  login: String
  public_repos: Number
  name: String
}
