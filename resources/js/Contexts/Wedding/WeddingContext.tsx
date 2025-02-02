import React, {createContext, useContext, useEffect, useState} from 'react';
import api from "@/axios";
import {log} from "util";

export type UseWeddingContextReturnType = {
    wedding: WeddingType;
}

export const WeddingContext = createContext<UseWeddingContextReturnType | undefined>(undefined);

export const useWeddingContext = (): UseWeddingContextReturnType => {
    const context = useContext(WeddingContext);
    if (context === undefined) {
        throw new Error('useContext must be used within a WeddingContextProvider');
    }
    return context as UseWeddingContextReturnType;
}

export const WeddingContextProvider = ({children, weddingId}: { children: React.ReactNode, weddingId: number }) => {
    // console.log('weddingId', weddingId);
    const [wedding, setWedding] = useState<WeddingType>({} as WeddingType);

    console.log(weddingId)

    useEffect(() => {
        const getWedding = async () => {
            const response = await api.get(route('api.wedding.show', {wedding: weddingId}));
            setWedding(response.data);
        }

        if (weddingId) {
            getWedding();
        }

    }, [weddingId]);

    return (
        <WeddingContext.Provider value={{wedding}}>
            {wedding.id && (
                children
            )}

        </WeddingContext.Provider>
    )
}
