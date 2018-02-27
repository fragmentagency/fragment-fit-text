const characters = 'ABCĆDEFGHIJKLMNOPQRSŠTUVWXYZŽabcćdefghijklmnopqrsštuvwxyzž1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*'

class FitTextElement {

    constructor(element, type, minSize, maxSize, textLineHeight) {
        this.element = element
        this.type = element.hasAttribute('type') ? element.getAttribute('type') : type
        this.minSize = element.hasAttribute('min-size') ? parseInt(element.getAttribute('min-size')) : minSize
        this.maxSize = element.hasAttribute('max-size') ? parseInt(element.getAttribute('max-size')) : maxSize
        this.textLineHeight = element.hasAttribute('line-height') ? parseFloat(element.getAttribute('line-height')) : textLineHeight
        this.size = {
            width: this.element.offsetWidth,
            height: this.element.offsetHeight,
        }
    }

    fit() {
        let position = this.element.style.position
        this.element.style.position = 'relative';
        this.addTestTag()
        this.calculateLineHeight()
        let size = this.calculateSize()
        this.element.style.fontSize = size + 'px'
        this.removeTestTag()
        this.element.style.position = position
    }

    calculateSize() {

        let currentFontSize = this.minSize
        let oldFontSize = this.minSize

        this.testTag.style.fontSize = this.minSize + 'px'

        for (let i = this.minSize; i < this.maxSize; i++) {
            this.testTag.style.fontSize = (currentFontSize + 'px')
            this.testTag.style.lineHeight = (currentFontSize * this.textLineHeight) + 'px';

            if (this.type !== 'oneline-height') {
                this.calculateLineHeight()
            }

            let sizeRatios = this.testElementRatios()
            if (sizeRatios.height > 1 || sizeRatios.width > 1) {
                currentFontSize = oldFontSize
                break
            } else {
                oldFontSize = currentFontSize
                currentFontSize++
            }
        }
        return currentFontSize
    }

    testElementRatios() {
        if (['oneline-width', 'oneline-height'].indexOf(this.type) !== -1) {
            let computedStyle = getComputedStyle(this.testTag);
            let elementHeight = this.testTag.clientHeight; //height with padding
            elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
            return {
                height: elementHeight / this.lineHeight,
                width: this.testTag.scrollWidth / this.size.width
            }
        } else {
            return {
                height: this.testTag.offsetHeight / this.size.height,
                width: this.testTag.scrollWidth / this.size.width
            }
        }
    }

    addTestTag() {

        this.testTag = document.createElement('span')
        this.testTag.innerHTML = this.element.innerHTML
        this.testTag.style.backgroundColor = 'purple'
        this.testTag.style.width = 'auto'
        this.testTag.style.position = 'absolute'
        this.testTag.style.top = 0
        this.testTag.style.left = 0
        this.testTag.style.fontSize = this.minSize + 'px'
        this.testTag.style.visibility = 'hidden'
        this.testTag.style.paddingTop = this.getStyle('padding-top') + 'px'
        this.testTag.style.paddingLeft = this.getStyle('padding-left') + 'px'
        this.testTag.style.paddingRight = this.getStyle('padding-right') + 'px'
        this.testTag.style.paddingBottom = this.getStyle('padding-bottom') + 'px'
        this.element.appendChild(this.testTag)
    }

    removeTestTag() {
        this.element.removeChild(this.testTag)
    }

    calculateLineHeight() {

        if (this.type == 'oneline-height') {
            let computedStyle = getComputedStyle(this.element);
            let elementHeight = this.element.clientHeight;
            elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
            this.lineHeight = elementHeight
        } else if (this.type == 'oneline-width') {
            let charsElement = document.createElement('span')
            charsElement.textContent = characters
            charsElement.style.width = 'auto'
            charsElement.style.position = 'absolute'
            charsElement.style.left = 0
            charsElement.style.top = 0
            charsElement.style.visibility = 'hidden'
            charsElement.style.overflow = 'hidden'
            charsElement.style.whiteSpace = 'nowrap'
            this.element.appendChild(charsElement)
            this.lineHeight = charsElement.offsetHeight;
            this.element.removeChild(charsElement)
        } else {
            this.lineHeight = -1;
        }
    }

    getStyle(property) {
        return parseFloat(window.getComputedStyle(this.element, null).getPropertyValue(property))
    }

}

class FitText {

    constructor(selector) {
        this.elements = []
        if (selector) {
            let elements = document.querySelectorAll(selector)
            elements.forEach((e) => {
                this.add(e)
            })
        }
    }

    add(selector, type = 'default', minSize = 1, maxSize = 99, textLineHeight = 1) {
        let element;
        if (typeof selector == 'string') {
            element = document.querySelector(selector)
            if (!element) {
                console.log('FitText: The element "' + selector + '" was not found');
                return;
            }
        } else {
            element = selector
        }
        this.elements.push(new FitTextElement(element, type, minSize, maxSize, textLineHeight))
    }

    run(fontsToWaitFor, callback) {
        if (typeof fontsToWaitFor == 'string') {
            let font = new FontFaceObserver(fontsToWaitFor)
            font.load().then(() => {
                this._run()
            })
        } else if (fontsToWaitFor instanceof Array) {
            let fonts = []
            fontsToWaitFor.forEach((f) => {
                let font = new FontFaceObserver(f)
                fonts.push(font.load())
            })
            Promise.all(fonts).then(() => {
                this._run()
                if (callback) {
                    callback()
                }
            })
        } else {
            this._run()
            if (callback) {
                callback()
            }
        }
    }

    _run() {
        this.elements.forEach((e) => {
            e.fit()
        })
    }
}
