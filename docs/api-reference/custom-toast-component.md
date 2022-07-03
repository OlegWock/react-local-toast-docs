---
title: Custom Toast component
---

This is list of props your custom toast component will receive:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | ID of toast |
| `name` | string | Name of target this toast is attached to |
| `removeMe` | Function `() => void` | Call this to remove current toast |
| `placement` | <code>'top' &#124; 'right' &#124; 'bottom' &#124; 'left'</code> | Placement of current toast. Might be useful to figure out which animation to use |
| `data` | `T` | Data you passed to `addToast` function |
| `animation` | Object | Contains data which might be handy for animating toast |
| `animation.state` | <code>"entering" &#124; "entered" &#124; "exiting" &#124; "exited" &#124; "unmounted"</code> | State of toast. You probably want to enable animation when toast in `entering` or/and `exiting` state |
| `animation.duration` | number | Duration of animation from provider |
| `animation.disableTransitions` | boolean | This will be true for renders where react-local-toast changes toast position (e.g. toast size changed and now requires repositioning) which shouldn't be transitioned (in opposition to positioan changes that you probably want to animate, like moving toast closer to target once previous toast was removed). Since if you enable transition and change elements position in same tick – position change will be animated, I'd recommend to postpone enabling transition for next render (see example in [default-implementation.tsx](src/default-implementation.tsx#L148-155)) |