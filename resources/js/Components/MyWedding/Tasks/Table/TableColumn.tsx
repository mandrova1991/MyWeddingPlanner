import React, {useContext} from "react";
import ResizableDiv from "@/Components/Fields/ResizableDiv";
import {TableContext} from "@/Components/MyWedding/Tasks/TaskCategory";
import {ColumnConfig} from "@/types/Table/Column";
import ColumnOptionsDropdown from "@/Components/MyWedding/Tasks/Dropdowns/ColumnOptionsDropdown";

/*
    Column component renders the colums from the TableHeaders.
 */

function Column({columnConfig, field}: { columnConfig: ColumnConfig, field: string }) {
    const resizeColumn = useContext(TableContext);
    const columnName = `resizable-${columnConfig.type}`; // this name is used to give the Resizable div the correct name. This is used to update the width of te columns.
    const handleResize = (value: number) => {
        if (resizeColumn) {
            resizeColumn(field, value);
        }
    }

    return (
        <>
            {columnConfig.visible && (
                <ResizableDiv onResize={handleResize} minWidth={columnConfig.minWidth} columnName={columnName}>
                    <p className="select-none text-left text-sm">{columnConfig.label}</p>
                    <ColumnOptionsDropdown columnConfig={columnConfig} />

                </ResizableDiv>
            )}
        </>

    )
}

export default Column;
