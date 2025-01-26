import React, {useEffect, useState} from 'react';
import {echo} from "@/echo";

function Test() {
    const [message, setMessage] = useState();

    useEffect(() => {
        echo.channel(`wedding.${1}.tasks`)
            .listen('TaskCreatedEvent', (e) => {
                console.log(e);
            });
    }, []);

    return (
        <div>{message}</div>
    );
}

export default Test;