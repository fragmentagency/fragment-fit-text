"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* Font Face Observer v2.0.13 - © Bram Stein. License: BSD-3-Clause */(function () {
    'use strict';
    var f,
        g = [];function l(a) {
        g.push(a);1 == g.length && f();
    }function m() {
        for (; g.length;) {
            g[0](), g.shift();
        }
    }f = function f() {
        setTimeout(m);
    };function n(a) {
        this.a = p;this.b = void 0;this.f = [];var b = this;try {
            a(function (a) {
                q(b, a);
            }, function (a) {
                r(b, a);
            });
        } catch (c) {
            r(b, c);
        }
    }var p = 2;function t(a) {
        return new n(function (b, c) {
            c(a);
        });
    }function u(a) {
        return new n(function (b) {
            b(a);
        });
    }function q(a, b) {
        if (a.a == p) {
            if (b == a) throw new TypeError();var c = !1;try {
                var d = b && b.then;if (null != b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && "function" == typeof d) {
                    d.call(b, function (b) {
                        c || q(a, b);c = !0;
                    }, function (b) {
                        c || r(a, b);c = !0;
                    });return;
                }
            } catch (e) {
                c || r(a, e);return;
            }a.a = 0;a.b = b;v(a);
        }
    }
    function r(a, b) {
        if (a.a == p) {
            if (b == a) throw new TypeError();a.a = 1;a.b = b;v(a);
        }
    }function v(a) {
        l(function () {
            if (a.a != p) for (; a.f.length;) {
                var b = a.f.shift(),
                    c = b[0],
                    d = b[1],
                    e = b[2],
                    b = b[3];try {
                    0 == a.a ? "function" == typeof c ? e(c.call(void 0, a.b)) : e(a.b) : 1 == a.a && ("function" == typeof d ? e(d.call(void 0, a.b)) : b(a.b));
                } catch (h) {
                    b(h);
                }
            }
        });
    }n.prototype.g = function (a) {
        return this.c(void 0, a);
    };n.prototype.c = function (a, b) {
        var c = this;return new n(function (d, e) {
            c.f.push([a, b, d, e]);v(c);
        });
    };
    function w(a) {
        return new n(function (b, c) {
            function d(c) {
                return function (d) {
                    h[c] = d;e += 1;e == a.length && b(h);
                };
            }var e = 0,
                h = [];0 == a.length && b(h);for (var k = 0; k < a.length; k += 1) {
                u(a[k]).c(d(k), c);
            }
        });
    }function x(a) {
        return new n(function (b, c) {
            for (var d = 0; d < a.length; d += 1) {
                u(a[d]).c(b, c);
            }
        });
    };window.Promise || (window.Promise = n, window.Promise.resolve = u, window.Promise.reject = t, window.Promise.race = x, window.Promise.all = w, window.Promise.prototype.then = n.prototype.c, window.Promise.prototype["catch"] = n.prototype.g);
})();

