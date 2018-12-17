"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.12.17
 * @modified 2018.12.17
 * 
 * @description background.js
 * @augments 
 * @example 
 * 
 */

const bgp_global_var = `background.js global variable!`;

console.log(`bgp & bgp_global_var =`, bgp_global_var);

let tab_uid = ``;


// tab callback
function tabChecker(tabId, changeInfo, tab) {
    console.log(`tabId =`, tabId);
    console.log(`changeInfo =`, changeInfo);
    console.log(`tab =`, tab);
    // chrome.pageAction.show(tabId);
    tab_uid = tabId;
    if (tab_uid) {
        chrome.tabs.sendMessage(tabId, {
            greeting: `hello, ${tab_uid}`,
        });
    }
};

// onMessage callback
function onMessageChecker(request, sender, sendRequest) {
    console.log(`tab's request =`, request);
    console.log(`tab's sender =`, sender);
    console.log(`tab's sendRequest =`, sendRequest);
};



// Install
chrome.runtime.onInstalled.addListener(function() {
    // Async methods
    // chrome.contextMenus.create({
    //     "id": "sampleContextMenu",
    //     "title": "Sample Context Menu",
    //     "contexts": ["selection"]
    // });
});

// Sync methods
// tabs update
chrome.tabs.onUpdated.addListener(tabChecker);

// runtime onMessage
chrome.runtime.onMessage.addListener(onMessageChecker);


