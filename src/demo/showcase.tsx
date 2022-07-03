import React, { useState } from "react";
import { LocalToastTarget, ToastComponentProps, useLocalToast } from "react-local-toast";
import { BsCartPlusFill } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import { sleep } from "../utils";
import { withProvider } from "./withProvider";
import { DefaultAction, DefaultToastData } from "react-local-toast/dist/types";

export const ShowcaseUsecases = withProvider(() => {
    const addToCart = () => {
        showToast('cart', 'Item added to cart!');
    }

    const saveChanges = async () => {
        const id = showToast('changes', 'Saving...', {
            type: 'loading',
            duration: 0,
        });
        // Simulate api call or whatever
        await sleep(3000);
        updateToast(id, {
            type: 'success',
            text: 'Successfully saved!'
        });
        setTimeout(() => {
            removeToast(id);
        }, 2000);
    }

    const {showToast, updateToast, removeToast} = useLocalToast();
    return (
        <div className="flex-horizontal-space-around">
            <LocalToastTarget name="cart"><button onClick={addToCart}><BsCartPlusFill /> Add to cart</button></LocalToastTarget>
            <LocalToastTarget name="changes"><button onClick={saveChanges}><BiSave /> Save changes</button></LocalToastTarget>
        </div>
    );
});

export const ShowcaseTypes = withProvider(() => {
    const showType = (type: "loading" | "info" | "success" | "warning" | "error") => () => {
        showToast(type, `This is ${type} type`, {
            type
        })
    }


    const {showToast} = useLocalToast();
    return (
        <div>
            <LocalToastTarget name="success"><button onClick={showType('success')}>Success</button></LocalToastTarget>
            <LocalToastTarget name="info"><button onClick={showType('info')}>Info</button></LocalToastTarget>
            <LocalToastTarget name="warning"><button onClick={showType('warning')}>Warning</button></LocalToastTarget>
            <LocalToastTarget name="error"><button onClick={showType('error')}>Error</button></LocalToastTarget>
            <LocalToastTarget name="loading"><button onClick={showType('loading')}>Loading</button></LocalToastTarget>
        </div>
    );
});


export const ShowcasePlacement = withProvider(() => {
    const showPlacement = (placement: "top" | "bottom" | "left" | "right") => () => {
        showToast(placement, `This is ${placement} placement`, {
            placement
        })
    }


    const {showToast} = useLocalToast();
    return (
        <div>
            <LocalToastTarget name="top"><button onClick={showPlacement('top')}>Top</button></LocalToastTarget>
            <LocalToastTarget name="bottom"><button onClick={showPlacement('bottom')}>Bottom</button></LocalToastTarget>
            <LocalToastTarget name="left"><button onClick={showPlacement('left')}>Left</button></LocalToastTarget>
            <LocalToastTarget name="right"><button onClick={showPlacement('right')}>Right</button></LocalToastTarget>
        </div>
    );
});


export const ShowcaseDuration = withProvider(() => {
    const showDismiss = () => {
        if (singleId) {
            removeToast(singleId);
            setSingleId('');
        } else {
            setSingleId(showToast('showDissmiss', "This won't be hidden until you click again", {duration: 0}))
        }
    }
    const [singleId, setSingleId] = useState('');
    const {showToast, removeToast, removeAllToastsByName, removeAllToasts} = useLocalToast();
    return (
        <div>
            <LocalToastTarget name="default"><button onClick={() => showToast('default', 'Hello!')}>Default toast</button></LocalToastTarget>
            <LocalToastTarget name="5sec"><button onClick={() => showToast('5sec', 'Hello, but longer', {duration: 5000})}>Dismiss after 5 seconds</button></LocalToastTarget>
            <LocalToastTarget name="showDissmiss"><button onClick={showDismiss}>Click once to display toast and click again to dismiss it</button></LocalToastTarget>
            <LocalToastTarget name="multiple1"><button onClick={() => showToast('multiple1', 'Wow!', {duration: 0})}>Create multiple toasts without auto hide</button></LocalToastTarget>
            <button onClick={() => removeAllToastsByName('multiple1')}>Remove all toasts from left button</button>
            <LocalToastTarget name="multiple2"><button onClick={() => showToast('multiple2', 'Hmmm....', {type: 'loading', duration: 0})}>Create multiple toasts without auto hide (yes, again)</button></LocalToastTarget>
            <button onClick={() => removeAllToasts()}>Remove ALL toasts</button>
        </div>
    );
});

const CustomToastComponent = React.forwardRef<HTMLElement>((props: ToastComponentProps<DefaultToastData>, ref) => {
    return (<div style={props.style} className='custom-toast' ref={ref as React.Ref<HTMLDivElement>}>
        {props.data.text}
        <button onClick={props.removeMe}>Dismiss</button>
    </div>)
});

export const ShowcaseCustomComponent = withProvider(() => {
    const {showToast} = useLocalToast();
    return (<LocalToastTarget name="btn"><button onClick={() => showToast('btn', "I'm custom toast", {duration: 5000})}>Click me</button></LocalToastTarget>);
}, {Component: CustomToastComponent});