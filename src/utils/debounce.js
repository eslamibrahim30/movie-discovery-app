/**
 * Debounce utility function
 * Delays the execution of a function until after a specified delay
 * has elapsed since the last time it was invoked.
 * @param {Function} fn - The function to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {Function} Debounced version of the function
 */
export function debounce(fn, delay = 500) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
