import React, {
  FormEvent, SyntheticEvent, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { fetchGithubRepositories } from '../../redux/repositoryExplorer';
import { useTypedSelector } from '../../redux/rootReducer';
import Loader from '../Loader';
import GithubUsers from '../GithubUsers';
import ErrorMessage from '../ErrorMessage';

const RepositoryExplorer = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const { isLoading, error, usersRepositories } = useTypedSelector((state) => state.repositoryExplorer);

  const isSubmissionDisabled = username === '';

  const handleUsernameInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setUsername(value);
  };

  const handleFormSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (isSubmissionDisabled) {
      return;
    }

    setSubmittedUsername(username);
    dispatch(fetchGithubRepositories(username));
  };

  return (
    <section className="flex flex-col bg-white p-4 mt-4 mx-auto w-container h-100 overflow-y-scroll">
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <input
          type="text"
          value={username}
          className="bg-gray-100 border-2 border-gray-300 border-solid p-2 mb-4"
          placeholder="Enter username"
          onChange={handleUsernameInputChange}
        />
        <button
          type="submit"
          className={`
            relative flex items-center justify-center  
            text-white py-2 mb-4 ${isSubmissionDisabled ? 'bg-blue-400 cursor-default' : 'bg-blue-500 cursor-pointer'}
          `}
        >
          <span>Search</span>

          {isLoading && (
            <Loader />
          )}
        </button>
      </form>

      <div>
        {error
          ? <ErrorMessage message={error} />
          : (
            <GithubUsers
              isLoading={isLoading}
              submittedUsername={submittedUsername}
              usersRepositories={usersRepositories}
            />
          )}
      </div>
    </section>
  );
};

export default RepositoryExplorer;
