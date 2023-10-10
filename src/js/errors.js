export function inputState(input, warning, color, time) {
  input.placeholder = warning;
  input.style.backgroundColor = color;
  input.style.transition = "background-color 200ms";
  setTimeout(() => {
    input.placeholder = "@stud.noroff.no";
    input.style.backgroundColor = "#219EBC";
  }, time);
}