/**
 *
 * @param {HTMLElement} selector
 * @returns returns one HTMLElement with optional parameters.
 */

export function getSingleElements(selector) {
  const element = document.querySelector(selector);

  return element;
}

/**
 *
 * @param {HTMLElement} selector
 * @param {Attribute} arg1
 * @param {Attribute} arg2
 * @returns returns mutiple HTMLElements with optional parameters.
 */
function getMultipleElements(selector, arg1, arg2) {
  const elements = document.querySelectorAll(selector);
  elements.classList.add(arg1, arg2);
  return elements;
}
