'use strict';
/**
 * animateProp
 * @param  {object}   object       The object with the property to tween
 * @param  {string}   propertyName The property key to animate (e.g. 'height')
 * @param  {number}   finalValue   The final value that the property will have
 * @param  {number}   duration     The duration of the tween in milliseconds
 * @param  {function} easing       Given a number from 0 to 1, returns an eased number from 0 to 1 (optional)
 * @param  {function} callback     Function to be called when the tween is over (optional)
 *
 * Based on http://codular.com/animation-with-html5-canvas
 */
export default function (object, propertyName, finalValue, duration, easing, callback) {
  let startTime = Date.now();
  let endTime = startTime + duration;
  let initialValue = object[propertyName];
  let valueDelta = finalValue - initialValue;

  // self-calling step function
  (function step () {
    // get the current progress. 0 <= progress <= 1
    let progress = Math.min((duration - (endTime - Date.now())) / duration, 1);

    // apply the easing function, if available
    if (easing) {
      progress = easing(progress);
    }

    // set the property
    object[propertyName] = initialValue + (valueDelta * progress);

    // if the animation hasn't finished, repeat the step.
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }());
}
