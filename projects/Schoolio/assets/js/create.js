let todolist = document.getElementById("todolist");

function initCreate() {
  // Get todo items
  let request = getUrlParameters();
  
  let content = new DocumentFragment();
  for (let i = 0; i < request.length; i++) {
    content.appendChild(addItem(request[i][0], request[i][1]));
  }
  
  // Add <content> to DOM
  todolist.appendChild(content);
}

function createItem() {
  let item = addItem("Title Here", "Some description here");
  todolist.appendChild(item);
}

function addItem(title, description) {
  let fragment = new DocumentFragment();

  let item               = document.createElement("div");
  let elementTitle       = document.createElement("h1");
  let elementTextbox     = document.createElement("div");
  let elementDescription = document.createElement("div");
  let elementDelete      = document.createElement("button");
  
  item.classList.add("todoitem");
  elementTextbox.classList.add("description");
  elementDescription.classList.add("description");
  
  elementTitle.setAttribute("contenteditable", "true");
  elementTextbox.setAttribute("contenteditable", "true");
  
  elementTextbox.style.display = "none";
  
  elementTitle.innerText       = title;
  elementTextbox.innerText     = description;
  elementDescription.innerHTML = description;
  elementDelete.innerText      = "Remove Item";
  
  // Show rendered HTML on textbox unfocus
  elementTextbox.onblur = function () {
    elementDescription.innerHTML = elementTextbox.innerText;
    elementDescription.style.display = "block";
    elementTextbox.style.display = "none";
  }
  
  // Show raw HTML on textbox focus
  elementDescription.onclick = function () {
    elementTextbox.innerText = elementDescription.innerHTML;
    elementDescription.style.display = "none";
    elementTextbox.style.display = "block";
    elementTextbox.focus();
  } 
  
  elementDelete.onclick = function() {
    item.remove();
  }
  
  // Generate random background
  item.style = "background: rgb(" + getRandomRGB(150, 225) + ")";
  item.appendChild(elementTitle);
  item.appendChild(elementTextbox);
  item.appendChild(elementDescription);
  item.appendChild(elementDelete);
  fragment.appendChild(item);
  
  return fragment;
}

function generateURL() {
  let url = "?";
  let items = document.body.getElementsByClassName("todoitem");
  
  let i = 0;
  while (i < items.length) {
    if (i > 0) {
      url += "&";
    }
    
    url += items[i].getElementsByTagName("h1")[0].innerText;
    url += "=";
    url += items[i].getElementsByClassName("description")[1].innerHTML;
    
    i++;
  }
  
  return encodeURI(url);
}

function shareURL() {
  let element = document.getElementById("shareurl");
  let url = generateURL();
  
  element.innerText = window.location.protocol + "//stigsen.xyz/projects/Schoolio/view.html" + url;
}

function copyURL() {
  shareURL();
  
  let element = document.getElementById("shareurl");
  let range = document.createRange();
  
  range.selectNode(element);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

function getRandomRGB(min, max) {
  return [  
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min
  ].join(",")
}
