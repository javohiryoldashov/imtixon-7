
const courseSelectGr = document.querySelector('.form-top-input-user');
const teacherSelectGr = document.querySelector('.form-top-input-teacher');

courseSelectGr.addEventListener("change", (e) => {
  let value = e.target.value;
//   console.log(value);
  fetch("/api/v2")
    .then((res) => res.json())
    .then((data) => {
      allTeachers(data);
      function allTeachers(teachers) {
        teacherSelectGr.innerHTML = "";
        const foundTeacher = teachers.filter((e) => e.course == value);
        if (foundTeacher) {
          foundTeacher.map((teacher) => {
            const { name } = teacher;
            let option = document.createElement("option");

            option.value = name;
            option.innerHTML = name;
            return teacherSelectGr.appendChild(option);
          });
        }
      }
    });
});