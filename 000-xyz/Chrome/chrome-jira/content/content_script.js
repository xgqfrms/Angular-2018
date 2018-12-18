"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.10.0
 * @modified 2018.10.0
 * 
 * @description SVN Commit Comments Auto Generator
 * @augments 
 * @example 
 * 
 */

// chrome || browser 

const SVNCommitCommentsAutoGenerator = (options = { kind: "无提交类型", testing: false, }, debug = false) => {
    let {
        kind,
        testing,
    } = options;
    let result = ``;
    let jiraId = document.querySelector(`[id="key-val"]`);
    let type = document.querySelector(`[id="type-val"]`);
    let summary = document.querySelector(`[id="summary-val"]`);
    let description = document.querySelector(`[id="description-val"]>[class="user-content-block"]`);
    jiraId = jiraId.innerText.trim() || null;
    type = type.innerText.trim() || null;
    summary = summary.innerText.trim() || "";
    description = description.innerText.trim() || "";
    let test = testing ? "是" : "否";
    if (kind === "无提交类型") {
        switch (type) {
            case "新需求":
                type = "新功能";
                break;
            case "优化":
                type = "追加递交";
                break;
            case "缺陷":
                type = "BUG修复";
                break;
            default:
                break;
        }
    }
    if (summary !== description) {
        summary += description;
    }
result = `
[JIRA编号] ${jiraId}
[修改内容] ${summary}
[提交类型] ${type}
[需要测试] ${test}
`;
    if (debug) {
        console.log(`result =\n`, result);
    }
    try {
        chrome.storage.sync.set({
            jira_str: result,
            jira_obj: {
                jiraId,
                summary,
                type,
                test,
            },
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
    } catch (error) {
        console.error(`chrome.storage.sync.set Error!`, error);
    }
    // try {
    //     window.copy(result);
    //     alert(`copied!`);
    // } catch (error) {
    //     console.error(`auto copy failed!`);
    // }
    // return result;
    return {
        result,
        jira_obj: {
            jiraId,
            summary,
            type,
            test,
        },
    };
};


window.SVNCC = SVNCommitCommentsAutoGenerator;
// SVNCC({ kind: "BUG修复", testing: true, });



function getResponseMessage(request, sender, sendResponse) {
    console.log(`bgp's request =`, request);
    // {greeting: "hello, 2075115695"}
    console.log(`bgp's request =`, JSON.stringify(request, null, 4));
    if (request.command) {
        // execute command
        let obj = {
            success: true,
        };
        Object.assign(obj, SVNCC({ kind: "BUG修复", testing: true, }));
        // send message
        chrome.extension.sendMessage(obj);
    } else {
        // do nothing
        // runtime sendMessage
        const request = {
            // "name": "xgqfrms",
            // "age": 23,
            // "uid": "007",
            success: false,
        };
        // if (chrome.runtime.sendMessage) {
        //     request.type = `runtime`;
        //     request.desc = `chrome.runtime.sendMessage`;
        //     chrome.runtime.sendMessage(request);
        // } else {
        //     request.type = `extension`;
        //     request.desc = `chrome.extension.sendMessage`;
        //     chrome.extension.sendMessage(request);
        // }
        request.type = `extension`;
        request.desc = `chrome.extension.sendMessage`;
        // send message
        chrome.extension.sendMessage(request);
    }
    // console.log(`bgp's sender =`, sender);
    // {id: "bcekomhklpmcbcmgpgfdnocmcabgofhh"}
    // console.log(`bgp's sendResponse =`, sendResponse);
    // response callback
    let response = {
        status: 200,
        message: "ok, I had got the tabId!",
        data: SVNCC({ kind: "BUG修复", testing: true, }, true).result,
    };
    sendResponse(response);
}


// window.onload = function() {
//     // all ready & init
//     chrome.extension.onMessage.addListener(getResponseMessage);
// };

window.addEventListener(`load`, () => {
    // all ready & init
    chrome.extension.onMessage.addListener(getResponseMessage); 
});

/*
    var responseCallback = function(response) {
        if (port) {
          port.postMessage(response);
          // TODO(robwu): This can be changed to disconnect() because there is
          // no point in allowing other receivers at this end of the port to
          // keep the channel alive because the opener port can only receive one
          // message.
          privates(port).impl.disconnectSoftly();
          port = null;
        } else {
          // We nulled out port when sending the response, and now the page
          // is trying to send another response for the same request.
          handleSendRequestError(isSendMessage, responseCallbackPreserved, sourceExtensionId, targetExtensionId);
        }
    };
*/
