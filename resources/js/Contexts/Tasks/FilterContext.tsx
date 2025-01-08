import React, {useContext} from 'react';
import {FilterType} from "@/types/Table/Filter";
import {useFilters, useFiltersReturnType} from "@/hooks/use-filters";

export const FiltersContext = React.createContext<useFiltersReturnType | null>(null);

export const useFilterContext = (): useFiltersReturnType => {
    const context = useContext(FiltersContext);
    if (context === undefined) {
        throw new Error('useFilterContext must be used within a TaskCategoryProvider');
    }
    return context as useFiltersReturnType;
}

export const FiltersContextProvider = ({children}: {
    children: React.ReactNode
}) => {
    const filter = useFilters();

    return (
        <FiltersContext.Provider value={filter}>
            {children}
        </FiltersContext.Provider>
    )
}
