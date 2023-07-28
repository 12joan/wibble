import React, { useLayoutEffect, useState } from 'react';
import * as Icons from 'react-bootstrap-icons';
import { useAppContext } from './appContext';
import { ExitAnimation } from './ExitAnimation';

export const DisconnectedWarning = () => {
  const { isConnected } = useAppContext();
  const [hasBeenConnected, setHasBeenConnected] = useState(isConnected);

  useLayoutEffect(() => {
    if (isConnected) {
      setHasBeenConnected(true);
    }
  }, [isConnected]);

  return (
    <ExitAnimation isOpen={!isConnected && hasBeenConnected}>
      <div className="fixed top-0 left-0 p-4 rounded-lg w-full md:max-w-md animate-in slide-in-from-top exiting:animate-out exiting:fade-out z-50">
        <div
          className="bg-red-600 text-white p-4 rounded-lg shadow-xl flex gap-2 items-center text-lg"
          role="alert"
        >
          <Icons.CloudSlashFill aria-hidden size="1.25em" />
          Connection lost
        </div>
      </div>
    </ExitAnimation>
  );
};
