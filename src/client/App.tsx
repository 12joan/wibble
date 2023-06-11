import React from 'react';
import { useSocket } from './useSocket';

export const App = () => {
  useSocket();
  return <div>Hello World</div>;
};
