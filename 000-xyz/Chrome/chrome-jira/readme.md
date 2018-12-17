# bgp

> default & no page

```js 

    "background": {
        "persistent": false,
        "scripts": [
            "libs/click-copy.min.js"
            "background/background.js"
        ]
    },
    "background": {
        "persistent": false,
        "page": "background/index.html"
    },

```

> with page

```js 

    "background": {
        "persistent": false,
        "page": "background/index.html"
    },

```

## action

> browser action

```js

    "browser_action": {
        "default_title": "popup-page",
        "default_icon": {
            "16": "icons/icon_16.png",
            "32": "icons/icon_48.png",
            "48": "icons/icon_48.png",
            "128": "icons/icon_128.png"
        },
        "default_popup": "popup/popup-page.html"
    },
```

> page action

```js

    "page_action": {
        "default_title": "popup-page",
        "default_icon": {
            "16": "icons/icon_16.png",
            "32": "icons/icon_48.png",
            "48": "icons/icon_48.png",
            "128": "icons/icon_128.png"
        },
        "default_popup": "popup/popup-page.html"
    },
```


> clipboard.js v2.0.4

https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js

https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js