// From: https://stackoverflow.com/a/47625888
/**
 * Delays a request.
 * @param {number} duration - Duration of delay in milliseconds.
 * @param {any} data - The item to delay.
 */
export function delayRequest(duration, data) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, data), duration);
  });
}
