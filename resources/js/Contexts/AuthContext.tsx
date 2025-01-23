import React, {useContext, useEffect, useState} from 'react';
import {boolean} from "zod";
import {User} from "@/types";
import api from "@/axios";

type useAuthReturnType = {
    authenticated: boolean;
    user: User | never[];
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
    const [user, setUser] = useState<User | never[]>([]);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const getLoggedInUser = async () => {
            const response = await api.get(route("api.auth.user"));
            setUser(response.data);
            setAuthenticated(true);
        }

        getLoggedInUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, authenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
