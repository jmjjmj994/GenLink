import { getSingleElements } from "./dom.js";
import { emailRegex, passwordRegex } from "./validation.js";
import { inputError, inputValid, errorSign, successSign } from "./errors.js";
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
      if (this.emailInput.value === "" && this.passwordInput.value === "") {
        inputError(
          this.emailInput,
          "This field cannot be blank",
          "@stud.noroff.no",
          errorSign[0],
          2000
        );
        inputError(
          this.passwordInput,
          "This field cannot be blank",
          "Password...",
          errorSign[1],
          2000
        );
      } else if (
        emailRegex.test(this.emailInput.value.trim()) &&
        !passwordRegex.test(this.passwordInput.value.trim())
      ) {
        inputValid(successSign[0], 4000);
        inputError(
          this.passwordInput,
          "Your password is wrong",
          "Please enter your password",
          errorSign[1],
          4000
        );
      } else if (
        passwordRegex.test(this.passwordInput.value.trim()) &&
        !emailRegex.test(this.emailInput.value.trim())
      ) {
        inputError(
          this.emailInput,
          "Your email is wrong",
          "Please enter your email",
          errorSign[0],
          4000
        );
        inputValid(successSign[1], 4000);
      } else if (
        passwordRegex.test(this.passwordInput.value.trim()) &&
        emailRegex.test(this.emailInput.value.trim())
      ) {
        inputValid(successSign[0]);
        inputValid(successSign[1]);
        this.loginBtn.style.backgroundColor = "limegreen";
        this.userLogin(this.emailInput.value, this.passwordInput.value);
      }
    });
  }

  async userLogin(email, password) {
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

      if (res.status !== 200) {
        console.log(res.status);
      } else {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.accessToken);
        window.location.href = "./feed.html";
      }
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
