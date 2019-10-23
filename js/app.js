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
	  setTimeout(function(){
	      var _el = document.getElementById("video-item");
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
     			      _el.parentNode.innerHTML
				  = m[1];
			  });
		      break;
		  }
	      }
	  }, 1000);

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
