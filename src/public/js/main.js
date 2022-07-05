let deleteItem = document.getElementById('delete')

function hendelDelete (deleteItem){
    fetch(`http://localhost:9900/students/${deleteItem}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}


const courseSelectGr = document.querySelector('.form-top-input-user');
const teacherSelectGr = document.querySelector('.form-top-input-teacher');

courseSelectGr.addEventListener("change", (e) => {
  let value = e.target.value;
  fetch("/api1/v3")
    .then((res) => res.json())
    .then((data) => {
    allGroups(data);
      function allGroups(groups) {
        teacherSelectGr.innerHTML = "";
        const foundGroups = groups.filter((e) => e.coursName == value);
        if (foundGroups) {
          foundGroups.map((group) => {
            const { groupName } = group;
            let option = document.createElement("option");

            option.value = groupName;
            option.innerHTML = groupName;
            return teacherSelectGr.appendChild(option);
          });
        }
      }
    });
});