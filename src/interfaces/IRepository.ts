// Interface designed to only retain important data from github api response for repository info.

export interface IRepository {
  name: string
  clone_url: string
  watchers_count: number
  description: String
  language: String
}
