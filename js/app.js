  function createElementFromHTML(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();
      return div.firstChild; 
  }
  function createScriptContent(scriptString){
      var script_tag = document.createElement('script');
      script_tag.type = 'text/javascript';
      script_tag.text = scriptString;
      document.body.appendChild(script_tag);
  }

function waitForElementToDisplay(selector, time, callback) {
    if(document.querySelector(selector)!=null) {
	callback && callback();
        }
        else {
            setTimeout(function() {
                waitForElementToDisplay(selector, time, callback);
            }, time);
        }
    }

  routie({
      'watch/:id': function(id) {
	  console.log(id);
	  var _el = document.getElementById("content-wrapper");
	  _el.setAttribute("data-fragment","template/watch.html");
	  _el.setAttribute("data-fragment-json","data/video/" +
			   "1.json" + "?t=" + (new Date()).getTime());
			   // id.replace(".html",".json"));
	  document.body.classList.add("single-video");
	  fragment.evaluate(_el.parentNode);
	  ljs.load([
	      "js/vendor/player/johndyer-mediaelement-89793bc/build/mediaelement-and-player.min.js"
	  ]);
	  waitForElementToDisplay("#video-responsive", 100, function(){

	      var _el = document.getElementById("video-responsive");
	      console.log(_el);
	      if(_el) {
	  	  var _video_src_type =
		      _el.getAttribute("video-src-type");
		  var _video_src_id =
		      _el.getAttribute("video-src-id");

		  switch(_video_src_type) {
		  case 'thanhnien':
		      nanoajax.ajax(
			  {url: "http://125.212.220.167:8080/https://video.thanhnien.vn/a/b-" + _video_src_id +".html"},
			  function(_code, _resp){
			      var m =
   				  _resp.match(/(\<video.+video\>)/);
			      var _v1 = createElementFromHTML(m[1]);
			      console.log(_v);
			      var _v = document.createElement('video');


			      _v1.setAttribute("style", "width:100%;height:100%;");
			      _v1.setAttribute("width", "100%");
			      _v1.setAttribute("height", "100%");
			      // _v.setAttribute("controls", "controls");
			      // _v.setAttribute("poster",
			      // 		      _v1.getAttribute("poster"));
			      // _v.setAttribute("src", _v1.getAttribute("src"));
			      // console.log(_v);
			      _el.appendChild(_v1);
			      //_el.classList.add("video-responsive");
			  });
		      break;
		  }
	      }
	  });

      },
      '*': function() {
	  console.log("not found");
	  var _el = document.getElementById("content-wrapper");
	  _el.setAttribute("data-fragment","template/index.html");
	  _el.setAttribute("data-fragment-json","data/index.json" +  "?t=" + (new Date()).getTime());
	  document.body.classList.remove("single-video");
	  fragment.evaluate(_el.parentNode);
      }
  });
