---
title: Tutorial
description: How-to install and use react-local-toast in your app
---


## Installation

```
npm install react-local-toast --save
```

Or if you prefer yarn

```
yarn add react-local-toast
```

## Basic usage

1. Wrap your application in `LocalToastProvider`:

```jsx
import React from 'react';
import { LocalToastProvider } from 'react-local-toast';

export default () => {
    return (<LocalToastProvider>
        {/* All your components that will use local toasts should be children of this provider. */}
        <App />
    </LocalToastProvider>);
};
```

2. Local toasts are linked to particular components on page, so let's mark our component as target for local toast:

```jsx
import React from 'react';
import { LocalToastTarget } from 'react-local-toast';

export const App = () => {
    return (<div>
        <p>This component should be inside LocalToastProvider</p>
        {/* Wrap your component with <LocalToastTarget> */}
        <LocalToastTarget name="btn">
            <button>Click me please!</button>
        </LocalToastTarget>
    </div>);
};
```

Local toast uses refs to get position of component, so in case you want to use toasts with functional components – make sure they are wrapped in `React.forwardRef`.

3. And final piece! Update your component to actually produce local toasts:

```jsx
import React from 'react';
// New import here !!
import { LocalToastTarget, useLocalToast } from 'react-local-toast';

export const App = () => {
    // Use hook to show and hide toasts
    const {showToast, removeToast} = useLocalToast();

    return (<div>
        <p>This component should be inside LocalToastProvider</p>
        <LocalToastTarget name="btn">
            <button onClick={() => showToast('btn', 'Hello my first toast!')}>Click me please!</button>
        </LocalToastTarget>
    </div>);
};
```

Cool, huh?

## `useLocalToast` hook

```tsx
export const App = () => {
    // Hooks work only inside functional components
    const {showToast, updateToast, removeToast, removeAllToastsByName, removeAllToasts} = useLocalToast();
};
```
This hook exposes functions to show, edit and remove toasts. This is what we'll refer in other places of documentation as 'default implementation'. Let's take a closer look on what's inside.

### `showToast` function

Function has two required paramters: target name and toast text. Optionally, you can supply object with settings for toast:

```ts
showToast(
    name: string,
    text: string,
    options?: {
        type?: 'info' | 'success' | 'warning' | 'error' | 'loading',
        placement?: 'top' | 'right' | 'bottom' | 'left', 
        duration?: number, // Use 0 for persistent toasts
    }
) => string; // ID of created toast

// Example:
showToast('addToCartBtn', 'Added to cart!');
showToast('saveBtn', 'Saving', {type: 'loading', duration: 0});
```

### `updateToast`

