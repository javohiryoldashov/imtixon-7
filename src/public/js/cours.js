let deleteItem = document.getElementById('delete')

function hendelDelete (deleteItem){
    fetch(`http://localhost:9900/courses/${deleteItem}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .catch(err => console.log(err))
} 