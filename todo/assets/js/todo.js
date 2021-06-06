let todolist;
let tododate;
let todoitems;
let dailyfocus;

let day = (new Date()).getDay();

function todoInit() {
  todolist   = document.getElementById("todolist");
  tododate   = document.getElementById("tododate");
  dailyfocus = document.getElementById("focus");
  
  todoitems = {
    monday: [
      [
        "3x40 wall pushups", 
        "3x40 knee tucks", 
        "study",
        "walk",
        "code"
      ], 
      "productivity, mental health, physical health"
    ],
    tuesday: [
      [
        "study", 
        "work", 
        "walk",
        "code"
      ], 
      "productivity"
    ],
    wednesday: [
      [
        "3x50 wall pullups", 
        "2x35 half squats", 
        "study", 
        "walk",
        "code"
      ], 
      "productivity, physical health"
    ],
    thursday: [
      [
        "work", 
        "creative writing", 
        "walk",
        "code"
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
        "walk",
        "code"
      ], 
      "mental health, creativity, mindfulness"
    ],
    sunday: [
      [
        "work", 
        "walk", 
        "read",
        "code"
      ], 
      "productivity, mindfulness"
    ]
  }
  
  updateDay();
}

function updateDay() {
  let weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][day];
  let items   = todoitems[weekday];
  
  todolist.innerHTML = "";
  tododate.innerHTML = '<span onclick="changeDay(-1);">&lt</span> ' + weekday + ' <span onclick="changeDay(1);">&gt</span>';
  
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
  
  dailyfocus.innerHTML = "<i><u>focus:</u> " + items[1] + "</i>";
}

function changeDay(n) {
  day += n;
  
  if (day < 0) {day = 6;}
  if (day > 6) {day = 0;}
  
  updateDay();
}

todoInit();
