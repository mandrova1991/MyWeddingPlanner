import React, {useContext, useEffect, useState} from 'react';
import {PermissionType} from "@/types/Permissions";
import api from "@/axios";
import {useWeddingContext} from "@/Contexts/Wedding/WeddingContext";

type PermissonContextReturnType = {
    permissions: PermissionType[];
    loading: boolean;
    hasPermissionTo: (permission: PermissionType) => boolean;
}

export const PermissionContext = React.createContext<PermissonContextReturnType | undefined>(undefined);

export const usePermissionContext = (): PermissonContextReturnType => {
    const context = useContext(PermissionContext);
    if (context === undefined) {
        throw new Error('usePermissionContext must be used within a TaskCategoryProvider');
    }
    return context as PermissonContextReturnType;
}

export const PermissionContextProvider = ({children}: { children: React.ReactNode}) => {
    const {wedding} = useWeddingContext();
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

    const hasPermissionTo = (permission: PermissionType) => {
        if (permissions.includes(permission)){
            return true;
        }

        return false;
    }

    return (
        <PermissionContext.Provider value={{permissions, loading, hasPermissionTo}}>
            {children}
        </PermissionContext.Provider>
    )
}
