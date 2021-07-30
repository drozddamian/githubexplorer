import { GithubUser } from '../types';

const fetchGithubUsers = async (username: string): Promise<GithubUser[]> => {
  const query = `?q=${username} in:login&per_page=5`;
  const response = await fetch(`https://api.github.com/search/users${query}`);
  const usersJSON = await response.json();
  return usersJSON.items;
};

const fetchUserRepositories = async (githubUsers: GithubUser[]) => Promise.all(
  githubUsers.map(async ({ repos_url }) => (await fetch(repos_url)).json()),
);

export default {
  fetchGithubUsers,
  fetchUserRepositories,
};
