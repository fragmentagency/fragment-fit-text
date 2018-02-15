# Fragment Fit Text

Fragment Fit Text is a small utility that makes a text fit in a container. Using [Font Face Observer](https://github.com/bramstein/fontfaceobserver/) we are able to wait until the font is loaded to calculate the correct size.

You can also define if the text should fit in one line, and the min and max size of the text.

## How to use

Import the file `fragmentFitText.js` or `fragmentFitText.min.js`. Using CSS, define the properties of the container element. Then, create an instance of the `FitText` object.

```js
var fragmentFitText = new FitText()
```

If you want to auto-add elements to Fit Text, you can pass a selector to the FitText object, for example:

```js
var fragmentFitText = new FitText('[fit-text]')
```

Otherwise, to add elements you’ll have to use the `add` method:

```js
fragmentFitText.add(document.querySelector('.text3'), false, 10, 20);
```

where the first parameter is the element, the second defines if it’s a *one line* element, the third the *min size* and the fourth the *max size*.

Keep in mind that the element attributes *one-line*, *min-size=“X”* and *max-size=“Y”* will override these parameteres.

Finally, you have to call the `run` method of the object. You can pass a `string` or an `array` with the names of the fonts that need to be loaded before executing the code.

```js
fragmentFitText.run(['Permanent Marker', 'Pacifico'])
```

## Installation

If you're using npm you can install Font Face Observer as a dependency:

```shell
$ npm install fragment-fit-text3
```

If you're not using npm, grab `fragmentFitText.js` or `fragmentFitText.min.js` and include it in your project.

## License

Fragment Fit Text is licensed under the MIT License. Developed by [Fragment Agency](https://www.fragment.agency) in 2018
