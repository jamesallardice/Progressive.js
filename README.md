# Progressive.js

Progressive.js is a simple JavaScript library that allows you to interact with DOM elements before the DOM is reported to be "ready". You could, for example, replace `<select>` elements, or checkboxes, which are notoriously difficult to style, with custom structures to provide an enhanced user experience.

## What does it do?

As mentioned previously, Progressive.js allows you to interact with DOM elements before the DOM has finished loading. Normally, you would need to wait until the DOM is ready before attempting to select or modify an element, since that element may not exist until that point. Progressive.js will execute a callback function any time elements with specific class names are added to the DOM. Therefore, it allows you to achieve two main things:

- Minimize flashes of unstyled content that appear for the time between page render and JavaScript execution on DOM ready
- Automatically apply JavaScript to elements that are dynamically inserted into the DOM later on

## How do I use it?

Simply include the script in the `<head>` of your document, and follow the simple guide below. Here's a basic example:

```html
<script src="progressive.js"></script>
<script>
	Progressive.enhance({
		borders: {
			className: "toBeEnhanced",
			callback: function () {
				this.style.border = "1px dashed red";
			}
		}
	});
</script>
```

This example demonstrates pretty much all there is to know about Progressive.js. One method, `Progressive.enhance()` is available to you, and it accepts a single argument, an object.

The object can have any number of properties, with arbitrary keys. The keys are simply unique identifiers for individual sets of enhancements. In our example above, we are providing a single set of enhancements, called `borders`.

The value of each enhancement must be another object, with two properties. The `className` property is simply the name of a class that is present on elements to which this enhancement should be applied. The `callback` property is a function that will be run every time an element with a matching class name is inserted into the DOM.

If you want to see the script in action, [check out this simple example](http://www.jamesallardice.com/progressivejs-example1/).

##Browser support

Progressive.js relies on a technique discovered and demonstrated by [Daniel Buchner](http://www.backalleycoder.com/) and [David Walsh](http://davidwalsh.name/), and is described in [a blog post by David](http://davidwalsh.name/detect-node-insertion). That technique involves CSS animations, which are supported in a growing number of modern browsers. For all other browsers, Progressive.js falls back to the standard `load` event of the `window` object, so you don't need to write code twice. The following is a list of browsers that will fully benefit from the use of Progressive.js:

- Chrome 4+
- Firefox 5+
- Safari 4+
- Opera 12+
- Internet Explorer 10

##Known issues

Progressive.js is a work-in-progress. If you come across any issues not mentioned here, please feel free to open an issue on GitHub, or simply fork the repository and attempt to fix it yourself!

- Multiple enhancements cannot be applied to individual elements
- You can only use a class name to select elements
- The fallback in browsers that don't support CSS animations uses the `onload` event. It would be nicer to use `DOMContentLoaded` where available.