import React, {useEffect} from 'react';
import TaskCategory from "@/Components/MyWedding/Tasks/TaskCategory";
import NoTaskCategoryComponent from "@/Components/MyWedding/Tasks/NoTaskCategoryComponent";
import TableHeader from "@/Components/MyWedding/Tasks/Table/TableHeader";
import Task from "@/Components/MyWedding/Tasks/Task";
import {ColumnConfigMap} from "@/types/Table/Column";
import {useTaskManagerContext} from "@/Components/MyWedding/Tasks/TaskListManager/TaskManager";
import {TaskCategoryType} from "@/types/Tasks/TaskCategory";
import {TaskManagerFunctionContextProvider} from "@/Contexts/Tasks/TaskManagerFunctionContext";
import {useFilterContext} from "@/Contexts/Tasks/FilterContext";

/*
    TaskListContent renders the entire tasklist. It is placed in various context providers so that it has all the information en function
    it needs to operate.
    Note: it also depend on the filterContext. It update the state inside. Whenever the filters update
    it return the sortedState.
    TODO update the filter system so it is not returning previous state.
     Otherwise it tries to render the categories with only an array of TaskType
 */

function TaskListContent({columns, handleConfigChange}: {
    columns: ColumnConfigMap,
    handleConfigChange: <T extends keyof ColumnConfigMap, K extends keyof ColumnConfigMap[T]>(
        field: T,
        configKey: K,
        value: ColumnConfigMap[T][K]
    ) => void;
}) {
    const {actions, categories} = useTaskManagerContext();
    const filterContext = useFilterContext();

    useEffect(() => {
        filterContext.actions.setOriginalList(categories);
    }, [categories]);

    filterContext.actions.applyFilter();
    const filteredTaskList = filterContext.states.filteredTaskList;

    return (
        <TaskManagerFunctionContextProvider actions={actions}>
            <div className={'overflow-auto px-4'} style={{height: 'calc(100vh - 8rem)'}}>
                {filteredTaskList.length !== 0 && filteredTaskList[0].hasOwnProperty('tasks') && (
                    <div key={"categoryList"} className={'task-list-categories'}>
                        {filterContext.states.filteredTaskList && Object.values(filterContext.states.filteredTaskList).map((taskCategory) => (
                            <TaskCategory key={"cat" + taskCategory.id} data={taskCategory} columns={columns}
                                          handleConfigChange={handleConfigChange}/>
                        ))}


                    </div>
                )}


                {filteredTaskList.length !== 0 && !filteredTaskList[0].hasOwnProperty('tasks') && (

                    <div key={"taskList"} className="mt-4">
                        <TableHeader columns={columns}/>
                        {Object.values(filterContext.states.filteredTaskList).map((task) => {
                            return (
                                <Task key={task.id} taskData={task} columns={columns}/>
                            )

                        })}
                    </div>
                )}

                {categories && Object.values(categories).length == 0 && (
                    <NoTaskCategoryComponent/>
                )}

            </div>
        </TaskManagerFunctionContextProvider>
    );
}

export default TaskListContent;