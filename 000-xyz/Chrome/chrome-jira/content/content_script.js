// runtime sendMessage
const request = {
    "name": "xgqfrms",
    "age": 23,
    "uid": "007",
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
chrome.extension.sendMessage(request);

function getResponseMessage(request, sender, sendResponse) {
    console.log(`bgp's request =`, request);
    // {greeting: "hello, 2075115695"}
    console.log(`bgp's sender =`, sender);
    // {id: "bcekomhklpmcbcmgpgfdnocmcabgofhh"}
    console.log(`bgp's sendResponse =`, sendResponse);
    // response callback
    let response = {
        status: 200,
        message: "ok, I had got the tabId!"
    };
    sendResponse(response);
}

chrome.extension.onMessage.addListener(getResponseMessage);

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