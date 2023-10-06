import { getSingleElements } from "./dom.js";
import { nameRegex, emailRegex, passwordRegex } from "./validation.js";

const BASE_URL = `https://api.noroff.dev/api/v1/`;
const NEW_USER_URL = `social/auth/register`;
const LOGIN_URL = `social/auth/login`;

const signUpForm = getSingleElements("#signup-form");
const newNameInput = getSingleElements("#full-name");
const newEmailInput = getSingleElements("#new-email");
const newPasswordInput = getSingleElements("#new-password");
const signUpBtn = getSingleElements(".signup-btn");
const agreedprivacy = getSingleElements("#agreed-privacy");

signUpBtn.disabled = true;
agreedprivacy.addEventListener("change", function () {
  signUpBtn.disabled = !agreedprivacy.checked;
});

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newNameInputValue = newNameInput.value.trim();
  const newEmailInputValue = newEmailInput.value.trim();
  const newPasswordInputValue = newPasswordInput.value.trim();
  console.log(newNameInputValue);
  console.log(newEmailInputValue);
  console.log(newPasswordInputValue);
  const invalidAlert = getSingleElements(".alert-container");

  if (!nameRegex.test(newNameInputValue)) {
    invalidAlert.innerHTML = `<p>Full name is invalid. Please enter a valid name.</p>`;
    return;
  }
  if (!emailRegex.test(newEmailInputValue)) {
    invalidAlert.innerHTML = `<p>Email is invalid. Please enter a valid Email. Must use stud.noroff.no/noroff.no</p>`;
    return;
  }
  if (!passwordRegex.test(newPasswordInputValue)) {
    invalidAlert.innerHTML = `<p>Password is invalid. Please enter a valid password (must contain 8 characters)</p>`;
    return;
  } else {
    invalidAlert.innerHTML = ``;
  }
  console.log("All inputs are valid.");

  try {
    await registerUser(newNameInputValue, newEmailInputValue, newPasswordInputValue);
    window.location.href = "./index.html";
  } catch (error) {
    console.error(error);
  }
});

async function registerUser(name, email, password) {
  console.log(name, email, password);
  try {
    const res = await fetch(BASE_URL + NEW_USER_URL, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
      headers: { "content-type": "application/json; charset=UTF-8" },
    });

    if (res.status !== 201) {
      let notNewProfile = getSingleElements(".alert-container")
      notNewProfile.innerHTML="Registration failed: Profile already exists or other error occurred";
      throw new Error
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*  testUser.registerUser()     */


//PROMISE PENDING. FIKS
