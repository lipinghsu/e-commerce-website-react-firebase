

import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { auth } from '../firebase/config';

const authContext = createContext();

export const useAuthContext = () => {
    return useContext(authContext);
};

const AuthContext = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState({ isOpen: false, title: '', content: '' });
    const [alert, setAlert] = useState({
        isAlert: false,
        severity: 'info',
        message: '',
        timeout: null,
        location: '',
    });
    const [loading, setLoading] = useState(false);



    const value = {
        currentUser,
        modal,
        setModal,
        alert,
        setAlert,
        loading,
        setLoading,
    };

    return <authContext.Provider {...{ value }}>{children}</authContext.Provider>;
};

export default AuthContext;