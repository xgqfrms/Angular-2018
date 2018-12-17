document.addEventListener('DOMContentLoaded', function () {
    // get Background Page
    let bgp = chrome.extension.getBackgroundPage();
    var data = bgp.articleData;
    if(data.error){
        $("#message").text(data.error);
        $("#content").hide();
    }else{
        $("#message").hide();
        $("#content-title").text(data.title);
        $("#content-author").text(data.author);
        $("#content-date").text(data.postDate);
        $("#content-first-access").text(data.firstAccess);
    }
});
