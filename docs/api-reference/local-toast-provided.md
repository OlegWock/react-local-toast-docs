---
title: LocalToastProvider
---

Props of `LocalToastProvider`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Component` | React component | `ToastComponent` | Component used to display toasts |
| `animationDuration` | number (ms) | `80` | Self explanatory |
| `portalInto` | HTML element | `document.body` | Decide where we should inject toast. Generally, `document.body` should be fine, unless you're doing some tricks with Shadow DOM |
| `defaultPlacement` | <code>'top' &#124; 'right' &#124; 'bottom' &#124; 'left'</code> | `top` | This might be set on per-toast basis too |