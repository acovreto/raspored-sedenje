const classIII3 = `1. Апостоловски Марко
2. Бајрам Ален
3. Бакулески Дамјан
4. Гиноски Јован
5. Димитријески Мартин
6. Димоски Димитар
7. Дуклески Александар
8. Ѓорѓиески Андреј
9. Ѓоршески Виктор
10. Ѓоршески Марио
11. Завојчевски Илија
12. Здравковиќ Владимир
13. Иловски Бојан
14. Јовчески Иво
15. Кочески Бобан
16. Марков Марио
17. Марков Никола
18. Маркоска Марта
19. Маркоски Јован
20. Модева Климентина
21. Настески Виктор
22. Павлески Марио
23. Петрески Кристијан
24. Попов Виктор
25. Сејдиноски Ерен
26. Трпески Александар
27. Тупаноски Јорданчо
28. Цаноски Христијан
29. Цацаноски Андреј
30. Целески Христијан`;
const classI3 = `1. Барандовски Христијан
2. Блажески Иво
3. Велјаноски Димитар
4. Георгиевски Матеј
5. Ѓорѓијоски Кристијан
6. Ѓоргиоски Даниел
7. Ѓорески Филип
8. Ѓоршески Мартин
9. Домазетоски Дејан
10. Костоска Вероника
11. Костоска Евгенија
12. Крстаноски Марко
13. Крстески Никола
14. Крстески Кирил
15. Лазароска Лора
16. Лазароска Христијана
17. Лекоски Петар
18. Марковски Драган
19. Наумоски Христијан
20. Нешкоски Христијан
21. Николоски Виктор
22. Павлески Мартин
23. Петровски Андреј
24. Серафимовски Наум
25. Серафимоски Стефан
26. Спироска Моника
27. Спироски Александар
28. Стојаноски Михаил
29. Стојаноски Христијан
30. Топаловски Василиј
31. Трајческа Мариана
32. Тупаноски Кристијан
33. Цветкоски Дејан
34. Шикалоски Стефан`;
const photosI3 = [
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar_g.PNG",
  "Avatar_g.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar_g.PNG",
  "Avatar_g.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar_g.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar_g.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
  "Avatar.PNG",
];

const btnSaveRaspored = document.querySelector(".btn-save-class");
const btnClearStorage = document.querySelector(".btn-clear-storage");
const rasSedWraper = document.querySelector(".ras-sed-wraper");

// console.log(listStudents);
if (!localStorage.getItem("studentDataSeatsI3")) {
  let listStudents = [];
  let listStudentsData = [];
  classI3.split("\n").forEach((student) => {
    let s1 = student.split(".");
    listStudents.push(s1[1].trim());
  });
  listStudents.forEach((student, i) => {
    listStudentsData.push({
      seat: i,
      name: student,
      photo: photosI3[i],
    });
  });

  if (listStudents.length > 30) {
    for (let i = listStudents.length; i < 36; i++) {
      listStudentsData[i] = {
        seat: i,
        name: "",
        photo: "Avatar.PNG",
      };
    }
  }
  localStorage.setItem("studentDataSeatsI3", JSON.stringify(listStudentsData));
}

// ****************************
// ****************************
let html = ``;
let listStudentsDataSeats = JSON.parse(
  localStorage.getItem("studentDataSeatsI3")
);

for (let i = 1; i <= Math.ceil(listStudentsDataSeats.length / 2); i++) {
  html += `<div class="desk"><div class="img-wraper"><div class="student draggable" data-index="${
    2 * i - 2
  }" draggable="true"><img class="student-img" 
  src="${
    listStudentsDataSeats[2 * i - 2].photo != ""
      ? listStudentsDataSeats[2 * i - 2].photo
      : "Avatar.PNG"
  }" width=60px height=60px />
  <p>${
    listStudentsDataSeats[2 * i - 2].name != ""
      ? listStudentsDataSeats[2 * i - 2].name
      : ""
  }</p>
  </div>
  <div class="student draggable" data-index="${
    2 * i - 1
  }"  draggable="true"><img class="student-img" 
  src="${
    listStudentsDataSeats[2 * i - 1].photo != ""
      ? listStudentsDataSeats[2 * i - 1].photo
      : "Avatar.PNG"
  }" width=60px height=60px />
  <p>${
    listStudentsDataSeats[2 * i - 1].name != ""
      ? listStudentsDataSeats[2 * i - 1].name
      : ""
  }</p>
  </div>
  </div></div>`;
}

rasSedWraper.insertAdjacentHTML("afterbegin", html);
const studentEl = document.querySelectorAll(".student");
addEventListeners();
// -----------------------------------------------------
let dragStartIndex;
let dragEndIndex;
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
    draggable.addEventListener("dragover", dragOver);
    draggable.addEventListener("drop", dragDrop);
    draggable.addEventListener("dragenter", dragEnter);
    draggable.addEventListener("dragleave", dragLeave);
  });
}
function dragStart() {
  dragStartIndex = +this.getAttribute("data-index");
  this.className += "hold";
  setTimeout(() => {
    this.classList.add("invisible");
  }, 0);
}
function dragEnd() {
  // console.log("Event: ", "dragend");
  this.classList.remove("invisible");
  // this.classList.add("");
}

function dragEnter() {
  // console.log("Event: ", "dragenter");
  // this.classList.add("");
}

function dragLeave() {
  // console.log("Event: ", "dragleave");
  // console.log(this);
  // console.log("dragLeave");
}

function dragOver(e) {
  console.log("Event: ", "dragover");

  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  // console.log(dragEndIndex);
  swapItems(dragStartIndex, dragEndIndex);
}
function swapItems(fromIndex, toIndex) {
  let fromIndexEl = document.querySelector(`[data-index="${fromIndex}"]`);
  fromIndexEl.classList.remove("invisible");
  // console.log(fromIndexEl);
  let toIndexEl = document.querySelector(`[data-index="${toIndex}"]`);
  // console.log(toIndexEl);
  fromIndexEl.innerHTML = `<img class="student-img" 
  src="${listStudentsDataSeats[toIndex].photo}" width=60px height=60px />
  <p>${listStudentsDataSeats[toIndex].name}</p>`;
  toIndexEl.innerHTML = `<img class="student-img" 
  src="${listStudentsDataSeats[fromIndex].photo}" width=60px height=60px />
  <p>${listStudentsDataSeats[fromIndex].name}</p>`;
  let temp = listStudentsDataSeats[fromIndex];
  listStudentsDataSeats[fromIndex] = listStudentsDataSeats[toIndex];
  listStudentsDataSeats[toIndex] = temp;
}
btnSaveRaspored.addEventListener("click", (e) => {
  if (localStorage.getItem("studentDataSeatsI3")) {
    localStorage.setItem(
      "studentDataSeatsI3",
      JSON.stringify(listStudentsDataSeats)
    );
    window.location.reload();
    alert("Промените се зачувани!");
  }
});
btnClearStorage.addEventListener("click", (e) => {
  if (localStorage.getItem("studentDataSeatsI3")) {
    localStorage.removeItem("studentDataSeatsI3");
    alert("Податоците се избришани!");
  }
});
