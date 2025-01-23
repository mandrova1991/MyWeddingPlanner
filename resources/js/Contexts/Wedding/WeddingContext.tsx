import React, {createContext, useContext, useEffect, useState} from 'react';
import api from "@/axios";
import {log} from "util";

export type UseWeddingContextReturnType = {
    wedding: {id: number};
}

export const WeddingContext = createContext<UseWeddingContextReturnType | undefined>(undefined);

export const UseWeddingContext = (): UseWeddingContextReturnType => {
    const context = useContext(WeddingContext);
    if (context === undefined) {
        throw new Error('useContext must be used within a WeddingContextProvider');
    }
    return context as UseWeddingContextReturnType;
}

export const WeddingContextProvider = ({children, weddingId}: { children: React.ReactNode, weddingId: number }) => {
    console.log('weddingId', weddingId);
    // const [wedding, setWedding] = useState<any>([]);

    // useEffect(() => {
    //     const getWedding = async () => {
    //         const response = await api.get(route('api.wedding.show', {wedding: weddingId}));
    //         setWedding(response.data);
    //     }
    //
    //     getWedding();
    // }, []);

    // console.log(wedding);

    return (
        <WeddingContext.Provider value={{wedding: {id: weddingId}}}>
            {children}
        </WeddingContext.Provider>
    )
}
