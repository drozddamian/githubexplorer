import React, { FC } from 'react';

type Props = {
  message: string;
}

const ErrorMessage: FC<Props> = ({ message }: Props) => (
  <p className="text-red-600">
    {message}
  </p>
);

export default ErrorMessage;
