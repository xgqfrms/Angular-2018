# (chrome = browser) 



## storage API

https://developer.chrome.com/extensions/storage#using-sync

> To store user data for your extension, you can use either `storage.sync`, or `storage.local`

```js

// storage.sync
chrome.storage.sync.set({key: value}, function() {
    console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
});

```

```js
// storage.local:

chrome.storage.local.set({key: value}, function() {
    console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
});

```


```js
// array OK
chrome.storage.sync.get([
    "jira_str",
    "jira_obj"
], function(items) {
    console.log(`chrome.storage.sync.get OK!`);
    console.log(`get items =`, JSON.stringify(items, null, 4));
});

// object Error
chrome.storage.sync.get({
    jira_str,
    jira_obj,
}, function(items) {
    console.log(`chrome.storage.sync.get OK!`);
    console.log(`get items =`, JSON.stringify(items, null, 4));
});

// chrome.storage.sync.get({
//     "jira_str",
//     "jira_obj",
// }, function(items) {
//     console.log(`chrome.storage.sync.get OK!`);
//     console.log(`get items =`, JSON.stringify(items, null, 4));
// });

```

## bgp

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



> jira & click copy 

```js

!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=536)}({536:function(e,t,n){"use strict";window.SVNCC=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{kind:"无提交类型",testing:!1},n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=t.kind,o=t.testing,i=document.querySelector('[id="key-val"]').innerText.trim(),c=document.querySelector('[id="type-val"]').innerText.trim(),u=document.querySelector('[id="summary-val"]').innerText.trim(),l=document.querySelector('[id="description-val"]>[class="user-content-block"]').innerText.trim(),a=o?"是":"否";if("无提交类型"===r)switch(c){case"新需求":c="新功能";break;case"优化":c="追加递交";break;case"缺陷":c="BUG修复"}u!==l&&(u+=l),e="\n[JIRA编号] "+i+"\n[修改内容] "+u+"\n[提交类型] "+c+"\n[需要测试] "+a+"\n",n&&console.log("result =\n",e);try{window.copy(e),alert("copied!")}catch(e){console.error("auto copy failed!")}return e}}});

// SVNCC({ kind: "BUG修复", testing: true, });

```