import React, { FC } from 'react';
import StarSvg from './StarSvg';

type Props = {
  count: number;
}

const StarsCounter: FC<Props> = ({ count }: Props) => (
  <div className="flex items-center">
    <span className="mr-2">{count}</span>
    <div className="w-4 h-4">
      <StarSvg />
    </div>
  </div>
);

export default StarsCounter;
