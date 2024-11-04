import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Routers } from './routers/routers';

const App = () => {
  const router = Routers;
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
};

export default App;