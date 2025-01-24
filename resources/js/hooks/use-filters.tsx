import React, { useEffect, useState } from "react";
import { ColumnConfig } from "@/types/Table/Column";
import { FilterType, SortType } from "@/types/Table/Filter";
import { TaskType } from "@/types/Tasks/Task";
import { TaskCategoryType } from "@/types/Tasks/TaskCategory";


export type useFiltersReturnType = {
    states: {
        filters: FilterType[];
        listSortedWithinCategories: boolean;
        filteredTaskList: TaskCategoryType[] | TaskType[];
    },
    handlers: {
        addFilter: (column: keyof TaskType) => void;
        removeFilter: (column: keyof TaskType) => void;
    },
    actions: {
        setOriginalList: (list: TaskCategoryType[]) => void;
        applyFilter: () => void;
        setListSortedWithinCategories: React.Dispatch<React.SetStateAction<boolean>>;
    },
    derived: {
        isColumnFiltered: (column: keyof TaskType) => boolean;
        currentColumnDirection: (column: keyof TaskType) => SortType | null;
    },
};

export const useFilters = (): useFiltersReturnType => {
    const [filters, setFilters] = useState<FilterType[]>([]);
    const [originalTaskList, setOriginalTaskList] = useState<TaskCategoryType[]>([]); // Originele lijst
    const [filteredTaskList, setFilteredTaskList] = useState<TaskCategoryType[] | TaskType[]>([]);
    const [listSortedWithinCategories, setListSortedWithinCategories] = useState(true);

    useEffect(() => {
        if (originalTaskList.length > 0) {
            setFilteredTaskList(applyFilter());
   }
    }, [filters, listSortedWithinCategories]);

    // Stel de originele taaklijst in bij de initiële laden
    const setOriginalList = (list: TaskCategoryType[]) => {
        setOriginalTaskList([...list]);
        setFilteredTaskList([...list]);
    };

    const addFilter = (column: keyof TaskType) => {
        if (!filterExists(column)) {
            const newFilter = generateNewFilter(column);
            setFilters([...filters, newFilter]);
        } else {
            const currentDirection = filters.find((filter) => filter.dataType === column)?.direction;
            const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
            const updatedFilters = filters.map((filter) =>
                filter.dataType === column ? { ...filter, direction: newDirection } : filter
            );
            // @ts-ignore
            setFilters(updatedFilters);
        }
    };

    const removeFilter = (column: keyof TaskType) => {
        setFilters(filters.filter((filter) => filter.dataType !== column));
    };

    const applyFilter = (): TaskCategoryType[] | TaskType[] => {
        if (filters.length === 0) {
            return {...originalTaskList}
        }

        const listToSort = [...originalTaskList];

        let sortedList: TaskCategoryType[] | TaskType[] = [];

        if (listSortedWithinCategories) {
            sortedList = listToSort.map((category) => ({
                ...category,
                tasks: sortTasks(category.tasks),
            }));
        } else {
            sortedList = sortTasks(listToSort.flatMap((category) => category.tasks))
        }


        return sortedList;
    };

    const sortTasks = (tasks: TaskType[]): TaskType[] => {
        return [...tasks].sort((a, b) => {
            for (const { dataType, direction } of filters) {
                const multiplier = direction === 'asc' ? 1 : -1;

                const aValue = a[dataType as keyof TaskType];
                const bValue = b[dataType as keyof TaskType];

                let comparisonResult = 0;

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    comparisonResult = aValue.localeCompare(bValue);
                } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                    comparisonResult = aValue - bValue;
                } else if (aValue instanceof Date && bValue instanceof Date) {
                    comparisonResult = aValue.getTime() - bValue.getTime();
                }

                if (comparisonResult !== 0) {
                    return comparisonResult * multiplier;
                }
            }
            return 0;
        });
    };

    const isColumnFiltered = (column: keyof TaskType) => filters.some((filter) => filter.dataType === column);

    const currentColumnDirection = (column: keyof TaskType): 'asc' | 'desc' | null => {
        return filters.find((filter) => filter.dataType === column)?.direction || null;
    };

    const filterExists = (column: keyof TaskType): boolean => filters.some((filter) => filter.dataType === column);

    const generateNewFilter = (column: keyof TaskType): FilterType => ({
        dataType: column,
        direction: 'asc',
    });

    return {
        states: {
            filters,
            filteredTaskList,
            listSortedWithinCategories,
        },
        handlers: {
            addFilter,
            removeFilter,
        },
        actions: {
            applyFilter,
            setListSortedWithinCategories,
            setOriginalList, // Zorgt ervoor dat de originele lijst kan worden ingesteld
        },
        derived: {
            isColumnFiltered,
            currentColumnDirection,
        },
    };
};