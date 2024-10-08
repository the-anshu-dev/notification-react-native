import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext({});

// Create a custom provider component
export const AuthProvider = ({ children }:any) => {
    const [deviceToken, setDeviceToken] = useState(null);

    return (
        <AuthContext.Provider value={{ deviceToken, setDeviceToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook for easier access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
