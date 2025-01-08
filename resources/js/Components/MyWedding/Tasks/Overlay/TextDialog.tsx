import React, {useState} from 'react';
import {Input} from "@/Components/ui/input";
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";

// This component is a dialog with a text input. When submitted the value can be used to update the state of the parent component.


interface TextDialogProps {
    title: string,
    icon: React.ReactNode,
    description: string,
    triggerName: string,
    onSubmit: (value: string) => void,
    defaultValue?: string
}

function TextDialog({title, description, triggerName, onSubmit, defaultValue, icon}: TextDialogProps) {
    const [value, setValue] = useState(defaultValue ?? "");
    const [opened, setOpened] = useState(false);

    const handleSubmit = () => {
        setOpened(false);
        onSubmit(value);
    }

    return (
        <div>
            <Dialog open={opened} onOpenChange={setOpened}>
                <DialogTrigger className={'w-full text-left hover:bg-gray-50 p-2'}>
                    <div className={'flex items-center gap-2'}>
                        {icon}{triggerName}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <Input defaultValue={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit(); // Save on Enter key
                    }}/>
                    <Button className={'bg-blue-700'} onClick={handleSubmit}>Submit</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default TextDialog;