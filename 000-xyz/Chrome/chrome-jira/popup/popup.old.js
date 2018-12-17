// document.addEventListener('DOMContentLoaded', function () {
//     // get Background Page
//     let bgp = chrome.extension.getBackgroundPage();
//     var data = bgp.articleData;
//     if(data.error){
//         $("#message").text(data.error);
//         $("#content").hide();
//     }else{
//         $("#message").hide();
//         $("#content-title").text(data.title);
//         $("#content-author").text(data.author);
//         $("#content-date").text(data.postDate);
//         $("#content-first-access").text(data.firstAccess);
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    let bgp = chrome.extension.getBackgroundPage();
    try {
        if (bgp) {
            let value = bgp.bgp_global_var;
            console.log(`popup & bgp_global_var =`, value);
        }
    } catch (error) {
        console.log(`popup & bgp_global_var & error =`, error);
    }
});



// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


/*

<?xml version="1.0" encoding="utf-8" ?>
<rsp stat="fail">
	<err code="100" msg="Invalid API Key (Key has expired)" />
</rsp>

*/

function showPhotos(req) {
    var photos = req.responseXML.getElementsByTagName("photo");
    try {
        for (var i = 0, photo; photo = photos[i]; i++) {
            var img = document.createElement("image");
            img.src = constructImageURL(photo);
            document.body.appendChild(img);
        }
    } catch (error) {
        document.body.insertAdjacentHTML(`beforend`, `<h1 style="color: red;">Invalid API Key (Key has expired)</h1>`);
        console.log(`fetch photos error =`, error);
    }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
    let result = ``;
    result = "http://farm" +
        photo.getAttribute("farm") +
        ".static.flickr.com/" +
        photo.getAttribute("server") +
        "/" +
        photo.getAttribute("id") +
        "_" +
        photo.getAttribute("secret") +
        "_s.jpg";
    return result;
}

setTimeout(() => {
    // var req = new XMLHttpRequest();
    // req.open(
    //     "GET",
    //     "http://api.flickr.com/services/rest/?" +
    //     "method=flickr.photos.search&" +
    //     "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
    //     "text=hello%20world&" +
    //     "safe_search=1&" +  // 1 is "safe"
    //     "content_type=1&" +  // 1 is "photos only"
    //     "sort=relevance&" +  // another good one is "interestingness-desc"
    //     "per_page=20",
    //     true,
    // );
    // req.onload = showPhotos(req);
    // req.send(null);
    let url = `https://cdn.xgqfrms.xyz/logo/icon.png`;
    let img = document.createElement("img");
    img.src = url;
    if (img) {
        document.body.insertAdjacentElement(`beforeEnd`, img);
    } else {
        document.body.insertAdjacentHTML(`beforeEnd`, `<h1 style="color: red;">Invalid API Key (Key has expired)</h1>`);
    }
}, 5000);