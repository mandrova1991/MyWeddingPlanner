import React, {useEffect, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {
    ArrowDown, ArrowDownNarrowWide,
    ArrowUp, Ban, ChevronsUpDown,
    EyeOff,
    ListFilterPlus,
} from "lucide-react";
import PopoverButton from "@/Components/ui/PopoverButton";
import {ColumnConfig} from "@/types/Table/Column";
import {Separator} from "@/Components/ui/separator";
import {useFilterContext} from "@/Contexts/Tasks/FilterContext";
import {TaskType} from "@/types/Tasks/Task";
import {SortType} from "@/types/Table/Filter";



function ColumnOptionsDropdown({columnConfig}: { columnConfig: ColumnConfig }) {
    const filterContext = useFilterContext();
    const [sortDirection, setSortDirection] = useState<SortType>(filterContext.derived.currentColumnDirection(columnConfig.dataKey as keyof TaskType));
    const [columFiltered, setColumFiltered] = useState<boolean>(filterContext.derived.isColumnFiltered(columnConfig.dataKey as keyof TaskType));

    useEffect(() => {
        setSortDirection(filterContext.derived.currentColumnDirection(columnConfig.dataKey as keyof TaskType));
    }, [filterContext.derived.currentColumnDirection(columnConfig.dataKey as keyof TaskType)]);

    useEffect(() => {
        setColumFiltered(filterContext.derived.isColumnFiltered(columnConfig.dataKey as keyof TaskType));
    }, [filterContext.derived.isColumnFiltered(columnConfig.dataKey as keyof TaskType)]);

    const handleSort = () => {
        filterContext.actions.setListSortedWithinCategories(true); // Make sure that the sortation is always in category format
        filterContext.handlers.addFilter(columnConfig.dataKey as keyof TaskType); // Add a new filter based on this column
    }

    const handleColumnSort = () => {
        filterContext.handlers.addFilter(columnConfig.dataKey as keyof TaskType); // Add a new filter
        filterContext.actions.setListSortedWithinCategories(false); // Make sure that the sortation is always in category format
    }


    // Clear this column from the filterList
    const handleClearSort = () => {
        setSortDirection(null);
        setColumFiltered(false);
        filterContext.handlers.removeFilter(columnConfig.dataKey as keyof TaskType); // Remove filter
    }



    const handleHideColumn = () => {
        // TODO implement methods to hide this column
    }



    return (
        <>
            {columFiltered && sortDirection == "asc" && (
                <ArrowUp strokeWidth={1.25} size={"18"}/>
            )}



            {columFiltered && sortDirection != "asc" && (
                <ArrowDown strokeWidth={1.25} size={"18"}/>
            )}



            <Popover>
                <PopoverTrigger className="ml-auto flex">
                    <ListFilterPlus className="ml-auto group-hover:opacity-100 opacity-0 cursor-pointer mr-2" size={'18px'}
                                    strokeWidth={1.25}/>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                    <PopoverButton onClick={() => handleSort()}>
                        <ChevronsUpDown strokeWidth={1.25} size={"18px"} />
                        <p className="ml-3">Sort</p>
                    </PopoverButton>


                    <PopoverButton onClick={() => handleColumnSort()}>
                        <ArrowDownNarrowWide strokeWidth={1.25} size={"18px"} />
                        <p className="ml-3">Sort Column</p>
                    </PopoverButton>


                    {columFiltered && (
                        <PopoverButton onClick={() => handleClearSort()}>
                            <div className="flex items-center">
                                <Ban strokeWidth={1.25} size={"18px"} />
                                <p className="ml-3">Clear</p>
                            </div>
                        </PopoverButton>
                    )}


                    <Separator />
                    <PopoverButton onClick={() => handleHideColumn()}>
                        <>
                            <EyeOff strokeWidth={1.25} size={"18px"} />
                            <p className="ml-3">Hide Column</p>
                        </>
                    </PopoverButton>
                </PopoverContent>
            </Popover>
        </>
    );
}

export default ColumnOptionsDropdown;