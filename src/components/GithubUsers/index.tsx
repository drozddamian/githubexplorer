import React, { FC, Fragment, useState } from 'react';
import { UsernameWithGithubRepositories } from '../../types';
import SeeMoreButton from '../SeeMoreButton';
import RepositoriesList from '../RepositoriesList';

type Props = {
  isLoading: boolean;
  submittedUsername: string;
  usersRepositories: UsernameWithGithubRepositories[];
}

const GithubUsers: FC<Props> = ({ isLoading, submittedUsername, usersRepositories }: Props) => {
  const [activeOwner, setActiveOwner] = useState<string | null>(null);

  const handleUserBadgeClick = (username: string) => () => {
    if (username === activeOwner) {
      setActiveOwner(null);
      return;
    }
    setActiveOwner(username);
  };

  if (usersRepositories.length < 1) {
    if (submittedUsername && !isLoading) {
      return <p>No results found</p>;
    }
    return null;
  }
  return (
    <div className="flex flex-col">
      {!activeOwner && (
        <p className="text-gray-600">{`Showing users for "${submittedUsername}"`}</p>
      )}

      {usersRepositories.map(({ owner, repositories }) => {
        const isActiveUser = activeOwner === owner;

        return (
          <Fragment key={owner}>
            <div className="flex justify-between items-center bg-gray-100 p-2 my-1">
              <p>{owner}</p>

              {repositories.length > 0 && (
                <SeeMoreButton isActive={isActiveUser} onClick={handleUserBadgeClick(owner)} />
              )}
            </div>

            {isActiveUser && (
              <RepositoriesList repositories={repositories} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default GithubUsers;
