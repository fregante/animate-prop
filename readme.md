# animate-prop [![module size](https://badge-size.herokuapp.com/bfred-it/animate-prop/master/dist/animate-prop.min.js) ![module gzipped size](https://badge-size.herokuapp.com/bfred-it/animate-prop/master/dist/animate-prop.min.js?compression=gzip)](https://github.com/bfred-it/animate-prop/blob/master/dist/animate-prop.min.js)

> Single, dependency-free function to tween a property. Use that on canvas or anywhere else.

This is a very simple and low-level function tween/animate/update a value over time. If you're looking for something that updates DOM elements directly, try the excellent but 60 times heavier [TweenLite](https://greensock.com/tweenlite) (+its CSS Plugin).

## Usage

```js
// We'll animate the property x, starting from 5
var obj = { x: 5 };

// 10 is the final value that the property x will have after 1000 milliseconds
animateProp(obj, 'x', 10, 1000);

// use the object in your drawing loop
context.moveTo(obj.x, 100);
setInterval(function () {
	// progressively draw a line
	context.lineTo(obj.x, 100);
	context.stroke();
}, 16); // don't use setInterval, it's just an example
```

You can provide an easing function

```js
// see https://github.com/jaz303/easiness/blob/master/raw.js
var easeInOutSine = function (progress) {
	return Math.sin(Math.PI/2 * progress);
};
var obj2 = { scale: 1 };
animateProp(obj2, 'scale', 2, 300, easeInOutSine, function () {
	console.log('Eased animation done!')
});
```

Or just wait for it to be done, without an easing

```js
var obj3 = { opacity: 0 }; //            v--- easing:false = linear tween
animateProp(obj3, 'opacity', 0.5, 300, false, function () {
	console.log('Linear animation done!')
});
```

Animate multiple properties with any duration

```js
var obj = { x: 5, y: 100 };

animateProp(obj, 'x', 10, 1000);
animateProp(obj, 'y', 300, 500);
```

Sequence tweens

```js
var obj = { x: 5, y: 100 };

animateProp(obj, 'x', 10, 1000, function () {
	animateProp(obj, 'y', 300, 500);	
});
```

## With browserify

```sh
npm install --save animate-prop
```

```js
var animateProp = require('animate-prop');
```

## API

### `animateProp(object, propertyName, finalValue, duration[, easing[, callback]])`

parameter | description
--- | ---
**`object`** | Type: `object`, *required* <br> The object with the property to tween
**`propertyName`** | Type: `string`, *required* <br> The property key to animate (e.g. 'height')
**`finalValue`** | Type: `number`, *required* <br> The final value that the property will have
**`duration`** | Type: `number`, *required* <br> The duration of the tween
**`easing`** | Type: `function` or `boolean`, *default: linear* <br> Given a number from 0 to 1, returns an eased number from 0 to 1 (optional)
**`callback`** | Type: `function`, *default: none* <br> Function to be called when the tween is over (optional)

## Files

Here's an explanation of the files included in this repo

* `index.js`: source file, in ES6
* `dist/animate-prop.js`: browser-ready file with AMD or a global variable called `animateProp`
* `dist/animate-prop.min.js`: same as above, minified
* `dist/animate-prop.node.js`: used by node/browserify with `require('animate-prop')`

## Dependencies

No dependencies, but it needs `window.requestAnimationFrame` to be there ([IE10+](http://caniuse.com/#feat=requestanimationframe) or [with polyfill](https://gist.github.com/paulirish/1579671))

Easing functions are not included. Provide your own or use [`easiness`](https://github.com/jaz303/easiness)

## Used on

* http://away.gorving.com/ — canvas/video masking animation

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
