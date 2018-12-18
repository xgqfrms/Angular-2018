# window.copy & bug

> env

```js

// window.copy for content script

const COPY = (str = ``) => {
    // 1. click copy library
    // 2. native selection copy
};

```

## Background Scripts

https://developer.chrome.com/extensions/background_pages

```json5

{
    "name": "Awesome Test Extension",
    "background": {
        "scripts": ["background.js"],
        "persistent": false
    },
}
```

> Multiple background scripts can be registered for modularized code.


```json5
{
    "name": "Awesome Test Extension",
    "background": {
        "scripts": [
            "click-copy.lib.min.js",
            "backgroundContextMenus.js",
            "backgroundOmniBox.js",
            "backgroundOauth.js"
        ],
        "persistent": false
    },
}

```

> Initialize the Extension

https://developer.chrome.com/extensions/runtime#event-onInstalled
https://developer.chrome.com/extensions/contextMenus

```js
// Install
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
});

```

> Listeners must be registered synchronously from the start of the page.

```js
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
});

// This will run when a bookmark is created.
chrome.bookmarks.onCreated.addListener(function() {
    // do something
});

```

> Error: Do not register listeners asynchronously, as they will not be properly triggered.

```js
chrome.runtime.onInstalled.addListener(function() {
    // ERROR! Events must be registered synchronously from the start of the page.
    chrome.bookmarks.onCreated.addListener(function() {
        // do something
    });
});

```

> Extensions can remove listeners from their background scripts by calling `removeListener`. 


```js
chrome.runtime.onMessage.addListener(function(message, sender, reply) {
    // removeListener
    chrome.runtime.onMessage.removeListener(event);
});

```

> To react to an event, structure the desired reaction inside of the listener event.

```js

chrome.runtime.onMessage.addListener(function(message, callback) {
    // callback
    if (message.data == “setAlarm”) {
        // alarms
        chrome.alarms.create({
            delayInMinutes: 5,
        });
    } else if (message.data == "runLogic") {
        // tabs executeScript file
        chrome.tabs.executeScript({
            file: 'logic.js',
        });
    } else if (message.data == "changeColor") {
        // tabs executeScript code
        chrome.tabs.executeScript({
            code: 'document.body.style.backgroundColor="orange"',
        });
    };
});

```

## Unload Background Scripts

> storage API t

https://developer.chrome.com/storage

```js
chrome.storage.local.set({
    variable: variableInformation,
});

```

> close all message ports

https://developer.chrome.com/extensions/messaging
https://developer.chrome.com/extensions/runtime#property-Port-onDisconnect
https://developer.chrome.com/extensions/runtime#property-Port-disconnect


```js
chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message == 'hello') {
        sendResponse({
            greeting: 'welcome!',
        });
    } else if (message == 'goodbye') {
        // Manually close
        chrome.runtime.Port.disconnect();
    }
});

```

https://developer.chrome.com/extensions/runtime#event-onSuspend

```js

chrome.runtime.onSuspend.addListener(function() {
    console.log("Unloading.");
    chrome.browserAction.setBadgeText({
        text: "",
    });
});

```



## zip

```sh
# admin pwd
$ sudo apt install zip

$ zip -r chrome-jira.2018.12.18.zip chrome-jira/*

```

