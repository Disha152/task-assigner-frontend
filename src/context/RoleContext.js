import React, { createContext, useState } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  const selectRole = (userRole) => {
    setRole(userRole);
  };

  return (
    <RoleContext.Provider value={{ role, selectRole }}>
      {children}
    </RoleContext.Provider>
  );
};
