import {twMerge} from "tailwind-merge";
import React from "react";
import {ColumnConfig} from "@/types/Table/Column";

/*
    The taskCell only renders when the columnSetting visible is true.
    It is used to do styling based on its column configuration.
    Note: the name of the div is the same as its columnHeader. This is needed to set its width
 */

function TaskCell({columnConfig, children}: { columnConfig: ColumnConfig, children: React.ReactNode}) {
    const columnStyle = {minWidth: `${columnConfig.minWidth}px`};
    const inputFieldCSS = columnConfig.isInputField ? "border border-transparent hover:border-gray-300 rounded" : "";
    const divName = `resizable-${columnConfig.type}`;

    return (
        <>
            {columnConfig.visible && (
                <div className={twMerge(`${divName} flex items-center h-full`, inputFieldCSS)} style={columnStyle}>
                    {children}
                </div>
            )}
        </>
    )
}

export default TaskCell;
