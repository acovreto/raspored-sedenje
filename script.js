const classIII4 = `1. Башукоски Даниел
2. Блажески Виктор
3. Вучетиќ Дејан
4. Димоска Емилија
5. Илијевска Софија
6. Јузмески Мартин
7. Каланоски Никола
8. Колушоски Филип
9. Кочоски Христијан
10. Кутаноски Драган
11. Маџар Марино
12. Милошоски Горазд
13. Митревски Наум
14. Настовски Марко
15. Новеска Ана
16. Палитов Стефан
17. Палитова Сара
18. Петрески Давор
19. Речкоски Наум
20. Рушан Енис
21. Симоновски Давид
22. Симоноски Мартин
23. Смилевски Владимир
24. Србакоски Христијан
25. Стефаноски Петар
26. Стојанов Благојче
27. Стрезовска Бојана
28. Танаскоски Петар
29. Трифуновски Филип
30. Трпески Антониј
31. Целески Никола`;
const classI4 = `1. Богојовски Благоја
2. Брдароска Марија
3. Гугоски Филип
4. Димиќ Лука
5. Донев Стефан
6. Донески Филип
7. Ѓорески Климент
8. Јанески Виктор
9. Јованоски Бојан
10. Јованчев Андреј
11. Јоноска Кети
12. Каланоски Владимир
13. Крстаноски Дарко
14. Кузманоска Јана
15. Мајкиќ Мартин
16. Маркоски Марио
17. Мешкоски Андреј
18. Митревски Христијан
19. Мургоски Славчо
20. Мурџоски Борјан
21. Новаков Павел
22. Палоски Бојан
23. Попоски Марко
24. Ристевски Мартин
25. Савиќ Андреа
26. Стевановски Стефан
27. Стојаноски Александар
28. Тасеска Мелани
29. Тодороски Лука
30. Толески Борис
31. Трифуноски Кристијан
32. Трпески Бојан`;
const btnSaveRaspored = document.querySelector(".btn-save-class");
const btnClearStorage = document.querySelector(".btn-clear-storage");
const rasSedWraper = document.querySelector(".ras-sed-wraper");

// console.log(listStudents);
if (!localStorage.getItem("studentDataSeatsI4")) {
  let listStudents = [];
  let listStudentsData = [];
  classI4.split("\n").forEach((student) => {
    let s1 = student.split(".");
    listStudents.push(s1[1].trim());
  });
  listStudents.forEach((student, i) => {
    listStudentsData.push({
      seat: i,
      name: student,
      photo: `https://randomuser.me/api/portraits/men/${i + 1}.jpg`,
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
  localStorage.setItem("studentDataSeatsI4", JSON.stringify(listStudentsData));
}

// ****************************
// ****************************
let html = ``;
let listStudentsDataSeats = JSON.parse(
  localStorage.getItem("studentDataSeatsI4")
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
  console.log("Event: ", "dragstart");
  dragStartIndex = +this.getAttribute("data-index");
  this.className += "hold";
  setTimeout(() => {
    this.classList.add("invisible");
  }, 0);

  console.log(dragStartIndex);
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
  console.log("Event: ", "drop");
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
  console.log(listStudentsDataSeats[fromIndex]);
  console.log(listStudentsDataSeats[toIndex]);
  console.log(temp);
}
btnSaveRaspored.addEventListener("click", (e) => {
  if (localStorage.getItem("studentDataSeatsI4")) {
    localStorage.setItem(
      "studentDataSeatsI4",
      JSON.stringify(listStudentsDataSeats)
    );
    alert("Промените се зачувани!");
  }
});
btnClearStorage.addEventListener("click", (e) => {
  if (localStorage.getItem("studentDataSeatsI4")) {
    localStorage.removeItem("studentDataSeatsI4");
    alert("Податоците се избришани!");
  }
});
