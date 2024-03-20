"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ICategoryContext {
  title: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultState = {
  title: null,
  setCategory: () => {},
};

export const CategoryContext = createContext<ICategoryContext>(defaultState);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <CategoryContext.Provider value={{ title, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
