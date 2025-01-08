import React from 'react';
import {twMerge} from "tailwind-merge";

/*
    This component is used to make sure al cells line up perfectly with its header culumn
 */

function TableContentCell({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <div className={twMerge("task-content-cell px-1 w-full h-full flex items-center select-none", className)}>
            {children}
        </div>
    );
}

export default TableContentCell;