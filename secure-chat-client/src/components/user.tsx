import React, { createContext, useContext, useState } from 'react';
import { UserContextType } from '../interfaces/interface';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUsername, setCurrentUsername] = useState('');

  return (
    <UserContext.Provider value={{ currentUsername, setCurrentUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
