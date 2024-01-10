const form=document.querySelector(".form")
const image=document.querySelector("#image")
const name=document.querySelector("#name")
const lastname=document.querySelector("#lastname")
const info=document.querySelector("#info")
const button=document.querySelector("#submit")

form.addEventListener("submit", function(event){
    event.preventDefault()
   let obj={}
   let src=image.files[0]
   const reader=new FileReader;
   reader.onload=function(e){
    obj={
        image:e.target.result,
        first_name:name.value,
        last_name:lastname.value,
        information:info.value
       }
       axios.post("http://localhost:3000/api" , obj)
       window.location="./index.html"
        }
     
   reader.readAsDataURL(src)
})