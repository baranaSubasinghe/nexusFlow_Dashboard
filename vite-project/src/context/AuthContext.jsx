import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Mock Enterprise Users
const MOCK_USERS = {
  admin: { name: 'Sarah Jenkins', role: 'Admin', email: 'sarah.j@nexusflow.com', avatar: 'SJ' },
  editor: { name: 'Alex Rivera', role: 'Editor', email: 'alex.r@nexusflow.com', avatar: 'AR' },
  viewer: { name: 'David Chen', role: 'David Chen', role: 'Viewer', email: 'david.c@nexusflow.com', avatar: 'DC' }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.admin);

  const switchUser = (roleKey) => {
    setCurrentUser(MOCK_USERS[roleKey]);
  };

  // Helper function to check permissions
  const hasPermission = (requiredRole) => {
    const roles = ['Viewer', 'Editor', 'Admin'];
    return roles.indexOf(currentUser.role) >= roles.indexOf(requiredRole);
  };

  return (
    <AuthContext.Provider value={{ currentUser, switchUser, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);