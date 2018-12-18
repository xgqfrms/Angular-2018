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

// chrome || browser 

const bgp_global_var = `background.js global variable!`;
// console.log(`bgp & bgp_global_var =`, bgp_global_var);

// window.Window === popup.js's window
// window.Window.bgp_global_var = bgp_global_var;

// chrome.storage
const getJiraInfos = () => {
    try {
        chrome.storage.sync.get({
            jira_str,
            jira_obj,
        }, function(items) {
            console.log(`chrome.storage.sync.get OK!`);
            console.log(`get items =`, JSON.stringify(items, null, 4));
        });
    } catch (error) {
        console.error(`chrome.storage.sync.set Error!`, error);
    }
};



let tab_uid = ``;


// tab callback
function tabChecker(tabId, changeInfo, tab) {
    console.log(`tabId =`, tabId);
    // 2075115848
    // console.log(`changeInfo =`, changeInfo);
    // {status: "loading"}
    // {favIconUrl: "http://jira.xgqfrms.xyz:8888/s/-1cz1zv/73017/b6b48b2829824b869586ac216d119363/_/favicon.ico"}
    // {status: "complete"}
    // console.log(`tab =`, tab);
    // {active: true, audible: false, autoDiscardable: true, discarded: false, favIconUrl: "http://jira.xgqfrms.xyz:8888/s/-1cz1zv/73017/b6b48b2829824b869586ac216d119363/_/favicon.ico", …}
    // console.log(`tab =`, JSON.stringify(tab, null, 4));
    // {
    //     active: true,
    //     audible: false,
    //     autoDiscardable: true,
    //     discarded: false,
    //     favIconUrl: "http://jira.xgqfrms.xyz:8888/s/-1cz1zv/73017/b6b48b2829824b869586ac216d119363/_/favicon.ico",
    //     height: 657,
    //     highlighted: true,
    //     id: 2075115848,
    //     incognito: false,
    //     index: 13,
    //     mutedInfo: {
    //         muted: false,
    //     },
    //     pinned: false,
    //     selected: true,
    //     status: "loading",// status: "complete"
    //     title: "[CDD-288]  apitools 新增 键盘精灵 组件 - xgqfrms's JIRA",
    //     url: "http://jira.xgqfrms.xyz:8888/browse/CDD-288",
    //     width: 670,
    //     windowId: 2075114978,
    // }
    tab_uid = tabId;
    // chrome.pageAction.show(tabId);
    if (tab.status === "complete") {
        // getJiraInfos();
        chrome.tabs.sendMessage(tabId, {
            command: `fetch_jira_infos`,
            tabId,
        });
    } else {
        console.log(`tab still loading...`, tab.status);
        if (tabId) {
            chrome.tabs.sendMessage(tabId, {
                greeting: `hello, ${tabId}`,
                tabId,
            });
        }
    }
};


// onMessage callback
function onMessageChecker(request, sender, responseCallback) {
    console.log(`tab's request =`, request);
    // {name: "xgqfrms", age: 23, uid: "007", type: "extension", desc: "chrome.extension.sendMessage"}
    if (request.success) {
        chrome.storage.sync.set({
            jira_str: request.result,
            jira_obj: request.jira_obj,
        }, function() {
            console.log(`chrome.storage.sync.set OK!`);
            // chrome.storage.sync.get({
            //     jira_str,
            //     jira_obj,
            // }, function(items) {
            //     console.log(`chrome.storage.sync.get OK!`);
            //     console.log(`get items =`, JSON.stringify(items, null, 4));
            // });
        });
    } else {
        // 
    }
    // console.log(`tab's sender =`, sender);
    // {id: "bcekomhklpmcbcmgpgfdnocmcabgofhh", url: "http://jira.xgqfrms.xyz:8888/plugins/servlet/softw…400&projectKey=CDD&issueId=46104&issueKey=CDD-288", tab: {…}, frameId: 3051}
    // console.log(`tab's sender =`, JSON.stringify(sender, null, 4));
    // {
    //     id: "bcekomhklpmcbcmgpgfdnocmcabgofhh",
    //     frameId: 3051,
    //     tab: {
    //         active: true,
    //         audible: false,
    //         autoDiscardable: true,
    //         discarded: false,
    //         favIconUrl: "http://jira.xgqfrms.xyz:8888/s/-1cz1zv/73017/b6b48b2829824b869586ac216d119363/_/favicon.ico",
    //         height: 657,
    //         highlighted: true,
    //         id: 2075115848,
    //         incognito: false,
    //         index: 13,
    //         mutedInfo: {
    //             muted: false,
    //         },
    //         pinned: false,
    //         selected: true,
    //         status: "loading",// status: "complete"
    //         title: "[CDD-288]  apitools 新增 键盘精灵 组件 - xgqfrms's JIRA",
    //         url: "http://jira.xgqfrms.xyz:8888/browse/CDD-288",
    //         width: 670,
    //         windowId: 2075114978,
    //     },
    //     url: "http://jira.xgqfrms.xyz:8888/plugins/servlet/softwareplant-bigtemplate/issue-export-panel?projectId=11400&projectKey=CDD&issueId=46104&issueKey=CD-288",
    // }
    // console.log(`tab's responseCallback =`, responseCallback);
    // callback responseCallback(response)
    let options = {
        type: "main",
        file: "background.js",
    };
    responseCallback(options);
    console.log(`background responseCallback finished!`);
    // responseCallback(options)
    // .then(res => {
    //     console.log(`responseCallback's response =`, res);
    // })
    // .catch(err => console.log(`responseCallback error =\n`, err));
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


