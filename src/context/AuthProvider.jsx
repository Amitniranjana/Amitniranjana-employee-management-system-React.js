import React, { createContext } from 'react';
import { getLocalStorage } from '../utlis/LocalStorage'; // Corrected path if necessary

export const AuthContext = createContext(null); // Added a default value (null)

const AuthProvider = ({ children }) => {
    const data = getLocalStorage() || {}; // Ensure `data` is at least an empty object

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
