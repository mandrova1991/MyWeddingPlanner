import React from 'react';
import {Switch} from "@/Components/ui/switch";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/Components/ui/sheet";
import {Button} from "@/Components/ui/button";
import {ColumnConfig, ColumnConfigMap} from "@/types/Table/Column";
import {Settings} from "lucide-react";

// ColumnDropdown component
function ColumnVisibilityDropdown({columns, onColumnVisibilityChange}: {
    columns: ColumnConfigMap;
    onColumnVisibilityChange: <T extends keyof ColumnConfigMap>(
        field: T,
        visible: ColumnConfigMap[T]['visible']
    ) => void;
}) {

    const onChange = (field: keyof ColumnConfigMap, value: boolean) => {
        // Give back the visisbility setting to the parent component.
        onColumnVisibilityChange(field, value);
    }; // TODO refactory to use a custom hook to handle this.

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className={'text-sm font-medium'}><Settings
                        strokeWidth={1.25}/>Columns</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Customize Columns</SheetTitle>
                        <SheetDescription>
                            Enable or disable columns you would like to see or be hidden.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {columns && Object.entries(columns).map(([key, columnData], index) => (
                            <div key={index}>
                                {columnData.canBeHidden && (
                                    <ColumnSwitch field={key as keyof ColumnConfigMap} columnData={columnData}
                                                  onChange={onChange}/>
                                )}
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

// ColumnSwitch component
// This component is used to render a switch for each column.
function ColumnSwitch({field, columnData, onChange}: {
    field: keyof ColumnConfigMap,
    columnData: ColumnConfig,
    onChange: (field: keyof ColumnConfigMap, value: boolean) => void
}) {
    const [value, setValue] = React.useState(columnData.visible);

    const handleChange = (visibility: boolean) => {
        setValue(visibility); // set the state
        onChange(field, visibility); // give back the visibility setting to the parent component.
    };

    return (
        <>
            {columnData.canBeHidden && (
                <div className={'w-full hover:bg-gray-50 py-3 px-2 flex items-center'}>
                    <p className="text-sm font-medium">{columnData.label}</p>
                    <Switch onCheckedChange={handleChange} checked={value} className={'ml-auto data-[state=checked]:bg-blue-700'}/>
                </div>
            )}
        </>
    );
}

export default ColumnVisibilityDropdown;


