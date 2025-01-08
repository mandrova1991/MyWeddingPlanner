import React from "react";
import Column from "@/Components/MyWedding/Tasks/Table/TableColumn";

/*
    The table header is the component used in the table to see what data it shows underneath it.
 */

function TableHeader({columns}: { columns: ColumnConfigMap }) {
    return (
        <div className="table-header w-fit h-[35px] flex flex-row  border-b border-gray-200 text-gray-400">
            {Object.entries(columns).map((column, index) => (
                <Column key={index} field={column[0]} columnConfig={column[1]}/>
            ))}
        </div>
    )
}

export default React.memo(TableHeader);
