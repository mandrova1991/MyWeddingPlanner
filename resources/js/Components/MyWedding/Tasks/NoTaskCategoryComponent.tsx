import React from 'react';

/*
    This component renders a message when no categories are found
    TODO create a reusable component that can be use multiple times
 */

function NoTaskCategoryComponent() {
    return (
        <div className="w-full mt-4 py-4  text-center text-gray-500 text-sm">
            <p>No categories yet. Please start adding them!</p>
        </div>
    );
}

export default NoTaskCategoryComponent;