const BASE_URL = `https://api.noroff.dev/api/v1/`;
const NEW_USER_URL = `social/auth/register`;
const LOGIN_URL = `social/auth/login`;
class NewUser {

    constructor(){
        // form input button
    }
   async registerUser (){
    try {let res = await fetch(BASE_URL+NEW_USER_URL,{
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
}}
/* const testUser = new NewUser() */
/* testUser.registerUser() */


class LoginUser{

constructor(){
    
}

async login(){
        try {let res = await fetch(BASE_URL+LOGIN_URL,{
            method:"POST",
            body: JSON.stringify({
                email: "opTestb@stud.noroff.no",
                password: "opTestb123",
                token: localStorage.getItem("token")||[]

            }),headers:{"content-type":"application/json; charset=UTF-8"},
        })
        console.log(res)
        if(res.status === 400){
            console.log("profile already exists")
        }else {
            let data = res.json()
            return data
        }
        }catch(error){}
    }
    async token (){
        try {
            const data = await this.login(); // Call the login method to get authentication data.
            const token = await data.accessToken; // Extract the access token.
            localStorage.setItem("token", JSON.stringify(token))
            console.log(token); // Log the access token to the console.
          } catch (error) {
            console.error('Error:', error);
          }
        }
    }
    const testUserLogin = new LoginUser()

    testUserLogin.token()

    testUserLogin.login()
