import React, {createContext, useMemo, useState} from "react";
import TableHeader from "@/Components/MyWedding/Tasks/Table/TableHeader";
import NewTaskRow from "@/Components/MyWedding/Tasks/NewTaskRow";
import Task from "@/Components/MyWedding/Tasks/Task";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {TaskCategoryContextProvider, useTaskCategoryContext} from "@/Contexts/Tasks/TaskCategoryContext";
import {ColumnConfigMap} from "@/types/Table/Column";
import {SquareChevronDown, SquareChevronRight, Trash, Trash2} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/Components/ui/collapsible";
import TaskCategoryMenuDropdown from "@/Components/MyWedding/Tasks/Dropdowns/TaskCategoryMenuDropdown";


/*
    The TaskCategory component renders the category and its tasks.
    It als has its own context which can be used down the line to access its state.
 */

type TableContextType = (column: string, newWidth: number) => void;
export const TableContext = createContext<TableContextType | undefined>(undefined);

const TaskCategory = React.memo(({data, columns, handleConfigChange}: {
    data: TaskCategoryType,
    columns: ColumnConfigMap,
    handleConfigChange: Function
}) => {
    const [collapsed, setCollapsed] = useState(true); // State for setting collpsed or uncollapsed state
    const memmorizedTaksCategory = useMemo(() => {
        return data
    }, [data]);


    // TODO Remove this code. Width change is now done with a direct css change.
    const handleColumnWidthChange = (column: string, newWidth: number) => {
        handleConfigChange(column, "minWidth", newWidth);
    }

    return (
        <TaskCategoryContextProvider initialTaskCategory={memmorizedTaksCategory}>
            <TableContext.Provider value={handleColumnWidthChange}>
                <div className="table p-2 w-full first:mt-0">
                    <div className={'w-fit group h-[45px] py-2 flex items-center'}>
                        {collapsed ? (
                            <SquareChevronDown className={'cursor-pointer text-gray-400 hover:text-gray-500'}
                                               strokeWidth={1.25} size={'18px'}
                                               onClick={() => setCollapsed(!collapsed)}/>
                        ) : (
                            <SquareChevronRight className={'cursor-pointer text-gray-400 hover:text-gray-500'}
                                                strokeWidth={1.25} size={'18px'}
                                                onClick={() => setCollapsed(!collapsed)}/>
                        )}

                        <h2 className={'ml-2 font-light text-xl'}>{memmorizedTaksCategory.name}</h2>
                        <p className={'text-xs ml-3 text-gray-500 italic'}>{memmorizedTaksCategory.tasks.length}</p>

                        <TaskCategoryMenuDropdown/>

                    </div>

                    <Collapsible open={collapsed} onOpenChange={setCollapsed}>
                        <CollapsibleContent>
                            <TableHeader columns={columns}/>
                            {memmorizedTaksCategory.tasks && Object.values(memmorizedTaksCategory.tasks).map((rowData, index) => (
                                // <TaskContextProvider key={rowData.id} initialTask={rowData}>
                                <Task key={rowData.id} taskData={rowData} columns={columns}/>
                                // </TaskContextProvider>
                            ))}
                            <NewTaskRow columns={columns}/>
                        </CollapsibleContent>
                    </Collapsible>

                </div>
            </TableContext.Provider>
        </TaskCategoryContextProvider>
    );
})

export default TaskCategory;
