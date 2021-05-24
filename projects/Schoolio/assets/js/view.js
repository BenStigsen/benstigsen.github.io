function initView() {
  let todolist = document.getElementById("todolist");

  // Get todo items
  let request = getUrlParameters();
  
  let content = new DocumentFragment();
  for (let i = 0; i < request.length; i++) {
    content.appendChild(addItem(request[i][0], request[i][1]));
  }
  
  // Add <content> to DOM
  todolist.appendChild(content);
}

function addItem(title, description) {
  let fragment = new DocumentFragment();

  let item               = document.createElement("div");
  let elementTitle       = document.createElement("h1");
  let elementDescription = document.createElement("div");
  
  item.classList.add("todoitem");
  elementDescription.classList.add("description");
  
  elementTitle.innerText       = title;
  elementDescription.innerHTML = description;
  
  item.style = "background: rgb(" + getRandomRGB(150, 225) + ")";
  item.appendChild(elementTitle);
  item.appendChild(elementDescription);
  fragment.appendChild(item);
  
  return fragment;
}

function editItems() {
  window.location.href = 'https://stigsen.xyz/create.html' + window.location.search;
}

function getRandomRGB(min, max) {
  return [  
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min
  ].join(",")
}
