const id= new URLSearchParams(window.location.search).get("id")
const blok=document.querySelector(".solutions-two")
function details(){
    fetch(`http://localhost:3000/api/${id}`)
    .then(res=>res.json())
    .then(data=>{
        blok.innerHTML+=`
        <div class="item">
        <img src="${data.image}" alt="">
        <p>${data.first_name}</p>
        <h4>${data.last_name}</h4>
        <span>${data.information}</span>
        <button onclick="history.back()" id="btn">Close</button>
      </div>
        `
    })
}

details()