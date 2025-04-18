import { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RouterContext = createContext(undefined);

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
};

export const RouterProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <RouterContext.Provider value={{ location, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
