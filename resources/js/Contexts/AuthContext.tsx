import React, {useContext, useEffect, useState} from 'react';
import {boolean} from "zod";
import {User} from "@/types";
import api from "@/axios";

type useAuthReturnType = {
    user: User;
    authenticated: boolean;
}

export const AuthContext = React.createContext<useAuthReturnType | null>(null);

export const useAuthContext = (): useAuthReturnType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a TaskCategoryProvider');
    }
    return context as useAuthReturnType;
}

export const AuthContextProvider = ({children}: { children: React.ReactNode,}) => {
    const [user, setUser] = useState<User>({} as User);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const getLoggedInUser = async () => {
            const response = await api.get(route("api.auth.user"));
            setUser(response.data);
            setAuthenticated(true);
        }

        getLoggedInUser();
    }, []);

    const value = {
        user: user,
        authenticated: authenticated,
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
