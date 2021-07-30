import React, { FC } from 'react';
import { GithubRepository } from '../../types';
import StarsCounter from '../StarsCounter';

type Props = {
  repositories: GithubRepository[]
}

const RepositoriesList: FC<Props> = ({ repositories }: Props) => (
  <div className="flex flex-col">
    {repositories.map(({
      id, name, description, stargazers_count,
    }) => (
      <div key={id} className="bg-gray-300 ml-8 p-2 my-1.5 min-h-75">
        <header className="flex items-center justify-between">
          <h3 className="font-bold text-sm max-w-170 overflow-hidden overflow-ellipsis">
            {name}
          </h3>

          <StarsCounter count={stargazers_count} />
        </header>

        <p className="text-xs">
          {description || 'No description'}
        </p>
      </div>
    ))}
  </div>
);

export default RepositoriesList;
