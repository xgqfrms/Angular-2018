function getDomainFromUrl(url){
    var host = "null";
    if(typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

// tab callback
function checkForValidUrl(tabId, changeInfo, tab) {
    if(getDomainFromUrl(tab.url).toLowerCase()=="www.cnblogs.com"){
        chrome.pageAction.show(tabId);
    }
};

// tabs update
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// popup & background global variable
var articleData = {};
articleData.error = "加载中...";

// Todo ??? https://developers.chrome.com/extensions/getstarted
// chrome.storage API
// chrome.storage.sync.set({color: item}, function() {
//     console.log('color is ' + item);
// });


// onMessage callback ??? parems(object, sender, sendRequest)
function fetchServerData(request, sender, sendRequest) {
    if(request.type !== "cnblog-article-information") {
        return;
    }
    articleData = request;
    articleData.firstAccess = "获取中...";
    if(!articleData.error){
        // jQuery 2.0.0
        $.ajax({
            url: "http://localhost/first_access.php",
            cache: false,
            type: "POST",
            data: JSON.stringify({url:articleData.url}),
            dataType: "json"
        })
        .done(function(msg) {
            if(msg.error){
                articleData.firstAccess = msg.error;
            } else {
                articleData.firstAccess = msg.firstAccess;
            }
        })
        .fail(function(jqXHR, textStatus) {
            articleData.firstAccess = textStatus;
        });
    }
}

// runtime onMessage
chrome.runtime.onMessage.addListener(fetchServerData);
