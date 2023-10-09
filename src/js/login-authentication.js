import { getSingleElements } from "./dom.js";
import { emailRegex, passwordRegex } from "./validation.js";
const BASE_URL = `https://api.noroff.dev/api/v1/`;
const LOGIN_URL = `social/auth/login`;

class Login {
  constructor(formElement, emailElement, passwordElement) {
    this.form = formElement;
    this.emailInput = emailElement;
    this.passwordInput = passwordElement;
    this.loginBtn = document.querySelector(".login-btn");
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.loginBtn.addEventListener("click", (e) => {
      if (
        !emailRegex.test(this.emailInput.value.trim()) &&
        !passwordRegex.test(this.passwordInput.value.trim())
      ) {
        console.log("email"); //will be an error
      } else {
        this.userLogin(this.emailInput.value, this.passwordInput.value);
        this.emailInput.value = "";
        this.passwordInput.value = "";
      }
    });
  }

  async userLogin(email, password) {
    console.log(email, password);
    try {
      const res = await fetch(BASE_URL + LOGIN_URL, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          token: localStorage.getItem("token") || [],
        }),
        headers: { "content-type": "application/json; charset=UTF-8" },
      });

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data))
      window.location.href = "./yourprofile.html"

    /*   if (res.status !== 200) {
      } else {

        const data = await res.json();
        const token = localStorage.setItem("token", data.accessToken);
        window.location.href = "./feed.html";
      } */
    } catch (error) {
      console.error("Something went wrong", error); //Eror handling awaiting
      return;
    }
  }
}

const user = new Login(
  getSingleElements("#index-form"),
  getSingleElements("#current-email"),
  getSingleElements("#current-password")
);

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzY5LCJuYW1lIjoiQ2FwbGl4IiwiZW1haWwiOiJDYXBsaXhAc3R1ZC5ub3JvZmYubm8iLCJhdmF0YXIiOm51bGwsImJhbm5lciI6bnVsbCwiaWF0IjoxNjk1OTAxMTk0fQ.gvLH-UPuQlBHNAPxGSgit8imy6KoalV7G-D8Bs5Plyw"
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzcwLCJuYW1lIjoicmlza2FrZSIsImVtYWlsIjoicmlza2FrZUBzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6bnVsbCwiYmFubmVyIjpudWxsLCJpYXQiOjE2OTU5MDEyODd9.DAJbapXD2y8sv4nJ5qekcGlAX_r0IxmWxHL6IrX14iE"
/*
      name: "testbruker123",
            email: "testbruker123@stud.noroff.no",
            password: "testbruker123123",
 */



