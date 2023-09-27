import{
    getSingleElements
} from "./js/dom.js";

class NewUser {

    constructor(){
        // form input button
    }

    registerUser (){
        console.log("test method")
    }
}
const testUser = new NewUser()
console.log(Object.getPrototypeOf(testUser)===NewUser)
testUser.registerUser()

console.log("hei")