import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";

/*
    The YesNoDialog component renders a overlay. The title and description can given as props.
    It hold 2 buttons. No just closes the dialog. And yas sends a onSubmit back when clicked.
    TODO it would be nice if we also had a eventFunction when the noButton has been clicked
 */

interface OKDialogProps {
    title: string,
    icon: React.ReactNode,
    description: string,
    onSubmit: () => void,
}

function YesNoDialog({ title, description, onSubmit, icon }: OKDialogProps) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleYes = () => {
        setOpenDialog(false);
        onSubmit();
    }

    const handleNo = () => {
        setOpenDialog(false);
    }

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className={'w-full p-2 text-left hover:bg-gray-50'}>
                    <div className={'flex items-center gap-2'}>
                        {icon}{title}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <div className={'w-full flex items-center gap-2 justify-between'}>
                        <Button variant={'outline'} className={'w-full'} onClick={handleYes}>Yes!</Button>
                        <Button className={'w-full bg-blue-700 hover:bg-blue-500'} onClick={handleNo}>No!</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default YesNoDialog;