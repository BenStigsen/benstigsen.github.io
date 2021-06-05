function todoInit() {
  let todolist   = document.getElementById("todolist");
  let tododate   = document.getElementById("tododate");
  let dailyfocus = document.getElementById("focus");
  
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  let todoitems = {
    monday: [
      [
        "3x45 incline pushups", 
        "3x40 knee tucks", 
        "study", 
        "walk"
      ], 
      "productivity, mental health, physical health"
    ],
    tuesday: [
      [
        "study", 
        "work", 
        "walk"
      ], 
      "productivity"
    ],
    wednesday: [
      [
        "3x50 wall pullups", 
        "2x35 half squats", 
        "study", 
        "walk"
      ], 
      "productivity, physical health"
    ],
    thursday: [
      [
        "work", 
        "creative writing", 
        "walk"
      ], 
      "productivity, mindfulness"
    ],
    friday: [
      [
        "3x50 short bridges", 
        "walk", 
        "creative writing"
      ], 
      "physical health, mindfulness"
    ],
    saturday: [
      [
        "clean room", 
        "creative writing", 
        "walk"
      ], 
      "mental health, creativity, mindfulness"
    ],
    sunday: [
      [
        "work", 
        "walk", 
        "read"
      ], 
      "productivity, mindfulness"
    ]
  }
  
  let day = days[(new Date()).getDay()];
  tododate.innerHTML = day;
  
  let items = todoitems[day];
  let fragment = document.createDocumentFragment();
  
  for (let i = 0; i < items[0].length; i++) {
    let p = document.createElement('p');
    p.innerText = items[0][i];
    
    p.addEventListener('click', function() {
      if (p.style.textDecoration === "") {
        p.style.textDecoration = "line-through";
      } else {
        p.style.textDecoration = "";
      }
    }, false);
    
    fragment.appendChild(p)
  }
  
  todolist.appendChild(fragment);
  
  dailyfocus.innerHTML = "<i> <u>focus:</u> " + items[1] + "</i>";
}

todoInit();
