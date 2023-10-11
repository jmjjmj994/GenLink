/**
 *
 * @param {HTMLElement} selector
 * @returns returns one HTMLElement
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
 * @returns returns mutiple HTMLElements with one parameter.
 */
export function getMultipleElements(selector) {
  const elements = document.querySelectorAll(selector);
  return elements;
}


