import React from 'react';
type Props = { name: string };
export const Greeting = (props: Props) => {
  return <p>Hello {props.name}</p>;
};
