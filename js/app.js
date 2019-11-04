function createElementFromHTML(htmlString) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
function createScriptContent(scriptString) {
  var script_tag = document.createElement("script");
  script_tag.type = "text/javascript";
  script_tag.text = scriptString;
  document.body.appendChild(script_tag);
}

function waitForElementToDisplay(selector, time, callback) {
  if (document.querySelector(selector) != null) {
    callback && callback();
  } else {
    setTimeout(function() {
      waitForElementToDisplay(selector, time, callback);
    }, time);
  }
}

routie({
  "watch/tn/:id": function(id) {
    console.log(id);
    var _el = document.getElementsByClassName("content-wrapper")[0];
    _el.setAttribute("data-fragment", "template/watch.html");
    _el.setAttribute(
      "data-fragment-json",
      "data/video/tn/" + id + ".json" + "?t=" + new Date().getTime()
    );
    // id.replace(".html",".json"));
    document.body.classList.add("single-video");
    fragment.evaluate(_el.parentNode);

    ljs.load([
      "js/vendor/clipboard/dist/clipboard.min.js",
      "js/vendor/player/johndyer-mediaelement-89793bc/build/mediaelement-and-player.min.js",
      "js/vendor/magnificPopup/dist/jquery.magnific-popup.min.js"
    ]);
    waitForElementToDisplay("video", 1000, function() {
      // var _el = document.getElementsByTagName("video")[0];
      // console.log(_el);
      // var _video_source_type = $(_el).attr("source_type");
      // var _video_link_play = $(_el).attr("link_play");
      // console.log(_video_source_type);
      // console.log(_video_link_play);
      // var _el_sources = $(_el).find("source")[0];
      // console.log(_el_sources);

      // switch (_video_source_type) {
      //   case "tn":
      //     // nanoajax.ajax(
      //     //   {
      //     //     url: "http://125.212.220.167:8080/" + _video_link_play
      //     //   },
      //     //   function(_code, _resp) {
      //     //     var m = _resp.match(/(\<video.+video\>)/);
      //     //     var _v1 = createElementFromHTML(m[1]);
      //     //     console.log(_v1);
      // 	  // 	$(_el).attr("poster", _v1.getAttribute("poster"));
      // 	  // 	$(_el_sources).attr("src",_v1.getAttribute("src"));
      // 	  // 	console.log(_el);

      //     //   }
      //     // );
      //     break;
      // }


	ljs.load("js/custom.js");
    });
    // waitForElementToDisplay("#sv-video-player", 100, function() {
    //   var _el = document.getElementById("sv-video-player");
    //   console.log(_el);
    //   if (_el) {
    //     var _video_src_type = _el.getAttribute("video-src-type");
    //     var _video_src_id = _el.getAttribute("video-src-id");
    //     var _el_sources = _el.getElementsByTagName("source");
    //     console.log(_el_sources);
    //     switch (_video_src_type) {
    //       case "thanhnien":
    //         nanoajax.ajax(
    //           {
    //             url:
    //               "http://125.212.220.167:8080/https://video.thanhnien.vn/a/b-" +
    //               _video_src_id +
    //               ".html"
    //           },
    //           function(_code, _resp) {
    //             var m = _resp.match(/(\<video.+video\>)/);
    //             var _v1 = createElementFromHTML(m[1]);
    //             console.log(_v1);
    //             _el.setAttribute("poster", _v1.getAttribute("poster"));
    //             _el_sources[0].src = _v1.getAttribute("src");
    //             console.log(_el);
    //             ljs.load(
    //               [
    //                 "js/vendor/clipboard/dist/clipboard.min.js",
    //                 "js/vendor/player/johndyer-mediaelement-89793bc/build/mediaelement-and-player.min.js",
    //                 "js/vendor/magnificPopup/dist/jquery.magnific-popup.min.js"
    //               ],
    //               "js/custom.js"
    //             );
    //           }
    //         );
    //         break;
    //     }
    //   }
    // })
  },
  "*": function() {
    console.log(window.location);
    var _el = document.getElementsByClassName("content-wrapper")[0];
    _el.setAttribute("data-fragment", "template/index.html");
    _el.setAttribute(
      "data-fragment-json",
      "data/index.json" + "?t=" + new Date().getTime()
    );
    fragment.evaluate(_el.parentNode);
    document.body.classList.remove("single-video");
    waitForElementToDisplay(".videoitem", 1000, function() {
      ljs.load(["js/custom.js"]);
    });
  }
});
