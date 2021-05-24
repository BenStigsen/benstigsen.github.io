/// URLs should be encoded for this work properly

function getUrlParameters() {
  // Split URL parameters
  let url = window.location.search;

  if (url === undefined || url.length === 0) {return {}}
  
  let parameters = decodeURI(url).substring(1).split("&");
  
  // Get decoded keys and values from URL
  let items = [];
  for (let i = 0; i < parameters.length; i++) {
    let pos = parameters[i].indexOf("=");
    let key = parameters[i].substring(0, pos);
    let val = parameters[i].substring(pos + 1);
    
    // Add map key and value
    if (key !== -1 && val !== -1) {
      items.push([key, val]);
    }
  }
  
  return items;
}

