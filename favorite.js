const blok=document.querySelector(".solutions-two")
function favori(){
    fetch(`http://localhost:3000/favori/`)
    .then(res=>res.json())
    .then(data=>{
           data.forEach(element => {
            blok.innerHTML+=`
            <div class="item">
            <img src="${element.image}" alt="">
            <p>${element.first_name}</p>
            <h4>${element.last_name}</h4>
            <span>${element.information}</span>
            <button onclick="Delete(${element.id})">Delete</button>
          </div>
            `
           });
    })
}

function Delete(id){
    axios.delete(`http://localhost:3000/favori/${id}`)
    window.location.reload()
}

favori()