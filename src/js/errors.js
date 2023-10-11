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

export function inputState(input, warning, color, milliseconds) {
  input.placeholder = warning;
  input.style.backgroundColor = color;
  input.style.transition = "background-color 200ms";
  setTimeout(() => {
    input.placeholder = "@stud.noroff.no";
    input.style.backgroundColor = "#219EBC";
  }, milliseconds);
}
