
let form = document.getElementById('formOfWork')
let title = document.getElementById('titleOfWork')
let deta = document.getElementById('detaOfWork')

form.addEventListener('submit', e=>{
    e.preventDefault()
    let workDeta = document.getElementById('workDeta').value
    let homeWork = document.getElementById('homeWork').value
    console.log(workDeta,homeWork);
    title.textContent = homeWork
    deta.textContent = workDeta
})