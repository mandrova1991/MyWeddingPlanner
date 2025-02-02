import React, {useContext, useEffect, useState} from 'react';
import {User} from "@/types";
import api from "@/axios";
import {useWeddingContext} from "@/Contexts/Wedding/WeddingContext";

type useWeddingUserReturn = {
    weddingUsers: User[];
    loading: boolean;
}

export const WeddingUserContext = React.createContext<useWeddingUserReturn | null>(null);

export const useWeddingUserContext = (): useWeddingUserReturn => {
    const context = useContext(WeddingUserContext);
    if (context === undefined) {
        throw new Error('useWeddingUserContext must be used within a TaskCategoryProvider');
    }
    return context as useWeddingUserReturn;
}

export const WeddingUserContextProvider = ({children}: { children: React.ReactNode }) => {
    const {wedding} = useWeddingContext();
    const [weddingUsers, setWeddingUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchWeddingUsers = async () => {
            const response = await api.get(route('api.wedding.users', {wedding: wedding.id}));
            setWeddingUsers(response.data.objectData || []);
            setLoading(false);
        }

        fetchWeddingUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const value = {
        'weddingUsers': weddingUsers,
        'loading': false,
    }

    return (
        <WeddingUserContext.Provider value={value}>
            {children}
        </WeddingUserContext.Provider>
    )
}