You can update toast data (for default implementation it's `type` and `text`). Which might be handy for providing live feedback for user. You can't change placement though.

```
updateToast(id: string, newData: Partial<{
    text: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'loading'
}>) => void
```

### Remove toast(s)

You can use `removeToast(id)` to remove single toast, `removeAllToastsByName(name)` to remove all toasts from signle target and `removeAllToasts()` to remove all toasts from page.

## Advanced features

To be honest, I was quite amused by libraries like Radix UI. I think it's great idea to implement all quirks of complex component, but let end user (developer in this case) style it to their liking. Designer part of me was delighted. I wanted to pursue same approach in this library. You receive quite nice toast out of the box, but you still can style it to your liking. You're not limited to just applying some CSS to prefedined markup. You can provide your own component to render your desired markup and styles. And if it's not enough, you can make your own implementation which will accept different data format than default implementation and will render toast that suits your needs best.

Maybe you want to have both `title` and `message` for toast? Or custom `confirm` type with buttons? You're in the right place of documentation, friend.

### Custom design

While I said you can do a lot more that just editing CSS, you certainly can just edit CSS too. Default implementation exposes a couple of classes which you might style for your liking. Structure looks like this:

```html
<div class="
    react-local-toast 
    react-local-toast-{type} 
    react-local-toast-{animation state}
    react-local-toast-{placement}
">
    <!-- Additionally root element might receive classes `react-local-toast-persistent` -->
    <!-- if duration specified as 0 and `react-local-toast-disable-transitions` -->
    <!-- if component should disable transitions on `top` and `left` css -->
    <!-- properties (this is usually related to repositioning of toast, which shouldn't be animated).-->
    
    <svg className="react-local-toast-icon" />
    <span class="react-local-toast-text">Toast text here</span>
</div>
```


### Custom component

You can provide your custom toast component which will be used instead of the default one. There are two requirements for component to ensure everything works properly:

* Your component should pass received `style` property to root DOM node. This is used to acutally position toast torwards target.
* Your component should accept ref, so don't forget to wrap it in `React.forwardRef`. Ref required to calculate toast size and reposition it accordingly.


```tsx
const CustomToastComponent = React.forwardRef<HTMLElement>((props: ToastComponentProps<DefaultToastData>, ref) => {
    // In case of TypeScript you need to supress warning regarding ref using `as`.
    // If you know how to change signature to work well without `as` - please let me know
    return (<div style={props.style} className='custom-toast' ref={ref as React.Ref<HTMLDivElement>}>
        {props.data.text}
        <button onClick={props.removeMe}>Dismiss</button>
    </div>)
});
```

And then supply this component to your `LocalToastProvider`:

```tsx
<LocalToastProvider Component={CustomToastComponent}>
    <App />
</LocalToastProvider>
```

To see what properties are passed to your component, refer to [Custom Toast Component props](./api-reference/custom-toast-component.md).

### JSX as content

You can supply JSX instead of toast text to default implementation. I won't recommend using this often and TypeScript will yell at you about this. But as one time-hack it might be useful.

```tsx
import React from 'react';
import { LocalToastTarget, useLocalToast } from 'react-local-toast';

export const App = () => {
    const showJsxToast = () => {
        const toastId = showToast('btn', (<div>
            This looks kinda hacky, but I guess it's fine for one-time trick. 
            <button onClick={() => removeToast(toastId)}>Dismiss</button>
        </div>), {type: 'success', duration: 0});
    };

    const {showToast, removeToast} = useLocalToast();

    return (<div>
        <p>This component should be inside LocalToastProvider</p>
        <LocalToastTarget name="btn">
            <button onClick={() => showJsxToast()}>Click me please!</button>
        </LocalToastTarget>
    </div>);
};
```

### Custom implementation

To provide custom implementation:

1. Create typing for your data (only if you use TypeScript). This data will be passed from hook call to your toast component.

```typescript
interface MyToastData {
    title: string,
    message: string,
    dissmissable: boolean
}
```

2. Implement your Toast component. It should accept props of type [`ToastComponentProps<T>`](./api-reference/custom-toast-component.md) where `T` is your data type. Again, if you're using good old JavaScript, you can skip all this typing stuff, just implement Toast! Important note: react-local-toast uses `style` prop to provide coordinates to toast component, do not forget to pass them to your root node.

```tsx
const CustomToastComponent = React.forwardRef<HTMLElement>((props: ToastComponentProps<MyToastData>, ref) => {
    return (<div style={props.style} className='custom-toast' ref={ref as React.Ref<HTMLDivElement>}>
        <h2>{props.data.title}</h2>
        <span>{props.data.message}</span>
        {props.data.dissmissable && <button onClick={props.removeMe}>Dismiss</button>}
    </div>)
});
```

3. Cool. Now give this component to `createCustomLocalToast` function. It will return you `Provider`, `Target` and `useCustomLocalToast`. You can export `Provider` and `Target` as is. `useCustomLocalToast` can be used as is too, but let's make this a bit prettier.

```typescript
const {Provider, Target, useCustomLocalToast} = createCustomLocalToast(MyToast);

export const MyToastProvider = Provider;
export const MyToastTarget = Target;

export const useMyLocalToast = () => {
    const {addToast, removeToast, removeAllToastsByName, removeAllToasts} = useCustomLocalToast();

    const showDissmissable = (name: string, title: MyToastData["title"], message: MyToastData["message"], placement?: ToastPlacement) => {
        return addToast(name, {
            title,
            message,
            dissmissable: true,
        }, placement);
    }

    const showPermanent = (name: string, title: MyToastData["title"], message: MyToastData["message"], placement?: ToastPlacement) => {
        return addToast(name, {
            title,
            message,
            dissmissable: false,
        }, placement);
    }

    return {showDissmissable, showPermanent, removeToast, removeAllToastsByName, removeAllToasts};
};
```

4. Congratulations! Now you can use your custom toasts. Just don't forget to wrap your app in `Provider` and target components in `Target`.