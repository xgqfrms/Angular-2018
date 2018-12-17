var postInfo = $("div.postDesc");

if(postInfo.length !== 1) {
    // runtime sendMessage
    chrome.runtime.sendMessage({
        type: "cnblog-article-information",
        error: "获取文章信息失败.",
    });
} else {
    var msg = {
        type: "cnblog-article-information",
        title : $("#cb_post_title_url").text(),
        postDate : postInfo.find("#post-date").text(),
        author : postInfo.find("a").first().text(),
        url: document.URL
    };
    // runtime sendMessage
    chrome.runtime.sendMessage(msg);
}
