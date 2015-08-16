(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.animateProp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (object, propertyName, finalValue, duration, easing, callback) {
  var startTime = Date.now();
  var endTime = startTime + duration;
  var initialValue = object[propertyName];
  var valueDelta = finalValue - initialValue;

  // self-calling step function
  (function step() {
    // get the current progress. 0 <= progress <= 1
    var progress = Math.min((duration - (endTime - Date.now())) / duration, 1);

    // apply the easing function, if available
    if (easing) {
      progress = easing(progress);
    }

    // set the property
    object[propertyName] = initialValue + valueDelta * progress;

    // if the animation hasn't finished, repeat the step.
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  })();
};

module.exports = exports['default'];

},{}]},{},[1])(1)
});