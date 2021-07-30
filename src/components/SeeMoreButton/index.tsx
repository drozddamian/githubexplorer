import React, { FC } from 'react';
import ArrowSvg from './ArrowSvg';

type Props = {
  isActive: boolean;
  onClick: () => void;
}

const SeeMoreButton: FC<Props> = ({ isActive, onClick }: Props) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button onClick={onClick} className={`transform ${isActive && 'rotate-180'}`}>
    <ArrowSvg />
  </button>
);

export default SeeMoreButton;