(function () {
    function l(a, b) {
        document.addEventListener ? a.addEventListener("scroll", b, !1) : a.attachEvent("scroll", b);
    }function m(a) {
        document.body ? a() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function c() {
            document.removeEventListener("DOMContentLoaded", c);a();
        }) : document.attachEvent("onreadystatechange", function k() {
            if ("interactive" == document.readyState || "complete" == document.readyState) document.detachEvent("onreadystatechange", k), a();
        });
    };function r(a) {
        this.a = document.createElement("div");this.a.setAttribute("aria-hidden", "true");this.a.appendChild(document.createTextNode(a));this.b = document.createElement("span");this.c = document.createElement("span");this.h = document.createElement("span");this.f = document.createElement("span");this.g = -1;this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c);
    }
    function t(a, b) {
        a.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + b + ";";
    }function y(a) {
        var b = a.a.offsetWidth,
            c = b + 100;a.f.style.width = c + "px";a.c.scrollLeft = c;a.b.scrollLeft = a.b.scrollWidth + 100;return a.g !== b ? (a.g = b, !0) : !1;
    }function z(a, b) {
        function c() {
            var a = k;y(a) && a.a.parentNode && b(a.g);
        }var k = a;l(a.b, c);l(a.c, c);y(a);
    };function A(a, b) {
        var c = b || {};this.family = a;this.style = c.style || "normal";this.weight = c.weight || "normal";this.stretch = c.stretch || "normal";
    }var B = null,
        C = null,
        E = null,
        F = null;function G() {
        if (null === C) if (J() && /Apple/.test(window.navigator.vendor)) {
            var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);C = !!a && 603 > parseInt(a[1], 10);
        } else C = !1;return C;
    }function J() {
        null === F && (F = !!document.fonts);return F;
    }
    function K() {
        if (null === E) {
            var a = document.createElement("div");try {
                a.style.font = "condensed 100px sans-serif";
            } catch (b) {}E = "" !== a.style.font;
        }return E;
    }function L(a, b) {
        return [a.style, a.weight, K() ? a.stretch : "", "100px", b].join(" ");
    }
    A.prototype.load = function (a, b) {
        var c = this,
            k = a || "BESbswy",
            q = 0,
            D = b || 3E3,
            H = new Date().getTime();return new Promise(function (a, b) {
            if (J() && !G()) {
                var M = new Promise(function (a, b) {
                    function e() {
                        new Date().getTime() - H >= D ? b() : document.fonts.load(L(c, '"' + c.family + '"'), k).then(function (c) {
                            1 <= c.length ? a() : setTimeout(e, 25);
                        }, function () {
                            b();
                        });
                    }e();
                }),
                    N = new Promise(function (a, c) {
                    q = setTimeout(c, D);
                });Promise.race([N, M]).then(function () {
                    clearTimeout(q);a(c);
                }, function () {
                    b(c);
                });
            } else m(function () {
                function u() {
                    var b;if (b = -1 != f && -1 != g || -1 != f && -1 != h || -1 != g && -1 != h) (b = f != g && f != h && g != h) || (null === B && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), B = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))), b = B && (f == v && g == v && h == v || f == w && g == w && h == w || f == x && g == x && h == x)), b = !b;b && (d.parentNode && d.parentNode.removeChild(d), clearTimeout(q), a(c));
                }function I() {
                    if (new Date().getTime() - H >= D) d.parentNode && d.parentNode.removeChild(d), b(c);else {
                        var a = document.hidden;if (!0 === a || void 0 === a) f = e.a.offsetWidth, g = n.a.offsetWidth, h = p.a.offsetWidth, u();q = setTimeout(I, 50);
                    }
                }var e = new r(k),
                    n = new r(k),
                    p = new r(k),
                    f = -1,
                    g = -1,
                    h = -1,
                    v = -1,
                    w = -1,
                    x = -1,
                    d = document.createElement("div");d.dir = "ltr";t(e, L(c, "sans-serif"));t(n, L(c, "serif"));t(p, L(c, "monospace"));d.appendChild(e.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);v = e.a.offsetWidth;w = n.a.offsetWidth;x = p.a.offsetWidth;I();z(e, function (a) {
                    f = a;u();
                });t(e, L(c, '"' + c.family + '",sans-serif'));z(n, function (a) {
                    g = a;u();
                });t(n, L(c, '"' + c.family + '",serif'));
                z(p, function (a) {
                    h = a;u();
                });t(p, L(c, '"' + c.family + '",monospace'));
            });
        });
    };"object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = A : (window.FontFaceObserver = A, window.FontFaceObserver.prototype.load = A.prototype.load);
})();

var characters = 'ABCĆDEFGHIJKLMNOPQRSŠTUVWXYZŽabcćdefghijklmnopqrsštuvwxyzž1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*';

