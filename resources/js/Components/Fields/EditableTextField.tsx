import React, {useEffect, useRef, useState} from "react";
import {Pencil} from "lucide-react";

/*
    The editableTextField is a component that shows text which is a prop that can be given.
    The text is editable which means that it can be changed by clicking on it.
    When editted a onSave event is emitted that can be used by its parent for further processing.
    TODO add a function to shorten the taskName. Name could look like this: This is very look taskn...
 */


type EditableFieldProps = {
    value: string;
    directFocus?: boolean;
    onSave: (newValue: string) => void;
    onClick?: () => void;
    clickable?: boolean;
};

const EditableTextField: React.FC<EditableFieldProps> = ({value, directFocus = false, onSave, onClick, clickable = false}) => {
    const [isEditing, setIsEditing] = useState(directFocus);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && directFocus) {
            inputRef.current.focus();
        }
    }, []);

    const handleSave = () => {
        setIsEditing(false);
        onSave(currentValue);
    };

    return (
        <div className="w-full h-full flex items-center group">
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={currentValue}
                    className="p-0 w-full h-full focus:border-0 focus-visible:ring-0 text-sm flex items-center font-medium"
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleSave} // Save when losing focus
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(); // Save on Enter key
                        if (e.key === "Escape") {
                            setIsEditing(false); // Cancel on Escape
                            setCurrentValue(value);
                        }
                    }}
                    autoFocus
                    autoComplete={'off'}
                />
            ) : (
                <span
                    className="group/edit w-full h-full flex items-center cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                    {clickable ? (
                        <p className={'hover:underline'} onClick={() => onClick()}>{value}</p>
                    ):(
                        <p className={''} onClick={() => onClick()}>{value}</p>

                    )}

                    <Pencil className={'ml-auto h-full hidden group-hover/edit:block hover:text-gray-500 text-gray-300'} strokeWidth={1.25} onClick={() => setIsEditing(true)} />
                </span>
            )}
        </div>
    );
};

export default EditableTextField;
