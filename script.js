var nav = document.querySelector("nav")
window.addEventListener("scroll", () => {
    nav.classList.toggle("sticky", window.scrollY > 0)
})


const mybutton = document.querySelector(".mybtn")
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 100) {
        mybutton.style.display = "block"
    } else {
        mybutton.style.display = "none"
    }

})
mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})


const blok=document.querySelector(".solutions-two")
page=1
 function mydata(){
   fetch(`http://localhost:3000/api?_page=${page}&_limit=3`)
   .then(res=>res.json())
   .then(data=>{
      data.forEach(element => {
        if (data.find(f => f.id === element.id)) {
        blok.innerHTML+=`
        <div class="item">
        <img src="${element.image}" alt="">
        <p>${element.first_name}</p>
        <i class="bi bi-heart" onclick="addFavorite(${element.id})" id="icon"></i>
        <h4>${element.last_name}</h4>
        <span>${element.information}</span>
        <a href="./details.html?id=${element.id}"><button id="btn1">DETAILS</button></a>
        <button onclick="deletefunk(${element.id})" id="btn2">DELETE</button>
        <button onclick="updatefunk(${element.id})" id="btn3">UPDATE</button>
      </div>
        `}else{
          blok.innerHTML+=`
          <div class="item">
          <img src="${element.image}" alt="">
          <p>${element.first_name}</p>
          <i class="bi bi-heart-fill" onclick="addFavorite(${element.id})" id="icon"></i> 
          <h4>${element.last_name}</h4>
          <span>${element.information}</span>
          <a href="./details.html?id=${element.id}"><button id="btn1">DETAILS</button></a>
          <button onclick="deletefunk(${element.id})" id="btn2">DELETE</button>
          <button onclick="updatefunk(${element.id})" id="btn3">UPDATE</button>
        </div>`
        }
      });
})
 }

function addFavorite(id) {
  event.target.classList.remove('bi-heart')
  event.target.classList.add('bi-heart-fill')
  axios.get(`http://localhost:3000/api/${id}`)
      .then(res => {
          return res.data
      })
      .then(res => {
          axios.get(`http://localhost:3000/favori`)
              .then(post=> {
                  let like = post.data.find(f => f.id === res.id);
                  if (!like) {
                      axios.post(`http://localhost:3000/favori`, res)
                  }
                  else {
                      axios.delete(`http://localhost:3000/favori/${like.id}`)
                  }
              })
      })
}

mydata()

function deletefunk(id){
   axios.delete(`http://localhost:3000/api/${id}`)  
   window.location.reload() 
}

const loadMore=document.querySelector(".load")
loadMore.addEventListener("click", ()=>{
    page++
    mydata()
    fetch("http://localhost:3000/api")
    .then(res=>res.json())
    .then(data=>{
          if(page*4 >= data.length){
            loadMore.style.display="none"
          }
    })
})

function updatefunk(id){
    const modal=document.createElement("div")
    modal.classList.add("modal")
    modal.innerHTML=`
    <div class="form">
    <div class="form-content">
        <div class="img">
            <img src="" class="pleaceimg" alt="">
            <span class="plus">+</span>
            <input type="file" accept="image/*">
        </div>
        <label for="name1">First-Name:</label>
        <input type="text" class="firstname" value="new first-name" required> 
        <label for="name1">Last Name:</label>
        <input type="text" class="lastname" value=" new last-name" required>
        <label for="info1">Information:</label>
        <input type="text" class="info" required value="new info">
        <button class="save">SAVE</button>
        <button class="closebtn">CLOSE</button>
    </div>
</div>
    `

 document.body.appendChild(modal)
 closebtn=document.querySelector(".closebtn")
 closebtn.addEventListener("click", ()=>{
    modal.remove()
})

 let pleaceImg = document.querySelector(".pleaceimg");
 let plus = document.querySelector(".plus");
 const fileInput = document.querySelector('input[type="file"]');
 const firstnameInput = document.querySelector('.firstname');
 const lastnameInput = document.querySelector('.lastname');
 const infoInput = document.querySelector('.info');
 let save = document.querySelector(".save");
 console.log(pleaceImg,fileInput,firstnameInput,lastnameInput,infoInput);
 
 axios.get(`http://localhost:3000/api/${id}`)
   .then(data => {
     pleaceImg.src = data.image;
     firstnameInput.value = data.first_name.value;
     lastnameInput.value = data.last_name.value;
     infoInput.value = data.information.value;
   });


   save.addEventListener("click", () => {
    console.log("salam");
    axios.put(`http://localhost:3000/api/${id}`, {
        image: pleaceImg.src, 
        first_name: firstnameInput.value,
        last_name: lastnameInput.value,
        information: infoInput.value
      })
      .then(response => {
        console.log(response.data);
        window.location = "./index.html";
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  });
   plus.addEventListener("click", () => {
    console.log("salam");
    fileInput.click();
    fileInput.addEventListener("change", (e) => {
      let file = e.target.files[0];
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          pleaceImg.src = reader.result;
        };
      }
    });
  });
}