var FitTextElement = function () {
    function FitTextElement(element, oneLine, minSize, maxSize) {
        _classCallCheck(this, FitTextElement);

        this.element = element;
        this.oneLine = element.hasAttribute('one-line') ? element.hasAttribute('one-line') : oneLine;
        this.minSize = element.hasAttribute('min-size') ? parseInt(element.getAttribute('min-size')) : minSize;
        this.maxSize = element.hasAttribute('max-size') ? parseInt(element.getAttribute('max-size')) : maxSize;
    }

    FitTextElement.prototype.fit = function fit() {
        this.addTestTag();
        var size = this.calculateSize();
        this.element.style.fontSize = size + 'px';
        this.removeTestTag();
    };

    FitTextElement.prototype.calculateSize = function calculateSize() {

        var currentFontSize = this.minSize;
        var oldFontSize = this.minSize;

        for (var i = this.minSize; i < this.maxSize; i++) {
            this.testTag.style.fontSize = currentFontSize + 'px';
            this.calculateLineHeight();

            var percentageCompleted = this.testElementPortion();
            if (percentageCompleted >= 1) {
                currentFontSize = oldFontSize;
                break;
            } else {
                oldFontSize = currentFontSize;
                if (percentageCompleted < .5) {
                    // if we aren't there... let's speed it up
                    currentFontSize = currentFontSize + 2;
                } else {
                    currentFontSize++;
                }
            }
        }

        return currentFontSize;
    };

    FitTextElement.prototype.testElementPortion = function testElementPortion() {
        if (this.oneLine) {
            return this.testTag.offsetHeight / this.lineHeight;
        } else {
            return this.testTag.offsetHeight / this.element.offsetHeight;
        }
    };

    FitTextElement.prototype.addTestTag = function addTestTag() {
        this.testTag = document.createElement('span');
        this.testTag.innerHTML = this.element.innerHTML;
        this.testTag.style.width = 'auto';
        this.testTag.style.position = 'absolute';
        this.testTag.style.top = 0;
        this.testTag.style.right = 0;
        this.testTag.style.left = 0;
        this.testTag.style.fontSize = this.minSize + 'px';
        this.testTag.style.visibility = 'hidden';
        this.element.appendChild(this.testTag);
    };

    FitTextElement.prototype.removeTestTag = function removeTestTag() {
        this.element.removeChild(this.testTag);
    };

    FitTextElement.prototype.calculateLineHeight = function calculateLineHeight() {
        var charsElement = document.createElement('span');
        charsElement.textContent = characters;
        charsElement.style.width = 'auto';
        charsElement.style.position = 'absolute';
        charsElement.style.left = 0;
        charsElement.style.top = 0;
        charsElement.style.visibility = 'hidden';
        charsElement.style.overflow = 'hidden';
        charsElement.style.whiteSpace = 'nowrap';
        this.element.appendChild(charsElement);
        this.lineHeight = charsElement.offsetHeight;
        this.element.removeChild(charsElement);
    };

    return FitTextElement;
}();

var FitText = function () {
    function FitText(selector) {
        var _this = this;

        _classCallCheck(this, FitText);

        this.elements = [];
        if (selector) {
            var elements = document.querySelectorAll(selector);
            elements.forEach(function (e) {
                _this.add(e);
            });
        }
    }

    FitText.prototype.add = function add(element) {
        var oneLine = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var minSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var maxSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 99;

        this.elements.push(new FitTextElement(element, oneLine, minSize, maxSize));
    };

    FitText.prototype.run = function run(fontsToWaitFor) {
        var _this2 = this;

        if (typeof fontsToWaitFor == 'string') {
            var font = new FontFaceObserver(fontsToWaitFor);
            font.load().then(function () {
                _this2._run();
            });
        } else if (fontsToWaitFor instanceof Array) {
            var fonts = [];
            fontsToWaitFor.forEach(function (f) {
                var font = new FontFaceObserver(f);
                fonts.push(font.load());
            });
            Promise.all(fonts).then(function () {
                _this2._run();
            });
        } else {
            this._run();
        }
    };

    FitText.prototype._run = function _run() {
        this.elements.forEach(function (e) {
            e.fit();
        });
    };

    return FitText;
}();