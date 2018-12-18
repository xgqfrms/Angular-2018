"use strict";

/**
 * 
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2018.12.17
 * @modified 2018.12.17
 * 
 * @description popup.js
 * @augments 
 * @example 
 * 
 */


const showLogo = () => {
    let url = `https://cdn.xgqfrms.xyz/logo/icon.png`;
    let img = document.createElement("img");
    img.src = url;
    if (img) {
        document.body.insertAdjacentElement(`beforeEnd`, img);
    } else {
        document.body.insertAdjacentHTML(`beforeEnd`, `<h1 style="color: red;">Invalid API Key (Key has expired)</h1>`);
    }
};

const copyText = () => {
    let btn = document.querySelector(`[data-btn="click-copy"]`);
    let flag = btn.dataset.onceFlag;
    if (!flag) {
        btn.dataset.onceFlag = true;
        btn.addEventListener(`click`, () => {
            // SVN jira infos!
let text = `
[JIRA编号] CDD-295
[修改内容] apitools 依赖表 新增（搜索表功能）
[提交类型] 新需求
[需要测试] 是
`;
            try {
                if (window.copy) {
                    window.copy(text);
                    console.log(`copied!`);
                } else {
                    console.warn(`copy failed!`, window);
                }
            } catch (error) {
                console.error(`copy error!`, window);
            }
        });
    } else {
        console.log(`only needs bind once!`);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showLogo();
    // click & copy
    // copyText();
    setTimeout(() => {
        let bgp = chrome.extension.getBackgroundPage();
        // window.Window === popup.js's window
        // bgp === Window 
        console.log(`bgp =`, bgp);
        try {
            if (bgp) {
                let value = bgp.bgp_global_var;
                // bgp === Window 
                // bgp.bgp_global_var === window.Window.bgp_global_var
                console.log(`popup & bgp_global_var =`, value);
            }
        } catch (error) {
            console.log(`popup & bgp_global_var & error =`, error);
        }
    }, 0);
    setTimeout(() => {
        // OK
        let input = document.querySelector(`[data-input="selectable-text"]`);
        input.select();
        try {
            document.execCommand("copy");
        } catch (error) {
            console.log(`copy error`, error);
        }
        // let btn = document.querySelector(`[data-btn="click-copy"]`);
        // btn.click();
    }, 1000);
});

setTimeout(() => {
    // chrome.storage
    (() => {
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
    })();
}, 5000);



// setTimeout(() => {
//     showLogo();
//     let bgp = chrome.extension.getBackgroundPage();
//     try {
//         if (bgp) {
//             let value = bgp.bgp_global_var;
//             console.log(`popup & bgp_global_var =`, value);
//         }
//     } catch (error) {
//         console.log(`popup & bgp_global_var & error =`, error);
//     }
// }, 3000);



/*

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

*/

