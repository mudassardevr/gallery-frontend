import { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ chilren }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading , setLoading }}>
      {chilren}
    </LoadingContext.Provider>
  );
};
