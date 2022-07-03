---
title: useLocalToast
---

Calling this hook will return an object with bunch of functions in it. Let's take a closer look on each. Here and farther `name` refers to local toast target name and `id` to toast id. 

```ts
// toastId can be used in remove or update functions
const toastId = showToast(name: string, text: string, options: {
    type?: 'info' | 'success' | 'warning' | 'error' | 'loading',  // Default 'success'
    placement?: ToastPlacement, // Default 'top'
    duration?: number, // Default 2500ms
})
```

To update toast you call `updateToast` function. You can update only toast data. So, for default implementation it's only `type` and `text`. You can't update placement for example.

```ts
updateToast(toastId, {
    type: 'success',
    text: 'Successfully downloaded!'
});

// Partial updates supported too
updateToast(toastId, {
    text: 'Successfully downloaded!'
});
```

To remove one or multiple toasts you call either `removeToast`, `removeAllByName` or `removeAll`.

```ts
// To remove one toast:
removeToast(toastId);
// To remove all toasts from target
removeAllToastsByName(targetName);
// Remove all toasts on page
removeAllToasts();
```