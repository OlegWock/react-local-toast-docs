---
title: useCustomLocalToast
---

This function accepts your `ToastComponent` and creates context and all neccessary pieces to make your custom implementation work under hood. It returns:
* `Provider` – provider to wrap your application in.
* `Target` – target to wrap your components for which you want to display toasts.
* `useCustomLocalToast` – hook that provides access to create/update/remove functions.

While `useCustomLocalToast` might be used as is, I'd recommend to wrap in into other hook with API, that better reflects your needs and application specifics. You can see example in [default-implementation.tsx](src/default-implementation.tsx#L194-211) where we create our own `showToast` function instead of using `addToast` provided by parent hook.

So, `useCustomLocalToast` returns these function:

```ts
// Here T refers to your toast data type
addToast(name: string, data: T, placement?: ToastPlacement) => string; // returns toast id
updateToast(id: string, newData: Partial<T>) => void;
removeToast(id: string) => void;
removeAllToastsByName(name: string) => void;
removeAllToasts() => void;
```