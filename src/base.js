const characters = 'ABCĆDEFGHIJKLMNOPQRSŠTUVWXYZŽabcćdefghijklmnopqrsštuvwxyzž1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*'

class FitTextElement {

    constructor(element, type, minSize, maxSize) {
        this.element = element
        this.type = element.hasAttribute('type') ? element.getAttribute('type') : type
        this.minSize = element.hasAttribute('min-size') ? parseInt(element.getAttribute('min-size')) : minSize
        this.maxSize = element.hasAttribute('max-size') ? parseInt(element.getAttribute('max-size')) : maxSize
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

        for (let i = this.minSize; i < this.maxSize; i++) {
            this.testTag.style.fontSize = currentFontSize + 'px'

            if (this.type !== 'oneline-height') {
                this.calculateLineHeight()
            }

            let sizeRatios = this.testElementRatios()

            console.log(this.element.className + ' - ', sizeRatios)
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
                width: this.testTag.scrollWidth / this.element.offsetWidth
            }
        } else {
            return {
                height: this.testTag.offsetHeight / this.element.offsetHeight,
                width: this.testTag.scrollWidth / this.element.offsetWidth
            }
        }
    }

    addTestTag() {

        this.testTag = document.createElement('span')
        this.testTag.innerHTML = this.element.innerHTML
        this.testTag.style.width = 'auto'
        this.testTag.style.position = 'absolute'
        this.testTag.style.top = 0
        this.testTag.style.left = 0
        this.testTag.style.fontSize = this.minSize + 'px'
        this.testTag.style.visibility = 'hidden'
        this.testTag.style.padding = 0
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

        if (this.type == 'online-height') {
            let computedStyle = getComputedStyle(this.element);
            let elementHeight = this.element.clientHeight; //height with padding
            elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
            this.lineHeight = elementHeight
        } else {
            let charsElement = document.createElement('span')
            charsElement.textContent = characters
            charsElement.style.width = 'auto'
            charsElement.style.position = 'absolute'
            charsElement.style.left = 0
            charsElement.style.top = 0
            charsElement.style.visibility = 'hidden'
            charsElement.style.overflow = 'hidden'
            charsElement.style.whiteSpace = 'nowrap'
            this.testTag.appendChild(charsElement)
            this.lineHeight = charsElement.offsetHeight;
            this.testTag.removeChild(charsElement)
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

    add(element, type = 'default', minSize = 1, maxSize = 99) {
        if (!element) {
            console.log('FitText: The element was not found');
            return;
        }
        this.elements.push(new FitTextElement(element, type, minSize, maxSize))
    }

    run(fontsToWaitFor) {
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
            })
        } else {
            this._run()
        }
    }

    _run() {
        this.elements.forEach((e) => {
            e.fit()
        })
    }
}
