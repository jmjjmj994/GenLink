import { getSingleElements } from "./dom.js";
import { nameRegex, emailRegex, passwordRegex } from "./validation.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const NEW_USER_URL = `social/auth/register`;
const LOGIN_URL = `social/auth/login`;
class NewUser {

    constructor(){
        const signUpForm = getSingleElements("#signup-form")
        const fullNameInput = getSingleElements("#full-name")
        const newEmailInput = getSingleElements("#new-email")
        const newPasswordInput = getSingleElements("#new-password")
        const signUpBtn = getSingleElements(".signup-btn")
            signUpForm.addEventListener("submit",(e)=>{
                e.preventDefault()
            })
            signUpBtn.addEventListener("click",(e)=>{
                const fullNameInputValue = fullNameInput.value.trim()
                const newEmailInputValue = newEmailInput.value.trim()
                const newPasswordInputValue = newPasswordInput.value.trim()
                console.log(fullNameInputValue)
                console.log(newEmailInputValue)
                console.log(newPasswordInputValue)
        })
    }


    validator(){
        
    }

    

/*    async registerUser (){
    try {const res = await fetch(BASE_URL+NEW_USER_URL,{
        method:"POST",
        body: JSON.stringify({
            name: "opTestb",
            email: "opTestb@stud.noroff.no",
            password: "opTestb123",
        }),headers:{"content-type":"application/json; charset=UTF-8"},
    })
    console.log(res.status)
    if(res.status !== 201){
        console.log("profile already exists")
    }else {
        let data = res.json()
        console.log(data)
    }
    }catch(error){}
} */}
 const testUser = new NewUser() 
/*  testUser.registerUser() 
*/