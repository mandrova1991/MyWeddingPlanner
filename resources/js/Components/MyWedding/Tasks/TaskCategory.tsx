import React, {createContext, useMemo, useState} from "react";
import TableHeader from "@/Components/MyWedding/Tasks/Table/TableHeader";
import NewTaskRow from "@/Components/MyWedding/Tasks/NewTaskRow";
import Task from "@/Components/MyWedding/Tasks/Task";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {TaskCategoryContextProvider} from "@/Contexts/Tasks/TaskCategoryContext";
import {ColumnConfigMap} from "@/types/Table/Column";
import {SquareChevronDown, SquareChevronRight} from "lucide-react";
import {Collapsible, CollapsibleContent} from "@/Components/ui/collapsible";
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
    const memmorizedTaskCategory = useMemo(() => {
        return data
    }, [data]);


    // TODO Remove this code. Width change is now done with a direct css change.
    const handleColumnWidthChange = (column: string, newWidth: number) => {
        handleConfigChange(column, "minWidth", newWidth);
    }

    return (
        <TaskCategoryContextProvider initialTaskCategory={memmorizedTaskCategory}>
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

                        <h2 className={'ml-2 font-light text-xl'}>{memmorizedTaskCategory.name}</h2>
                        <p className={'text-xs ml-3 text-gray-500 italic'}>{memmorizedTaskCategory.tasks.length}</p>

                        <TaskCategoryMenuDropdown/>

                    </div>

                    <Collapsible open={collapsed} onOpenChange={setCollapsed}>
                        <CollapsibleContent>
                            <TableHeader columns={columns}/>
                            {memmorizedTaskCategory.tasks && Object.values(memmorizedTaskCategory.tasks).map((rowData) => (
                                <Task key={rowData.id} taskData={rowData} columns={columns}/>
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
