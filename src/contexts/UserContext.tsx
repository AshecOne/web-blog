"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface IUserContext {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultState = {
  username: null,
  setUsername: () => {},
};

export const UserContext = createContext<IUserContext>(defaultState);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
