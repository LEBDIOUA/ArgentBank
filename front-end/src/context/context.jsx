import React, { createContext, useContext, useState } from "react";

const EtatCnxContext = createContext();

export const EtatCnxProvider = ({ children }) => {
  const [etatCnx, setEtatCnx] = useState(false);

  return (
    <EtatCnxContext.Provider value={{ etatCnx, setEtatCnx }}>
      {children}
    </EtatCnxContext.Provider>
  );
};
export const useEtatCnx = () => useContext(EtatCnxContext);
