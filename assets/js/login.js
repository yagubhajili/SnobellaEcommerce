import { ProUser } from "./baseURL.js";
import { postDatas } from "./request.js";
import { getDatas } from "./request.js";



let form = document.querySelector(".form")
let username = document.querySelector(".username")
let password = document.querySelector(".password")



 
async function usercheck() {
    let output = JSON.parse(localStorage.getItem("isLogin"))
    let users=await getDatas(ProUser)
    if (output) {
        window.location.href = "index.html"
    
    }
    else {
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            let findelem = users.find(elem => {
                return elem.name == username.value && elem.pass == password.value
            })
            if (findelem) {
                localStorage.setItem("isLogin", JSON.stringify(true))
                localStorage.setItem("isAdmin", findelem.isAdmin)
                window.location.href = "index.html"
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Username və ya Password yalnışdır!",
                  });
            }
    
        })
    }
}

usercheck()
