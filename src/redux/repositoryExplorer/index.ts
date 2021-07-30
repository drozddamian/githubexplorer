import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../rootReducer';
import githubApi from '../../api';
import { GithubRepository, GithubUser, UsernameWithGithubRepositories } from '../../types';

export type RepositoryExplorerState = {
  isLoading: boolean;
  error: string | null;
  usersRepositories: UsernameWithGithubRepositories[]
}

const initialState: RepositoryExplorerState = {
  isLoading: false,
  error: null,
  usersRepositories: [],
};

const slice = createSlice({
  name: 'repositoryExplorer',
  initialState,
  reducers: {
    repositoryExplorerActionStart(state) {
      state.isLoading = true;
      state.error = null;
      state.usersRepositories = [];
    },
    repositoryExplorerActionSuccess(state, action: PayloadAction<UsernameWithGithubRepositories[]>) {
      state.usersRepositories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    repositoryExplorerActionFailure(state) {
      state.isLoading = false;
      state.error = 'Oops something went wrong...';
    },
  },
});

export const {
  repositoryExplorerActionStart,
  repositoryExplorerActionSuccess,
  repositoryExplorerActionFailure,
} = slice.actions;

const getFormattedGithubRepositoriesData = (githubUsers: GithubUser[]) => (githubRepositories: GithubRepository[], index: number) => {
  if (githubRepositories.length < 1) {
    return ({ owner: githubUsers[index].login, repositories: [] });
  }
  return ({
    owner: githubRepositories[0].owner.login,
    repositories: githubRepositories,
  });
};

export const fetchGithubRepositories = (usernameQuery: string): AppThunk => async (dispatch) => {
  try {
    dispatch(repositoryExplorerActionStart());

    const githubUsers = await githubApi.fetchGithubUsers(usernameQuery);
    const githubUsersRepositories = await githubApi.fetchUserRepositories(githubUsers);
    const formattedGithubData = githubUsersRepositories.map(getFormattedGithubRepositoriesData(githubUsers));

    dispatch(repositoryExplorerActionSuccess(formattedGithubData));
  } catch (error) {
    dispatch(repositoryExplorerActionFailure());
  }
};

export default slice;
