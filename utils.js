function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);
  
      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };
  
      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };
  
      // Make the request
      req.send();
    });
  }

  // still returns a promise, one that fetches a url then parses the response as JSON
  function getJSON(url) {
    return get(url).then(JSON.parse);
  }

  function getJSON2(url) {
    return get(url).then(JSON.parse).catch(function(err) {
      console.log("getJSON failed for", url, err);
      throw err;
    });
  }

  //-------------------------------//
  
  function setInnerHTMLTo(selector, content) {
      var elem = document.querySelector(selector);
      elem.innerHTML = '<div>' + content + '</div>';
  }

  function addInnerHTMLTo(selector, content) {
    var elem = document.querySelector(selector);
    elem.innerHTML += '<div>' + content + '</div>';
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('load', e => resolve(img));
    img.addEventListener('error', () => {
      reject(new Error(`Failed to load image's URL: ${url}`));
    });
    if (url) {
      img.src = url;
    }
    else {
      reject(new Error(`URL null: ${url}`));
    }
    
  });
}