import React from 'react';
import {LocalToastTarget, useLocalToast} from 'react-local-toast';


export const IntroDemo = () => {
    const onClick = () => {
        showToast('btn', "Hello! I'm inline toast");
    };

    const {showToast} = useLocalToast();
    return (<div className="flex-horizontal-center">
        <LocalToastTarget name="btn"><button onClick={onClick}>Click me</button></LocalToastTarget>
    </div>);
}