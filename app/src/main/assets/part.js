(function(){if(window.parent){window.console.log('PART JAVASCRIPT INJECTED SUCCESSFUL!');window.VIDEO_CAPTURED_ARRAY=[];String.prototype.includes=String.prototype.includes||function(element){return this.indexOf(element)>=0};String.prototype.startsWith=String.prototype.startsWith||function(prefix){return this.indexOf(prefix)===0};String.prototype.endsWith=String.prototype.endsWith||function(suffix){return this.indexOf(suffix,this.length-suffix.length)>=0};Array.prototype.includes=Array.prototype.includes||function(element){return this.indexOf(element)>-1};window.checkAndFormatUrl=function(url){return(url&&!url.startsWith('blob')&&url.length>20)?(url.startsWith('http')?url:(url.startsWith('//')?'http:'+url:'http://'+url)):''};window.HookAjax=function(proxy){window.XHRFunctionArray=['open','setRequestHeader','send','abort','getResponseHeader','getAllResponseHeaders','overrideMimeType','addEventListener','removeEventListener','dispatchEvent'];window.NXMLHttpRequest=window.NXMLHttpRequest||XMLHttpRequest;XMLHttpRequest=function(){Object.defineProperty(this,'xhr',{value:new window.NXMLHttpRequest})};for(var attribute in window.NXMLHttpRequest.prototype){if(XHRFunctionArray.includes(attribute)){XMLHttpRequest.prototype[attribute]=hookFun(attribute)}else{Object.defineProperty(XMLHttpRequest.prototype,attribute,{get:getFactory(attribute),set:setFactory(attribute),enumerable:true})}}function getFactory(attribute){return function(){var v=this.hasOwnProperty(attribute+"_")?this[attribute+"_"]:this.xhr[attribute];var attributeGetterHook=(proxy[attribute]||{})["getter"];return attributeGetterHook&&attributeGetterHook(v,this)||v}}function setFactory(attribute){return function(v){var xhr=this.xhr,that=this,proxyFun=proxy[attribute];if(typeof proxyFun==="function"){xhr[attribute]=function(){proxy[attribute](that)||v.apply(xhr,arguments)}}else{var attributeSetterHook=(proxyFun||{})["setter"];v=attributeSetterHook&&attributeSetterHook(v,that)||v;try{xhr[attribute]=v}catch(e){this[attribute+"_"]=v}}}}function hookFun(attribute){return function(){var args=[].slice.call(arguments);if(proxy[attribute]&&proxy[attribute].call(this,args,this.xhr)){return}try{return this.xhr[attribute].apply(this.xhr,args)}catch(e){}}}return window.NXMLHttpRequest};window.analysis={'youtube':{'cycle':false,'code':function(){window.HookAjax({open:function(arg,xhr){if(arg[1]&&arg[1].includes('.com/get_video_info')){xhr.onload=function(e){xhr=e.currentTarget;if(xhr.status===200&&xhr.responseText){parent.postMessage({actionTag:'IFRAME_YOUTUBE_CAPTURED','response':xhr.responseText},'*')}}}}})}}};window.GENERAL_CANPLAY_LISTENER=function(e){var video=e.target,url,quality;if((url=window.checkAndFormatUrl(video.currentSrc))&&!window.VIDEO_CAPTURED_ARRAY.includes(url)){window.VIDEO_CAPTURED_ARRAY.push(url);if(video.videoWidth){quality=video.videoWidth+'X'+video.videoHeight;window.androidVideoBridge.checkPlay(JSON.stringify([{'url':url,'quality':quality}]))}else{window.androidVideoBridge.checkPlay(JSON.stringify([{'url':url}]))}}};for(var domin in window.analysis){if(document.domain.includes(domin)){window.VIDEO_CAPTURED_MATCH=true;var obj=window.analysis[domin];if(obj.cycle){window.VIDEO_CAPTURED_INTERVAL=window.setInterval(function(){obj.code();if(window.VIDEO_CAPTURED_FLAG){window.clearInterval(window.VIDEO_CAPTURED_INTERVAL)}},1000)}else{obj.code()}break}}if(!window.VIDEO_CAPTURED_MATCH){window.addEventListener('canplay',window.GENERAL_CANPLAY_LISTENER,true)}}})();