/**
 *
 * @param {HTMLElement} input
 * @param {string} warning
 * @param {style}} color
 * @param {function} time
 * @example A function which takes four arguments. The first argument is the element which you want the error to display on.
 * The second argument is a string value. Which explains what type of error has occurred.
 * The third argument is the background color of the element when the error has occurred.
 * The fourth argument is the time in milliseconds, in which the error will be removed.
 */

export const errorSign = document.querySelectorAll(".error-sign");
export const successSign = document.querySelectorAll(".success-sign");

export function inputState(input, placeholder, warning, color, milliseconds) {
  input.placeholder = warning;
  input.style.backgroundColor = color;
  input.style.color = "orange";
  input.style.transition = "background-color 200ms";
  setTimeout(() => {
    input.placeholder = placeholder;
    input.style.backgroundColor = "#f4f4f4";
  }, milliseconds);
}

export function inputError(input, warning, placeholder, sign, milliseconds) {
  input.placeholder = warning;
  sign.classList.remove("hide");
  sign.classList.add("show");

  setTimeout(() => {
    input.placeholder = placeholder;
    sign.classList.remove("show");
    sign.classList.add("hide");
  }, milliseconds);
}
export function inputValid(sign, milliseconds) {
  sign.classList.remove("hide");
  sign.classList.add("show");

  setTimeout(() => {
    sign.classList.remove("show");
    sign.classList.add("hide");
  }, 4000);
}


