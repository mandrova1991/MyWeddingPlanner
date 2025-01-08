import React from 'react';

function PopoverButton({children, onClick}: { children: React.ReactNode, onClick?: () => void }) {
    return (
        <div className={'p-2 hover:bg-gray-50 w-full flex items-center text-sm select-none cursor-pointer'} onClick={onClick}>
            {children}
        </div>
    );
}

export default PopoverButton;