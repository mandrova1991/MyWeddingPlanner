import React, {useContext, useEffect, useState} from 'react';
import {PermissionType} from "@/types/Permissions";
import api from "@/axios";
import {UseWeddingContext, useWeddingContext} from "@/Contexts/Wedding/WeddingContext";

type PermissonContextReturnType = {
    permissions: PermissionType[];
    loading: boolean;
}

export const PermissionContext = React.createContext<PermissonContextReturnType>({permissions: [], loading: true});

export const UsePermissionContext = (): PermissonContextReturnType => {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermissionContext must be used within a TaskCategoryProvider');
    }
    return context as PermissonContextReturnType;
}

export const PermissionContextProvider = ({children}: { children: React.ReactNode}) => {
    const {wedding} = UseWeddingContext();
    const [permissions, setPermissions] = useState<PermissionType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPermissions = async () => {
            const response = await api.get(route('api.wedding.auth.permissions', {wedding: wedding.id}));
            setPermissions(response.data);
            setLoading(false);
        }

        fetchPermissions();
    }, []);

    return (
        <PermissionContext.Provider value={{permissions, loading}}>
            {children}
        </PermissionContext.Provider>
    )
}
