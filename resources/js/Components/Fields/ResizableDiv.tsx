import React, {ReactNode, useEffect, useRef, useState} from 'react';

/*
    The resizable div is a component which is resizable.
    This application uses it as column headers to change its column width.
 */

interface ResizableDivProps {
    onResize: Function;
    minWidth: number;
    currentWidth?: number;
    children: ReactNode;
    columnName: string;
}

function ResizableDiv({onResize, minWidth, children, columnName}: ResizableDivProps) {
    const ref = useRef<HTMLDivElement>(null);
    const refRight = useRef<HTMLDivElement>(null);
    const [divWidth, setDivWidth] = useState<number>(minWidth);



    useEffect(() => {
        const fields = document.querySelectorAll('.' + columnName);

        const resizableDiv = ref.current as HTMLDivElement;
        const styles = window.getComputedStyle(resizableDiv);
        let width = parseInt(styles.width, 10);
        let x = 0;

        const onMouseMoveRightResize = (event: MouseEvent) => {
            const dx = event.clientX - x;
            x = event.clientX;
            width = width + dx;
            if (width < minWidth){
                width = minWidth;
            }
            resizableDiv.style.width = `${width}px`;
            fields.forEach(element => {
                element.style.width = `${width}px`;
            })
        }

        const onMouseUpRightResize = (event: MouseEvent) => {
            document.removeEventListener('mousemove', onMouseMoveRightResize);
        }

        const onMouseDownRightResize = (event: MouseEvent) => {
            x = event.clientX;
            resizableDiv.style.left = styles.left;
            resizableDiv.style.right = "";
            document.addEventListener('mousemove', onMouseMoveRightResize);
            document.addEventListener('mouseup', onMouseUpRightResize);
        }

        const resizerRight = refRight.current as HTMLDivElement;
        resizerRight.addEventListener("mousedown", onMouseDownRightResize);

        return () => {
            resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
        }

    }, []);

    return (
        <div ref={ref} className={`${columnName} group relative w-full select-none flex items-center border border-transparent hover:border-gray-300 rounded pl-1`} style={{width: `${divWidth}px`}}>
            <div ref={refRight} className="resizer resizer-r opacity-0 hover:opacity-100 w-2 cursor-col-resize h-full absolute right-0 top-0 bg-slate-500"></div>
            {children}
        </div>
    );
}

export default ResizableDiv;