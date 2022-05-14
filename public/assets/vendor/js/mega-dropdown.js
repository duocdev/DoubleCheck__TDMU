!(function (t, e) {
    for (var n in e) t[n] = e[n];
})(
    window,
    (function (t) {
        var e = {};
        function n(i) {
            if (e[i]) return e[i].exports;
            var o = (e[i] = { i: i, l: !1, exports: {} });
            return t[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
        }
        return (
            (n.m = t),
            (n.c = e),
            (n.d = function (t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
            }),
            (n.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            (n.t = function (t, e) {
                if ((1 & e && (t = n(t)), 8 & e)) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                var i = Object.create(null);
                if ((n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                    for (var o in t)
                        n.d(
                            i,
                            o,
                            function (e) {
                                return t[e];
                            }.bind(null, o)
                        );
                return i;
            }),
            (n.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                            return t.default;
                        }
                        : function () {
                            return t;
                        };
                return n.d(e, "a", e), e;
            }),
            (n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (n.p = ""),
            n((n.s = 197))
        );
    })({
        197: function (t, e, n) {
            "use strict";
            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
                }
            }
            n.r(e),
                n.d(e, "MegaDropdown", function () {
                    return s;
                });
            var s = (function () {
                function t(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    i(this, t),
                        (this._onHover = "hover" === n.trigger || "hover" === e.getAttribute("data-trigger")),
                        (this._container = t._findParent(e, "mega-dropdown")),
                        this._container && ((this._menu = this._container.querySelector(".dropdown-toggle ~ .dropdown-menu")), this._menu && (e.setAttribute("aria-expanded", "false"), (this._el = e), this._bindEvents()));
                }
                var e, n, s;
                return (
                    (e = t),
                    (s = [
                        {
                            key: "_findParent",
                            value: function (t, e) {
                                if ("BODY" === t.tagName.toUpperCase()) return null;
                                for (t = t.parentNode; "BODY" !== t.tagName.toUpperCase() && !t.classList.contains(e);) t = t.parentNode;
                                return "BODY" !== t.tagName.toUpperCase() ? t : null;
                            },
                        }

                        ,
                    ]),
                    (n = [
                        {
                            key: "open",
                            value: function () {
                                this._timeout && (clearTimeout(this._timeout), (this._timeout = null)),
                                    this._focusTimeout && (clearTimeout(this._focusTimeout), (this._focusTimeout = null)),
                                    "true" !== this._el.getAttribute("aria-expanded") &&
                                    (this._triggerEvent("show"), this._container.classList.add("show"), this._menu.classList.add("show"), this._el.setAttribute("aria-expanded", "true"), this._el.focus(), this._triggerEvent("shown"));
                            },
                        }

                        ,
                        {
                            key: "close",
                            value: function (t) {
                                var e = this;
                                this._timeout && (clearTimeout(this._timeout), (this._timeout = null)),
                                    this._focusTimeout && (clearTimeout(this._focusTimeout), (this._focusTimeout = null)),
                                    this._onHover && !t
                                        ? (this._timeout = setTimeout(function () {
                                            e._timeout && (clearTimeout(e._timeout), (e._timeout = null)), e._close();
                                        }

                                            , 150))
                                        : this._close();
                            }

                            ,
                        }

                        ,
                        {
                            key: "toggle",
                            value: function () {
                                "true" === this._el.getAttribute("aria-expanded") ? this.close(!0) : this.open();
                            }

                            ,
                        }

                        ,
                        {
                            key: "destroy",
                            value: function () {
                                this._unbindEvents(), (this._el = null), this._timeout && (clearTimeout(this._timeout), (this._timeout = null)), this._focusTimeout && (clearTimeout(this._focusTimeout), (this._focusTimeout = null));
                            }

                            ,
                        }

                        ,
                        {
                            key: "_close",
                            value: function () {
                                "true" === this._el.getAttribute("aria-expanded") &&
                                    (this._triggerEvent("hide"), this._container.classList.remove("show"), this._menu.classList.remove("show"), this._el.setAttribute("aria-expanded", "false"), this._triggerEvent("hidden"));
                            }

                            ,
                        }

                        ,
                        {
                            key: "_bindEvents",
                            value: function () {
                                var e = this;
                                (this._elClickEvnt = function (t) {
                                    t.preventDefault(), e.toggle();
                                }),
                                    this._el.addEventListener("click", this._elClickEvnt),
                                    (this._bodyClickEvnt = function (t) {
                                        !e._container.contains(t.target) && e._container.classList.contains("show") && e.close(!0);
                                    }),
                                    document.body.addEventListener("click", this._bodyClickEvnt, !0),
                                    (this._menuClickEvnt = function (t) {
                                        t.target.classList.contains("mega-dropdown-link") && e.close(!0);
                                    }),
                                    this._menu.addEventListener("click", this._menuClickEvnt, !0),
                                    (this._focusoutEvnt = function () {
                                        e._focusTimeout && (clearTimeout(e._focusTimeout), (e._focusTimeout = null)),
                                            "true" === e._el.getAttribute("aria-expanded") &&
                                            (e._focusTimeout = setTimeout(function () {
                                                "BODY" !== document.activeElement.tagName.toUpperCase() && t._findParent(document.activeElement, "mega-dropdown") !== e._container && e.close(!0);
                                            }

                                                , 100));
                                    }),
                                    this._container.addEventListener("focusout", this._focusoutEvnt, !0),
                                    this._onHover &&
                                    ((this._enterEvnt = function () {
                                        "static" !== window.getComputedStyle(e._menu, null).getPropertyValue("position") && e.open();
                                    }),
                                        (this._leaveEvnt = function () {
                                            "static" !== window.getComputedStyle(e._menu, null).getPropertyValue("position") && e.close();
                                        }),
                                        this._el.addEventListener("mouseenter", this._enterEvnt),
                                        this._menu.addEventListener("mouseenter", this._enterEvnt),
                                        this._el.addEventListener("mouseleave", this._leaveEvnt),
                                        this._menu.addEventListener("mouseleave", this._leaveEvnt));
                            }

                            ,
                        }

                        ,
                        {
                            key: "_unbindEvents",
                            value: function () {
                                this._elClickEvnt && (this._el.removeEventListener("click", this._elClickEvnt), (this._elClickEvnt = null)),
                                    this._bodyClickEvnt && (document.body.removeEventListener("click", this._bodyClickEvnt, !0), (this._bodyClickEvnt = null)),
                                    this._menuClickEvnt && (this._menu.removeEventListener("click", this._menuClickEvnt, !0), (this._menuClickEvnt = null)),
                                    this._focusoutEvnt && (this._container.removeEventListener("focusout", this._focusoutEvnt, !0), (this._focusoutEvnt = null)),
                                    this._enterEvnt && (this._el.removeEventListener("mouseenter", this._enterEvnt), this._menu.removeEventListener("mouseenter", this._enterEvnt), (this._enterEvnt = null)),
                                    this._leaveEvnt && (this._el.removeEventListener("mouseleave", this._leaveEvnt), this._menu.removeEventListener("mouseleave", this._leaveEvnt), (this._leaveEvnt = null));
                            }

                            ,
                        }

                        ,
                        {
                            key: "_triggerEvent",
                            value: function (t) {
                                var e;
                                document.createEvent
                                    ? ("function" == typeof Event ? (e = new Event(t)) : (e = document.createEvent("Event")).initEvent(t, !1, !0), this._container.dispatchEvent(e))
                                    : this._container.fireEvent("on".concat(t), document.createEventObject());
                            }

                            ,
                        }

                        ,
                    ]) && o(e.prototype, n),
                    s && o(e, s),
                    t
                );
            })();
        }

        ,
    })
);
