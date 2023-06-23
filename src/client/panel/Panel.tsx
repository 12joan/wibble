import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ManageProfiles } from './ManageProfiles';
import { Overview } from './Overview';

const panelRouter = createMemoryRouter([
  {
    path: '/',
    element: <Overview />,
  },
  {
    path: '/manage-profiles/*',
    element: <ManageProfiles />,
  },
]);

export const Panel = () => {
  return <RouterProvider router={panelRouter} />;
};
