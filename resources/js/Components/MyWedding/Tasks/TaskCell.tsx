import {twMerge} from "tailwind-merge";
import CellRenderer from "@/Components/MyWedding/Tasks/Helpers/CellRenderer";
import React from "react";

/*
    the taskCell only renders when the columnSetting visible is true.
    It uses the cellRenderer to render to correct TaskField.
    Note: the name of the div is the same as its columnHeader. This is needed to set its width
 */

function TaskCell({value, columnConfig}: { value: any, columnConfig: ColumnConfig }) {
    const columnStyle = {minWidth: `${columnConfig.minWidth}px`};
    const inputFieldCSS = columnConfig.isInputField ? "border border-transparent hover:border-gray-300 rounded" : "";
    const divName = `resizable-${columnConfig.type}`;

    return (
        <>
            {columnConfig.visible && (
                <div className={twMerge(`${divName} flex items-center h-full`, inputFieldCSS)} style={columnStyle}>
                    <CellRenderer type={columnConfig.type} value={value}/>
                </div>
            )}
        </>
    )
}

export default TaskCell;
