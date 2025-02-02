import React, {ChangeEvent, useRef, useState} from 'react';
import Task from "@/Components/MyWedding/Tasks/Task";

interface TaskMessageTextareaProps {
    placeholder: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onBlur: () => void;
}

function TaskMessageTextarea({placeholder, onChange, onSubmit, onBlur}: TaskMessageTextareaProps) {
    const [value, setValue] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
        adjustTextAreaHeight();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
            resetTextArea();
        } else if (event.key === 'Enter' && event.shiftKey) {
            adjustTextAreaHeight();
        }
    };

    const adjustTextAreaHeight = () => {
        const textArea = textareaRef.current;
        if (!textArea) return;

        textArea.style.height = '40px';
        const scrollHeight = textArea.scrollHeight;
        textArea.style.height = `${Math.min(scrollHeight, 88)}px`;
        textArea.scrollTop = scrollHeight;
    };

    const resetTextArea = () => {
        setValue('');
        onChange('');
        const textArea = textareaRef.current;
        if (textArea) {
            textArea.style.height = '40px';
            textArea.value = '';

        }
    };

    return (
        <textarea
            ref={textareaRef}
            className="no-scrollbar
                resize-none
                w-full
                overflow-y-scroll
                placeholder:text-sm
                placeholder:translate-y-0.5
                border-gray-300
                rounded-[20px]
                focus-visible:outline-none
                focus:border-gray-300
                focus:shadow-none"
            value={value}
            placeholder={placeholder}
            onChange={event => handleInput(event)}
            onBlur={onBlur}
            onKeyDown={event => handleKeyDown(event)}
            style={{
                height: "40px",
                minHeight: "40px",
                maxHeight: "88px",
            }}
        >
        </textarea>
    );
}

export default TaskMessageTextarea;