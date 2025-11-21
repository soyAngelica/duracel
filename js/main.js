function MarkerClusterer(e, t, i) {
    this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = e, this.markers_ = [], this.clusters_ = [], this.sizes = [53, 56, 66, 78, 90], this.styles_ = [], this.ready_ = !1;
    var n = i || {};
    this.gridSize_ = n.gridSize || 60, this.minClusterSize_ = n.minimumClusterSize || 2, this.maxZoom_ = n.maxZoom || null, this.styles_ = n.styles || [], this.imagePath_ = n.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, this.imageExtension_ = n.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, this.zoomOnClick_ = !0, void 0 != n.zoomOnClick && (this.zoomOnClick_ = n.zoomOnClick), this.averageCenter_ = !1, void 0 != n.averageCenter && (this.averageCenter_ = n.averageCenter), this.setupStyles_(), this.setMap(e), this.prevZoom_ = this.map_.getZoom();
    var r = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function() {
        var e = r.map_.getZoom(),
            t = r.map_.minZoom || 0,
            i = Math.min(r.map_.maxZoom || 100, r.map_.mapTypes[r.map_.getMapTypeId()].maxZoom);
        e = Math.min(Math.max(e, t), i), r.prevZoom_ != e && (r.prevZoom_ = e, r.resetViewport())
    }), google.maps.event.addListener(this.map_, "idle", function() {
        r.redraw()
    }), t && (t.length || Object.keys(t).length) && this.addMarkers(t, !1)
}

function Cluster(e) {
    this.markerClusterer_ = e, this.map_ = e.getMap(), this.gridSize_ = e.getGridSize(), this.minClusterSize_ = e.getMinClusterSize(), this.averageCenter_ = e.isAverageCenter(), this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, e.getStyles(), e.getGridSize())
}

function ClusterIcon(e, t, i) {
    e.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = t, this.padding_ = i || 0, this.cluster_ = e, this.center_ = null, this.map_ = e.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(this.map_)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function normalizeWheel(e) {
    var t = 0,
        i = 0,
        n = 0,
        r = 0;
    return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = t * PIXEL_STEP, r = i * PIXEL_STEP, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || r) && e.deltaMode && (1 == e.deltaMode ? (n *= LINE_HEIGHT, r *= LINE_HEIGHT) : (n *= PAGE_HEIGHT, r *= PAGE_HEIGHT)), n && !t && (t = n < 1 ? -1 : 1), r && !i && (i = r < 1 ? -1 : 1), {
        spinX: t,
        spinY: i,
        pixelX: n,
        pixelY: r
    }
}! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ScrollMagic = t()
}(this, function() {
    "use strict";
    var e = function() {};
    e.version = "2.0.5", window.addEventListener("mousewheel", function() {});
    var t = "data-scrollmagic-pin-spacer";
    e.Controller = function(n) {
        var s, o, a = "ScrollMagic.Controller",
            l = "FORWARD",
            c = "REVERSE",
            u = "PAUSED",
            d = i.defaults,
            h = this,
            p = r.extend({}, d, n),
            f = [],
            m = !1,
            g = 0,
            v = u,
            y = !0,
            w = 0,
            _ = !0,
            b = function() {
                for (var e in p) d.hasOwnProperty(e) || delete p[e];
                if (p.container = r.get.elements(p.container)[0], !p.container) throw a + " init failed.";
                y = p.container === window || p.container === document.body || !document.body.contains(p.container), y && (p.container = window), w = k(), p.container.addEventListener("resize", P), p.container.addEventListener("scroll", P), p.refreshInterval = parseInt(p.refreshInterval) || d.refreshInterval, T()
            },
            T = function() {
                p.refreshInterval > 0 && (o = window.setTimeout(M, p.refreshInterval))
            },
            x = function() {
                return p.vertical ? r.get.scrollTop(p.container) : r.get.scrollLeft(p.container)
            },
            k = function() {
                return p.vertical ? r.get.height(p.container) : r.get.width(p.container)
            },
            S = this._setScrollPos = function(e) {
                p.vertical ? y ? window.scrollTo(r.get.scrollLeft(), e) : p.container.scrollTop = e : y ? window.scrollTo(e, r.get.scrollTop()) : p.container.scrollLeft = e
            },
            C = function() {
                if (_ && m) {
                    var e = r.type.Array(m) ? m : f.slice(0);
                    m = !1;
                    var t = g;
                    g = h.scrollPos();
                    var i = g - t;
                    0 !== i && (v = i > 0 ? l : c), v === c && e.reverse(), e.forEach(function(e) {
                        e.update(!0)
                    })
                }
            },
            z = function() {
                s = r.rAF(C)
            },
            P = function(e) {
                "resize" == e.type && (w = k(), v = u), m !== !0 && (m = !0, z())
            },
            M = function() {
                if (!y && w != k()) {
                    var e;
                    try {
                        e = new Event("resize", {
                            bubbles: !1,
                            cancelable: !1
                        })
                    } catch (t) {
                        e = document.createEvent("Event"), e.initEvent("resize", !1, !1)
                    }
                    p.container.dispatchEvent(e)
                }
                f.forEach(function(e) {
                    e.refresh()
                }), T()
            };
        this._options = p;
        var O = function(e) {
            if (e.length <= 1) return e;
            var t = e.slice(0);
            return t.sort(function(e, t) {
                return e.scrollOffset() > t.scrollOffset() ? 1 : -1
            }), t
        };
        return this.addScene = function(t) {
            if (r.type.Array(t)) t.forEach(function(e) {
                h.addScene(e)
            });
            else if (t instanceof e.Scene)
                if (t.controller() !== h) t.addTo(h);
                else if (f.indexOf(t) < 0) {
                f.push(t), f = O(f), t.on("shift.controller_sort", function() {
                    f = O(f)
                });
                for (var i in p.globalSceneOptions) t[i] && t[i].call(t, p.globalSceneOptions[i])
            }
            return h
        }, this.removeScene = function(e) {
            if (r.type.Array(e)) e.forEach(function(e) {
                h.removeScene(e)
            });
            else {
                var t = f.indexOf(e);
                t > -1 && (e.off("shift.controller_sort"), f.splice(t, 1), e.remove())
            }
            return h
        }, this.updateScene = function(t, i) {
            return r.type.Array(t) ? t.forEach(function(e) {
                h.updateScene(e, i)
            }) : i ? t.update(!0) : m !== !0 && t instanceof e.Scene && (m = m || [], -1 == m.indexOf(t) && m.push(t), m = O(m), z()), h
        }, this.update = function(e) {
            return P({
                type: "resize"
            }), e && C(), h
        }, this.scrollTo = function(i, n) {
            if (r.type.Number(i)) S.call(p.container, i, n);
            else if (i instanceof e.Scene) i.controller() === h && h.scrollTo(i.scrollOffset(), n);
            else if (r.type.Function(i)) S = i;
            else {
                var s = r.get.elements(i)[0];
                if (s) {
                    for (; s.parentNode.hasAttribute(t);) s = s.parentNode;
                    var o = p.vertical ? "top" : "left",
                        a = r.get.offset(p.container),
                        l = r.get.offset(s);
                    y || (a[o] -= h.scrollPos()), h.scrollTo(l[o] - a[o], n)
                }
            }
            return h
        }, this.scrollPos = function(e) {
            return arguments.length ? (r.type.Function(e) && (x = e), h) : x.call(h)
        }, this.info = function(e) {
            var t = {
                size: w,
                vertical: p.vertical,
                scrollPos: g,
                scrollDirection: v,
                container: p.container,
                isDocument: y
            };
            return arguments.length ? void 0 !== t[e] ? t[e] : void 0 : t
        }, this.loglevel = function() {
            return h
        }, this.enabled = function(e) {
            return arguments.length ? (_ != e && (_ = !!e, h.updateScene(f, !0)), h) : _
        }, this.destroy = function(e) {
            window.clearTimeout(o);
            for (var t = f.length; t--;) f[t].destroy(e);
            return p.container.removeEventListener("resize", P), p.container.removeEventListener("scroll", P), r.cAF(s), null
        }, b(), h
    };
    var i = {
        defaults: {
            container: window,
            vertical: !0,
            globalSceneOptions: {},
            loglevel: 2,
            refreshInterval: 100
        }
    };
    e.Controller.addOption = function(e, t) {
        i.defaults[e] = t
    }, e.Controller.extend = function(t) {
        var i = this;
        e.Controller = function() {
            return i.apply(this, arguments), this.$super = r.extend({}, this), t.apply(this, arguments) || this
        }, r.extend(e.Controller, i), e.Controller.prototype = i.prototype, e.Controller.prototype.constructor = e.Controller
    }, e.Scene = function(i) {
        var s, o, a = "BEFORE",
            l = "DURING",
            c = "AFTER",
            u = n.defaults,
            d = this,
            h = r.extend({}, u, i),
            p = a,
            f = 0,
            m = {
                start: 0,
                end: 0
            },
            g = 0,
            v = !0,
            y = function() {
                for (var e in h) u.hasOwnProperty(e) || delete h[e];
                for (var t in u) z(t);
                S()
            },
            w = {};
        this.on = function(e, t) {
            return r.type.Function(t) && (e = e.trim().split(" "), e.forEach(function(e) {
                var i = e.split("."),
                    n = i[0],
                    r = i[1];
                "*" != n && (w[n] || (w[n] = []), w[n].push({
                    namespace: r || "",
                    callback: t
                }))
            })), d
        }, this.off = function(e, t) {
            return e ? (e = e.trim().split(" "), e.forEach(function(e) {
                var i = e.split("."),
                    n = i[0],
                    r = i[1] || "",
                    s = "*" === n ? Object.keys(w) : [n];
                s.forEach(function(e) {
                    for (var i = w[e] || [], n = i.length; n--;) {
                        var s = i[n];
                        !s || r !== s.namespace && "*" !== r || t && t != s.callback || i.splice(n, 1)
                    }
                    i.length || delete w[e]
                })
            }), d) : d
        }, this.trigger = function(t, i) {
            if (t) {
                var n = t.trim().split("."),
                    r = n[0],
                    s = n[1],
                    o = w[r];
                o && o.forEach(function(t) {
                    s && s !== t.namespace || t.callback.call(d, new e.Event(r, t.namespace, d, i))
                })
            }
            return d
        }, d.on("change.internal", function(e) {
            "loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? T() : "reverse" === e.what && d.update())
        }).on("shift.internal", function() {
            _(), d.update()
        }), this.addTo = function(t) {
            return t instanceof e.Controller && o != t && (o && o.removeScene(d), o = t, S(), b(!0), T(!0), _(), o.info("container").addEventListener("resize", x), t.addScene(d), d.trigger("add", {
                controller: o
            }), d.update()), d
        }, this.enabled = function(e) {
            return arguments.length ? (v != e && (v = !!e, d.update(!0)), d) : v
        }, this.remove = function() {
            if (o) {
                o.info("container").removeEventListener("resize", x);
                var e = o;
                o = void 0, e.removeScene(d), d.trigger("remove")
            }
            return d
        }, this.destroy = function(e) {
            return d.trigger("destroy", {
                reset: e
            }), d.remove(), d.off("*.*"), null
        }, this.update = function(e) {
            if (o)
                if (e)
                    if (o.enabled() && v) {
                        var t, i = o.info("scrollPos");
                        t = h.duration > 0 ? (i - m.start) / (m.end - m.start) : i >= m.start ? 1 : 0, d.trigger("update", {
                            startPos: m.start,
                            endPos: m.end,
                            scrollPos: i
                        }), d.progress(t)
                    } else P && p === l && O(!0);
            else o.updateScene(d, !1);
            return d
        }, this.refresh = function() {
            return b(), T(), d
        }, this.progress = function(e) {
            if (arguments.length) {
                var t = !1,
                    i = p,
                    n = o ? o.info("scrollDirection") : "PAUSED",
                    r = h.reverse || e >= f;
                if (0 === h.duration ? (t = f != e, f = 1 > e && r ? 0 : 1, p = 0 === f ? a : l) : 0 > e && p !== a && r ? (f = 0, p = a, t = !0) : e >= 0 && 1 > e && r ? (f = e, p = l, t = !0) : e >= 1 && p !== c ? (f = 1, p = c, t = !0) : p !== l || r || O(), t) {
                    var s = {
                            progress: f,
                            state: p,
                            scrollDirection: n
                        },
                        u = p != i,
                        m = function(e) {
                            d.trigger(e, s)
                        };
                    u && i !== l && (m("enter"), m(i === a ? "start" : "end")), m("progress"), u && p !== l && (m(p === a ? "start" : "end"), m("leave"))
                }
                return d
            }
            return f
        };
        var _ = function() {
                m = {
                    start: g + h.offset
                }, o && h.triggerElement && (m.start -= o.info("size") * h.triggerHook), m.end = m.start + h.duration
            },
            b = function(e) {
                if (s) {
                    var t = "duration";
                    C(t, s.call(d)) && !e && (d.trigger("change", {
                        what: t,
                        newval: h[t]
                    }), d.trigger("shift", {
                        reason: t
                    }))
                }
            },
            T = function(e) {
                var i = 0,
                    n = h.triggerElement;
                if (o && n) {
                    for (var s = o.info(), a = r.get.offset(s.container), l = s.vertical ? "top" : "left"; n.parentNode.hasAttribute(t);) n = n.parentNode;
                    var c = r.get.offset(n);
                    s.isDocument || (a[l] -= o.scrollPos()), i = c[l] - a[l]
                }
                var u = i != g;
                g = i, u && !e && d.trigger("shift", {
                    reason: "triggerElementPosition"
                })
            },
            x = function() {
                h.triggerHook > 0 && d.trigger("shift", {
                    reason: "containerResize"
                })
            },
            k = r.extend(n.validate, {
                duration: function(e) {
                    if (r.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
                        var t = parseFloat(e) / 100;
                        e = function() {
                            return o ? o.info("size") * t : 0
                        }
                    }
                    if (r.type.Function(e)) {
                        s = e;
                        try {
                            e = parseFloat(s())
                        } catch (i) {
                            e = -1
                        }
                    }
                    if (e = parseFloat(e), !r.type.Number(e) || 0 > e) throw s ? (s = void 0, 0) : 0;
                    return e
                }
            }),
            S = function(e) {
                e = arguments.length ? [e] : Object.keys(k), e.forEach(function(e) {
                    var t;
                    if (k[e]) try {
                        t = k[e](h[e])
                    } catch (i) {
                        t = u[e]
                    } finally {
                        h[e] = t
                    }
                })
            },
            C = function(e, t) {
                var i = !1,
                    n = h[e];
                return h[e] != t && (h[e] = t, S(e), i = n != h[e]), i
            },
            z = function(e) {
                d[e] || (d[e] = function(t) {
                    return arguments.length ? ("duration" === e && (s = void 0), C(e, t) && (d.trigger("change", {
                        what: e,
                        newval: h[e]
                    }), n.shifts.indexOf(e) > -1 && d.trigger("shift", {
                        reason: e
                    })), d) : h[e]
                })
            };
        this.controller = function() {
            return o
        }, this.state = function() {
            return p
        }, this.scrollOffset = function() {
            return m.start
        }, this.triggerPosition = function() {
            var e = h.offset;
            return o && (e += h.triggerElement ? g : o.info("size") * d.triggerHook()), e
        };
        var P, M;
        d.on("shift.internal", function(e) {
            var t = "duration" === e.reason;
            (p === c && t || p === l && 0 === h.duration) && O(), t && E()
        }).on("progress.internal", function() {
            O()
        }).on("add.internal", function() {
            E()
        }).on("destroy.internal", function(e) {
            d.removePin(e.reset)
        });
        var O = function(e) {
                if (P && o) {
                    var t = o.info(),
                        i = M.spacer.firstChild;
                    if (e || p !== l) {
                        var n = {
                                position: M.inFlow ? "relative" : "absolute",
                                top: 0,
                                left: 0
                            },
                            s = r.css(i, "position") != n.position;
                        M.pushFollowers ? h.duration > 0 && (p === c && 0 === parseFloat(r.css(M.spacer, "padding-top")) ? s = !0 : p === a && 0 === parseFloat(r.css(M.spacer, "padding-bottom")) && (s = !0)) : n[t.vertical ? "top" : "left"] = h.duration * f, r.css(i, n), s && E()
                    } else {
                        "fixed" != r.css(i, "position") && (r.css(i, {
                            position: "fixed"
                        }), E());
                        var u = r.get.offset(M.spacer, !0),
                            d = h.reverse || 0 === h.duration ? t.scrollPos - m.start : Math.round(f * h.duration * 10) / 10;
                        u[t.vertical ? "top" : "left"] += d, r.css(M.spacer.firstChild, {
                            top: u.top,
                            left: u.left
                        })
                    }
                }
            },
            E = function() {
                if (P && o && M.inFlow) {
                    var e = p === l,
                        t = o.info("vertical"),
                        i = M.spacer.firstChild,
                        n = r.isMarginCollapseType(r.css(M.spacer, "display")),
                        s = {};
                    M.relSize.width || M.relSize.autoFullWidth ? e ? r.css(P, {
                        width: r.get.width(M.spacer)
                    }) : r.css(P, {
                        width: "100%"
                    }) : (s["min-width"] = r.get.width(t ? P : i, !0, !0), s.width = e ? s["min-width"] : "auto"), M.relSize.height ? e ? r.css(P, {
                        height: r.get.height(M.spacer) - (M.pushFollowers ? h.duration : 0)
                    }) : r.css(P, {
                        height: "100%"
                    }) : (s["min-height"] = r.get.height(t ? i : P, !0, !n), s.height = e ? s["min-height"] : "auto"), M.pushFollowers && (s["padding" + (t ? "Top" : "Left")] = h.duration * f, s["padding" + (t ? "Bottom" : "Right")] = h.duration * (1 - f)), r.css(M.spacer, s)
                }
            },
            A = function() {
                o && P && p === l && !o.info("isDocument") && O()
            },
            L = function() {
                o && P && p === l && ((M.relSize.width || M.relSize.autoFullWidth) && r.get.width(window) != r.get.width(M.spacer.parentNode) || M.relSize.height && r.get.height(window) != r.get.height(M.spacer.parentNode)) && E()
            },
            I = function(e) {
                o && P && p === l && !o.info("isDocument") && (e.preventDefault(), o._setScrollPos(o.info("scrollPos") - ((e.wheelDelta || e[o.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)))
            };
        this.setPin = function(e, i) {
            var n = {
                pushFollowers: !0,
                spacerClass: "scrollmagic-pin-spacer"
            };
            if (i = r.extend({}, n, i), e = r.get.elements(e)[0], !e) return d;
            if ("fixed" === r.css(e, "position")) return d;
            if (P) {
                if (P === e) return d;
                d.removePin()
            }
            P = e;
            var s = P.parentNode.style.display,
                o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            P.parentNode.style.display = "none";
            var a = "absolute" != r.css(P, "position"),
                l = r.css(P, o.concat(["display"])),
                c = r.css(P, ["width", "height"]);
            P.parentNode.style.display = s, !a && i.pushFollowers && (i.pushFollowers = !1);
            var u = P.parentNode.insertBefore(document.createElement("div"), P),
                h = r.extend(l, {
                    position: a ? "relative" : "absolute",
                    boxSizing: "content-box",
                    mozBoxSizing: "content-box",
                    webkitBoxSizing: "content-box"
                });
            if (a || r.extend(h, r.css(P, ["width", "height"])), r.css(u, h), u.setAttribute(t, ""), r.addClass(u, i.spacerClass), M = {
                    spacer: u,
                    relSize: {
                        width: "%" === c.width.slice(-1),
                        height: "%" === c.height.slice(-1),
                        autoFullWidth: "auto" === c.width && a && r.isMarginCollapseType(l.display)
                    },
                    pushFollowers: i.pushFollowers,
                    inFlow: a
                }, !P.___origStyle) {
                P.___origStyle = {};
                var p = P.style,
                    f = o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
                f.forEach(function(e) {
                    P.___origStyle[e] = p[e] || ""
                })
            }
            return M.relSize.width && r.css(u, {
                width: c.width
            }), M.relSize.height && r.css(u, {
                height: c.height
            }), u.appendChild(P), r.css(P, {
                position: a ? "relative" : "absolute",
                margin: "auto",
                top: "auto",
                left: "auto",
                bottom: "auto",
                right: "auto"
            }), (M.relSize.width || M.relSize.autoFullWidth) && r.css(P, {
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box"
            }), window.addEventListener("scroll", A), window.addEventListener("resize", A), window.addEventListener("resize", L), P.addEventListener("mousewheel", I), P.addEventListener("DOMMouseScroll", I), O(), d
        }, this.removePin = function(e) {
            if (P) {
                if (p === l && O(!0), e || !o) {
                    var i = M.spacer.firstChild;
                    if (i.hasAttribute(t)) {
                        var n = M.spacer.style,
                            s = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
                        margins = {}, s.forEach(function(e) {
                            margins[e] = n[e] || ""
                        }), r.css(i, margins)
                    }
                    M.spacer.parentNode.insertBefore(i, M.spacer), M.spacer.parentNode.removeChild(M.spacer), P.parentNode.hasAttribute(t) || (r.css(P, P.___origStyle), delete P.___origStyle)
                }
                window.removeEventListener("scroll", A), window.removeEventListener("resize", A), window.removeEventListener("resize", L), P.removeEventListener("mousewheel", I), P.removeEventListener("DOMMouseScroll", I), P = void 0
            }
            return d
        };
        var D, R = [];
        return d.on("destroy.internal", function(e) {
            d.removeClassToggle(e.reset)
        }), this.setClassToggle = function(e, t) {
            var i = r.get.elements(e);
            return 0 !== i.length && r.type.String(t) ? (R.length > 0 && d.removeClassToggle(), D = t, R = i, d.on("enter.internal_class leave.internal_class", function(e) {
                var t = "enter" === e.type ? r.addClass : r.removeClass;
                R.forEach(function(e) {
                    t(e, D)
                })
            }), d) : d
        }, this.removeClassToggle = function(e) {
            return e && R.forEach(function(e) {
                r.removeClass(e, D)
            }), d.off("start.internal_class end.internal_class"), D = void 0, R = [], d
        }, y(), d
    };
    var n = {
        defaults: {
            duration: 0,
            offset: 0,
            triggerElement: void 0,
            triggerHook: .5,
            reverse: !0,
            loglevel: 2
        },
        validate: {
            offset: function(e) {
                if (e = parseFloat(e), !r.type.Number(e)) throw 0;
                return e
            },
            triggerElement: function(e) {
                if (e = e || void 0) {
                    var t = r.get.elements(e)[0];
                    if (!t) throw 0;
                    e = t
                }
                return e
            },
            triggerHook: function(e) {
                var t = {
                    onCenter: .5,
                    onEnter: 1,
                    onLeave: 0
                };
                if (r.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
                else {
                    if (!(e in t)) throw 0;
                    e = t[e]
                }
                return e
            },
            reverse: function(e) {
                return !!e
            }
        },
        shifts: ["duration", "offset", "triggerHook"]
    };
    e.Scene.addOption = function(e, t, i, r) {
        e in n.defaults || (n.defaults[e] = t, n.validate[e] = i, r && n.shifts.push(e))
    }, e.Scene.extend = function(t) {
        var i = this;
        e.Scene = function() {
            return i.apply(this, arguments), this.$super = r.extend({}, this), t.apply(this, arguments) || this
        }, r.extend(e.Scene, i), e.Scene.prototype = i.prototype, e.Scene.prototype.constructor = e.Scene
    }, e.Event = function(e, t, i, n) {
        n = n || {};
        for (var r in n) this[r] = n[r];
        return this.type = e, this.target = this.currentTarget = i, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this
    };
    var r = e._util = function(e) {
        var t, i = {},
            n = function(e) {
                return parseFloat(e) || 0
            },
            r = function(t) {
                return t.currentStyle ? t.currentStyle : e.getComputedStyle(t)
            },
            s = function(t, i, s, o) {
                if (i = i === document ? e : i, i === e) o = !1;
                else if (!d.DomElement(i)) return 0;
                t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
                var a = (s ? i["offset" + t] || i["outer" + t] : i["client" + t] || i["inner" + t]) || 0;
                if (s && o) {
                    var l = r(i);
                    a += "Height" === t ? n(l.marginTop) + n(l.marginBottom) : n(l.marginLeft) + n(l.marginRight)
                }
                return a
            },
            o = function(e) {
                return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function(e) {
                    return e[1].toUpperCase()
                })
            };
        i.extend = function(e) {
            for (e = e || {}, t = 1; t < arguments.length; t++)
                if (arguments[t])
                    for (var i in arguments[t]) arguments[t].hasOwnProperty(i) && (e[i] = arguments[t][i]);
            return e
        }, i.isMarginCollapseType = function(e) {
            return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        };
        var a = 0,
            l = ["ms", "moz", "webkit", "o"],
            c = e.requestAnimationFrame,
            u = e.cancelAnimationFrame;
        for (t = 0; !c && t < l.length; ++t) c = e[l[t] + "RequestAnimationFrame"], u = e[l[t] + "CancelAnimationFrame"] || e[l[t] + "CancelRequestAnimationFrame"];
        c || (c = function(t) {
            var i = (new Date).getTime(),
                n = Math.max(0, 16 - (i - a)),
                r = e.setTimeout(function() {
                    t(i + n)
                }, n);
            return a = i + n, r
        }), u || (u = function(t) {
            e.clearTimeout(t)
        }), i.rAF = c.bind(e), i.cAF = u.bind(e);
        var d = i.type = function(e) {
            return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
        };
        d.String = function(e) {
            return "string" === d(e)
        }, d.Function = function(e) {
            return "function" === d(e)
        }, d.Array = function(e) {
            return Array.isArray(e)
        }, d.Number = function(e) {
            return !d.Array(e) && e - parseFloat(e) + 1 >= 0
        }, d.DomElement = function(e) {
            return "object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
        };
        var h = i.get = {};
        return h.elements = function(t) {
            var i = [];
            if (d.String(t)) try {
                t = document.querySelectorAll(t)
            } catch (n) {
                return i
            }
            if ("nodelist" === d(t) || d.Array(t))
                for (var r = 0, s = i.length = t.length; s > r; r++) {
                    var o = t[r];
                    i[r] = d.DomElement(o) ? o : h.elements(o)
                } else(d.DomElement(t) || t === document || t === e) && (i = [t]);
            return i
        }, h.scrollTop = function(t) {
            return t && "number" == typeof t.scrollTop ? t.scrollTop : e.pageYOffset || 0
        }, h.scrollLeft = function(t) {
            return t && "number" == typeof t.scrollLeft ? t.scrollLeft : e.pageXOffset || 0
        }, h.width = function(e, t, i) {
            return s("width", e, t, i)
        }, h.height = function(e, t, i) {
            return s("height", e, t, i)
        }, h.offset = function(e, t) {
            var i = {
                top: 0,
                left: 0
            };
            if (e && e.getBoundingClientRect) {
                var n = e.getBoundingClientRect();
                i.top = n.top, i.left = n.left, t || (i.top += h.scrollTop(), i.left += h.scrollLeft())
            }
            return i
        }, i.addClass = function(e, t) {
            t && (e.classList ? e.classList.add(t) : e.className += " " + t)
        }, i.removeClass = function(e, t) {
            t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
        }, i.css = function(e, t) {
            if (d.String(t)) return r(e)[o(t)];
            if (d.Array(t)) {
                var i = {},
                    n = r(e);
                return t.forEach(function(e) {
                    i[e] = n[o(e)]
                }), i
            }
            for (var s in t) {
                var a = t[s];
                a == parseFloat(a) && (a += "px"), e.style[o(s)] = a
            }
        }, i
    }(window || {});
    return e
}), ! function(e, t) {
    "function" == typeof define && define.amd ? define(["ScrollMagic", "TweenMax", "TimelineMax"], t) : "object" == typeof exports ? (require("gsap"), t(require("scrollmagic"), TweenMax, TimelineMax)) : t(e.ScrollMagic || e.jQuery && e.jQuery.ScrollMagic, e.TweenMax || e.TweenLite, e.TimelineMax || e.TimelineLite)
}(this, function(e, t, i) {
    "use strict";
    e.Scene.addOption("tweenChanges", !1, function(e) {
        return !!e
    }), e.Scene.extend(function() {
        var e, n = this;
        n.on("progress.plugin_gsap", function() {
            r()
        }), n.on("destroy.plugin_gsap", function(e) {
            n.removeTween(e.reset)
        });
        var r = function() {
            if (e) {
                var t = n.progress(),
                    i = n.state();
                e.repeat && -1 === e.repeat() ? "DURING" === i && e.paused() ? e.play() : "DURING" === i || e.paused() || e.pause() : t != e.progress() && (0 === n.duration() ? t > 0 ? e.play() : e.reverse() : n.tweenChanges() && e.tweenTo ? e.tweenTo(t * e.duration()) : e.progress(t).pause())
            }
        };
        n.setTween = function(s, o, a) {
            var l;
            arguments.length > 1 && (arguments.length < 3 && (a = o, o = 1), s = t.to(s, o, a));
            try {
                l = i ? new i({
                    smoothChildTiming: !0
                }).add(s) : s, l.pause()
            } catch (c) {
                return n
            }
            return e && n.removeTween(), e = l, s.repeat && -1 === s.repeat() && (e.repeat(-1), e.yoyo(s.yoyo())), r(), n
        }, n.removeTween = function(t) {
            return e && (t && e.progress(0).pause(), e.kill(), e = void 0), n
        }
    })
}), window.Detectizr = function(e, t, i, n) {
    function r(e, t) {
        var i, n, s;
        if (arguments.length > 2)
            for (i = 1, n = arguments.length; n > i; i += 1) r(e, arguments[i]);
        else
            for (s in t) t.hasOwnProperty(s) && (e[s] = t[s]);
        return e
    }

    function s(e) {
        return _.browser.userAgent.indexOf(e) > -1
    }

    function o(e) {
        return e.test(_.browser.userAgent)
    }

    function a(e) {
        return e.exec(_.browser.userAgent)
    }

    function l(e) {
        return e.replace(/^\s+|\s+$/g, "")
    }

    function c(e) {
        return null === e || e === n ? "" : String(e).replace(/((\s|\-|\.)+[a-z0-9])/g, function(e) {
            return e.toUpperCase().replace(/(\s|\-|\.)/g, "")
        })
    }

    function u(e, t) {
        var i = t || "",
            n = 1 === e.nodeType && (e.className ? (" " + e.className + " ").replace(S, " ") : "");
        if (n) {
            for (; n.indexOf(" " + i + " ") >= 0;) n = n.replace(" " + i + " ", " ");
            e.className = t ? l(n) : ""
        }
    }

    function d(e, t, i) {
        e && (e = c(e), t && (t = c(t), h(e + t, !0), i && h(e + t + "_" + i, !0)))
    }

    function h(e, t) {
        e && b && (x.addAllFeaturesAsClass ? b.addTest(e, t) : (t = "function" == typeof t ? t() : t, t ? b.addTest(e, !0) : (delete b[e], u(C, e))))
    }

    function p(e, t) {
        e.version = t;
        var i = t.split(".");
        i.length > 0 ? (i = i.reverse(), e.major = i.pop(), i.length > 0 ? (e.minor = i.pop(), i.length > 0 ? (i = i.reverse(), e.patch = i.join(".")) : e.patch = "0") : e.minor = "0") : e.major = "0"
    }

    function f() {
        e.clearTimeout(y), y = e.setTimeout(function() {
            w = _.device.orientation, e.innerHeight > e.innerWidth ? _.device.orientation = "portrait" : _.device.orientation = "landscape", h(_.device.orientation, !0), w !== _.device.orientation && h(w, !1)
        }, 10)
    }

    function m(e) {
        var i, n, r, s, o, a = t.plugins;
        for (s = a.length - 1; s >= 0; s--) {
            for (i = a[s], n = i.name + i.description, r = 0, o = e.length; o >= 0; o--) - 1 !== n.indexOf(e[o]) && (r += 1);
            if (r === e.length) return !0
        }
        return !1
    }

    function g(e) {
        var t;
        for (t = e.length - 1; t >= 0; t--) try {
            new ActiveXObject(e[t])
        } catch (i) {}
        return !1
    }

    function v(n) {
        var l, u, v, y, w, S, C;
        if (x = r({}, x, n || {}), x.detectDevice) {
            for (_.device = {
                    type: "",
                    model: "",
                    orientation: ""
                }, v = _.device, o(/googletv|smarttv|smart-tv|internet.tv|netcast|nettv|appletv|boxee|kylo|roku|dlnadoc|roku|pov_tv|hbbtv|ce\-html/) ? (v.type = T[0], v.model = "smartTv") : o(/xbox|playstation.3|wii/) ? (v.type = T[0], v.model = "gameConsole") : o(/ip(a|ro)d/) ? (v.type = T[1], v.model = "ipad") : o(/tablet/) && !o(/rx-34/) || o(/folio/) ? (v.type = T[1], v.model = String(a(/playbook/) || "")) : o(/linux/) && o(/android/) && !o(/fennec|mobi|htc.magic|htcX06ht|nexus.one|sc-02b|fone.945/) ? (v.type = T[1], v.model = "android") : o(/kindle/) || o(/mac.os/) && o(/silk/) ? (v.type = T[1], v.model = "kindle") : o(/gt-p10|sc-01c|shw-m180s|sgh-t849|sch-i800|shw-m180l|sph-p100|sgh-i987|zt180|htc(.flyer|\_flyer)|sprint.atp51|viewpad7|pandigital(sprnova|nova)|ideos.s7|dell.streak.7|advent.vega|a101it|a70bht|mid7015|next2|nook/) || o(/mb511/) && o(/rutem/) ? (v.type = T[1], v.model = "android") : o(/bb10/) ? (v.type = T[1], v.model = "blackberry") : (v.model = a(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/), null !== v.model ? (v.type = T[2], v.model = String(v.model)) : (v.model = "", o(/bolt|fennec|iris|maemo|minimo|mobi|mowser|netfront|novarra|prism|rx-34|skyfire|tear|xv6875|xv6975|google.wireless.transcoder/) ? v.type = T[2] : o(/opera/) && o(/windows.nt.5/) && o(/htc|xda|mini|vario|samsung\-gt\-i8000|samsung\-sgh\-i9/) ? v.type = T[2] : o(/windows.(nt|xp|me|9)/) && !o(/phone/) || o(/win(9|.9|nt)/) || o(/\(windows 8\)/) ? v.type = T[3] : o(/macintosh|powerpc/) && !o(/silk/) ? (v.type = T[3], v.model = "mac") : o(/linux/) && o(/x11/) ? v.type = T[3] : o(/solaris|sunos|bsd/) ? v.type = T[3] : o(/cros/) ? v.type = T[3] : o(/bot|crawler|spider|yahoo|ia_archiver|covario-ids|findlinks|dataparksearch|larbin|mediapartners-google|ng-search|snappy|teoma|jeeves|tineye/) && !o(/mobile/) ? (v.type = T[3], v.model = "crawler") : v.type = T[2])), l = 0, u = T.length; u > l; l += 1) h(T[l], v.type === T[l]);
            x.detectDeviceModel && h(c(v.model), !0)
        }
        if (x.detectScreen && (v.screen = {}, b && b.mq && (b.mq("only screen and (max-width: 240px)") ? (v.screen.size = "veryVerySmall", h("veryVerySmallScreen", !0)) : b.mq("only screen and (max-width: 320px)") ? (v.screen.size = "verySmall", h("verySmallScreen", !0)) : b.mq("only screen and (max-width: 480px)") && (v.screen.size = "small", h("smallScreen", !0)), (v.type === T[1] || v.type === T[2]) && b.mq("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)") && (v.screen.resolution = "high", h("highresolution", !0))), v.type === T[1] || v.type === T[2] ? (e.onresize = function(e) {
                f(e)
            }, f()) : (v.orientation = "landscape", h(v.orientation, !0))), x.detectOS && (_.os = {}, y = _.os, "" !== v.model && ("ipad" === v.model || "iphone" === v.model || "ipod" === v.model ? (y.name = "ios", p(y, (o(/os\s([\d_]+)/) ? RegExp.$1 : "").replace(/_/g, "."))) : "android" === v.model ? (y.name = "android", p(y, o(/android\s([\d\.]+)/) ? RegExp.$1 : "")) : "blackberry" === v.model ? (y.name = "blackberry", p(y, o(/version\/([^\s]+)/) ? RegExp.$1 : "")) : "playbook" === v.model && (y.name = "blackberry", p(y, o(/os ([^\s]+)/) ? RegExp.$1.replace(";", "") : ""))), y.name || (s("win") || s("16bit") ? (y.name = "windows", s("windows nt 10") ? p(y, "10") : s("windows nt 6.3") ? p(y, "8.1") : s("windows nt 6.2") || o(/\(windows 8\)/) ? p(y, "8") : s("windows nt 6.1") ? p(y, "7") : s("windows nt 6.0") ? p(y, "vista") : s("windows nt 5.2") || s("windows nt 5.1") || s("windows xp") ? p(y, "xp") : s("windows nt 5.0") || s("windows 2000") ? p(y, "2k") : s("winnt") || s("windows nt") ? p(y, "nt") : s("win98") || s("windows 98") ? p(y, "98") : (s("win95") || s("windows 95")) && p(y, "95")) : s("mac") || s("darwin") ? (y.name = "mac os", s("68k") || s("68000") ? p(y, "68k") : s("ppc") || s("powerpc") ? p(y, "ppc") : s("os x") && p(y, (o(/os\sx\s([\d_]+)/) ? RegExp.$1 : "os x").replace(/_/g, "."))) : s("webtv") ? y.name = "webtv" : s("x11") || s("inux") ? y.name = "linux" : s("sunos") ? y.name = "sun" : s("irix") ? y.name = "irix" : s("freebsd") ? y.name = "freebsd" : s("bsd") && (y.name = "bsd")), y.name && (h(y.name, !0), y.major && (d(y.name, y.major), y.minor && d(y.name, y.major, y.minor))), o(/\sx64|\sx86|\swin64|\swow64|\samd64/) ? y.addressRegisterSize = "64bit" : y.addressRegisterSize = "32bit", h(y.addressRegisterSize, !0)), x.detectBrowser && (w = _.browser, o(/opera|webtv/) || !o(/msie\s([\d\w\.]+)/) && !s("trident") ? s("firefox") ? (w.engine = "gecko", w.name = "firefox", p(w, o(/firefox\/([\d\w\.]+)/) ? RegExp.$1 : "")) : s("gecko/") ? w.engine = "gecko" : s("opera") ? (w.name = "opera", w.engine = "presto", p(w, o(/version\/([\d\.]+)/) ? RegExp.$1 : o(/opera(\s|\/)([\d\.]+)/) ? RegExp.$2 : "")) : s("konqueror") ? w.name = "konqueror" : s("edge") ? (w.engine = "webkit", w.name = "edge", p(w, o(/edge\/([\d\.]+)/) ? RegExp.$1 : "")) : s("chrome") ? (w.engine = "webkit", w.name = "chrome", p(w, o(/chrome\/([\d\.]+)/) ? RegExp.$1 : "")) : s("iron") ? (w.engine = "webkit", w.name = "iron") : s("crios") ? (w.name = "chrome", w.engine = "webkit", p(w, o(/crios\/([\d\.]+)/) ? RegExp.$1 : "")) : s("applewebkit/") ? (w.name = "safari", w.engine = "webkit", p(w, o(/version\/([\d\.]+)/) ? RegExp.$1 : "")) : s("mozilla/") && (w.engine = "gecko") : (w.engine = "trident", w.name = "ie", !e.addEventListener && i.documentMode && 7 === i.documentMode ? p(w, "8.compat") : o(/trident.*rv[ :](\d+)\./) ? p(w, RegExp.$1) : p(w, o(/trident\/4\.0/) ? "8" : RegExp.$1)), w.name && (h(w.name, !0), w.major && (d(w.name, w.major), w.minor && d(w.name, w.major, w.minor))), h(w.engine, !0), w.language = t.userLanguage || t.language, h(w.language, !0)), x.detectPlugins) {
            for (w.plugins = [], l = k.length - 1; l >= 0; l--) S = k[l], C = !1, e.ActiveXObject ? C = g(S.progIds) : t.plugins && (C = m(S.substrs)), C && (w.plugins.push(S.name), h(S.name, !0));
            t.javaEnabled() && (w.plugins.push("java"), h("java", !0))
        }
    }
    var y, w, _ = {},
        b = e.Modernizr,
        T = ["tv", "tablet", "mobile", "desktop"],
        x = {
            addAllFeaturesAsClass: !1,
            detectDevice: !0,
            detectDeviceModel: !0,
            detectScreen: !0,
            detectOS: !0,
            detectBrowser: !0,
            detectPlugins: !0
        },
        k = [{
            name: "adobereader",
            substrs: ["Adobe", "Acrobat"],
            progIds: ["AcroPDF.PDF", "PDF.PDFCtrl.5"]
        }, {
            name: "flash",
            substrs: ["Shockwave Flash"],
            progIds: ["ShockwaveFlash.ShockwaveFlash.1"]
        }, {
            name: "wmplayer",
            substrs: ["Windows Media"],
            progIds: ["wmplayer.ocx"]
        }, {
            name: "silverlight",
            substrs: ["Silverlight"],
            progIds: ["AgControl.AgControl"]
        }, {
            name: "quicktime",
            substrs: ["QuickTime"],
            progIds: ["QuickTime.QuickTime"]
        }],
        S = /[\t\r\n]/g,
        C = i.documentElement;
    return _.detect = function(e) {
        return v(e)
    }, _.init = function() {
        _ !== n && (_.browser = {
            userAgent: (t.userAgent || t.vendor || e.opera).toLowerCase()
        }, _.detect())
    }, _.init(), _
}(this, this.navigator, this.document);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
            var t, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                s = r.com.greensock,
                o = 2 * Math.PI,
                a = Math.PI / 2,
                l = s._class,
                c = function(t, i) {
                    var n = l("easing." + t, function() {}, !0),
                        r = n.prototype = new e;
                    return r.constructor = n, r.getRatio = i, n
                },
                u = e.register || function() {},
                d = function(e, t, i, n, r) {
                    var s = l("easing." + e, {
                        easeOut: new t,
                        easeIn: new i,
                        easeInOut: new n
                    }, !0);
                    return u(s, e), s
                },
                h = function(e, t, i) {
                    this.t = e, this.v = t, i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
                },
                p = function(t, i) {
                    var n = l("easing." + t, function(e) {
                            this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                        r = n.prototype = new e;
                    return r.constructor = n, r.getRatio = i, r.config = function(e) {
                        return new n(e)
                    }, n
                },
                f = d("Back", p("BackOut", function(e) {
                    return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
                }), p("BackIn", function(e) {
                    return e * e * ((this._p1 + 1) * e - this._p1)
                }), p("BackInOut", function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
                })),
                m = l("easing.SlowMo", function(e, t, i) {
                    t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                }, !0),
                g = m.prototype = new e;
            return g.constructor = m, g.getRatio = function(e) {
                var t = e + (.5 - e) * this._p;
                return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
            }, m.ease = new m(.7, .7), g.config = m.config = function(e, t, i) {
                return new m(e, t, i)
            }, t = l("easing.SteppedEase", function(e, t) {
                e = e || 1, this._p1 = 1 / e, this._p2 = e + (t ? 0 : 1), this._p3 = t ? 1 : 0
            }, !0), g = t.prototype = new e, g.constructor = t, g.getRatio = function(e) {
                return 0 > e ? e = 0 : e >= 1 && (e = .999999999), ((this._p2 * e | 0) + this._p3) * this._p1
            }, g.config = t.config = function(e, i) {
                return new t(e, i)
            }, i = l("easing.RoughEase", function(t) {
                t = t || {};
                for (var i, n, r, s, o, a, l = t.taper || "none", c = [], u = 0, d = 0 | (t.points || 20), p = d, f = t.randomize !== !1, m = t.clamp === !0, g = t.template instanceof e ? t.template : null, v = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) i = f ? Math.random() : 1 / d * p, n = g ? g.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (s = 1 - i, r = s * s * v) : "in" === l ? r = i * i * v : .5 > i ? (s = 2 * i, r = s * s * .5 * v) : (s = 2 * (1 - i), r = s * s * .5 * v), f ? n += Math.random() * r - .5 * r : p % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), c[u++] = {
                    x: i,
                    y: n
                };
                for (c.sort(function(e, t) {
                        return e.x - t.x
                    }), a = new h(1, 1, null), p = d; --p > -1;) o = c[p], a = new h(o.x, o.y, a);
                this._prev = new h(0, 0, 0 !== a.t ? a : a.next)
            }, !0), g = i.prototype = new e, g.constructor = i, g.getRatio = function(e) {
                var t = this._prev;
                if (e > t.t) {
                    for (; t.next && e >= t.t;) t = t.next;
                    t = t.prev
                } else
                    for (; t.prev && e <= t.t;) t = t.prev;
                return this._prev = t, t.v + (e - t.t) / t.gap * t.c
            }, g.config = function(e) {
                return new i(e)
            }, i.ease = new i, d("Bounce", c("BounceOut", function(e) {
                return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            }), c("BounceIn", function(e) {
                return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
            }), c("BounceInOut", function(e) {
                var t = .5 > e;
                return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375,
                    t ? .5 * (1 - e) : .5 * e + .5
            })), d("Circ", c("CircOut", function(e) {
                return Math.sqrt(1 - (e -= 1) * e)
            }), c("CircIn", function(e) {
                return -(Math.sqrt(1 - e * e) - 1)
            }), c("CircInOut", function(e) {
                return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
            })), n = function(t, i, n) {
                var r = l("easing." + t, function(e, t) {
                        this._p1 = e >= 1 ? e : 1, this._p2 = (t || n) / (1 > e ? e : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                    }, !0),
                    s = r.prototype = new e;
                return s.constructor = r, s.getRatio = i, s.config = function(e, t) {
                    return new r(e, t)
                }, r
            }, d("Elastic", n("ElasticOut", function(e) {
                return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
            }, .3), n("ElasticIn", function(e) {
                return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
            }, .3), n("ElasticInOut", function(e) {
                return (e *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
            }, .45)), d("Expo", c("ExpoOut", function(e) {
                return 1 - Math.pow(2, -10 * e)
            }), c("ExpoIn", function(e) {
                return Math.pow(2, 10 * (e - 1)) - .001
            }), c("ExpoInOut", function(e) {
                return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
            })), d("Sine", c("SineOut", function(e) {
                return Math.sin(e * a)
            }), c("SineIn", function(e) {
                return -Math.cos(e * a) + 1
            }), c("SineInOut", function(e) {
                return -.5 * (Math.cos(Math.PI * e) - 1)
            })), l("easing.EaseLookup", {
                find: function(t) {
                    return e.map[t]
                }
            }, !0), u(r.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(t, "SteppedEase", "ease,"), f
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function() {
        "use strict";
        var e = function() {
            return _gsScope.GreenSockGlobals || _gsScope
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite"], e)
    }(), ! function(e) {
        "use strict";
        var t, i, n, r = e.fn.animate,
            s = e.fn.stop,
            o = !0,
            a = function(e) {
                var t, i = {};
                for (t in e) i[t] = e[t];
                return i
            },
            l = {
                overwrite: 1,
                delay: 1,
                useFrames: 1,
                runBackwards: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                autoCSS: 1
            },
            c = ",scrollTop,scrollLeft,show,hide,toggle,",
            u = c,
            d = function(e, t) {
                for (var i in l) l[i] && void 0 !== e[i] && (t[i] = e[i])
            },
            h = function(e) {
                return function(t) {
                    return e.getRatio(t)
                }
            },
            p = {},
            f = function() {
                var r, s, o, a = window.GreenSockGlobals || window;
                if (t = a.TweenMax || a.TweenLite, t && (r = (t.version + ".0.0").split("."), s = !(Number(r[0]) > 0 && Number(r[1]) > 7), a = a.com.greensock, i = a.plugins.CSSPlugin, p = a.easing.Ease.map || {}), !t || !i || s) return t = null, void(!n && window.console && (window.console.log("The jquery.gsap.js plugin requires the TweenMax (or at least TweenLite and CSSPlugin) JavaScript file(s)." + (s ? " Version " + r.join(".") + " is too old." : "")), n = !0));
                if (e.easing) {
                    for (o in p) e.easing[o] = h(p[o]);
                    f = !1
                }
            };
        e.fn.animate = function(n, s, l, c) {
            if (n = n || {}, f && (f(), !t || !i)) return r.call(this, n, s, l, c);
            if (!o || n.skipGSAP === !0 || "object" == typeof s && "function" == typeof s.step) return r.call(this, n, s, l, c);
            var h, m, g, v, y = e.speed(s, l, c),
                w = {
                    ease: p[y.easing] || (y.easing === !1 ? p.linear : p.swing)
                },
                _ = this,
                b = "object" == typeof s ? s.specialEasing : null;
            for (m in n) {
                if (h = n[m], h instanceof Array && p[h[1]] && (b = b || {}, b[m] = h[1], h = h[0]), "show" === h || "hide" === h || "toggle" === h || -1 !== u.indexOf(m) && -1 !== u.indexOf("," + m + ",")) return r.call(this, n, s, l, c);
                w[-1 === m.indexOf("-") ? m : e.camelCase(m)] = h
            }
            if (b) {
                w = a(w), v = [];
                for (m in b) h = v[v.length] = {}, d(w, h), h.ease = p[b[m]] || w.ease, -1 !== m.indexOf("-") && (m = e.camelCase(m)), h[m] = w[m], delete w[m];
                0 === v.length && (v = null)
            }
            return g = function(i) {
                var n, r = a(w);
                if (v)
                    for (n = v.length; --n > -1;) t.to(this, e.fx.off ? 0 : y.duration / 1e3, v[n]);
                r.onComplete = function() {
                    i ? i() : y.old && e(this).each(y.old)
                }, t.to(this, e.fx.off ? 0 : y.duration / 1e3, r)
            }, y.queue !== !1 ? (_.queue(y.queue, g), "function" == typeof y.old && e(_[_.length - 1]).queue(y.queue, function(e) {
                y.old.call(_), e()
            })) : g.call(_), _
        }, e.fn.stop = function(e, i) {
            if (s.call(this, e, i), t) {
                if (i)
                    for (var n, r = t.getTweensOf(this), o = r.length; --o > -1;) n = r[o].totalTime() / r[o].totalDuration(), n > 0 && 1 > n && r[o].seek(r[o].totalDuration());
                t.killTweensOf(this)
            }
            return this
        }, e.gsap = {
            enabled: function(e) {
                o = e
            },
            version: "0.1.12",
            legacyProps: function(e) {
                u = c + e + ","
            }
        }
    }(jQuery);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
            var i, n, r, s, o = function() {
                    e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                },
                a = _gsScope._gsDefine.globals,
                l = {},
                c = o.prototype = new e("css");
            c.constructor = o, o.version = "1.20.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, c = "px", o.suffixMap = {
                top: c,
                right: c,
                bottom: c,
                left: c,
                width: c,
                height: c,
                fontSize: c,
                padding: c,
                margin: c,
                perspective: c,
                lineHeight: ""
            };
            var u, d, h, p, f, m, g, v, y = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                w = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                T = /(?:\d|\-|\+|=|#|\.)*/g,
                x = /opacity *= *([^)]*)/i,
                k = /opacity:([^;]*)/i,
                S = /alpha\(opacity *=.+?\)/i,
                C = /^(rgb|hsl)/,
                z = /([A-Z])/g,
                P = /-([a-z])/gi,
                M = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                O = function(e, t) {
                    return t.toUpperCase()
                },
                E = /(?:Left|Right|Width)/i,
                A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                I = /,(?=[^\)]*(?:\(|$))/gi,
                D = /[\s,\(]/i,
                R = Math.PI / 180,
                N = 180 / Math.PI,
                W = {},
                F = {
                    style: {}
                },
                H = _gsScope.document || {
                    createElement: function() {
                        return F
                    }
                },
                B = function(e, t) {
                    return H.createElementNS ? H.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : H.createElement(e)
                },
                j = B("div"),
                q = B("img"),
                $ = o._internals = {
                    _specialProps: l
                },
                X = (_gsScope.navigator || {}).userAgent || "",
                Y = function() {
                    var e = X.indexOf("Android"),
                        t = B("a");
                    return h = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === e || parseFloat(X.substr(e + 8, 2)) > 3), f = h && parseFloat(X.substr(X.indexOf("Version/") + 8, 2)) < 6, p = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (m = parseFloat(RegExp.$1)), !!t && (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity))
                }(),
                V = function(e) {
                    return x.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                G = function(e) {
                    _gsScope.console && console.log(e)
                },
                U = "",
                Z = "",
                K = function(e, t) {
                    t = t || j;
                    var i, n, r = t.style;
                    if (void 0 !== r[e]) return e;
                    for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + e];);
                    return n >= 0 ? (Z = 3 === n ? "ms" : i[n], U = "-" + Z.toLowerCase() + "-", Z + e) : null
                },
                Q = H.defaultView ? H.defaultView.getComputedStyle : function() {},
                J = o.getStyle = function(e, t, i, n, r) {
                    var s;
                    return Y || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || Q(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(z, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : V(e)
                },
                ee = $.convertToPixels = function(e, i, n, r, s) {
                    if ("px" === r || !r && "lineHeight" !== i) return n;
                    if ("auto" === r || !n) return 0;
                    var a, l, c, u = E.test(i),
                        d = e,
                        h = j.style,
                        p = 0 > n,
                        f = 1 === n;
                    if (p && (n = -n), f && (n *= 100), "lineHeight" !== i || r)
                        if ("%" === r && -1 !== i.indexOf("border")) a = n / 100 * (u ? e.clientWidth : e.clientHeight);
                        else {
                            if (h.cssText = "border:0 solid red;position:" + J(e, "position") + ";line-height:0;", "%" !== r && d.appendChild && "v" !== r.charAt(0) && "rem" !== r) h[u ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                            else {
                                if (d = e.parentNode || H.body, -1 !== J(d, "display").indexOf("flex") && (h.position = "absolute"), l = d._gsCache, c = t.ticker.frame, l && u && l.time === c) return l.width * n / 100;
                                h[u ? "width" : "height"] = n + r
                            }
                            d.appendChild(j), a = parseFloat(j[u ? "offsetWidth" : "offsetHeight"]), d.removeChild(j), u && "%" === r && o.cacheWidths !== !1 && (l = d._gsCache = d._gsCache || {}, l.time = c, l.width = a / n * 100), 0 !== a || s || (a = ee(e, i, n, r, !0))
                        } else l = Q(e).lineHeight, e.style.lineHeight = n, a = parseFloat(Q(e).lineHeight), e.style.lineHeight = l;
                    return f && (a /= 100), p ? -a : a
                },
                te = $.calculateOffset = function(e, t, i) {
                    if ("absolute" !== J(e, "position", i)) return 0;
                    var n = "left" === t ? "Left" : "Top",
                        r = J(e, "margin" + n, i);
                    return e["offset" + n] - (ee(e, t, parseFloat(r), r.replace(T, "")) || 0)
                },
                ie = function(e, t) {
                    var i, n, r, s = {};
                    if (t = t || Q(e, null))
                        if (i = t.length)
                            for (; --i > -1;) r = t[i], (-1 === r.indexOf("-transform") || Me === r) && (s[r.replace(P, O)] = t.getPropertyValue(r));
                        else
                            for (i in t)(-1 === i.indexOf("Transform") || Pe === i) && (s[i] = t[i]);
                    else if (t = e.currentStyle || e.style)
                        for (i in t) "string" == typeof i && void 0 === s[i] && (s[i.replace(P, O)] = t[i]);
                    return Y || (s.opacity = V(e)), n = qe(e, t, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Ee && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                },
                ne = function(e, t, i, n, r) {
                    var s, o, a, l = {},
                        c = e.style;
                    for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : te(e, o), void 0 !== c[o] && (a = new ye(c, o, c[o], a)));
                    if (n)
                        for (o in n) "className" !== o && (l[o] = n[o]);
                    return {
                        difs: l,
                        firstMPT: a
                    }
                },
                re = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                se = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                oe = function(e, t, i) {
                    if ("svg" === (e.nodeName + "").toLowerCase()) return (i || Q(e))[t] || 0;
                    if (e.getCTM && He(e)) return e.getBBox()[t] || 0;
                    var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                        r = re[t],
                        s = r.length;
                    for (i = i || Q(e, null); --s > -1;) n -= parseFloat(J(e, "padding" + r[s], i, !0)) || 0, n -= parseFloat(J(e, "border" + r[s] + "Width", i, !0)) || 0;
                    return n
                },
                ae = function(e, t) {
                    if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
                    (null == e || "" === e) && (e = "0 0");
                    var i, n = e.split(" "),
                        r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                        s = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                    if (n.length > 3 && !t) {
                        for (n = e.split(", ").join(",").split(","), e = [], i = 0; i < n.length; i++) e.push(ae(n[i]));
                        return e.join(",")
                    }
                    return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e = r + " " + s + (n.length > 2 ? " " + n[2] : ""), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== s.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(r.replace(b, "")), t.oy = parseFloat(s.replace(b, "")), t.v = e), t || e
                },
                le = function(e, t) {
                    return "function" == typeof e && (e = e(v, g)), "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
                },
                ce = function(e, t) {
                    return "function" == typeof e && (e = e(v, g)), null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e) || 0
                },
                ue = function(e, t, i, n) {
                    var r, s, o, a, l, c = 1e-6;
                    return "function" == typeof e && (e = e(v, g)), null == e ? a = t : "number" == typeof e ? a = e : (r = 360, s = e.split("_"), l = "=" === e.charAt(1), o = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : N) - (l ? 0 : t), s.length && (n && (n[i] = t + o), -1 !== e.indexOf("short") && (o %= r, o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = t + o), c > a && a > -c && (a = 0), a
                },
                de = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                he = function(e, t, i) {
                    return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 255 * (1 > 6 * e ? t + (i - t) * e * 6 : .5 > e ? i : 2 > 3 * e ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
                },
                pe = o.parseColor = function(e, t) {
                    var i, n, r, s, o, a, l, c, u, d, h;
                    if (e)
                        if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
                        else {
                            if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), de[e]) i = de[e];
                            else if ("#" === e.charAt(0)) 4 === e.length && (n = e.charAt(1), r = e.charAt(2), s = e.charAt(3), e = "#" + n + n + r + r + s + s), e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & 255, 255 & e];
                            else if ("hsl" === e.substr(0, 3))
                                if (i = h = e.match(y), t) {
                                    if (-1 !== e.indexOf("=")) return e.match(w)
                                } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = .5 >= l ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(e[3])), i[0] = he(o + 1 / 3, n, r), i[1] = he(o, n, r), i[2] = he(o - 1 / 3, n, r);
                            else i = e.match(y) || de.transparent;
                            i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                        } else i = de.black;
                    return t && !h && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, c = Math.max(n, r, s), u = Math.min(n, r, s), l = (c + u) / 2, c === u ? o = a = 0 : (d = c - u, a = l > .5 ? d / (2 - c - u) : d / (c + u), o = c === n ? (r - s) / d + (s > r ? 6 : 0) : c === r ? (s - n) / d + 2 : (n - r) / d + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                },
                fe = function(e, t) {
                    var i, n, r, s = e.match(me) || [],
                        o = 0,
                        a = "";
                    if (!s.length) return e;
                    for (i = 0; i < s.length; i++) n = s[i], r = e.substr(o, e.indexOf(n, o) - o), o += r.length + n.length, n = pe(n, t), 3 === n.length && n.push(1), a += r + (t ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                    return a + e.substr(o)
                },
                me = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (c in de) me += "|" + c + "\\b";
            me = new RegExp(me + ")", "gi"), o.colorStringFilter = function(e) {
                var t, i = e[0] + " " + e[1];
                me.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), e[0] = fe(e[0], t), e[1] = fe(e[1], t)), me.lastIndex = 0
            }, t.defaultStringFilter || (t.defaultStringFilter = o.colorStringFilter);
            var ge = function(e, t, i, n) {
                    if (null == e) return function(e) {
                        return e
                    };
                    var r, s = t ? (e.match(me) || [""])[0] : "",
                        o = e.split(s).join("").match(_) || [],
                        a = e.substr(0, e.indexOf(o[0])),
                        l = ")" === e.charAt(e.length - 1) ? ")" : "",
                        c = -1 !== e.indexOf(" ") ? " " : ",",
                        u = o.length,
                        d = u > 0 ? o[0].replace(y, "") : "";
                    return u ? r = t ? function(e) {
                        var t, h, p, f;
                        if ("number" == typeof e) e += d;
                        else if (n && I.test(e)) {
                            for (f = e.replace(I, "|").split("|"), p = 0; p < f.length; p++) f[p] = r(f[p]);
                            return f.join(",")
                        }
                        if (t = (e.match(me) || [s])[0], h = e.split(t).join("").match(_) || [], p = h.length, u > p--)
                            for (; ++p < u;) h[p] = i ? h[(p - 1) / 2 | 0] : o[p];
                        return a + h.join(c) + c + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
                    } : function(e) {
                        var t, s, h;
                        if ("number" == typeof e) e += d;
                        else if (n && I.test(e)) {
                            for (s = e.replace(I, "|").split("|"), h = 0; h < s.length; h++) s[h] = r(s[h]);
                            return s.join(",")
                        }
                        if (t = e.match(_) || [], h = t.length, u > h--)
                            for (; ++h < u;) t[h] = i ? t[(h - 1) / 2 | 0] : o[h];
                        return a + t.join(c) + l
                    } : function(e) {
                        return e
                    }
                },
                ve = function(e) {
                    return e = e.split(","),
                        function(t, i, n, r, s, o, a) {
                            var l, c = (i + "").split(" ");
                            for (a = {}, l = 0; 4 > l; l++) a[e[l]] = c[l] = c[l] || c[(l - 1) / 2 >> 0];
                            return r.parse(t, a, s, o)
                        }
                },
                ye = ($._setPluginRatio = function(e) {
                    this.plugin.setRatio(e);
                    for (var t, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, c = 1e-6; l;) t = a[l.v], l.r ? t = Math.round(t) : c > t && t > -c && (t = 0), l.t[l.p] = t, l = l._next;
                    if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === e || 0 === e)
                        for (l = o.firstMPT, s = 1 === e ? "e" : "b"; l;) {
                            if (i = l.t, i.type) {
                                if (1 === i.type) {
                                    for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                    i[s] = r
                                }
                            } else i[s] = i.s + i.xs0;
                            l = l._next
                        }
                }, function(e, t, i, n, r) {
                    this.t = e, this.p = t, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                }),
                we = ($._parseToProxy = function(e, t, i, n, r, s) {
                    var o, a, l, c, u, d = n,
                        h = {},
                        p = {},
                        f = i._transform,
                        m = W;
                    for (i._transform = null, W = t, n = u = i.parse(e, t, n, r), W = m, s && (i._transform = f, d && (d._prev = null, d._prev && (d._prev._next = null))); n && n !== d;) {
                        if (n.type <= 1 && (a = n.p, p[a] = n.s + n.c, h[a] = n.s, s || (c = new ye(n, "s", a, c, n.r), n.c = 0), 1 === n.type))
                            for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, p[a] = n.data[l], h[a] = n[l], s || (c = new ye(n, l, a, c, n.rxp[l]));
                        n = n._next
                    }
                    return {
                        proxy: h,
                        end: p,
                        firstMPT: c,
                        pt: u
                    }
                }, $.CSSPropTween = function(e, t, n, r, o, a, l, c, u, d, h) {
                    this.t = e, this.p = t, this.s = n, this.c = r, this.n = l || t, e instanceof we || s.push(this.n), this.r = c, this.type = a || 0, u && (this.pr = u, i = !0), this.b = void 0 === d ? n : d, this.e = void 0 === h ? n + r : h, o && (this._next = o, o._prev = this)
                }),
                _e = function(e, t, i, n, r, s) {
                    var o = new we(e, t, i, n - i, r, (-1), s);
                    return o.b = i, o.e = o.xs0 = n, o
                },
                be = o.parseComplex = function(e, t, i, n, r, s, a, l, c, d) {
                    i = i || s || "", "function" == typeof n && (n = n(v, g)), a = new we(e, t, 0, 0, a, d ? 2 : 1, null, (!1), l, i, n), n += "", r && me.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                    var h, p, f, m, _, b, T, x, k, S, C, z, P, M = i.split(", ").join(",").split(" "),
                        O = n.split(", ").join(",").split(" "),
                        E = M.length,
                        A = u !== !1;
                    for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (M = M.join(" ").replace(I, ", ").split(" "), O = O.join(" ").replace(I, ", ").split(" "), E = M.length), E !== O.length && (M = (s || "").split(" "), E = M.length), a.plugin = c, a.setRatio = d, me.lastIndex = 0, h = 0; E > h; h++)
                        if (m = M[h], _ = O[h], x = parseFloat(m), x || 0 === x) a.appendXtra("", x, le(_, x), _.replace(w, ""), A && -1 !== _.indexOf("px"), !0);
                        else if (r && me.test(m)) z = _.indexOf(")") + 1, z = ")" + (z ? _.substr(z) : ""), P = -1 !== _.indexOf("hsl") && Y, S = _, m = pe(m, P), _ = pe(_, P), k = m.length + _.length > 6, k && !Y && 0 === _[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(O[h]).join("transparent")) : (Y || (k = !1), P ? a.appendXtra(S.substr(0, S.indexOf("hsl")) + (k ? "hsla(" : "hsl("), m[0], le(_[0], m[0]), ",", !1, !0).appendXtra("", m[1], le(_[1], m[1]), "%,", !1).appendXtra("", m[2], le(_[2], m[2]), k ? "%," : "%" + z, !1) : a.appendXtra(S.substr(0, S.indexOf("rgb")) + (k ? "rgba(" : "rgb("), m[0], _[0] - m[0], ",", !0, !0).appendXtra("", m[1], _[1] - m[1], ",", !0).appendXtra("", m[2], _[2] - m[2], k ? "," : z, !0), k && (m = m.length < 4 ? 1 : m[3], a.appendXtra("", m, (_.length < 4 ? 1 : _[3]) - m, z, !1))), me.lastIndex = 0;
                    else if (b = m.match(y)) {
                        if (T = _.match(w), !T || T.length !== b.length) return a;
                        for (f = 0, p = 0; p < b.length; p++) C = b[p], S = m.indexOf(C, f), a.appendXtra(m.substr(f, S - f), Number(C), le(T[p], C), "", A && "px" === m.substr(S + C.length, 2), 0 === p), f = S + C.length;
                        a["xs" + a.l] += m.substr(f)
                    } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + _ : _;
                    if (-1 !== n.indexOf("=") && a.data) {
                        for (z = a.xs0 + a.data.s, h = 1; h < a.l; h++) z += a["xs" + h] + a.data["xn" + h];
                        a.e = z + a["xs" + h]
                    }
                    return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                },
                Te = 9;
            for (c = we.prototype, c.l = c.pr = 0; --Te > 0;) c["xn" + Te] = 0, c["xs" + Te] = "";
            c.xs0 = "", c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null, c.appendXtra = function(e, t, i, n, r, s) {
                var o = this,
                    a = o.l;
                return o["xs" + a] += s && (a || o["xs" + a]) ? " " + e : e || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = t + i, o.rxp["xn" + a] = r, o["xn" + a] = t, o.plugin || (o.xfirst = new we(o, "xn" + a, t, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                    s: t + i
                }, o.rxp = {}, o.s = t, o.c = i, o.r = r, o)) : (o["xs" + a] += t + (n || ""), o)
            };
            var xe = function(e, t) {
                    t = t || {}, this.p = t.prefix ? K(e) || e : e, l[e] = l[this.p] = this, this.format = t.formatter || ge(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
                },
                ke = $._registerComplexSpecialProp = function(e, t, i) {
                    "object" != typeof t && (t = {
                        parser: i
                    });
                    var n, r, s = e.split(","),
                        o = t.defaultValue;
                    for (i = i || [o], n = 0; n < s.length; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || o, r = new xe(s[n], t)
                },
                Se = $._registerPluginProp = function(e) {
                    if (!l[e]) {
                        var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                        ke(e, {
                            parser: function(e, i, n, r, s, o, c) {
                                var u = a.com.greensock.plugins[t];
                                return u ? (u._cssRegister(), l[n].parse(e, i, n, r, s, o, c)) : (G("Error: " + t + " js file not loaded."), s)
                            }
                        })
                    }
                };
            c = xe.prototype, c.parseComplex = function(e, t, i, n, r, s) {
                var o, a, l, c, u, d, h = this.keyword;
                if (this.multi && (I.test(i) || I.test(t) ? (a = t.replace(I, "|").split("|"), l = i.replace(I, "|").split("|")) : h && (a = [t], l = [i])), l) {
                    for (c = l.length > a.length ? l.length : a.length, o = 0; c > o; o++) t = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, h && (u = t.indexOf(h), d = i.indexOf(h), u !== d && (-1 === d ? a[o] = a[o].split(h).join("") : -1 === u && (a[o] += " " + h)));
                    t = a.join(", "), i = l.join(", ")
                }
                return be(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, r, s)
            }, c.parse = function(e, t, i, n, s, o, a) {
                return this.parseComplex(e.style, this.format(J(e, this.p, r, !1, this.dflt)), this.format(t), s, o)
            }, o.registerSpecialProp = function(e, t, i) {
                ke(e, {
                    parser: function(e, n, r, s, o, a, l) {
                        var c = new we(e, r, 0, 0, o, 2, r, (!1), i);
                        return c.plugin = a, c.setRatio = t(e, n, s._tween, r), c
                    },
                    priority: i
                })
            }, o.useSVGTransformAttr = !0;
            var Ce, ze = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Pe = K("transform"),
                Me = U + "transform",
                Oe = K("transformOrigin"),
                Ee = null !== K("perspective"),
                Ae = $.Transform = function() {
                    this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(o.defaultForce3D === !1 || !Ee) && (o.defaultForce3D || "auto")
                },
                Le = _gsScope.SVGElement,
                Ie = function(e, t, i) {
                    var n, r = H.createElementNS("http://www.w3.org/2000/svg", e),
                        s = /([a-z])([A-Z])/g;
                    for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                    return t.appendChild(r), r
                },
                De = H.documentElement || {},
                Re = function() {
                    var e, t, i, n = m || /Android/i.test(X) && !_gsScope.chrome;
                    return H.createElementNS && !n && (e = Ie("svg", De), t = Ie("rect", e, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), i = t.getBoundingClientRect().width, t.style[Oe] = "50% 50%", t.style[Pe] = "scaleX(0.5)", n = i === t.getBoundingClientRect().width && !(p && Ee), De.removeChild(e)), n
                }(),
                Ne = function(e, t, i, n, r, s) {
                    var a, l, c, u, d, h, p, f, m, g, v, y, w, _, b = e._gsTransform,
                        T = je(e, !0);
                    b && (w = b.xOrigin, _ = b.yOrigin), (!n || (a = n.split(" ")).length < 2) && (p = e.getBBox(), 0 === p.x && 0 === p.y && p.width + p.height === 0 && (p = {
                        x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                        y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    }), t = ae(t).split(" "), a = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * p.width : parseFloat(t[0])) + p.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * p.height : parseFloat(t[1])) + p.y]), i.xOrigin = u = parseFloat(a[0]), i.yOrigin = d = parseFloat(a[1]), n && T !== Be && (h = T[0], p = T[1], f = T[2], m = T[3], g = T[4], v = T[5], y = h * m - p * f, y && (l = u * (m / y) + d * (-f / y) + (f * v - m * g) / y, c = u * (-p / y) + d * (h / y) - (h * v - p * g) / y, u = i.xOrigin = a[0] = l, d = i.yOrigin = a[1] = c)), b && (s && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (l = u - w, c = d - _, b.xOffset += l * T[0] + c * T[2] - l, b.yOffset += l * T[1] + c * T[3] - c) : b.xOffset = b.yOffset = 0), s || e.setAttribute("data-svg-origin", a.join(" "))
                },
                We = function(e) {
                    var t, i = B("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                        n = this.parentNode,
                        r = this.nextSibling,
                        s = this.style.cssText;
                    if (De.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
                        t = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = We
                    } catch (o) {} else this._originalGetBBox && (t = this._originalGetBBox());
                    return r ? n.insertBefore(this, r) : n.appendChild(this), De.removeChild(i), this.style.cssText = s, t
                },
                Fe = function(e) {
                    try {
                        return e.getBBox()
                    } catch (t) {
                        return We.call(e, !0)
                    }
                },
                He = function(e) {
                    return !(!(Le && e.getCTM && Fe(e)) || e.parentNode && !e.ownerSVGElement)
                },
                Be = [1, 0, 0, 1, 0, 0],
                je = function(e, t) {
                    var i, n, r, s, o, a, l = e._gsTransform || new Ae,
                        c = 1e5,
                        u = e.style;
                    if (Pe ? n = J(e, Me, null, !0) : e.currentStyle && (n = e.currentStyle.filter.match(A), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Pe || !(a = "none" === Q(e).display) && e.parentNode || (a && (s = u.display, u.display = "block"), e.parentNode || (o = 1, De.appendChild(e)), n = J(e, Me, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? u.display = s : a && Ve(u, "display"), o && De.removeChild(e)), (l.svg || e.getCTM && He(e)) && (i && -1 !== (u[Pe] + "").indexOf("matrix") && (n = u[Pe], i = 0), r = e.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Be;
                    for (r = (n || "").match(y) || [], Te = r.length; --Te > -1;) s = Number(r[Te]), r[Te] = (o = s - (s |= 0)) ? (o * c + (0 > o ? -.5 : .5) | 0) / c + s : s;
                    return t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                },
                qe = $.getTransform = function(e, i, n, r) {
                    if (e._gsTransform && n && !r) return e._gsTransform;
                    var s, a, l, c, u, d, h = n ? e._gsTransform || new Ae : new Ae,
                        p = h.scaleX < 0,
                        f = 2e-5,
                        m = 1e5,
                        g = Ee ? parseFloat(J(e, Oe, i, !1, "0 0 0").split(" ")[2]) || h.zOrigin || 0 : 0,
                        v = parseFloat(o.defaultTransformPerspective) || 0;
                    if (h.svg = !(!e.getCTM || !He(e)), h.svg && (Ne(e, J(e, Oe, i, !1, "50% 50%") + "", h, e.getAttribute("data-svg-origin")), Ce = o.useSVGTransformAttr || Re), s = je(e), s !== Be) {
                        if (16 === s.length) {
                            var y, w, _, b, T, x = s[0],
                                k = s[1],
                                S = s[2],
                                C = s[3],
                                z = s[4],
                                P = s[5],
                                M = s[6],
                                O = s[7],
                                E = s[8],
                                A = s[9],
                                L = s[10],
                                I = s[12],
                                D = s[13],
                                R = s[14],
                                W = s[11],
                                F = Math.atan2(M, L);
                            h.zOrigin && (R = -h.zOrigin, I = E * R - s[12], D = A * R - s[13], R = L * R + h.zOrigin - s[14]), h.rotationX = F * N, F && (b = Math.cos(-F), T = Math.sin(-F), y = z * b + E * T, w = P * b + A * T, _ = M * b + L * T, E = z * -T + E * b, A = P * -T + A * b, L = M * -T + L * b, W = O * -T + W * b, z = y, P = w, M = _), F = Math.atan2(-S, L), h.rotationY = F * N, F && (b = Math.cos(-F), T = Math.sin(-F), y = x * b - E * T, w = k * b - A * T, _ = S * b - L * T, A = k * T + A * b, L = S * T + L * b, W = C * T + W * b, x = y, k = w, S = _), F = Math.atan2(k, x), h.rotation = F * N, F && (b = Math.cos(F), T = Math.sin(F), y = x * b + k * T, w = z * b + P * T, _ = E * b + A * T, k = k * b - x * T, P = P * b - z * T, A = A * b - E * T, x = y, z = w, E = _), h.rotationX && Math.abs(h.rotationX) + Math.abs(h.rotation) > 359.9 && (h.rotationX = h.rotation = 0, h.rotationY = 180 - h.rotationY), F = Math.atan2(z, P), h.scaleX = (Math.sqrt(x * x + k * k + S * S) * m + .5 | 0) / m, h.scaleY = (Math.sqrt(P * P + M * M) * m + .5 | 0) / m, h.scaleZ = (Math.sqrt(E * E + A * A + L * L) * m + .5 | 0) / m, x /= h.scaleX, z /= h.scaleY, k /= h.scaleX, P /= h.scaleY, Math.abs(F) > f ? (h.skewX = F * N, z = 0, "simple" !== h.skewType && (h.scaleY *= 1 / Math.cos(F))) : h.skewX = 0, h.perspective = W ? 1 / (0 > W ? -W : W) : 0, h.x = I, h.y = D, h.z = R, h.svg && (h.x -= h.xOrigin - (h.xOrigin * x - h.yOrigin * z), h.y -= h.yOrigin - (h.yOrigin * k - h.xOrigin * P))
                        } else if (!Ee || r || !s.length || h.x !== s[4] || h.y !== s[5] || !h.rotationX && !h.rotationY) {
                            var H = s.length >= 6,
                                B = H ? s[0] : 1,
                                j = s[1] || 0,
                                q = s[2] || 0,
                                $ = H ? s[3] : 1;
                            h.x = s[4] || 0, h.y = s[5] || 0, l = Math.sqrt(B * B + j * j), c = Math.sqrt($ * $ + q * q), u = B || j ? Math.atan2(j, B) * N : h.rotation || 0, d = q || $ ? Math.atan2(q, $) * N + u : h.skewX || 0, h.scaleX = l, h.scaleY = c, h.rotation = u, h.skewX = d, Ee && (h.rotationX = h.rotationY = h.z = 0, h.perspective = v, h.scaleZ = 1), h.svg && (h.x -= h.xOrigin - (h.xOrigin * B + h.yOrigin * q), h.y -= h.yOrigin - (h.xOrigin * j + h.yOrigin * $))
                        }
                        Math.abs(h.skewX) > 90 && Math.abs(h.skewX) < 270 && (p ? (h.scaleX *= -1, h.skewX += h.rotation <= 0 ? 180 : -180, h.rotation += h.rotation <= 0 ? 180 : -180) : (h.scaleY *= -1, h.skewX += h.skewX <= 0 ? 180 : -180)), h.zOrigin = g;
                        for (a in h) h[a] < f && h[a] > -f && (h[a] = 0)
                    }
                    return n && (e._gsTransform = h, h.svg && (Ce && e.style[Pe] ? t.delayedCall(.001, function() {
                        Ve(e.style, Pe)
                    }) : !Ce && e.getAttribute("transform") && t.delayedCall(.001, function() {
                        e.removeAttribute("transform")
                    }))), h
                },
                $e = function(e) {
                    var t, i, n = this.data,
                        r = -n.rotation * R,
                        s = r + n.skewX * R,
                        o = 1e5,
                        a = (Math.cos(r) * n.scaleX * o | 0) / o,
                        l = (Math.sin(r) * n.scaleX * o | 0) / o,
                        c = (Math.sin(s) * -n.scaleY * o | 0) / o,
                        u = (Math.cos(s) * n.scaleY * o | 0) / o,
                        d = this.t.style,
                        h = this.t.currentStyle;
                    if (h) {
                        i = l, l = -c, c = -i, t = h.filter, d.filter = "";
                        var p, f, g = this.t.offsetWidth,
                            v = this.t.offsetHeight,
                            y = "absolute" !== h.position,
                            w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + c + ", M22=" + u,
                            _ = n.x + g * n.xPercent / 100,
                            b = n.y + v * n.yPercent / 100;
                        if (null != n.ox && (p = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, f = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, _ += p - (p * a + f * l), b += f - (p * c + f * u)), y ? (p = g / 2, f = v / 2, w += ", Dx=" + (p - (p * a + f * l) + _) + ", Dy=" + (f - (p * c + f * u) + b) + ")") : w += ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? d.filter = t.replace(L, w) : d.filter = w + " " + t, (0 === e || 1 === e) && 1 === a && 0 === l && 0 === c && 1 === u && (y && -1 === w.indexOf("Dx=0, Dy=0") || x.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && d.removeAttribute("filter")), !y) {
                            var k, S, C, z = 8 > m ? 1 : -1;
                            for (p = n.ieOffsetX || 0, f = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + _), n.ieOffsetY = Math.round((v - ((0 > u ? -u : u) * v + (0 > c ? -c : c) * g)) / 2 + b), Te = 0; 4 > Te; Te++) S = se[Te], k = h[S], i = -1 !== k.indexOf("px") ? parseFloat(k) : ee(this.t, S, parseFloat(k), k.replace(T, "")) || 0, C = i !== n[S] ? 2 > Te ? -n.ieOffsetX : -n.ieOffsetY : 2 > Te ? p - n.ieOffsetX : f - n.ieOffsetY, d[S] = (n[S] = Math.round(i - C * (0 === Te || 2 === Te ? 1 : z))) + "px"
                        }
                    }
                },
                Xe = $.set3DTransformRatio = $.setTransformRatio = function(e) {
                    var t, i, n, r, s, o, a, l, c, u, d, h, f, m, g, v, y, w, _, b, T, x, k, S = this.data,
                        C = this.t.style,
                        z = S.rotation,
                        P = S.rotationX,
                        M = S.rotationY,
                        O = S.scaleX,
                        E = S.scaleY,
                        A = S.scaleZ,
                        L = S.x,
                        I = S.y,
                        D = S.z,
                        N = S.svg,
                        W = S.perspective,
                        F = S.force3D,
                        H = S.skewY,
                        B = S.skewX;
                    if (H && (B += H, z += H), ((1 === e || 0 === e) && "auto" === F && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !F) && !D && !W && !M && !P && 1 === A || Ce && N || !Ee) return void(z || B || N ? (z *= R, x = B * R, k = 1e5, i = Math.cos(z) * O, s = Math.sin(z) * O, n = Math.sin(z - x) * -E, o = Math.cos(z - x) * E, x && "simple" === S.skewType && (t = Math.tan(x - H * R), t = Math.sqrt(1 + t * t), n *= t, o *= t, H && (t = Math.tan(H * R), t = Math.sqrt(1 + t * t), i *= t, s *= t)), N && (L += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, I += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset, Ce && (S.xPercent || S.yPercent) && (g = this.t.getBBox(), L += .01 * S.xPercent * g.width, I += .01 * S.yPercent * g.height), g = 1e-6, g > L && L > -g && (L = 0), g > I && I > -g && (I = 0)), _ = (i * k | 0) / k + "," + (s * k | 0) / k + "," + (n * k | 0) / k + "," + (o * k | 0) / k + "," + L + "," + I + ")", N && Ce ? this.t.setAttribute("transform", "matrix(" + _) : C[Pe] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + _) : C[Pe] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + E + "," + L + "," + I + ")");
                    if (p && (g = 1e-4, g > O && O > -g && (O = A = 2e-5), g > E && E > -g && (E = A = 2e-5), !W || S.z || S.rotationX || S.rotationY || (W = 0)), z || B) z *= R, v = i = Math.cos(z), y = s = Math.sin(z), B && (z -= B * R, v = Math.cos(z), y = Math.sin(z), "simple" === S.skewType && (t = Math.tan((B - H) * R), t = Math.sqrt(1 + t * t), v *= t, y *= t, S.skewY && (t = Math.tan(H * R), t = Math.sqrt(1 + t * t), i *= t, s *= t))), n = -y, o = v;
                    else {
                        if (!(M || P || 1 !== A || W || N)) return void(C[Pe] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + L + "px," + I + "px," + D + "px)" + (1 !== O || 1 !== E ? " scale(" + O + "," + E + ")" : ""));
                        i = o = 1, n = s = 0
                    }
                    u = 1, r = a = l = c = d = h = 0, f = W ? -1 / W : 0, m = S.zOrigin, g = 1e-6, b = ",", T = "0", z = M * R, z && (v = Math.cos(z), y = Math.sin(z), l = -y, d = f * -y, r = i * y, a = s * y, u = v, f *= v, i *= v, s *= v), z = P * R, z && (v = Math.cos(z), y = Math.sin(z), t = n * v + r * y, w = o * v + a * y, c = u * y, h = f * y, r = n * -y + r * v, a = o * -y + a * v, u *= v, f *= v, n = t, o = w), 1 !== A && (r *= A, a *= A, u *= A, f *= A), 1 !== E && (n *= E, o *= E, c *= E, h *= E), 1 !== O && (i *= O, s *= O, l *= O, d *= O), (m || N) && (m && (L += r * -m, I += a * -m, D += u * -m + m), N && (L += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, I += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset), g > L && L > -g && (L = T), g > I && I > -g && (I = T), g > D && D > -g && (D = 0)), _ = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", _ += (g > i && i > -g ? T : i) + b + (g > s && s > -g ? T : s) + b + (g > l && l > -g ? T : l), _ += b + (g > d && d > -g ? T : d) + b + (g > n && n > -g ? T : n) + b + (g > o && o > -g ? T : o), P || M || 1 !== A ? (_ += b + (g > c && c > -g ? T : c) + b + (g > h && h > -g ? T : h) + b + (g > r && r > -g ? T : r), _ += b + (g > a && a > -g ? T : a) + b + (g > u && u > -g ? T : u) + b + (g > f && f > -g ? T : f) + b) : _ += ",0,0,0,0,1,0,", _ += L + b + I + b + D + b + (W ? 1 + -D / W : 1) + ")", C[Pe] = _
                };
            c = Ae.prototype, c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0, c.scaleX = c.scaleY = c.scaleZ = 1, ke("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(e, t, i, n, s, a, l) {
                    if (n._lastParsedTransform === l) return s;
                    n._lastParsedTransform = l;
                    var c, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                    "function" == typeof l[i] && (c = l[i], l[i] = t), u && (l.scale = u(v, e));
                    var d, h, p, f, m, y, w, _, b, T = e._gsTransform,
                        x = e.style,
                        k = 1e-6,
                        S = ze.length,
                        C = l,
                        z = {},
                        P = "transformOrigin",
                        M = qe(e, r, !0, C.parseTransform),
                        O = C.transform && ("function" == typeof C.transform ? C.transform(v, g) : C.transform);
                    if (M.skewType = C.skewType || M.skewType || o.defaultSkewType, n._transform = M, O && "string" == typeof O && Pe) h = j.style, h[Pe] = O, h.display = "block", h.position = "absolute", H.body.appendChild(j), d = qe(j, null, !1), "simple" === M.skewType && (d.scaleY *= Math.cos(d.skewX * R)), M.svg && (y = M.xOrigin, w = M.yOrigin, d.x -= M.xOffset, d.y -= M.yOffset, (C.transformOrigin || C.svgOrigin) && (O = {}, Ne(e, ae(C.transformOrigin), O, C.svgOrigin, C.smoothOrigin, !0), y = O.xOrigin, w = O.yOrigin, d.x -= O.xOffset - M.xOffset, d.y -= O.yOffset - M.yOffset), (y || w) && (_ = je(j, !0), d.x -= y - (y * _[0] + w * _[2]), d.y -= w - (y * _[1] + w * _[3]))), H.body.removeChild(j), d.perspective || (d.perspective = M.perspective), null != C.xPercent && (d.xPercent = ce(C.xPercent, M.xPercent)), null != C.yPercent && (d.yPercent = ce(C.yPercent, M.yPercent));
                    else if ("object" == typeof C) {
                        if (d = {
                                scaleX: ce(null != C.scaleX ? C.scaleX : C.scale, M.scaleX),
                                scaleY: ce(null != C.scaleY ? C.scaleY : C.scale, M.scaleY),
                                scaleZ: ce(C.scaleZ, M.scaleZ),
                                x: ce(C.x, M.x),
                                y: ce(C.y, M.y),
                                z: ce(C.z, M.z),
                                xPercent: ce(C.xPercent, M.xPercent),
                                yPercent: ce(C.yPercent, M.yPercent),
                                perspective: ce(C.transformPerspective, M.perspective)
                            }, m = C.directionalRotation, null != m)
                            if ("object" == typeof m)
                                for (h in m) C[h] = m[h];
                            else C.rotation = m;
                            "string" == typeof C.x && -1 !== C.x.indexOf("%") && (d.x = 0, d.xPercent = ce(C.x, M.xPercent)), "string" == typeof C.y && -1 !== C.y.indexOf("%") && (d.y = 0, d.yPercent = ce(C.y, M.yPercent)), d.rotation = ue("rotation" in C ? C.rotation : "shortRotation" in C ? C.shortRotation + "_short" : "rotationZ" in C ? C.rotationZ : M.rotation, M.rotation, "rotation", z),
                            Ee && (d.rotationX = ue("rotationX" in C ? C.rotationX : "shortRotationX" in C ? C.shortRotationX + "_short" : M.rotationX || 0, M.rotationX, "rotationX", z), d.rotationY = ue("rotationY" in C ? C.rotationY : "shortRotationY" in C ? C.shortRotationY + "_short" : M.rotationY || 0, M.rotationY, "rotationY", z)), d.skewX = ue(C.skewX, M.skewX), d.skewY = ue(C.skewY, M.skewY)
                    }
                    for (Ee && null != C.force3D && (M.force3D = C.force3D, f = !0), p = M.force3D || M.z || M.rotationX || M.rotationY || d.z || d.rotationX || d.rotationY || d.perspective, p || null == C.scale || (d.scaleZ = 1); --S > -1;) b = ze[S], O = d[b] - M[b], (O > k || -k > O || null != C[b] || null != W[b]) && (f = !0, s = new we(M, b, M[b], O, s), b in z && (s.e = z[b]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                    return O = C.transformOrigin, M.svg && (O || C.svgOrigin) && (y = M.xOffset, w = M.yOffset, Ne(e, ae(O), d, C.svgOrigin, C.smoothOrigin), s = _e(M, "xOrigin", (T ? M : d).xOrigin, d.xOrigin, s, P), s = _e(M, "yOrigin", (T ? M : d).yOrigin, d.yOrigin, s, P), (y !== M.xOffset || w !== M.yOffset) && (s = _e(M, "xOffset", T ? y : M.xOffset, M.xOffset, s, P), s = _e(M, "yOffset", T ? w : M.yOffset, M.yOffset, s, P)), O = "0px 0px"), (O || Ee && p && M.zOrigin) && (Pe ? (f = !0, b = Oe, O = (O || J(e, b, r, !1, "50% 50%")) + "", s = new we(x, b, 0, 0, s, (-1), P), s.b = x[b], s.plugin = a, Ee ? (h = M.zOrigin, O = O.split(" "), M.zOrigin = (O.length > 2 && (0 === h || "0px" !== O[2]) ? parseFloat(O[2]) : h) || 0, s.xs0 = s.e = O[0] + " " + (O[1] || "50%") + " 0px", s = new we(M, "zOrigin", 0, 0, s, (-1), s.n), s.b = h, s.xs0 = s.e = M.zOrigin) : s.xs0 = s.e = O) : ae(O + "", M)), f && (n._transformType = M.svg && Ce || !p && 3 !== this._transformType ? 2 : 3), c && (l[i] = c), u && (l.scale = u), s
                },
                prefix: !0
            }), ke("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), ke("borderRadius", {
                defaultValue: "0px",
                parser: function(e, t, i, s, o, a) {
                    t = this.format(t);
                    var l, c, u, d, h, p, f, m, g, v, y, w, _, b, T, x, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        S = e.style;
                    for (g = parseFloat(e.offsetWidth), v = parseFloat(e.offsetHeight), l = t.split(" "), c = 0; c < k.length; c++) this.p.indexOf("border") && (k[c] = K(k[c])), h = d = J(e, k[c], r, !1, "0px"), -1 !== h.indexOf(" ") && (d = h.split(" "), h = d[0], d = d[1]), p = u = l[c], f = parseFloat(h), w = h.substr((f + "").length), _ = "=" === p.charAt(1), _ ? (m = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), m *= parseFloat(p), y = p.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(p), y = p.substr((m + "").length)), "" === y && (y = n[i] || w), y !== w && (b = ee(e, "borderLeft", f, w), T = ee(e, "borderTop", f, w), "%" === y ? (h = b / g * 100 + "%", d = T / v * 100 + "%") : "em" === y ? (x = ee(e, "borderLeft", 1, "em"), h = b / x + "em", d = T / x + "em") : (h = b + "px", d = T + "px"), _ && (p = parseFloat(h) + m + y, u = parseFloat(d) + m + y)), o = be(S, k[c], h + " " + d, p + " " + u, !1, "0px", o);
                    return o
                },
                prefix: !0,
                formatter: ge("0px 0px 0px 0px", !1, !0)
            }), ke("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function(e, t, i, n, s, o) {
                    return be(e.style, i, this.format(J(e, i, r, !1, "0px 0px")), this.format(t), !1, "0px", s)
                },
                prefix: !0,
                formatter: ge("0px 0px", !1, !0)
            }), ke("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(e, t, i, n, s, o) {
                    var a, l, c, u, d, h, p = "background-position",
                        f = r || Q(e, null),
                        g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                        v = this.format(t);
                    if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && v.split(",").length < 2 && (h = J(e, "backgroundImage").replace(M, ""), h && "none" !== h)) {
                        for (a = g.split(" "), l = v.split(" "), q.setAttribute("src", h), c = 2; --c > -1;) g = a[c], u = -1 !== g.indexOf("%"), u !== (-1 !== l[c].indexOf("%")) && (d = 0 === c ? e.offsetWidth - q.width : e.offsetHeight - q.height, a[c] = u ? parseFloat(g) / 100 * d + "px" : parseFloat(g) / d * 100 + "%");
                        g = a.join(" ")
                    }
                    return this.parseComplex(e.style, g, v, s, o)
                },
                formatter: ae
            }), ke("backgroundSize", {
                defaultValue: "0 0",
                formatter: function(e) {
                    return e += "", ae(-1 === e.indexOf(" ") ? e + " " + e : e)
                }
            }), ke("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), ke("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), ke("transformStyle", {
                prefix: !0
            }), ke("backfaceVisibility", {
                prefix: !0
            }), ke("userSelect", {
                prefix: !0
            }), ke("margin", {
                parser: ve("marginTop,marginRight,marginBottom,marginLeft")
            }), ke("padding", {
                parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), ke("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(e, t, i, n, s, o) {
                    var a, l, c;
                    return 9 > m ? (l = e.currentStyle, c = 8 > m ? " " : ",", a = "rect(" + l.clipTop + c + l.clipRight + c + l.clipBottom + c + l.clipLeft + ")", t = this.format(t).split(",").join(c)) : (a = this.format(J(e, this.p, r, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, a, t, s, o)
                }
            }), ke("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), ke("autoRound,strictUnits", {
                parser: function(e, t, i, n, r) {
                    return r
                }
            }), ke("border", {
                defaultValue: "0px solid #000",
                parser: function(e, t, i, n, s, o) {
                    var a = J(e, "borderTopWidth", r, !1, "0px"),
                        l = this.format(t).split(" "),
                        c = l[0].replace(T, "");
                    return "px" !== c && (a = parseFloat(a) / ee(e, "borderTopWidth", 1, c) + c), this.parseComplex(e.style, this.format(a + " " + J(e, "borderTopStyle", r, !1, "solid") + " " + J(e, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                },
                color: !0,
                formatter: function(e) {
                    var t = e.split(" ");
                    return t[0] + " " + (t[1] || "solid") + " " + (e.match(me) || ["#000"])[0]
                }
            }), ke("borderWidth", {
                parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), ke("float,cssFloat,styleFloat", {
                parser: function(e, t, i, n, r, s) {
                    var o = e.style,
                        a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                    return new we(o, a, 0, 0, r, (-1), i, (!1), 0, o[a], t)
                }
            });
            var Ye = function(e) {
                var t, i = this.t,
                    n = i.filter || J(this.data, "filter") || "",
                    r = this.s + this.c * e | 0;
                100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), t = !J(this.data, "filter")) : (i.filter = n.replace(S, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r))
            };
            ke("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(e, t, i, n, s, o) {
                    var a = parseFloat(J(e, "opacity", r, !1, "1")),
                        l = e.style,
                        c = "autoAlpha" === i;
                    return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + a), c && 1 === a && "hidden" === J(e, "visibility", r) && 0 !== t && (a = 0), Y ? s = new we(l, "opacity", a, t - a, s) : (s = new we(l, "opacity", 100 * a, 100 * (t - a), s), s.xn1 = c ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Ye), c && (s = new we(l, "visibility", 0, 0, s, (-1), null, (!1), 0, 0 !== a ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                }
            });
            var Ve = function(e, t) {
                    t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(z, "-$1").toLowerCase())) : e.removeAttribute(t))
                },
                Ge = function(e) {
                    if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                        this.t.setAttribute("class", 0 === e ? this.b : this.e);
                        for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Ve(i, t.p), t = t._next;
                        1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            ke("className", {
                parser: function(e, t, n, s, o, a, l) {
                    var c, u, d, h, p, f = e.getAttribute("class") || "",
                        m = e.style.cssText;
                    if (o = s._classNamePT = new we(e, n, 0, 0, o, 2), o.setRatio = Ge, o.pr = -11, i = !0, o.b = f, u = ie(e, r), d = e._gsClassPT) {
                        for (h = {}, p = d.data; p;) h[p.p] = 1, p = p._next;
                        d.setRatio(1)
                    }
                    return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : f.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", o.e), c = ne(e, u, ie(e), l, h), e.setAttribute("class", f), o.data = c.firstMPT, e.style.cssText = m, o = o.xfirst = s.parse(e, c.difs, o, a)
                }
            });
            var Ue = function(e) {
                if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var t, i, n, r, s, o = this.t.style,
                        a = l.transform.parse;
                    if ("all" === this.e) o.cssText = "", r = !0;
                    else
                        for (t = this.e.split(" ").join("").split(","), n = t.length; --n > -1;) i = t[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Oe : l[i].p), Ve(o, i);
                    r && (Ve(o, Pe), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (ke("clearProps", {
                    parser: function(e, t, n, r, s) {
                        return s = new we(e, n, 0, 0, s, 2), s.setRatio = Ue, s.e = t, s.pr = -10, s.data = r._tween, i = !0, s
                    }
                }), c = "bezier,throwProps,physicsProps,physics2D".split(","), Te = c.length; Te--;) Se(c[Te]);
            c = o.prototype, c._firstPT = c._lastParsedTransform = c._transform = null, c._onInitTween = function(e, t, a, c) {
                if (!e.nodeType) return !1;
                this._target = g = e, this._tween = a, this._vars = t, v = c, u = t.autoRound, i = !1, n = t.suffixMap || o.suffixMap, r = Q(e, ""), s = this._overwriteProps;
                var p, m, y, w, _, b, T, x, S, C = e.style;
                if (d && "" === C.zIndex && (p = J(e, "zIndex", r), ("auto" === p || "" === p) && this._addLazySet(C, "zIndex", 0)), "string" == typeof t && (w = C.cssText, p = ie(e, r), C.cssText = w + ";" + t, p = ne(e, p, ie(e)).difs, !Y && k.test(t) && (p.opacity = parseFloat(RegExp.$1)), t = p, C.cssText = w), t.className ? this._firstPT = m = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = m = this.parse(e, t, null), this._transformType) {
                    for (S = 3 === this._transformType, Pe ? h && (d = !0, "" === C.zIndex && (T = J(e, "zIndex", r), ("auto" === T || "" === T) && this._addLazySet(C, "zIndex", 0)), f && this._addLazySet(C, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (S ? "visible" : "hidden"))) : C.zoom = 1, y = m; y && y._next;) y = y._next;
                    x = new we(e, "transform", 0, 0, null, 2), this._linkCSSP(x, null, y), x.setRatio = Pe ? Xe : $e, x.data = this._transform || qe(e, r, !0), x.tween = a, x.pr = -1, s.pop()
                }
                if (i) {
                    for (; m;) {
                        for (b = m._next, y = w; y && y.pr > m.pr;) y = y._next;
                        (m._prev = y ? y._prev : _) ? m._prev._next = m: w = m, (m._next = y) ? y._prev = m : _ = m, m = b
                    }
                    this._firstPT = w
                }
                return !0
            }, c.parse = function(e, t, i, s) {
                var o, a, c, d, h, p, f, m, y, w, _ = e.style;
                for (o in t) {
                    if (p = t[o], "function" == typeof p && (p = p(v, g)), a = l[o]) i = a.parse(e, p, o, this, i, s, t);
                    else {
                        if ("--" === o.substr(0, 2)) {
                            this._tween._propLookup[o] = this._addTween.call(this._tween, e.style, "setProperty", Q(e).getPropertyValue(o) + "", p + "", o, !1, o);
                            continue
                        }
                        h = J(e, o, r) + "", y = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || y && C.test(p) ? (y || (p = pe(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = be(_, o, h, p, !0, "transparent", i, 0, s)) : y && D.test(p) ? i = be(_, o, h, p, !0, null, i, 0, s) : (c = parseFloat(h), f = c || 0 === c ? h.substr((c + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (c = oe(e, o, r), f = "px") : "left" === o || "top" === o ? (c = te(e, o, r), f = "px") : (c = "opacity" !== o ? 0 : 1, f = "")), w = y && "=" === p.charAt(1), w ? (d = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), d *= parseFloat(p), m = p.replace(T, "")) : (d = parseFloat(p), m = y ? p.replace(T, "") : ""), "" === m && (m = o in n ? n[o] : f), p = d || 0 === d ? (w ? d + c : d) + m : t[o], f !== m && ("" !== m || "lineHeight" === o) && (d || 0 === d) && c && (c = ee(e, o, c, f), "%" === m ? (c /= ee(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = c + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? c /= ee(e, o, 1, m) : "px" !== m && (d = ee(e, o, d, m), m = "px"), w && (d || 0 === d) && (p = d + c + m)), w && (d += c), !c && 0 !== c || !d && 0 !== d ? void 0 !== _[o] && (p || p + "" != "NaN" && null != p) ? (i = new we(_, o, d || c || 0, 0, i, (-1), o, (!1), 0, h, p), i.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : G("invalid " + o + " tween value: " + t[o]) : (i = new we(_, o, c, d - c, i, 0, o, u !== !1 && ("px" === m || "zIndex" === o), 0, h, p), i.xs0 = m))
                    }
                    s && i && !i.plugin && (i.plugin = s)
                }
                return i
            }, c.setRatio = function(e) {
                var t, i, n, r = this._firstPT,
                    s = 1e-6;
                if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; r;) {
                            if (t = r.c * e + r.s, r.r ? t = Math.round(t) : s > t && t > -s && (t = 0), r.type)
                                if (1 === r.type)
                                    if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
                                    else if (3 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                            else if (4 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                            else if (5 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                            else {
                                for (i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                r.t[r.p] = i
                            } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
                            else r.t[r.p] = t + r.xs0;
                            r = r._next
                        } else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e), r = r._next;
                    else
                        for (; r;) {
                            if (2 !== r.type)
                                if (r.r && -1 !== r.type)
                                    if (t = Math.round(r.s + r.c), r.type) {
                                        if (1 === r.type) {
                                            for (n = r.l, i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                            r.t[r.p] = i
                                        }
                                    } else r.t[r.p] = t + r.xs0;
                            else r.t[r.p] = r.e;
                            else r.setRatio(e);
                            r = r._next
                        }
            }, c._enableTransforms = function(e) {
                this._transform = this._transform || qe(this._target, r, !0), this._transformType = this._transform.svg && Ce || !e && 3 !== this._transformType ? 2 : 3
            };
            var Ze = function(e) {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            c._addLazySet = function(e, t, i) {
                var n = this._firstPT = new we(e, t, 0, 0, this._firstPT, 2);
                n.e = i, n.setRatio = Ze, n.data = this
            }, c._linkCSSP = function(e, t, i, n) {
                return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
            }, c._mod = function(e) {
                for (var t = this._firstPT; t;) "function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1), t = t._next
            }, c._kill = function(t) {
                var i, n, r, s = t;
                if (t.autoAlpha || t.alpha) {
                    s = {};
                    for (n in t) s[n] = t[n];
                    s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                }
                for (t.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(t), n = i.plugin), i = i._next;
                return e.prototype._kill.call(this, s)
            };
            var Ke = function(e, t, i) {
                var n, r, s, o;
                if (e.slice)
                    for (r = e.length; --r > -1;) Ke(e[r], t, i);
                else
                    for (n = e.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (t.push(ie(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Ke(s, t, i)
            };
            return o.cascadeTo = function(e, i, n) {
                var r, s, o, a, l = t.to(e, i, n),
                    c = [l],
                    u = [],
                    d = [],
                    h = [],
                    p = t._internals.reservedProps;
                for (e = l._targets || l.target, Ke(e, u, h), l.render(i, !0, !0), Ke(e, d), l.render(0, !0, !0), l._enabled(!0), r = h.length; --r > -1;)
                    if (s = ne(h[r], u[r], d[r]), s.firstMPT) {
                        s = s.difs;
                        for (o in n) p[o] && (s[o] = n[o]);
                        a = {};
                        for (o in s) a[o] = u[r][o];
                        c.push(t.fromTo(h[r], i, a, s))
                    }
                return c
            }, e.activate([o]), o
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
    }("CSSPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, i) {
            var n = function(t) {
                    e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                },
                r = 1e-10,
                s = t._internals,
                o = s.lazyTweens,
                a = s.lazyRender,
                l = _gsScope._gsDefine.globals,
                c = new i(null, null, 1, 0),
                u = n.prototype = new e;
            return u.constructor = n, u.kill()._gc = !1, n.version = "1.20.2", u.invalidate = function() {
                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
            }, u.addCallback = function(e, i, n, r) {
                return this.add(t.delayedCall(0, e, n, r), i)
            }, u.removeCallback = function(e, t) {
                if (e)
                    if (null == t) this._kill(null, e);
                    else
                        for (var i = this.getTweensOf(e, !1), n = i.length, r = this._parseTimeOrLabel(t); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                return this
            }, u.removePause = function(t) {
                return this.removeCallback(e._internals.pauseCallback, t)
            }, u.tweenTo = function(e, i) {
                i = i || {};
                var n, r, s, o = {
                        ease: c,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    },
                    a = i.repeat && l.TweenMax || t;
                for (r in i) o[r] = i[r];
                return o.time = this._parseTimeOrLabel(e), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new a(this, n, o), o.onStart = function() {
                    s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                }, s
            }, u.tweenFromTo = function(e, t, i) {
                i = i || {}, e = this._parseTimeOrLabel(e), i.startAt = {
                    onComplete: this.seek,
                    onCompleteParams: [e],
                    callbackScope: this
                }, i.immediateRender = i.immediateRender !== !1;
                var n = this.tweenTo(t, i);
                return n.duration(Math.abs(n.vars.time - e) / this._timeScale || .001)
            }, u.render = function(e, t, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, l, c, u, d, h, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
                    m = this._duration,
                    g = this._time,
                    v = this._totalTime,
                    y = this._startTime,
                    w = this._timeScale,
                    _ = this._rawPrevTime,
                    b = this._paused,
                    T = this._cycle;
                if (e >= f - 1e-7 && e >= 0) this._locked || (this._totalTime = f, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, c = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || 0 > _ || _ === r) && _ !== e && this._first && (u = !0, _ > r && (c = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = m, e = m + 1e-4);
                else if (1e-7 > e)
                    if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== g || 0 === m && _ !== r && (_ > 0 || 0 > e && _ >= 0) && !this._locked) && (c = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = s = !0, c = "onReverseComplete") : _ >= 0 && this._first && (u = !0), this._rawPrevTime = e;
                    else {
                        if (this._rawPrevTime = m || !t || e || this._rawPrevTime === e ? e : r, 0 === e && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        e = 0, this._initted || (u = !0)
                    } else if (0 === m && 0 > _ && (u = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (d = m + this._repeatDelay, this._cycle = this._totalTime / d >> 0, 0 !== this._cycle && this._cycle === this._totalTime / d && e >= v && this._cycle--, this._time = this._totalTime - this._cycle * d, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, e = m + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t) {
                    if (e = this._time, e >= g || this._repeat && T !== this._cycle)
                        for (n = this._first; n && n._startTime <= e && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next;
                    else
                        for (n = this._last; n && n._startTime >= e && !h;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (h = n), n = n._prev;
                    h && h._startTime < m && (this._time = e = h._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                if (this._cycle !== T && !this._locked) {
                    var x = this._yoyo && 0 !== (1 & T),
                        k = x === (this._yoyo && 0 !== (1 & this._cycle)),
                        S = this._totalTime,
                        C = this._cycle,
                        z = this._rawPrevTime,
                        P = this._time;
                    if (this._totalTime = T * m, this._cycle < T ? x = !x : this._totalTime += m, this._time = g, this._rawPrevTime = 0 === m ? _ - 1e-4 : _, this._cycle = T, this._locked = !0, g = x ? 0 : m, this.render(g, t, 0 === m), t || this._gc || this.vars.onRepeat && (this._cycle = C, this._locked = !1, this._callback("onRepeat")), g !== this._time) return;
                    if (k && (this._cycle = T, this._locked = !0, g = x ? m + 1e-4 : -1e-4, this.render(g, !0, !1)), this._locked = !1, this._paused && !b) return;
                    this._time = P, this._totalTime = S, this._cycle = C, this._rawPrevTime = z
                }
                if (!(this._time !== g && this._first || i || u || h)) return void(v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== v && e > 0 && (this._active = !0), 0 === v && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")), p = this._time, p >= g)
                    for (n = this._first; n && (l = n._next, p === this._time && (!this._paused || b));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (h === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = l;
                else
                    for (n = this._last; n && (l = n._prev, p === this._time && (!this._paused || b));) {
                        if (n._active || n._startTime <= g && !n._paused && !n._gc) {
                            if (h === n) {
                                for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, i), h = h._prev;
                                h = null, this.pause()
                            }
                            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
                        }
                        n = l
                    }
                this._onUpdate && (t || (o.length && a(), this._callback("onUpdate"))), c && (this._locked || this._gc || (y === this._startTime || w !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[c] && this._callback(c)))
            }, u.getActive = function(e, t, i) {
                null == e && (e = !0), null == t && (t = !0), null == i && (i = !1);
                var n, r, s = [],
                    o = this.getChildren(e, t, i),
                    a = 0,
                    l = o.length;
                for (n = 0; l > n; n++) r = o[n], r.isActive() && (s[a++] = r);
                return s
            }, u.getLabelAfter = function(e) {
                e || 0 !== e && (e = this._time);
                var t, i = this.getLabelsArray(),
                    n = i.length;
                for (t = 0; n > t; t++)
                    if (i[t].time > e) return i[t].name;
                return null
            }, u.getLabelBefore = function(e) {
                null == e && (e = this._time);
                for (var t = this.getLabelsArray(), i = t.length; --i > -1;)
                    if (t[i].time < e) return t[i].name;
                return null
            }, u.getLabelsArray = function() {
                var e, t = [],
                    i = 0;
                for (e in this._labels) t[i++] = {
                    time: this._labels[e],
                    name: e
                };
                return t.sort(function(e, t) {
                    return e.time - t.time
                }), t
            }, u.invalidate = function() {
                return this._locked = !1, e.prototype.invalidate.call(this)
            }, u.progress = function(e, t) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration() || 0
            }, u.totalProgress = function(e, t) {
                return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration() || 0
            }, u.totalDuration = function(t) {
                return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
            }, u.time = function(e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
            }, u.repeat = function(e) {
                return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
            }, u.repeatDelay = function(e) {
                return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
            }, u.yoyo = function(e) {
                return arguments.length ? (this._yoyo = e, this) : this._yoyo
            }, u.currentLabel = function(e) {
                return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
            }, n
        }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
            var n = function(e) {
                    t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var i, n, r = this.vars;
                    for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                    l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                },
                r = 1e-10,
                s = i._internals,
                o = n._internals = {},
                a = s.isSelector,
                l = s.isArray,
                c = s.lazyTweens,
                u = s.lazyRender,
                d = _gsScope._gsDefine.globals,
                h = function(e) {
                    var t, i = {};
                    for (t in e) i[t] = e[t];
                    return i
                },
                p = function(e, t, i) {
                    var n, r, s = e.cycle;
                    for (n in s) r = s[n], e[n] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
                    delete e.cycle
                },
                f = o.pauseCallback = function() {},
                m = function(e) {
                    var t, i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i
                },
                g = n.prototype = new t;
            return n.version = "1.20.2", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function(e, t, n, r) {
                var s = n.repeat && d.TweenMax || i;
                return t ? this.add(new s(e, t, n), r) : this.set(e, n, r)
            }, g.from = function(e, t, n, r) {
                return this.add((n.repeat && d.TweenMax || i).from(e, t, n), r)
            }, g.fromTo = function(e, t, n, r, s) {
                var o = r.repeat && d.TweenMax || i;
                return t ? this.add(o.fromTo(e, t, n, r), s) : this.set(e, r, s)
            }, g.staggerTo = function(e, t, r, s, o, l, c, u) {
                var d, f, g = new n({
                        onComplete: l,
                        onCompleteParams: c,
                        callbackScope: u,
                        smoothChildTiming: this.smoothChildTiming
                    }),
                    v = r.cycle;
                for ("string" == typeof e && (e = i.selector(e) || e), e = e || [], a(e) && (e = m(e)), s = s || 0, 0 > s && (e = m(e), e.reverse(), s *= -1), f = 0; f < e.length; f++) d = h(r), d.startAt && (d.startAt = h(d.startAt), d.startAt.cycle && p(d.startAt, e, f)), v && (p(d, e, f), null != d.duration && (t = d.duration, delete d.duration)), g.to(e[f], t, d, f * s);
                return this.add(g, o)
            }, g.staggerFrom = function(e, t, i, n, r, s, o, a) {
                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(e, t, i, n, r, s, o, a)
            }, g.staggerFromTo = function(e, t, i, n, r, s, o, a, l) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(e, t, n, r, s, o, a, l)
            }, g.call = function(e, t, n, r) {
                return this.add(i.delayedCall(0, e, t, n), r)
            }, g.set = function(e, t, n) {
                return n = this._parseTimeOrLabel(n, 0, !0), null == t.immediateRender && (t.immediateRender = n === this._time && !this._paused), this.add(new i(e, 0, t), n)
            }, n.exportRoot = function(e, t) {
                e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
                var r, s, o = new n(e),
                    a = o._timeline;
                for (null == t && (t = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, t && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
                return a.add(o, 0), o
            }, g.add = function(r, s, o, a) {
                var c, u, d, h, p, f;
                if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof e)) {
                    if (r instanceof Array || r && r.push && l(r)) {
                        for (o = o || "normal", a = a || 0, c = s, u = r.length, d = 0; u > d; d++) l(h = r[d]) && (h = new n({
                            tweens: h
                        })), this.add(h, c), "string" != typeof h && "function" != typeof h && ("sequence" === o ? c = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())), c += a;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof r) return this.addLabel(r, s);
                    if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                    r = i.delayedCall(0, r)
                }
                if (t.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (p = this, f = p.rawTime() > r._startTime; p._timeline;) f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                return this
            }, g.remove = function(t) {
                if (t instanceof e) {
                    this._remove(t, !1);
                    var i = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                    return t._startTime = (t._paused ? t._pauseTime : i._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale, this
                }
                if (t instanceof Array || t && t.push && l(t)) {
                    for (var n = t.length; --n > -1;) this.remove(t[n]);
                    return this
                }
                return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
            }, g._remove = function(e, i) {
                t.prototype._remove.call(this, e, i);
                var n = this._last;
                return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, g.append = function(e, t) {
                return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
            }, g.insert = g.insertMultiple = function(e, t, i, n) {
                return this.add(e, t || 0, i, n)
            }, g.appendMultiple = function(e, t, i, n) {
                return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, n)
            }, g.addLabel = function(e, t) {
                return this._labels[e] = this._parseTimeOrLabel(t), this
            }, g.addPause = function(e, t, n, r) {
                var s = i.delayedCall(0, f, n, r || this);
                return s.vars.onComplete = s.vars.onReverseComplete = t, s.data = "isPause", this._hasPause = !0, this.add(s, e)
            }, g.removeLabel = function(e) {
                return delete this._labels[e], this
            }, g.getLabelTime = function(e) {
                return null != this._labels[e] ? this._labels[e] : -1
            }, g._parseTimeOrLabel = function(t, i, n, r) {
                var s, o;
                if (r instanceof e && r.timeline === this) this.remove(r);
                else if (r && (r instanceof Array || r.push && l(r)))
                    for (o = r.length; --o > -1;) r[o] instanceof e && r[o].timeline === this && this.remove(r[o]);
                if (s = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof t && null == this._labels[i] ? t - s : 0, n);
                if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = s);
                else {
                    if (o = t.indexOf("="), -1 === o) return null == this._labels[t] ? n ? this._labels[t] = s + i : i : this._labels[t] + i;
                    i = parseInt(t.charAt(o - 1) + "1", 10) * Number(t.substr(o + 1)), t = o > 1 ? this._parseTimeOrLabel(t.substr(0, o - 1), 0, n) : s
                }
                return Number(t) + i
            }, g.seek = function(e, t) {
                return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
            }, g.stop = function() {
                return this.paused(!0)
            }, g.gotoAndPlay = function(e, t) {
                return this.play(e, t)
            }, g.gotoAndStop = function(e, t) {
                return this.pause(e, t)
            }, g.render = function(e, t, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, o, a, l, d, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                    f = this._time,
                    m = this._startTime,
                    g = this._timeScale,
                    v = this._paused;
                if (e >= p - 1e-7 && e >= 0) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, e = p + 1e-4;
                else if (1e-7 > e)
                    if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = e;
                    else {
                        if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, 0 === e && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        e = 0, this._initted || (l = !0)
                    } else {
                    if (this._hasPause && !this._forcingPlayhead && !t) {
                        if (e >= f)
                            for (n = this._first; n && n._startTime <= e && !d;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= e && !d;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n), n = n._prev;
                        d && (this._time = e = d._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    this._totalTime = this._time = this._rawPrevTime = e
                }
                if (this._time !== f && this._first || i || l || d) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && e > 0 && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")), h = this._time, h >= f)
                        for (n = this._first; n && (o = n._next, h === this._time && (!this._paused || v));)(n._active || n._startTime <= h && !n._paused && !n._gc) && (d === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = o;
                    else
                        for (n = this._last; n && (o = n._prev, h === this._time && (!this._paused || v));) {
                            if (n._active || n._startTime <= f && !n._paused && !n._gc) {
                                if (d === n) {
                                    for (d = n._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (e - d._startTime) * d._timeScale : (e - d._startTime) * d._timeScale, t, i), d = d._prev;
                                    d = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
                            }
                            n = o
                        }
                    this._onUpdate && (t || (c.length && u(), this._callback("onUpdate"))), a && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (c.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this._callback(a)))
                }
            }, g._hasPausedChild = function() {
                for (var e = this._first; e;) {
                    if (e._paused || e instanceof n && e._hasPausedChild()) return !0;
                    e = e._next
                }
                return !1
            }, g.getChildren = function(e, t, n, r) {
                r = r || -9999999999;
                for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? t !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, n)), a = s.length))), o = o._next;
                return s
            }, g.getTweensOf = function(e, t) {
                var n, r, s = this._gc,
                    o = [],
                    a = 0;
                for (s && this._enabled(!0, !0), n = i.getTweensOf(e), r = n.length; --r > -1;)(n[r].timeline === this || t && this._contains(n[r])) && (o[a++] = n[r]);
                return s && this._enabled(!1, !0), o
            }, g.recent = function() {
                return this._recent
            }, g._contains = function(e) {
                for (var t = e.timeline; t;) {
                    if (t === this) return !0;
                    t = t.timeline
                }
                return !1
            }, g.shiftChildren = function(e, t, i) {
                i = i || 0;
                for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += e), r = r._next;
                if (t)
                    for (n in s) s[n] >= i && (s[n] += e);
                return this._uncache(!0)
            }, g._kill = function(e, t) {
                if (!e && !t) return this._enabled(!1, !1);
                for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(e, t) && (r = !0);
                return r
            }, g.clear = function(e) {
                var t = this.getChildren(!1, !0, !0),
                    i = t.length;
                for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
                return e !== !1 && (this._labels = {}), this._uncache(!0)
            }, g.invalidate = function() {
                for (var t = this._first; t;) t.invalidate(), t = t._next;
                return e.prototype.invalidate.call(this)
            }, g._enabled = function(e, i) {
                if (e === this._gc)
                    for (var n = this._first; n;) n._enabled(e, !0), n = n._next;
                return t.prototype._enabled.call(this, e, i)
            }, g.totalTime = function(t, i, n) {
                this._forcingPlayhead = !0;
                var r = e.prototype.totalTime.apply(this, arguments);
                return this._forcingPlayhead = !1, r
            }, g.duration = function(e) {
                return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
            }, g.totalDuration = function(e) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var t, i, n = 0, r = this._last, s = 999999999999; r;) t = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = t;
                        this._duration = this._totalDuration = n, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
            }, g.paused = function(t) {
                if (!t)
                    for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                return e.prototype.paused.apply(this, arguments)
            }, g.usesFrames = function() {
                for (var t = this._timeline; t._timeline;) t = t._timeline;
                return t === e._rootFramesTimeline
            }, g.rawTime = function(e) {
                return e && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(e) - this._startTime) * this._timeScale
            }, n
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "undefined" != typeof module && module.exports ? (require("./TweenLite.min.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
    }("TimelineMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
                var n = function(e) {
                        var t, i = [],
                            n = e.length;
                        for (t = 0; t !== n; i.push(e[t++]));
                        return i
                    },
                    r = function(e, t, i) {
                        var n, r, s = e.cycle;
                        for (n in s) r = s[n], e[n] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
                        delete e.cycle
                    },
                    s = function(e, t, n) {
                        i.call(this, e, t, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
                    },
                    o = 1e-10,
                    a = i._internals,
                    l = a.isSelector,
                    c = a.isArray,
                    u = s.prototype = i.to({}, .1, {}),
                    d = [];
                s.version = "1.20.2", u.constructor = s, u.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, u.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), i.prototype.invalidate.call(this)
                }, u.updateTo = function(e, t) {
                    var n, r = this.ratio,
                        s = this.vars.immediateRender || e.immediateRender;
                    t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in e) this.vars[n] = e[n];
                    if (this._initted || s)
                        if (t) this._initted = !1, s && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var o = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || s)
                        for (var a, l = 1 / (1 - r), c = this._firstPT; c;) a = c.s + c.c, c.c *= l, c.s = a - c.c, c = c._next;
                    return this
                }, u.render = function(e, t, n) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var r, s, l, c, u, d, h, p, f, m = this._dirty ? this.totalDuration() : this._totalDuration,
                        g = this._time,
                        v = this._totalTime,
                        y = this._cycle,
                        w = this._duration,
                        _ = this._rawPrevTime;
                    if (e >= m - 1e-7 && e >= 0 ? (this._totalTime = m, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = w, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, s = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === w && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 > _ || 0 >= e && e >= -1e-7 || _ === o && "isPause" !== this.data) && _ !== e && (n = !0, _ > o && (s = "onReverseComplete")), this._rawPrevTime = p = !t || e || _ === e ? e : o)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== v || 0 === w && _ > 0) && (s = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === w && (this._initted || !this.vars.lazy || n) && (_ >= 0 && (n = !0), this._rawPrevTime = p = !t || e || _ === e ? e : o)), this._initted || (n = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (c = w + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && e >= v && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = w - this._time, f = this._yoyoEase || this.vars.yoyoEase, f && (this._yoyoEase || (f !== !0 || this._initted ? this._yoyoEase = f = f === !0 ? this._ease : f instanceof Ease ? f : Ease.map[f] : (f = this.vars.ease, this._yoyoEase = f = f ? f instanceof Ease ? f : "function" == typeof f ? new Ease(f, this.vars.easeParams) : Ease.map[f] || i.defaultEase : i.defaultEase)), this.ratio = f ? 1 - f.getRatio((w - this._time) / w) : 0)), this._time > w ? this._time = w : this._time < 0 && (this._time = 0)), this._easeType && !f ? (u = this._time / w, d = this._easeType, h = this._easePower, (1 === d || 3 === d && u >= .5) && (u = 1 - u), 3 === d && (u *= 2), 1 === h ? u *= u : 2 === h ? u *= u * u : 3 === h ? u *= u * u * u : 4 === h && (u *= u * u * u * u), 1 === d ? this.ratio = 1 - u : 2 === d ? this.ratio = u : this._time / w < .5 ? this.ratio = u / 2 : this.ratio = 1 - u / 2) : f || (this.ratio = this._ease.getRatio(this._time / w))), g === this._time && !n && y === this._cycle) return void(v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = g, this._totalTime = v, this._rawPrevTime = _, this._cycle = y, a.lazyTweens.push(this), void(this._lazy = [e, t]);
                        !this._time || r || f ? r && this._ease._calcEnd && !f && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / w)
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== g && e >= 0 && (this._active = !0), 0 === v && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === w) && (t || this._callback("onStart"))), l = this._firstPT; l;) l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s, l = l._next;
                    this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._totalTime !== v || s) && this._callback("onUpdate")), this._cycle !== y && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")), s && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[s] && this._callback(s), 0 === w && this._rawPrevTime === o && p !== o && (this._rawPrevTime = 0))
                }, s.to = function(e, t, i) {
                    return new s(e, t, i)
                }, s.from = function(e, t, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(e, t, i)
                }, s.fromTo = function(e, t, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new s(e, t, n)
                }, s.staggerTo = s.allTo = function(e, t, o, a, u, h, p) {
                    a = a || 0;
                    var f, m, g, v, y = 0,
                        w = [],
                        _ = function() {
                            o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), u.apply(p || o.callbackScope || this, h || d)
                        },
                        b = o.cycle,
                        T = o.startAt && o.startAt.cycle;
                    for (c(e) || ("string" == typeof e && (e = i.selector(e) || e), l(e) && (e = n(e))), e = e || [], 0 > a && (e = n(e), e.reverse(), a *= -1), f = e.length - 1, g = 0; f >= g; g++) {
                        m = {};
                        for (v in o) m[v] = o[v];
                        if (b && (r(m, e, g), null != m.duration && (t = m.duration, delete m.duration)), T) {
                            T = m.startAt = {};
                            for (v in o.startAt) T[v] = o.startAt[v];
                            r(m.startAt, e, g)
                        }
                        m.delay = y + (m.delay || 0), g === f && u && (m.onComplete = _), w[g] = new s(e[g], t, m), y += a
                    }
                    return w
                }, s.staggerFrom = s.allFrom = function(e, t, i, n, r, o, a) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(e, t, i, n, r, o, a)
                }, s.staggerFromTo = s.allFromTo = function(e, t, i, n, r, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, s.staggerTo(e, t, n, r, o, a, l)
                }, s.delayedCall = function(e, t, i, n, r) {
                    return new s(t, 0, {
                        delay: e,
                        onComplete: t,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: t,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, s.set = function(e, t) {
                    return new s(e, 0, t)
                }, s.isTweening = function(e) {
                    return i.getTweensOf(e, !0).length > 0
                };
                var h = function(e, t) {
                        for (var n = [], r = 0, s = e._first; s;) s instanceof i ? n[r++] = s : (t && (n[r++] = s), n = n.concat(h(s, t)), r = n.length), s = s._next;
                        return n
                    },
                    p = s.getAllTweens = function(t) {
                        return h(e._rootTimeline, t).concat(h(e._rootFramesTimeline, t))
                    };
                s.killAll = function(e, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var s, o, a, l = p(0 != r),
                        c = l.length,
                        u = i && n && r;
                    for (a = 0; c > a; a++) o = l[a], (u || o instanceof t || (s = o.target === o.vars.onComplete) && n || i && !s) && (e ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                }, s.killChildTweensOf = function(e, t) {
                    if (null != e) {
                        var r, o, u, d, h, p = a.tweenLookup;
                        if ("string" == typeof e && (e = i.selector(e) || e), l(e) && (e = n(e)), c(e))
                            for (d = e.length; --d > -1;) s.killChildTweensOf(e[d], t);
                        else {
                            r = [];
                            for (u in p)
                                for (o = p[u].target.parentNode; o;) o === e && (r = r.concat(p[u].tweens)), o = o.parentNode;
                            for (h = r.length, d = 0; h > d; d++) t && r[d].totalTime(r[d].totalDuration()), r[d]._enabled(!1, !1)
                        }
                    }
                };
                var f = function(e, i, n, r) {
                    i = i !== !1, n = n !== !1, r = r !== !1;
                    for (var s, o, a = p(r), l = i && n && r, c = a.length; --c > -1;) o = a[c], (l || o instanceof t || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(e)
                };
                return s.pauseAll = function(e, t, i) {
                    f(!0, e, t, i)
                }, s.resumeAll = function(e, t, i) {
                    f(!1, e, t, i)
                }, s.globalTimeScale = function(t) {
                    var n = e._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (t = t || o, n._startTime = r - (r - n._startTime) * n._timeScale / t, n = e._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / t, n._timeScale = e._rootTimeline._timeScale = t, t) : n._timeScale
                }, u.progress = function(e, t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
                }, u.totalProgress = function(e, t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
                }, u.time = function(e, t) {
                    return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                }, u.duration = function(t) {
                    return arguments.length ? e.prototype.duration.call(this, t) : this._duration
                }, u.totalDuration = function(e) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, u.repeat = function(e) {
                    return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(e) {
                    return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(e) {
                    return arguments.length ? (this._yoyo = e, this) : this._yoyo
                }, s
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
                var n = function(e) {
                        t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                        l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    s = i._internals,
                    o = n._internals = {},
                    a = s.isSelector,
                    l = s.isArray,
                    c = s.lazyTweens,
                    u = s.lazyRender,
                    d = _gsScope._gsDefine.globals,
                    h = function(e) {
                        var t, i = {};
                        for (t in e) i[t] = e[t];
                        return i
                    },
                    p = function(e, t, i) {
                        var n, r, s = e.cycle;
                        for (n in s) r = s[n], e[n] = "function" == typeof r ? r(i, t[i]) : r[i % r.length];
                        delete e.cycle
                    },
                    f = o.pauseCallback = function() {},
                    m = function(e) {
                        var t, i = [],
                            n = e.length;
                        for (t = 0; t !== n; i.push(e[t++]));
                        return i
                    },
                    g = n.prototype = new t;
                return n.version = "1.20.2", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function(e, t, n, r) {
                    var s = n.repeat && d.TweenMax || i;
                    return t ? this.add(new s(e, t, n), r) : this.set(e, n, r)
                }, g.from = function(e, t, n, r) {
                    return this.add((n.repeat && d.TweenMax || i).from(e, t, n), r)
                }, g.fromTo = function(e, t, n, r, s) {
                    var o = r.repeat && d.TweenMax || i;
                    return t ? this.add(o.fromTo(e, t, n, r), s) : this.set(e, r, s)
                }, g.staggerTo = function(e, t, r, s, o, l, c, u) {
                    var d, f, g = new n({
                            onComplete: l,
                            onCompleteParams: c,
                            callbackScope: u,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        v = r.cycle;
                    for ("string" == typeof e && (e = i.selector(e) || e), e = e || [], a(e) && (e = m(e)), s = s || 0, 0 > s && (e = m(e), e.reverse(), s *= -1), f = 0; f < e.length; f++) d = h(r), d.startAt && (d.startAt = h(d.startAt), d.startAt.cycle && p(d.startAt, e, f)), v && (p(d, e, f), null != d.duration && (t = d.duration, delete d.duration)), g.to(e[f], t, d, f * s);
                    return this.add(g, o)
                }, g.staggerFrom = function(e, t, i, n, r, s, o, a) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(e, t, i, n, r, s, o, a)
                }, g.staggerFromTo = function(e, t, i, n, r, s, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(e, t, n, r, s, o, a, l)
                }, g.call = function(e, t, n, r) {
                    return this.add(i.delayedCall(0, e, t, n), r)
                }, g.set = function(e, t, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == t.immediateRender && (t.immediateRender = n === this._time && !this._paused), this.add(new i(e, 0, t), n)
                }, n.exportRoot = function(e, t) {
                    e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
                    var r, s, o = new n(e),
                        a = o._timeline;
                    for (null == t && (t = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, t && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
                    return a.add(o, 0), o
                }, g.add = function(r, s, o, a) {
                    var c, u, d, h, p, f;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof e)) {
                        if (r instanceof Array || r && r.push && l(r)) {
                            for (o = o || "normal", a = a || 0, c = s, u = r.length, d = 0; u > d; d++) l(h = r[d]) && (h = new n({
                                tweens: h
                            })), this.add(h, c), "string" != typeof h && "function" != typeof h && ("sequence" === o ? c = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())), c += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, s);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (t.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (p = this, f = p.rawTime() > r._startTime; p._timeline;) f && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                    return this
                }, g.remove = function(t) {
                    if (t instanceof e) {
                        this._remove(t, !1);
                        var i = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                        return t._startTime = (t._paused ? t._pauseTime : i._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale, this
                    }
                    if (t instanceof Array || t && t.push && l(t)) {
                        for (var n = t.length; --n > -1;) this.remove(t[n]);
                        return this
                    }
                    return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
                }, g._remove = function(e, i) {
                    t.prototype._remove.call(this, e, i);
                    var n = this._last;
                    return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, g.append = function(e, t) {
                    return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
                }, g.insert = g.insertMultiple = function(e, t, i, n) {
                    return this.add(e, t || 0, i, n)
                }, g.appendMultiple = function(e, t, i, n) {
                    return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, n)
                }, g.addLabel = function(e, t) {
                    return this._labels[e] = this._parseTimeOrLabel(t), this
                }, g.addPause = function(e, t, n, r) {
                    var s = i.delayedCall(0, f, n, r || this);
                    return s.vars.onComplete = s.vars.onReverseComplete = t, s.data = "isPause", this._hasPause = !0, this.add(s, e)
                }, g.removeLabel = function(e) {
                    return delete this._labels[e], this
                }, g.getLabelTime = function(e) {
                    return null != this._labels[e] ? this._labels[e] : -1
                }, g._parseTimeOrLabel = function(t, i, n, r) {
                    var s, o;
                    if (r instanceof e && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && l(r)))
                        for (o = r.length; --o > -1;) r[o] instanceof e && r[o].timeline === this && this.remove(r[o]);
                    if (s = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof t && null == this._labels[i] ? t - s : 0, n);
                    if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = s);
                    else {
                        if (o = t.indexOf("="), -1 === o) return null == this._labels[t] ? n ? this._labels[t] = s + i : i : this._labels[t] + i;
                        i = parseInt(t.charAt(o - 1) + "1", 10) * Number(t.substr(o + 1)), t = o > 1 ? this._parseTimeOrLabel(t.substr(0, o - 1), 0, n) : s
                    }
                    return Number(t) + i
                }, g.seek = function(e, t) {
                    return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
                }, g.stop = function() {
                    return this.paused(!0)
                }, g.gotoAndPlay = function(e, t) {
                    return this.play(e, t)
                }, g.gotoAndStop = function(e, t) {
                    return this.pause(e, t)
                }, g.render = function(e, t, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, o, a, l, d, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        f = this._time,
                        m = this._startTime,
                        g = this._timeScale,
                        v = this._paused;
                    if (e >= p - 1e-7 && e >= 0) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== e && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, e = p + 1e-4;
                    else if (1e-7 > e)
                        if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = e;
                        else {
                            if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, 0 === e && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            e = 0, this._initted || (l = !0)
                        } else {
                        if (this._hasPause && !this._forcingPlayhead && !t) {
                            if (e >= f)
                                for (n = this._first; n && n._startTime <= e && !d;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n), n = n._next;
                            else
                                for (n = this._last; n && n._startTime >= e && !d;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n), n = n._prev;
                            d && (this._time = e = d._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = e
                    }
                    if (this._time !== f && this._first || i || l || d) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && e > 0 && (this._active = !0), 0 === f && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")), h = this._time, h >= f)
                            for (n = this._first; n && (o = n._next, h === this._time && (!this._paused || v));)(n._active || n._startTime <= h && !n._paused && !n._gc) && (d === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = o;
                        else
                            for (n = this._last; n && (o = n._prev, h === this._time && (!this._paused || v));) {
                                if (n._active || n._startTime <= f && !n._paused && !n._gc) {
                                    if (d === n) {
                                        for (d = n._prev; d && d.endTime() > this._time;) d.render(d._reversed ? d.totalDuration() - (e - d._startTime) * d._timeScale : (e - d._startTime) * d._timeScale, t, i), d = d._prev;
                                        d = null, this.pause()
                                    }
                                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
                                }
                                n = o
                            }
                        this._onUpdate && (t || (c.length && u(), this._callback("onUpdate"))), a && (this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (c.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this._callback(a)))
                    }
                }, g._hasPausedChild = function() {
                    for (var e = this._first; e;) {
                        if (e._paused || e instanceof n && e._hasPausedChild()) return !0;
                        e = e._next
                    }
                    return !1
                }, g.getChildren = function(e, t, n, r) {
                    r = r || -9999999999;
                    for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? t !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, n)), a = s.length))), o = o._next;
                    return s
                }, g.getTweensOf = function(e, t) {
                    var n, r, s = this._gc,
                        o = [],
                        a = 0;
                    for (s && this._enabled(!0, !0), n = i.getTweensOf(e), r = n.length; --r > -1;)(n[r].timeline === this || t && this._contains(n[r])) && (o[a++] = n[r]);
                    return s && this._enabled(!1, !0), o
                }, g.recent = function() {
                    return this._recent
                }, g._contains = function(e) {
                    for (var t = e.timeline; t;) {
                        if (t === this) return !0;
                        t = t.timeline
                    }
                    return !1
                }, g.shiftChildren = function(e, t, i) {
                    i = i || 0;
                    for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += e), r = r._next;
                    if (t)
                        for (n in s) s[n] >= i && (s[n] += e);
                    return this._uncache(!0)
                }, g._kill = function(e, t) {
                    if (!e && !t) return this._enabled(!1, !1);
                    for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(e, t) && (r = !0);
                    return r
                }, g.clear = function(e) {
                    var t = this.getChildren(!1, !0, !0),
                        i = t.length;
                    for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
                    return e !== !1 && (this._labels = {}), this._uncache(!0)
                }, g.invalidate = function() {
                    for (var t = this._first; t;) t.invalidate(), t = t._next;
                    return e.prototype.invalidate.call(this)
                }, g._enabled = function(e, i) {
                    if (e === this._gc)
                        for (var n = this._first; n;) n._enabled(e, !0), n = n._next;
                    return t.prototype._enabled.call(this, e, i)
                }, g.totalTime = function(t, i, n) {
                    this._forcingPlayhead = !0;
                    var r = e.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, r
                }, g.duration = function(e) {
                    return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
                }, g.totalDuration = function(e) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var t, i, n = 0, r = this._last, s = 999999999999; r;) t = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = t;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
                }, g.paused = function(t) {
                    if (!t)
                        for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return e.prototype.paused.apply(this, arguments)
                }, g.usesFrames = function() {
                    for (var t = this._timeline; t._timeline;) t = t._timeline;
                    return t === e._rootFramesTimeline
                }, g.rawTime = function(e) {
                    return e && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(e) - this._startTime) * this._timeScale
                }, n
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, i) {
                var n = function(t) {
                        e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                    },
                    r = 1e-10,
                    s = t._internals,
                    o = s.lazyTweens,
                    a = s.lazyRender,
                    l = _gsScope._gsDefine.globals,
                    c = new i(null, null, 1, 0),
                    u = n.prototype = new e;
                return u.constructor = n, u.kill()._gc = !1, n.version = "1.20.2", u.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
                }, u.addCallback = function(e, i, n, r) {
                    return this.add(t.delayedCall(0, e, n, r), i)
                }, u.removeCallback = function(e, t) {
                    if (e)
                        if (null == t) this._kill(null, e);
                        else
                            for (var i = this.getTweensOf(e, !1), n = i.length, r = this._parseTimeOrLabel(t); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, u.removePause = function(t) {
                    return this.removeCallback(e._internals.pauseCallback, t)
                }, u.tweenTo = function(e, i) {
                    i = i || {};
                    var n, r, s, o = {
                            ease: c,
                            useFrames: this.usesFrames(),
                            immediateRender: !1
                        },
                        a = i.repeat && l.TweenMax || t;
                    for (r in i) o[r] = i[r];
                    return o.time = this._parseTimeOrLabel(e), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new a(this, n, o), o.onStart = function() {
                        s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                    }, s
                }, u.tweenFromTo = function(e, t, i) {
                    i = i || {}, e = this._parseTimeOrLabel(e), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [e],
                        callbackScope: this
                    }, i.immediateRender = i.immediateRender !== !1;
                    var n = this.tweenTo(t, i);
                    return n.duration(Math.abs(n.vars.time - e) / this._timeScale || .001)
                }, u.render = function(e, t, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, l, c, u, d, h, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._duration,
                        g = this._time,
                        v = this._totalTime,
                        y = this._startTime,
                        w = this._timeScale,
                        _ = this._rawPrevTime,
                        b = this._paused,
                        T = this._cycle;
                    if (e >= f - 1e-7 && e >= 0) this._locked || (this._totalTime = f, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, c = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || 0 > _ || _ === r) && _ !== e && this._first && (u = !0, _ > r && (c = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : r, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = m, e = m + 1e-4);
                    else if (1e-7 > e)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== g || 0 === m && _ !== r && (_ > 0 || 0 > e && _ >= 0) && !this._locked) && (c = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = s = !0, c = "onReverseComplete") : _ >= 0 && this._first && (u = !0), this._rawPrevTime = e;
                        else {
                            if (this._rawPrevTime = m || !t || e || this._rawPrevTime === e ? e : r, 0 === e && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            e = 0, this._initted || (u = !0)
                        } else if (0 === m && 0 > _ && (u = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (d = m + this._repeatDelay, this._cycle = this._totalTime / d >> 0, 0 !== this._cycle && this._cycle === this._totalTime / d && e >= v && this._cycle--, this._time = this._totalTime - this._cycle * d, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, e = m + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t) {
                        if (e = this._time, e >= g || this._repeat && T !== this._cycle)
                            for (n = this._first; n && n._startTime <= e && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= e && !h;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (h = n), n = n._prev;
                        h && h._startTime < m && (this._time = e = h._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== T && !this._locked) {
                        var x = this._yoyo && 0 !== (1 & T),
                            k = x === (this._yoyo && 0 !== (1 & this._cycle)),
                            S = this._totalTime,
                            C = this._cycle,
                            z = this._rawPrevTime,
                            P = this._time;
                        if (this._totalTime = T * m, this._cycle < T ? x = !x : this._totalTime += m, this._time = g, this._rawPrevTime = 0 === m ? _ - 1e-4 : _, this._cycle = T, this._locked = !0, g = x ? 0 : m, this.render(g, t, 0 === m), t || this._gc || this.vars.onRepeat && (this._cycle = C, this._locked = !1, this._callback("onRepeat")), g !== this._time) return;
                        if (k && (this._cycle = T, this._locked = !0, g = x ? m + 1e-4 : -1e-4, this.render(g, !0, !1)), this._locked = !1, this._paused && !b) return;
                        this._time = P, this._totalTime = S, this._cycle = C, this._rawPrevTime = z
                    }
                    if (!(this._time !== g && this._first || i || u || h)) return void(v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== v && e > 0 && (this._active = !0), 0 === v && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")), p = this._time, p >= g)
                        for (n = this._first; n && (l = n._next, p === this._time && (!this._paused || b));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (h === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = l;
                    else
                        for (n = this._last; n && (l = n._prev, p === this._time && (!this._paused || b));) {
                            if (n._active || n._startTime <= g && !n._paused && !n._gc) {
                                if (h === n) {
                                    for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, i), h = h._prev;
                                    h = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
                            }
                            n = l
                        }
                    this._onUpdate && (t || (o.length && a(), this._callback("onUpdate"))), c && (this._locked || this._gc || (y === this._startTime || w !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[c] && this._callback(c)))
                }, u.getActive = function(e, t, i) {
                    null == e && (e = !0), null == t && (t = !0), null == i && (i = !1);
                    var n, r, s = [],
                        o = this.getChildren(e, t, i),
                        a = 0,
                        l = o.length;
                    for (n = 0; l > n; n++) r = o[n], r.isActive() && (s[a++] = r);
                    return s
                }, u.getLabelAfter = function(e) {
                    e || 0 !== e && (e = this._time);
                    var t, i = this.getLabelsArray(),
                        n = i.length;
                    for (t = 0; n > t; t++)
                        if (i[t].time > e) return i[t].name;
                    return null
                }, u.getLabelBefore = function(e) {
                    null == e && (e = this._time);
                    for (var t = this.getLabelsArray(), i = t.length; --i > -1;)
                        if (t[i].time < e) return t[i].name;
                    return null
                }, u.getLabelsArray = function() {
                    var e, t = [],
                        i = 0;
                    for (e in this._labels) t[i++] = {
                        time: this._labels[e],
                        name: e
                    };
                    return t.sort(function(e, t) {
                        return e.time - t.time
                    }), t
                }, u.invalidate = function() {
                    return this._locked = !1, e.prototype.invalidate.call(this)
                }, u.progress = function(e, t) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration() || 0
                }, u.totalProgress = function(e, t) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration() || 0
                }, u.totalDuration = function(t) {
                    return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, u.time = function(e, t) {
                    return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                }, u.repeat = function(e) {
                    return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function(e) {
                    return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function(e) {
                    return arguments.length ? (this._yoyo = e, this) : this._yoyo
                }, u.currentLabel = function(e) {
                    return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0),
            function() {
                var e = 180 / Math.PI,
                    t = [],
                    i = [],
                    n = [],
                    r = {},
                    s = _gsScope._gsDefine.globals,
                    o = function(e, t, i, n) {
                        i === n && (i = n - (n - t) / 1e6), e === t && (t = e + (i - e) / 1e6), this.a = e, this.b = t, this.c = i, this.d = n,
                            this.da = n - e, this.ca = i - e, this.ba = t - e
                    },
                    a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    l = function(e, t, i, n) {
                        var r = {
                                a: e
                            },
                            s = {},
                            o = {},
                            a = {
                                c: n
                            },
                            l = (e + t) / 2,
                            c = (t + i) / 2,
                            u = (i + n) / 2,
                            d = (l + c) / 2,
                            h = (c + u) / 2,
                            p = (h - d) / 8;
                        return r.b = l + (e - l) / 4, s.b = d + p, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (d + h) / 2, o.b = h - p, a.b = u + (n - u) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
                    },
                    c = function(e, r, s, o, a) {
                        var c, u, d, h, p, f, m, g, v, y, w, _, b, T = e.length - 1,
                            x = 0,
                            k = e[0].a;
                        for (c = 0; T > c; c++) p = e[x], u = p.a, d = p.d, h = e[x + 1].d, a ? (w = t[c], _ = i[c], b = (_ + w) * r * .25 / (o ? .5 : n[c] || .5), f = d - (d - u) * (o ? .5 * r : 0 !== w ? b / w : 0), m = d + (h - d) * (o ? .5 * r : 0 !== _ ? b / _ : 0), g = d - (f + ((m - f) * (3 * w / (w + _) + .5) / 4 || 0))) : (f = d - (d - u) * r * .5, m = d + (h - d) * r * .5, g = d - (f + m) / 2), f += g, m += g, p.c = v = f, 0 !== c ? p.b = k : p.b = k = p.a + .6 * (p.c - p.a), p.da = d - u, p.ca = v - u, p.ba = k - u, s ? (y = l(u, k, v, d), e.splice(x, 1, y[0], y[1], y[2], y[3]), x += 4) : x++, k = m;
                        p = e[x], p.b = k, p.c = k + .4 * (p.d - k), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = k - p.a, s && (y = l(p.a, k, p.c, p.d), e.splice(x, 1, y[0], y[1], y[2], y[3]))
                    },
                    u = function(e, n, r, s) {
                        var a, l, c, u, d, h, p = [];
                        if (s)
                            for (e = [s].concat(e), l = e.length; --l > -1;) "string" == typeof(h = e[l][n]) && "=" === h.charAt(1) && (e[l][n] = s[n] + Number(h.charAt(0) + h.substr(2)));
                        if (a = e.length - 2, 0 > a) return p[0] = new o(e[0][n], 0, 0, e[0][n]), p;
                        for (l = 0; a > l; l++) c = e[l][n], u = e[l + 1][n], p[l] = new o(c, 0, 0, u), r && (d = e[l + 2][n], t[l] = (t[l] || 0) + (u - c) * (u - c), i[l] = (i[l] || 0) + (d - u) * (d - u));
                        return p[l] = new o(e[l][n], 0, 0, e[l + 1][n]), p
                    },
                    d = function(e, s, o, l, d, h) {
                        var p, f, m, g, v, y, w, _, b = {},
                            T = [],
                            x = h || e[0];
                        d = "string" == typeof d ? "," + d + "," : a, null == s && (s = 1);
                        for (f in e[0]) T.push(f);
                        if (e.length > 1) {
                            for (_ = e[e.length - 1], w = !0, p = T.length; --p > -1;)
                                if (f = T[p], Math.abs(x[f] - _[f]) > .05) {
                                    w = !1;
                                    break
                                }
                            w && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
                        }
                        for (t.length = i.length = n.length = 0, p = T.length; --p > -1;) f = T[p], r[f] = -1 !== d.indexOf("," + f + ","), b[f] = u(e, f, r[f], h);
                        for (p = t.length; --p > -1;) t[p] = Math.sqrt(t[p]), i[p] = Math.sqrt(i[p]);
                        if (!l) {
                            for (p = T.length; --p > -1;)
                                if (r[f])
                                    for (m = b[T[p]], y = m.length - 1, g = 0; y > g; g++) v = m[g + 1].da / i[g] + m[g].da / t[g] || 0, n[g] = (n[g] || 0) + v * v;
                            for (p = n.length; --p > -1;) n[p] = Math.sqrt(n[p])
                        }
                        for (p = T.length, g = o ? 4 : 1; --p > -1;) f = T[p], m = b[f], c(m, s, o, l, r[f]), w && (m.splice(0, g), m.splice(m.length - g, g));
                        return b
                    },
                    h = function(e, t, i) {
                        t = t || "soft";
                        var n, r, s, a, l, c, u, d, h, p, f, m = {},
                            g = "cubic" === t ? 3 : 2,
                            v = "soft" === t,
                            y = [];
                        if (v && i && (e = [i].concat(e)), null == e || e.length < g + 1) throw "invalid Bezier data";
                        for (h in e[0]) y.push(h);
                        for (c = y.length; --c > -1;) {
                            for (h = y[c], m[h] = l = [], p = 0, d = e.length, u = 0; d > u; u++) n = null == i ? e[u][h] : "string" == typeof(f = e[u][h]) && "=" === f.charAt(1) ? i[h] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && u > 1 && d - 1 > u && (l[p++] = (n + l[p - 2]) / 2), l[p++] = n;
                            for (d = p - g + 1, p = 0, u = 0; d > u; u += g) n = l[u], r = l[u + 1], s = l[u + 2], a = 2 === g ? 0 : l[u + 3], l[p++] = f = 3 === g ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                            l.length = p
                        }
                        return m
                    },
                    p = function(e, t, i) {
                        for (var n, r, s, o, a, l, c, u, d, h, p, f = 1 / i, m = e.length; --m > -1;)
                            for (h = e[m], s = h.a, o = h.d - s, a = h.c - s, l = h.b - s, n = r = 0, u = 1; i >= u; u++) c = f * u, d = 1 - c, n = r - (r = (c * c * o + 3 * d * (c * a + d * l)) * c), p = m * i + u - 1, t[p] = (t[p] || 0) + n * n
                    },
                    f = function(e, t) {
                        t = t >> 0 || 6;
                        var i, n, r, s, o = [],
                            a = [],
                            l = 0,
                            c = 0,
                            u = t - 1,
                            d = [],
                            h = [];
                        for (i in e) p(e[i], o, t);
                        for (r = o.length, n = 0; r > n; n++) l += Math.sqrt(o[n]), s = n % t, h[s] = l, s === u && (c += l, s = n / t >> 0, d[s] = h, a[s] = c, l = 0, h = []);
                        return {
                            length: c,
                            lengths: a,
                            segments: d
                        }
                    },
                    m = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.8",
                        API: 2,
                        global: !0,
                        init: function(e, t, i) {
                            this._target = e, t instanceof Array && (t = {
                                values: t
                            }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                            var n, r, s, o, a, l = t.values || [],
                                c = {},
                                u = l[0],
                                p = t.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = p ? p instanceof Array ? p : [
                                ["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
                            ] : null;
                            for (n in u) this._props.push(n);
                            for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof e[n], c[n] = r ? e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(e[n]), a || c[n] !== l[0][n] && (a = c);
                            if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? d(l, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, a) : h(l, t.type, c), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = f(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (p = this._autoRotate)
                                for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) {
                                    for (o = 0; 3 > o; o++) n = p[s][o], this._func[n] = "function" == typeof e[n] && e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                                    n = p[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, this._overwriteProps.push(n)
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(t) {
                            var i, n, r, s, o, a, l, c, u, d, h = this._segCount,
                                p = this._func,
                                f = this._target,
                                m = t !== this._startRatio;
                            if (this._timeRes) {
                                if (u = this._lengths, d = this._curSeg, t *= this._length, r = this._li, t > this._l2 && h - 1 > r) {
                                    for (c = h - 1; c > r && (this._l2 = u[++r]) <= t;);
                                    this._l1 = u[r - 1], this._li = r, this._curSeg = d = this._segments[r], this._s2 = d[this._s1 = this._si = 0]
                                } else if (t < this._l1 && r > 0) {
                                    for (; r > 0 && (this._l1 = u[--r]) >= t;);
                                    0 === r && t < this._l1 ? this._l1 = 0 : r++, this._l2 = u[r], this._li = r, this._curSeg = d = this._segments[r], this._s1 = d[(this._si = d.length - 1) - 1] || 0, this._s2 = d[this._si]
                                }
                                if (i = r, t -= this._l1, r = this._si, t > this._s2 && r < d.length - 1) {
                                    for (c = d.length - 1; c > r && (this._s2 = d[++r]) <= t;);
                                    this._s1 = d[r - 1], this._si = r
                                } else if (t < this._s1 && r > 0) {
                                    for (; r > 0 && (this._s1 = d[--r]) >= t;);
                                    0 === r && t < this._s1 ? this._s1 = 0 : r++, this._s2 = d[r], this._si = r
                                }
                                a = (r + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                            } else i = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0, a = (t - i * (1 / h)) * h;
                            for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], o = this._beziers[s][i], l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._mod[s] && (l = this._mod[s](l, f)), p[s] ? f[s](l) : f[s] = l;
                            if (this._autoRotate) {
                                var g, v, y, w, _, b, T, x = this._autoRotate;
                                for (r = x.length; --r > -1;) s = x[r][2], b = x[r][3] || 0, T = x[r][4] === !0 ? 1 : e, o = this._beziers[x[r][0]], g = this._beziers[x[r][1]], o && g && (o = o[i], g = g[i], v = o.a + (o.b - o.a) * a, w = o.b + (o.c - o.b) * a, v += (w - v) * a, w += (o.c + (o.d - o.c) * a - w) * a, y = g.a + (g.b - g.a) * a, _ = g.b + (g.c - g.b) * a, y += (_ - y) * a, _ += (g.c + (g.d - g.c) * a - _) * a, l = m ? Math.atan2(_ - y, w - v) * T + b : this._initialRotations[r], this._mod[s] && (l = this._mod[s](l, f)), p[s] ? f[s](l) : f[s] = l)
                            }
                        }
                    }),
                    g = m.prototype;
                m.bezierThrough = d, m.cubicToQuadratic = l, m._autoCSS = !0, m.quadraticToCubic = function(e, t, i) {
                    return new o(e, (2 * t + e) / 3, (2 * t + i) / 3, i)
                }, m._cssRegister = function() {
                    var e = s.CSSPlugin;
                    if (e) {
                        var t = e._internals,
                            i = t._parseToProxy,
                            n = t._setPluginRatio,
                            r = t.CSSPropTween;
                        t._registerComplexSpecialProp("bezier", {
                            parser: function(e, t, s, o, a, l) {
                                t instanceof Array && (t = {
                                    values: t
                                }), l = new m;
                                var c, u, d, h = t.values,
                                    p = h.length - 1,
                                    f = [],
                                    g = {};
                                if (0 > p) return a;
                                for (c = 0; p >= c; c++) d = i(e, h[c], o, a, l, p !== c), f[c] = d.end;
                                for (u in t) g[u] = t[u];
                                return g.values = f, a = new r(e, "bezier", 0, 0, d.pt, 2), a.data = d, a.plugin = l, a.setRatio = n, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (c = g.autoRotate === !0 ? 0 : Number(g.autoRotate), g.autoRotate = null != d.end.left ? [
                                    ["left", "top", "rotation", c, !1]
                                ] : null != d.end.x && [
                                    ["x", "y", "rotation", c, !1]
                                ]), g.autoRotate && (o._transform || o._enableTransforms(!1), d.autoRotate = o._target._gsTransform, d.proxy.rotation = d.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), l._onInitTween(d.proxy, g, o._tween), a
                            }
                        })
                    }
                }, g._mod = function(e) {
                    for (var t, i = this._overwriteProps, n = i.length; --n > -1;) t = e[i[n]], t && "function" == typeof t && (this._mod[i[n]] = t)
                }, g._kill = function(e) {
                    var t, i, n = this._props;
                    for (t in this._beziers)
                        if (t in e)
                            for (delete this._beziers[t], delete this._func[t], i = n.length; --i > -1;) n[i] === t && n.splice(i, 1);
                    if (n = this._autoRotate)
                        for (i = n.length; --i > -1;) e[n[i][2]] && n.splice(i, 1);
                    return this._super._kill.call(this, e)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
                var i, n, r, s, o = function() {
                        e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                    },
                    a = _gsScope._gsDefine.globals,
                    l = {},
                    c = o.prototype = new e("css");
                c.constructor = o, o.version = "1.20.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, c = "px", o.suffixMap = {
                    top: c,
                    right: c,
                    bottom: c,
                    left: c,
                    width: c,
                    height: c,
                    fontSize: c,
                    padding: c,
                    margin: c,
                    perspective: c,
                    lineHeight: ""
                };
                var u, d, h, p, f, m, g, v, y = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                    w = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    T = /(?:\d|\-|\+|=|#|\.)*/g,
                    x = /opacity *= *([^)]*)/i,
                    k = /opacity:([^;]*)/i,
                    S = /alpha\(opacity *=.+?\)/i,
                    C = /^(rgb|hsl)/,
                    z = /([A-Z])/g,
                    P = /-([a-z])/gi,
                    M = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    O = function(e, t) {
                        return t.toUpperCase()
                    },
                    E = /(?:Left|Right|Width)/i,
                    A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    L = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    I = /,(?=[^\)]*(?:\(|$))/gi,
                    D = /[\s,\(]/i,
                    R = Math.PI / 180,
                    N = 180 / Math.PI,
                    W = {},
                    F = {
                        style: {}
                    },
                    H = _gsScope.document || {
                        createElement: function() {
                            return F
                        }
                    },
                    B = function(e, t) {
                        return H.createElementNS ? H.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : H.createElement(e)
                    },
                    j = B("div"),
                    q = B("img"),
                    $ = o._internals = {
                        _specialProps: l
                    },
                    X = (_gsScope.navigator || {}).userAgent || "",
                    Y = function() {
                        var e = X.indexOf("Android"),
                            t = B("a");
                        return h = -1 !== X.indexOf("Safari") && -1 === X.indexOf("Chrome") && (-1 === e || parseFloat(X.substr(e + 8, 2)) > 3), f = h && parseFloat(X.substr(X.indexOf("Version/") + 8, 2)) < 6, p = -1 !== X.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(X) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(X)) && (m = parseFloat(RegExp.$1)), !!t && (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity))
                    }(),
                    V = function(e) {
                        return x.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    G = function(e) {
                        _gsScope.console && console.log(e)
                    },
                    U = "",
                    Z = "",
                    K = function(e, t) {
                        t = t || j;
                        var i, n, r = t.style;
                        if (void 0 !== r[e]) return e;
                        for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + e];);
                        return n >= 0 ? (Z = 3 === n ? "ms" : i[n], U = "-" + Z.toLowerCase() + "-", Z + e) : null
                    },
                    Q = H.defaultView ? H.defaultView.getComputedStyle : function() {},
                    J = o.getStyle = function(e, t, i, n, r) {
                        var s;
                        return Y || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || Q(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(z, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : V(e)
                    },
                    ee = $.convertToPixels = function(e, i, n, r, s) {
                        if ("px" === r || !r && "lineHeight" !== i) return n;
                        if ("auto" === r || !n) return 0;
                        var a, l, c, u = E.test(i),
                            d = e,
                            h = j.style,
                            p = 0 > n,
                            f = 1 === n;
                        if (p && (n = -n), f && (n *= 100), "lineHeight" !== i || r)
                            if ("%" === r && -1 !== i.indexOf("border")) a = n / 100 * (u ? e.clientWidth : e.clientHeight);
                            else {
                                if (h.cssText = "border:0 solid red;position:" + J(e, "position") + ";line-height:0;", "%" !== r && d.appendChild && "v" !== r.charAt(0) && "rem" !== r) h[u ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                                else {
                                    if (d = e.parentNode || H.body, -1 !== J(d, "display").indexOf("flex") && (h.position = "absolute"), l = d._gsCache, c = t.ticker.frame, l && u && l.time === c) return l.width * n / 100;
                                    h[u ? "width" : "height"] = n + r
                                }
                                d.appendChild(j), a = parseFloat(j[u ? "offsetWidth" : "offsetHeight"]), d.removeChild(j), u && "%" === r && o.cacheWidths !== !1 && (l = d._gsCache = d._gsCache || {}, l.time = c, l.width = a / n * 100), 0 !== a || s || (a = ee(e, i, n, r, !0))
                            } else l = Q(e).lineHeight, e.style.lineHeight = n, a = parseFloat(Q(e).lineHeight), e.style.lineHeight = l;
                        return f && (a /= 100), p ? -a : a
                    },
                    te = $.calculateOffset = function(e, t, i) {
                        if ("absolute" !== J(e, "position", i)) return 0;
                        var n = "left" === t ? "Left" : "Top",
                            r = J(e, "margin" + n, i);
                        return e["offset" + n] - (ee(e, t, parseFloat(r), r.replace(T, "")) || 0)
                    },
                    ie = function(e, t) {
                        var i, n, r, s = {};
                        if (t = t || Q(e, null))
                            if (i = t.length)
                                for (; --i > -1;) r = t[i], (-1 === r.indexOf("-transform") || Me === r) && (s[r.replace(P, O)] = t.getPropertyValue(r));
                            else
                                for (i in t)(-1 === i.indexOf("Transform") || Pe === i) && (s[i] = t[i]);
                        else if (t = e.currentStyle || e.style)
                            for (i in t) "string" == typeof i && void 0 === s[i] && (s[i.replace(P, O)] = t[i]);
                        return Y || (s.opacity = V(e)), n = qe(e, t, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Ee && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                    },
                    ne = function(e, t, i, n, r) {
                        var s, o, a, l = {},
                            c = e.style;
                        for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : te(e, o), void 0 !== c[o] && (a = new ye(c, o, c[o], a)));
                        if (n)
                            for (o in n) "className" !== o && (l[o] = n[o]);
                        return {
                            difs: l,
                            firstMPT: a
                        }
                    },
                    re = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    se = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    oe = function(e, t, i) {
                        if ("svg" === (e.nodeName + "").toLowerCase()) return (i || Q(e))[t] || 0;
                        if (e.getCTM && He(e)) return e.getBBox()[t] || 0;
                        var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                            r = re[t],
                            s = r.length;
                        for (i = i || Q(e, null); --s > -1;) n -= parseFloat(J(e, "padding" + r[s], i, !0)) || 0, n -= parseFloat(J(e, "border" + r[s] + "Width", i, !0)) || 0;
                        return n
                    },
                    ae = function(e, t) {
                        if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
                        (null == e || "" === e) && (e = "0 0");
                        var i, n = e.split(" "),
                            r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                            s = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                        if (n.length > 3 && !t) {
                            for (n = e.split(", ").join(",").split(","), e = [], i = 0; i < n.length; i++) e.push(ae(n[i]));
                            return e.join(",")
                        }
                        return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e = r + " " + s + (n.length > 2 ? " " + n[2] : ""), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== s.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(r.replace(b, "")), t.oy = parseFloat(s.replace(b, "")), t.v = e), t || e
                    },
                    le = function(e, t) {
                        return "function" == typeof e && (e = e(v, g)), "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
                    },
                    ce = function(e, t) {
                        return "function" == typeof e && (e = e(v, g)), null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e) || 0
                    },
                    ue = function(e, t, i, n) {
                        var r, s, o, a, l, c = 1e-6;
                        return "function" == typeof e && (e = e(v, g)), null == e ? a = t : "number" == typeof e ? a = e : (r = 360, s = e.split("_"), l = "=" === e.charAt(1), o = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : N) - (l ? 0 : t), s.length && (n && (n[i] = t + o), -1 !== e.indexOf("short") && (o %= r, o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = t + o), c > a && a > -c && (a = 0), a
                    },
                    de = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    he = function(e, t, i) {
                        return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 255 * (1 > 6 * e ? t + (i - t) * e * 6 : .5 > e ? i : 2 > 3 * e ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
                    },
                    pe = o.parseColor = function(e, t) {
                        var i, n, r, s, o, a, l, c, u, d, h;
                        if (e)
                            if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
                            else {
                                if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), de[e]) i = de[e];
                                else if ("#" === e.charAt(0)) 4 === e.length && (n = e.charAt(1), r = e.charAt(2), s = e.charAt(3), e = "#" + n + n + r + r + s + s), e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & 255, 255 & e];
                                else if ("hsl" === e.substr(0, 3))
                                    if (i = h = e.match(y), t) {
                                        if (-1 !== e.indexOf("=")) return e.match(w)
                                    } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = .5 >= l ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(e[3])), i[0] = he(o + 1 / 3, n, r), i[1] = he(o, n, r), i[2] = he(o - 1 / 3, n, r);
                                else i = e.match(y) || de.transparent;
                                i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                            } else i = de.black;
                        return t && !h && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, c = Math.max(n, r, s), u = Math.min(n, r, s), l = (c + u) / 2, c === u ? o = a = 0 : (d = c - u, a = l > .5 ? d / (2 - c - u) : d / (c + u), o = c === n ? (r - s) / d + (s > r ? 6 : 0) : c === r ? (s - n) / d + 2 : (n - r) / d + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                    },
                    fe = function(e, t) {
                        var i, n, r, s = e.match(me) || [],
                            o = 0,
                            a = "";
                        if (!s.length) return e;
                        for (i = 0; i < s.length; i++) n = s[i], r = e.substr(o, e.indexOf(n, o) - o), o += r.length + n.length, n = pe(n, t), 3 === n.length && n.push(1), a += r + (t ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                        return a + e.substr(o)
                    },
                    me = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (c in de) me += "|" + c + "\\b";
                me = new RegExp(me + ")", "gi"), o.colorStringFilter = function(e) {
                    var t, i = e[0] + " " + e[1];
                    me.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), e[0] = fe(e[0], t), e[1] = fe(e[1], t)), me.lastIndex = 0
                }, t.defaultStringFilter || (t.defaultStringFilter = o.colorStringFilter);
                var ge = function(e, t, i, n) {
                        if (null == e) return function(e) {
                            return e
                        };
                        var r, s = t ? (e.match(me) || [""])[0] : "",
                            o = e.split(s).join("").match(_) || [],
                            a = e.substr(0, e.indexOf(o[0])),
                            l = ")" === e.charAt(e.length - 1) ? ")" : "",
                            c = -1 !== e.indexOf(" ") ? " " : ",",
                            u = o.length,
                            d = u > 0 ? o[0].replace(y, "") : "";
                        return u ? r = t ? function(e) {
                            var t, h, p, f;
                            if ("number" == typeof e) e += d;
                            else if (n && I.test(e)) {
                                for (f = e.replace(I, "|").split("|"), p = 0; p < f.length; p++) f[p] = r(f[p]);
                                return f.join(",")
                            }
                            if (t = (e.match(me) || [s])[0], h = e.split(t).join("").match(_) || [], p = h.length, u > p--)
                                for (; ++p < u;) h[p] = i ? h[(p - 1) / 2 | 0] : o[p];
                            return a + h.join(c) + c + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
                        } : function(e) {
                            var t, s, h;
                            if ("number" == typeof e) e += d;
                            else if (n && I.test(e)) {
                                for (s = e.replace(I, "|").split("|"), h = 0; h < s.length; h++) s[h] = r(s[h]);
                                return s.join(",")
                            }
                            if (t = e.match(_) || [], h = t.length, u > h--)
                                for (; ++h < u;) t[h] = i ? t[(h - 1) / 2 | 0] : o[h];
                            return a + t.join(c) + l
                        } : function(e) {
                            return e
                        }
                    },
                    ve = function(e) {
                        return e = e.split(","),
                            function(t, i, n, r, s, o, a) {
                                var l, c = (i + "").split(" ");
                                for (a = {}, l = 0; 4 > l; l++) a[e[l]] = c[l] = c[l] || c[(l - 1) / 2 >> 0];
                                return r.parse(t, a, s, o)
                            }
                    },
                    ye = ($._setPluginRatio = function(e) {
                        this.plugin.setRatio(e);
                        for (var t, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, c = 1e-6; l;) t = a[l.v], l.r ? t = Math.round(t) : c > t && t > -c && (t = 0), l.t[l.p] = t, l = l._next;
                        if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === e || 0 === e)
                            for (l = o.firstMPT, s = 1 === e ? "e" : "b"; l;) {
                                if (i = l.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i[s] = r
                                    }
                                } else i[s] = i.s + i.xs0;
                                l = l._next
                            }
                    }, function(e, t, i, n, r) {
                        this.t = e, this.p = t, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                    }),
                    we = ($._parseToProxy = function(e, t, i, n, r, s) {
                        var o, a, l, c, u, d = n,
                            h = {},
                            p = {},
                            f = i._transform,
                            m = W;
                        for (i._transform = null, W = t, n = u = i.parse(e, t, n, r), W = m, s && (i._transform = f, d && (d._prev = null, d._prev && (d._prev._next = null))); n && n !== d;) {
                            if (n.type <= 1 && (a = n.p, p[a] = n.s + n.c, h[a] = n.s, s || (c = new ye(n, "s", a, c, n.r), n.c = 0), 1 === n.type))
                                for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, p[a] = n.data[l], h[a] = n[l], s || (c = new ye(n, l, a, c, n.rxp[l]));
                            n = n._next
                        }
                        return {
                            proxy: h,
                            end: p,
                            firstMPT: c,
                            pt: u
                        }
                    }, $.CSSPropTween = function(e, t, n, r, o, a, l, c, u, d, h) {
                        this.t = e, this.p = t, this.s = n, this.c = r, this.n = l || t, e instanceof we || s.push(this.n), this.r = c, this.type = a || 0, u && (this.pr = u, i = !0), this.b = void 0 === d ? n : d, this.e = void 0 === h ? n + r : h, o && (this._next = o, o._prev = this)
                    }),
                    _e = function(e, t, i, n, r, s) {
                        var o = new we(e, t, i, n - i, r, (-1), s);
                        return o.b = i, o.e = o.xs0 = n, o
                    },
                    be = o.parseComplex = function(e, t, i, n, r, s, a, l, c, d) {
                        i = i || s || "", "function" == typeof n && (n = n(v, g)), a = new we(e, t, 0, 0, a, d ? 2 : 1, null, (!1), l, i, n), n += "", r && me.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                        var h, p, f, m, _, b, T, x, k, S, C, z, P, M = i.split(", ").join(",").split(" "),
                            O = n.split(", ").join(",").split(" "),
                            E = M.length,
                            A = u !== !1;
                        for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (M = M.join(" ").replace(I, ", ").split(" "), O = O.join(" ").replace(I, ", ").split(" "), E = M.length), E !== O.length && (M = (s || "").split(" "), E = M.length), a.plugin = c, a.setRatio = d, me.lastIndex = 0, h = 0; E > h; h++)
                            if (m = M[h], _ = O[h], x = parseFloat(m), x || 0 === x) a.appendXtra("", x, le(_, x), _.replace(w, ""), A && -1 !== _.indexOf("px"), !0);
                            else if (r && me.test(m)) z = _.indexOf(")") + 1, z = ")" + (z ? _.substr(z) : ""), P = -1 !== _.indexOf("hsl") && Y, S = _, m = pe(m, P), _ = pe(_, P), k = m.length + _.length > 6, k && !Y && 0 === _[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(O[h]).join("transparent")) : (Y || (k = !1), P ? a.appendXtra(S.substr(0, S.indexOf("hsl")) + (k ? "hsla(" : "hsl("), m[0], le(_[0], m[0]), ",", !1, !0).appendXtra("", m[1], le(_[1], m[1]), "%,", !1).appendXtra("", m[2], le(_[2], m[2]), k ? "%," : "%" + z, !1) : a.appendXtra(S.substr(0, S.indexOf("rgb")) + (k ? "rgba(" : "rgb("), m[0], _[0] - m[0], ",", !0, !0).appendXtra("", m[1], _[1] - m[1], ",", !0).appendXtra("", m[2], _[2] - m[2], k ? "," : z, !0), k && (m = m.length < 4 ? 1 : m[3], a.appendXtra("", m, (_.length < 4 ? 1 : _[3]) - m, z, !1))), me.lastIndex = 0;
                        else if (b = m.match(y)) {
                            if (T = _.match(w), !T || T.length !== b.length) return a;
                            for (f = 0, p = 0; p < b.length; p++) C = b[p], S = m.indexOf(C, f), a.appendXtra(m.substr(f, S - f), Number(C), le(T[p], C), "", A && "px" === m.substr(S + C.length, 2), 0 === p), f = S + C.length;
                            a["xs" + a.l] += m.substr(f)
                        } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + _ : _;
                        if (-1 !== n.indexOf("=") && a.data) {
                            for (z = a.xs0 + a.data.s, h = 1; h < a.l; h++) z += a["xs" + h] + a.data["xn" + h];
                            a.e = z + a["xs" + h]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    Te = 9;
                for (c = we.prototype, c.l = c.pr = 0; --Te > 0;) c["xn" + Te] = 0, c["xs" + Te] = "";
                c.xs0 = "", c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null, c.appendXtra = function(e, t, i, n, r, s) {
                    var o = this,
                        a = o.l;
                    return o["xs" + a] += s && (a || o["xs" + a]) ? " " + e : e || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = t + i, o.rxp["xn" + a] = r, o["xn" + a] = t, o.plugin || (o.xfirst = new we(o, "xn" + a, t, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                        s: t + i
                    }, o.rxp = {}, o.s = t, o.c = i, o.r = r, o)) : (o["xs" + a] += t + (n || ""), o)
                };
                var xe = function(e, t) {
                        t = t || {}, this.p = t.prefix ? K(e) || e : e, l[e] = l[this.p] = this, this.format = t.formatter || ge(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
                    },
                    ke = $._registerComplexSpecialProp = function(e, t, i) {
                        "object" != typeof t && (t = {
                            parser: i
                        });
                        var n, r, s = e.split(","),
                            o = t.defaultValue;
                        for (i = i || [o], n = 0; n < s.length; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || o, r = new xe(s[n], t)
                    },
                    Se = $._registerPluginProp = function(e) {
                        if (!l[e]) {
                            var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                            ke(e, {
                                parser: function(e, i, n, r, s, o, c) {
                                    var u = a.com.greensock.plugins[t];
                                    return u ? (u._cssRegister(), l[n].parse(e, i, n, r, s, o, c)) : (G("Error: " + t + " js file not loaded."), s)
                                }
                            })
                        }
                    };
                c = xe.prototype, c.parseComplex = function(e, t, i, n, r, s) {
                    var o, a, l, c, u, d, h = this.keyword;
                    if (this.multi && (I.test(i) || I.test(t) ? (a = t.replace(I, "|").split("|"), l = i.replace(I, "|").split("|")) : h && (a = [t], l = [i])), l) {
                        for (c = l.length > a.length ? l.length : a.length, o = 0; c > o; o++) t = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, h && (u = t.indexOf(h), d = i.indexOf(h), u !== d && (-1 === d ? a[o] = a[o].split(h).join("") : -1 === u && (a[o] += " " + h)));
                        t = a.join(", "), i = l.join(", ")
                    }
                    return be(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, r, s)
                }, c.parse = function(e, t, i, n, s, o, a) {
                    return this.parseComplex(e.style, this.format(J(e, this.p, r, !1, this.dflt)), this.format(t), s, o)
                }, o.registerSpecialProp = function(e, t, i) {
                    ke(e, {
                        parser: function(e, n, r, s, o, a, l) {
                            var c = new we(e, r, 0, 0, o, 2, r, (!1), i);
                            return c.plugin = a, c.setRatio = t(e, n, s._tween, r), c
                        },
                        priority: i
                    })
                }, o.useSVGTransformAttr = !0;
                var Ce, ze = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    Pe = K("transform"),
                    Me = U + "transform",
                    Oe = K("transformOrigin"),
                    Ee = null !== K("perspective"),
                    Ae = $.Transform = function() {
                        this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(o.defaultForce3D === !1 || !Ee) && (o.defaultForce3D || "auto")
                    },
                    Le = _gsScope.SVGElement,
                    Ie = function(e, t, i) {
                        var n, r = H.createElementNS("http://www.w3.org/2000/svg", e),
                            s = /([a-z])([A-Z])/g;
                        for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                        return t.appendChild(r), r
                    },
                    De = H.documentElement || {},
                    Re = function() {
                        var e, t, i, n = m || /Android/i.test(X) && !_gsScope.chrome;
                        return H.createElementNS && !n && (e = Ie("svg", De), t = Ie("rect", e, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = t.getBoundingClientRect().width, t.style[Oe] = "50% 50%", t.style[Pe] = "scaleX(0.5)", n = i === t.getBoundingClientRect().width && !(p && Ee), De.removeChild(e)), n
                    }(),
                    Ne = function(e, t, i, n, r, s) {
                        var a, l, c, u, d, h, p, f, m, g, v, y, w, _, b = e._gsTransform,
                            T = je(e, !0);
                        b && (w = b.xOrigin, _ = b.yOrigin), (!n || (a = n.split(" ")).length < 2) && (p = e.getBBox(), 0 === p.x && 0 === p.y && p.width + p.height === 0 && (p = {
                            x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                            y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                            width: 0,
                            height: 0
                        }), t = ae(t).split(" "), a = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * p.width : parseFloat(t[0])) + p.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * p.height : parseFloat(t[1])) + p.y]), i.xOrigin = u = parseFloat(a[0]), i.yOrigin = d = parseFloat(a[1]), n && T !== Be && (h = T[0], p = T[1], f = T[2], m = T[3], g = T[4], v = T[5], y = h * m - p * f, y && (l = u * (m / y) + d * (-f / y) + (f * v - m * g) / y, c = u * (-p / y) + d * (h / y) - (h * v - p * g) / y, u = i.xOrigin = a[0] = l, d = i.yOrigin = a[1] = c)), b && (s && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (l = u - w, c = d - _, b.xOffset += l * T[0] + c * T[2] - l, b.yOffset += l * T[1] + c * T[3] - c) : b.xOffset = b.yOffset = 0), s || e.setAttribute("data-svg-origin", a.join(" "))
                    },
                    We = function(e) {
                        var t, i = B("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                            n = this.parentNode,
                            r = this.nextSibling,
                            s = this.style.cssText;
                        if (De.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
                            t = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = We
                        } catch (o) {} else this._originalGetBBox && (t = this._originalGetBBox());
                        return r ? n.insertBefore(this, r) : n.appendChild(this), De.removeChild(i), this.style.cssText = s, t
                    },
                    Fe = function(e) {
                        try {
                            return e.getBBox()
                        } catch (t) {
                            return We.call(e, !0)
                        }
                    },
                    He = function(e) {
                        return !(!(Le && e.getCTM && Fe(e)) || e.parentNode && !e.ownerSVGElement)
                    },
                    Be = [1, 0, 0, 1, 0, 0],
                    je = function(e, t) {
                        var i, n, r, s, o, a, l = e._gsTransform || new Ae,
                            c = 1e5,
                            u = e.style;
                        if (Pe ? n = J(e, Me, null, !0) : e.currentStyle && (n = e.currentStyle.filter.match(A), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Pe || !(a = "none" === Q(e).display) && e.parentNode || (a && (s = u.display, u.display = "block"), e.parentNode || (o = 1, De.appendChild(e)), n = J(e, Me, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? u.display = s : a && Ve(u, "display"), o && De.removeChild(e)), (l.svg || e.getCTM && He(e)) && (i && -1 !== (u[Pe] + "").indexOf("matrix") && (n = u[Pe], i = 0), r = e.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Be;
                        for (r = (n || "").match(y) || [], Te = r.length; --Te > -1;) s = Number(r[Te]), r[Te] = (o = s - (s |= 0)) ? (o * c + (0 > o ? -.5 : .5) | 0) / c + s : s;
                        return t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                    },
                    qe = $.getTransform = function(e, i, n, r) {
                        if (e._gsTransform && n && !r) return e._gsTransform;
                        var s, a, l, c, u, d, h = n ? e._gsTransform || new Ae : new Ae,
                            p = h.scaleX < 0,
                            f = 2e-5,
                            m = 1e5,
                            g = Ee ? parseFloat(J(e, Oe, i, !1, "0 0 0").split(" ")[2]) || h.zOrigin || 0 : 0,
                            v = parseFloat(o.defaultTransformPerspective) || 0;
                        if (h.svg = !(!e.getCTM || !He(e)), h.svg && (Ne(e, J(e, Oe, i, !1, "50% 50%") + "", h, e.getAttribute("data-svg-origin")), Ce = o.useSVGTransformAttr || Re), s = je(e), s !== Be) {
                            if (16 === s.length) {
                                var y, w, _, b, T, x = s[0],
                                    k = s[1],
                                    S = s[2],
                                    C = s[3],
                                    z = s[4],
                                    P = s[5],
                                    M = s[6],
                                    O = s[7],
                                    E = s[8],
                                    A = s[9],
                                    L = s[10],
                                    I = s[12],
                                    D = s[13],
                                    R = s[14],
                                    W = s[11],
                                    F = Math.atan2(M, L);
                                h.zOrigin && (R = -h.zOrigin, I = E * R - s[12], D = A * R - s[13], R = L * R + h.zOrigin - s[14]), h.rotationX = F * N, F && (b = Math.cos(-F), T = Math.sin(-F), y = z * b + E * T, w = P * b + A * T, _ = M * b + L * T, E = z * -T + E * b, A = P * -T + A * b, L = M * -T + L * b, W = O * -T + W * b, z = y, P = w, M = _), F = Math.atan2(-S, L), h.rotationY = F * N, F && (b = Math.cos(-F), T = Math.sin(-F), y = x * b - E * T, w = k * b - A * T, _ = S * b - L * T, A = k * T + A * b, L = S * T + L * b, W = C * T + W * b, x = y, k = w, S = _), F = Math.atan2(k, x), h.rotation = F * N, F && (b = Math.cos(F), T = Math.sin(F), y = x * b + k * T, w = z * b + P * T, _ = E * b + A * T, k = k * b - x * T, P = P * b - z * T, A = A * b - E * T, x = y, z = w, E = _), h.rotationX && Math.abs(h.rotationX) + Math.abs(h.rotation) > 359.9 && (h.rotationX = h.rotation = 0, h.rotationY = 180 - h.rotationY), F = Math.atan2(z, P), h.scaleX = (Math.sqrt(x * x + k * k + S * S) * m + .5 | 0) / m, h.scaleY = (Math.sqrt(P * P + M * M) * m + .5 | 0) / m, h.scaleZ = (Math.sqrt(E * E + A * A + L * L) * m + .5 | 0) / m, x /= h.scaleX, z /= h.scaleY, k /= h.scaleX, P /= h.scaleY, Math.abs(F) > f ? (h.skewX = F * N, z = 0, "simple" !== h.skewType && (h.scaleY *= 1 / Math.cos(F))) : h.skewX = 0, h.perspective = W ? 1 / (0 > W ? -W : W) : 0, h.x = I, h.y = D, h.z = R, h.svg && (h.x -= h.xOrigin - (h.xOrigin * x - h.yOrigin * z), h.y -= h.yOrigin - (h.yOrigin * k - h.xOrigin * P))
                            } else if (!Ee || r || !s.length || h.x !== s[4] || h.y !== s[5] || !h.rotationX && !h.rotationY) {
                                var H = s.length >= 6,
                                    B = H ? s[0] : 1,
                                    j = s[1] || 0,
                                    q = s[2] || 0,
                                    $ = H ? s[3] : 1;
                                h.x = s[4] || 0, h.y = s[5] || 0, l = Math.sqrt(B * B + j * j), c = Math.sqrt($ * $ + q * q), u = B || j ? Math.atan2(j, B) * N : h.rotation || 0, d = q || $ ? Math.atan2(q, $) * N + u : h.skewX || 0, h.scaleX = l, h.scaleY = c, h.rotation = u, h.skewX = d, Ee && (h.rotationX = h.rotationY = h.z = 0, h.perspective = v, h.scaleZ = 1), h.svg && (h.x -= h.xOrigin - (h.xOrigin * B + h.yOrigin * q), h.y -= h.yOrigin - (h.xOrigin * j + h.yOrigin * $))
                            }
                            Math.abs(h.skewX) > 90 && Math.abs(h.skewX) < 270 && (p ? (h.scaleX *= -1, h.skewX += h.rotation <= 0 ? 180 : -180, h.rotation += h.rotation <= 0 ? 180 : -180) : (h.scaleY *= -1, h.skewX += h.skewX <= 0 ? 180 : -180)), h.zOrigin = g;
                            for (a in h) h[a] < f && h[a] > -f && (h[a] = 0)
                        }
                        return n && (e._gsTransform = h, h.svg && (Ce && e.style[Pe] ? t.delayedCall(.001, function() {
                            Ve(e.style, Pe)
                        }) : !Ce && e.getAttribute("transform") && t.delayedCall(.001, function() {
                            e.removeAttribute("transform")
                        }))), h
                    },
                    $e = function(e) {
                        var t, i, n = this.data,
                            r = -n.rotation * R,
                            s = r + n.skewX * R,
                            o = 1e5,
                            a = (Math.cos(r) * n.scaleX * o | 0) / o,
                            l = (Math.sin(r) * n.scaleX * o | 0) / o,
                            c = (Math.sin(s) * -n.scaleY * o | 0) / o,
                            u = (Math.cos(s) * n.scaleY * o | 0) / o,
                            d = this.t.style,
                            h = this.t.currentStyle;
                        if (h) {
                            i = l, l = -c, c = -i, t = h.filter, d.filter = "";
                            var p, f, g = this.t.offsetWidth,
                                v = this.t.offsetHeight,
                                y = "absolute" !== h.position,
                                w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + c + ", M22=" + u,
                                _ = n.x + g * n.xPercent / 100,
                                b = n.y + v * n.yPercent / 100;
                            if (null != n.ox && (p = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, f = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, _ += p - (p * a + f * l), b += f - (p * c + f * u)), y ? (p = g / 2, f = v / 2, w += ", Dx=" + (p - (p * a + f * l) + _) + ", Dy=" + (f - (p * c + f * u) + b) + ")") : w += ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? d.filter = t.replace(L, w) : d.filter = w + " " + t, (0 === e || 1 === e) && 1 === a && 0 === l && 0 === c && 1 === u && (y && -1 === w.indexOf("Dx=0, Dy=0") || x.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && d.removeAttribute("filter")), !y) {
                                var k, S, C, z = 8 > m ? 1 : -1;
                                for (p = n.ieOffsetX || 0, f = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + _), n.ieOffsetY = Math.round((v - ((0 > u ? -u : u) * v + (0 > c ? -c : c) * g)) / 2 + b), Te = 0; 4 > Te; Te++) S = se[Te], k = h[S], i = -1 !== k.indexOf("px") ? parseFloat(k) : ee(this.t, S, parseFloat(k), k.replace(T, "")) || 0, C = i !== n[S] ? 2 > Te ? -n.ieOffsetX : -n.ieOffsetY : 2 > Te ? p - n.ieOffsetX : f - n.ieOffsetY, d[S] = (n[S] = Math.round(i - C * (0 === Te || 2 === Te ? 1 : z))) + "px"
                            }
                        }
                    },
                    Xe = $.set3DTransformRatio = $.setTransformRatio = function(e) {
                        var t, i, n, r, s, o, a, l, c, u, d, h, f, m, g, v, y, w, _, b, T, x, k, S = this.data,
                            C = this.t.style,
                            z = S.rotation,
                            P = S.rotationX,
                            M = S.rotationY,
                            O = S.scaleX,
                            E = S.scaleY,
                            A = S.scaleZ,
                            L = S.x,
                            I = S.y,
                            D = S.z,
                            N = S.svg,
                            W = S.perspective,
                            F = S.force3D,
                            H = S.skewY,
                            B = S.skewX;
                        if (H && (B += H, z += H), ((1 === e || 0 === e) && "auto" === F && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !F) && !D && !W && !M && !P && 1 === A || Ce && N || !Ee) return void(z || B || N ? (z *= R, x = B * R, k = 1e5, i = Math.cos(z) * O, s = Math.sin(z) * O, n = Math.sin(z - x) * -E, o = Math.cos(z - x) * E, x && "simple" === S.skewType && (t = Math.tan(x - H * R), t = Math.sqrt(1 + t * t), n *= t, o *= t, H && (t = Math.tan(H * R), t = Math.sqrt(1 + t * t), i *= t, s *= t)), N && (L += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, I += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset, Ce && (S.xPercent || S.yPercent) && (g = this.t.getBBox(), L += .01 * S.xPercent * g.width, I += .01 * S.yPercent * g.height), g = 1e-6, g > L && L > -g && (L = 0), g > I && I > -g && (I = 0)), _ = (i * k | 0) / k + "," + (s * k | 0) / k + "," + (n * k | 0) / k + "," + (o * k | 0) / k + "," + L + "," + I + ")", N && Ce ? this.t.setAttribute("transform", "matrix(" + _) : C[Pe] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + _) : C[Pe] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + E + "," + L + "," + I + ")");
                        if (p && (g = 1e-4, g > O && O > -g && (O = A = 2e-5), g > E && E > -g && (E = A = 2e-5), !W || S.z || S.rotationX || S.rotationY || (W = 0)), z || B) z *= R, v = i = Math.cos(z), y = s = Math.sin(z), B && (z -= B * R, v = Math.cos(z), y = Math.sin(z), "simple" === S.skewType && (t = Math.tan((B - H) * R), t = Math.sqrt(1 + t * t), v *= t, y *= t, S.skewY && (t = Math.tan(H * R), t = Math.sqrt(1 + t * t), i *= t, s *= t))), n = -y, o = v;
                        else {
                            if (!(M || P || 1 !== A || W || N)) return void(C[Pe] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + L + "px," + I + "px," + D + "px)" + (1 !== O || 1 !== E ? " scale(" + O + "," + E + ")" : ""));
                            i = o = 1, n = s = 0
                        }
                        u = 1, r = a = l = c = d = h = 0, f = W ? -1 / W : 0, m = S.zOrigin, g = 1e-6, b = ",", T = "0", z = M * R, z && (v = Math.cos(z), y = Math.sin(z), l = -y, d = f * -y, r = i * y, a = s * y, u = v, f *= v, i *= v, s *= v), z = P * R, z && (v = Math.cos(z), y = Math.sin(z), t = n * v + r * y, w = o * v + a * y, c = u * y, h = f * y, r = n * -y + r * v, a = o * -y + a * v, u *= v, f *= v, n = t, o = w), 1 !== A && (r *= A, a *= A, u *= A, f *= A), 1 !== E && (n *= E, o *= E, c *= E, h *= E), 1 !== O && (i *= O, s *= O, l *= O, d *= O), (m || N) && (m && (L += r * -m, I += a * -m, D += u * -m + m), N && (L += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, I += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset), g > L && L > -g && (L = T), g > I && I > -g && (I = T), g > D && D > -g && (D = 0)), _ = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", _ += (g > i && i > -g ? T : i) + b + (g > s && s > -g ? T : s) + b + (g > l && l > -g ? T : l), _ += b + (g > d && d > -g ? T : d) + b + (g > n && n > -g ? T : n) + b + (g > o && o > -g ? T : o), P || M || 1 !== A ? (_ += b + (g > c && c > -g ? T : c) + b + (g > h && h > -g ? T : h) + b + (g > r && r > -g ? T : r), _ += b + (g > a && a > -g ? T : a) + b + (g > u && u > -g ? T : u) + b + (g > f && f > -g ? T : f) + b) : _ += ",0,0,0,0,1,0,", _ += L + b + I + b + D + b + (W ? 1 + -D / W : 1) + ")", C[Pe] = _
                    };
                c = Ae.prototype, c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0, c.scaleX = c.scaleY = c.scaleZ = 1, ke("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(e, t, i, n, s, a, l) {
                        if (n._lastParsedTransform === l) return s;
                        n._lastParsedTransform = l;
                        var c, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                        "function" == typeof l[i] && (c = l[i], l[i] = t), u && (l.scale = u(v, e));
                        var d, h, p, f, m, y, w, _, b, T = e._gsTransform,
                            x = e.style,
                            k = 1e-6,
                            S = ze.length,
                            C = l,
                            z = {},
                            P = "transformOrigin",
                            M = qe(e, r, !0, C.parseTransform),
                            O = C.transform && ("function" == typeof C.transform ? C.transform(v, g) : C.transform);
                        if (M.skewType = C.skewType || M.skewType || o.defaultSkewType, n._transform = M, O && "string" == typeof O && Pe) h = j.style, h[Pe] = O, h.display = "block", h.position = "absolute", H.body.appendChild(j), d = qe(j, null, !1), "simple" === M.skewType && (d.scaleY *= Math.cos(d.skewX * R)), M.svg && (y = M.xOrigin, w = M.yOrigin, d.x -= M.xOffset, d.y -= M.yOffset, (C.transformOrigin || C.svgOrigin) && (O = {}, Ne(e, ae(C.transformOrigin), O, C.svgOrigin, C.smoothOrigin, !0), y = O.xOrigin, w = O.yOrigin, d.x -= O.xOffset - M.xOffset, d.y -= O.yOffset - M.yOffset), (y || w) && (_ = je(j, !0), d.x -= y - (y * _[0] + w * _[2]), d.y -= w - (y * _[1] + w * _[3]))), H.body.removeChild(j), d.perspective || (d.perspective = M.perspective), null != C.xPercent && (d.xPercent = ce(C.xPercent, M.xPercent)), null != C.yPercent && (d.yPercent = ce(C.yPercent, M.yPercent));
                        else if ("object" == typeof C) {
                            if (d = {
                                    scaleX: ce(null != C.scaleX ? C.scaleX : C.scale, M.scaleX),
                                    scaleY: ce(null != C.scaleY ? C.scaleY : C.scale, M.scaleY),
                                    scaleZ: ce(C.scaleZ, M.scaleZ),
                                    x: ce(C.x, M.x),
                                    y: ce(C.y, M.y),
                                    z: ce(C.z, M.z),
                                    xPercent: ce(C.xPercent, M.xPercent),
                                    yPercent: ce(C.yPercent, M.yPercent),
                                    perspective: ce(C.transformPerspective, M.perspective)
                                }, m = C.directionalRotation, null != m)
                                if ("object" == typeof m)
                                    for (h in m) C[h] = m[h];
                                else C.rotation = m;
                                "string" == typeof C.x && -1 !== C.x.indexOf("%") && (d.x = 0, d.xPercent = ce(C.x, M.xPercent)), "string" == typeof C.y && -1 !== C.y.indexOf("%") && (d.y = 0, d.yPercent = ce(C.y, M.yPercent)), d.rotation = ue("rotation" in C ? C.rotation : "shortRotation" in C ? C.shortRotation + "_short" : "rotationZ" in C ? C.rotationZ : M.rotation, M.rotation, "rotation", z), Ee && (d.rotationX = ue("rotationX" in C ? C.rotationX : "shortRotationX" in C ? C.shortRotationX + "_short" : M.rotationX || 0, M.rotationX, "rotationX", z), d.rotationY = ue("rotationY" in C ? C.rotationY : "shortRotationY" in C ? C.shortRotationY + "_short" : M.rotationY || 0, M.rotationY, "rotationY", z)), d.skewX = ue(C.skewX, M.skewX), d.skewY = ue(C.skewY, M.skewY)
                        }
                        for (Ee && null != C.force3D && (M.force3D = C.force3D, f = !0), p = M.force3D || M.z || M.rotationX || M.rotationY || d.z || d.rotationX || d.rotationY || d.perspective, p || null == C.scale || (d.scaleZ = 1); --S > -1;) b = ze[S], O = d[b] - M[b], (O > k || -k > O || null != C[b] || null != W[b]) && (f = !0, s = new we(M, b, M[b], O, s), b in z && (s.e = z[b]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                        return O = C.transformOrigin, M.svg && (O || C.svgOrigin) && (y = M.xOffset, w = M.yOffset, Ne(e, ae(O), d, C.svgOrigin, C.smoothOrigin), s = _e(M, "xOrigin", (T ? M : d).xOrigin, d.xOrigin, s, P), s = _e(M, "yOrigin", (T ? M : d).yOrigin, d.yOrigin, s, P), (y !== M.xOffset || w !== M.yOffset) && (s = _e(M, "xOffset", T ? y : M.xOffset, M.xOffset, s, P), s = _e(M, "yOffset", T ? w : M.yOffset, M.yOffset, s, P)), O = "0px 0px"), (O || Ee && p && M.zOrigin) && (Pe ? (f = !0, b = Oe, O = (O || J(e, b, r, !1, "50% 50%")) + "", s = new we(x, b, 0, 0, s, (-1), P), s.b = x[b], s.plugin = a, Ee ? (h = M.zOrigin, O = O.split(" "), M.zOrigin = (O.length > 2 && (0 === h || "0px" !== O[2]) ? parseFloat(O[2]) : h) || 0, s.xs0 = s.e = O[0] + " " + (O[1] || "50%") + " 0px", s = new we(M, "zOrigin", 0, 0, s, (-1), s.n), s.b = h, s.xs0 = s.e = M.zOrigin) : s.xs0 = s.e = O) : ae(O + "", M)), f && (n._transformType = M.svg && Ce || !p && 3 !== this._transformType ? 2 : 3), c && (l[i] = c), u && (l.scale = u), s
                    },
                    prefix: !0
                }), ke("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), ke("borderRadius", {
                    defaultValue: "0px",
                    parser: function(e, t, i, s, o, a) {
                        t = this.format(t);
                        var l, c, u, d, h, p, f, m, g, v, y, w, _, b, T, x, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            S = e.style;
                        for (g = parseFloat(e.offsetWidth), v = parseFloat(e.offsetHeight), l = t.split(" "), c = 0; c < k.length; c++) this.p.indexOf("border") && (k[c] = K(k[c])), h = d = J(e, k[c], r, !1, "0px"), -1 !== h.indexOf(" ") && (d = h.split(" "), h = d[0], d = d[1]), p = u = l[c], f = parseFloat(h), w = h.substr((f + "").length), _ = "=" === p.charAt(1), _ ? (m = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), m *= parseFloat(p), y = p.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(p), y = p.substr((m + "").length)), "" === y && (y = n[i] || w), y !== w && (b = ee(e, "borderLeft", f, w), T = ee(e, "borderTop", f, w), "%" === y ? (h = b / g * 100 + "%", d = T / v * 100 + "%") : "em" === y ? (x = ee(e, "borderLeft", 1, "em"), h = b / x + "em", d = T / x + "em") : (h = b + "px", d = T + "px"), _ && (p = parseFloat(h) + m + y, u = parseFloat(d) + m + y)), o = be(S, k[c], h + " " + d, p + " " + u, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: ge("0px 0px 0px 0px", !1, !0)
                }), ke("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function(e, t, i, n, s, o) {
                        return be(e.style, i, this.format(J(e, i, r, !1, "0px 0px")), this.format(t), !1, "0px", s)
                    },
                    prefix: !0,
                    formatter: ge("0px 0px", !1, !0)
                }), ke("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(e, t, i, n, s, o) {
                        var a, l, c, u, d, h, p = "background-position",
                            f = r || Q(e, null),
                            g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                            v = this.format(t);
                        if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && v.split(",").length < 2 && (h = J(e, "backgroundImage").replace(M, ""), h && "none" !== h)) {
                            for (a = g.split(" "), l = v.split(" "), q.setAttribute("src", h), c = 2; --c > -1;) g = a[c], u = -1 !== g.indexOf("%"), u !== (-1 !== l[c].indexOf("%")) && (d = 0 === c ? e.offsetWidth - q.width : e.offsetHeight - q.height, a[c] = u ? parseFloat(g) / 100 * d + "px" : parseFloat(g) / d * 100 + "%");
                            g = a.join(" ")
                        }
                        return this.parseComplex(e.style, g, v, s, o)
                    },
                    formatter: ae
                }), ke("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function(e) {
                        return e += "", ae(-1 === e.indexOf(" ") ? e + " " + e : e)
                    }
                }), ke("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), ke("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), ke("transformStyle", {
                    prefix: !0
                }), ke("backfaceVisibility", {
                    prefix: !0
                }), ke("userSelect", {
                    prefix: !0
                }), ke("margin", {
                    parser: ve("marginTop,marginRight,marginBottom,marginLeft")
                }), ke("padding", {
                    parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), ke("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(e, t, i, n, s, o) {
                        var a, l, c;
                        return 9 > m ? (l = e.currentStyle, c = 8 > m ? " " : ",", a = "rect(" + l.clipTop + c + l.clipRight + c + l.clipBottom + c + l.clipLeft + ")", t = this.format(t).split(",").join(c)) : (a = this.format(J(e, this.p, r, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, a, t, s, o)
                    }
                }), ke("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), ke("autoRound,strictUnits", {
                    parser: function(e, t, i, n, r) {
                        return r
                    }
                }), ke("border", {
                    defaultValue: "0px solid #000",
                    parser: function(e, t, i, n, s, o) {
                        var a = J(e, "borderTopWidth", r, !1, "0px"),
                            l = this.format(t).split(" "),
                            c = l[0].replace(T, "");
                        return "px" !== c && (a = parseFloat(a) / ee(e, "borderTopWidth", 1, c) + c), this.parseComplex(e.style, this.format(a + " " + J(e, "borderTopStyle", r, !1, "solid") + " " + J(e, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                    },
                    color: !0,
                    formatter: function(e) {
                        var t = e.split(" ");
                        return t[0] + " " + (t[1] || "solid") + " " + (e.match(me) || ["#000"])[0]
                    }
                }), ke("borderWidth", {
                    parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), ke("float,cssFloat,styleFloat", {
                    parser: function(e, t, i, n, r, s) {
                        var o = e.style,
                            a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                        return new we(o, a, 0, 0, r, (-1), i, (!1), 0, o[a], t)
                    }
                });
                var Ye = function(e) {
                    var t, i = this.t,
                        n = i.filter || J(this.data, "filter") || "",
                        r = this.s + this.c * e | 0;
                    100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), t = !J(this.data, "filter")) : (i.filter = n.replace(S, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r))
                };
                ke("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(e, t, i, n, s, o) {
                        var a = parseFloat(J(e, "opacity", r, !1, "1")),
                            l = e.style,
                            c = "autoAlpha" === i;
                        return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + a), c && 1 === a && "hidden" === J(e, "visibility", r) && 0 !== t && (a = 0), Y ? s = new we(l, "opacity", a, t - a, s) : (s = new we(l, "opacity", 100 * a, 100 * (t - a), s), s.xn1 = c ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Ye), c && (s = new we(l, "visibility", 0, 0, s, (-1), null, (!1), 0, 0 !== a ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                    }
                });
                var Ve = function(e, t) {
                        t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(z, "-$1").toLowerCase())) : e.removeAttribute(t))
                    },
                    Ge = function(e) {
                        if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                            this.t.setAttribute("class", 0 === e ? this.b : this.e);
                            for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Ve(i, t.p), t = t._next;
                            1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                ke("className", {
                    parser: function(e, t, n, s, o, a, l) {
                        var c, u, d, h, p, f = e.getAttribute("class") || "",
                            m = e.style.cssText;
                        if (o = s._classNamePT = new we(e, n, 0, 0, o, 2), o.setRatio = Ge, o.pr = -11, i = !0, o.b = f, u = ie(e, r), d = e._gsClassPT) {
                            for (h = {}, p = d.data; p;) h[p.p] = 1, p = p._next;
                            d.setRatio(1)
                        }
                        return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : f.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", o.e), c = ne(e, u, ie(e), l, h), e.setAttribute("class", f), o.data = c.firstMPT, e.style.cssText = m, o = o.xfirst = s.parse(e, c.difs, o, a)
                    }
                });
                var Ue = function(e) {
                    if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var t, i, n, r, s, o = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) o.cssText = "", r = !0;
                        else
                            for (t = this.e.split(" ").join("").split(","), n = t.length; --n > -1;) i = t[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Oe : l[i].p), Ve(o, i);
                        r && (Ve(o, Pe), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (ke("clearProps", {
                        parser: function(e, t, n, r, s) {
                            return s = new we(e, n, 0, 0, s, 2), s.setRatio = Ue, s.e = t, s.pr = -10, s.data = r._tween, i = !0, s
                        }
                    }), c = "bezier,throwProps,physicsProps,physics2D".split(","), Te = c.length; Te--;) Se(c[Te]);
                c = o.prototype, c._firstPT = c._lastParsedTransform = c._transform = null, c._onInitTween = function(e, t, a, c) {
                    if (!e.nodeType) return !1;
                    this._target = g = e, this._tween = a, this._vars = t, v = c, u = t.autoRound, i = !1, n = t.suffixMap || o.suffixMap, r = Q(e, ""), s = this._overwriteProps;
                    var p, m, y, w, _, b, T, x, S, C = e.style;
                    if (d && "" === C.zIndex && (p = J(e, "zIndex", r), ("auto" === p || "" === p) && this._addLazySet(C, "zIndex", 0)), "string" == typeof t && (w = C.cssText, p = ie(e, r), C.cssText = w + ";" + t, p = ne(e, p, ie(e)).difs, !Y && k.test(t) && (p.opacity = parseFloat(RegExp.$1)), t = p, C.cssText = w), t.className ? this._firstPT = m = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = m = this.parse(e, t, null), this._transformType) {
                        for (S = 3 === this._transformType, Pe ? h && (d = !0, "" === C.zIndex && (T = J(e, "zIndex", r), ("auto" === T || "" === T) && this._addLazySet(C, "zIndex", 0)), f && this._addLazySet(C, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (S ? "visible" : "hidden"))) : C.zoom = 1, y = m; y && y._next;) y = y._next;
                        x = new we(e, "transform", 0, 0, null, 2), this._linkCSSP(x, null, y), x.setRatio = Pe ? Xe : $e, x.data = this._transform || qe(e, r, !0), x.tween = a, x.pr = -1, s.pop()
                    }
                    if (i) {
                        for (; m;) {
                            for (b = m._next, y = w; y && y.pr > m.pr;) y = y._next;
                            (m._prev = y ? y._prev : _) ? m._prev._next = m: w = m, (m._next = y) ? y._prev = m : _ = m, m = b
                        }
                        this._firstPT = w
                    }
                    return !0
                }, c.parse = function(e, t, i, s) {
                    var o, a, c, d, h, p, f, m, y, w, _ = e.style;
                    for (o in t) {
                        if (p = t[o], "function" == typeof p && (p = p(v, g)), a = l[o]) i = a.parse(e, p, o, this, i, s, t);
                        else {
                            if ("--" === o.substr(0, 2)) {
                                this._tween._propLookup[o] = this._addTween.call(this._tween, e.style, "setProperty", Q(e).getPropertyValue(o) + "", p + "", o, !1, o);
                                continue
                            }
                            h = J(e, o, r) + "", y = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || y && C.test(p) ? (y || (p = pe(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = be(_, o, h, p, !0, "transparent", i, 0, s)) : y && D.test(p) ? i = be(_, o, h, p, !0, null, i, 0, s) : (c = parseFloat(h), f = c || 0 === c ? h.substr((c + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (c = oe(e, o, r), f = "px") : "left" === o || "top" === o ? (c = te(e, o, r), f = "px") : (c = "opacity" !== o ? 0 : 1, f = "")), w = y && "=" === p.charAt(1), w ? (d = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), d *= parseFloat(p), m = p.replace(T, "")) : (d = parseFloat(p), m = y ? p.replace(T, "") : ""), "" === m && (m = o in n ? n[o] : f), p = d || 0 === d ? (w ? d + c : d) + m : t[o], f !== m && ("" !== m || "lineHeight" === o) && (d || 0 === d) && c && (c = ee(e, o, c, f), "%" === m ? (c /= ee(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = c + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? c /= ee(e, o, 1, m) : "px" !== m && (d = ee(e, o, d, m), m = "px"), w && (d || 0 === d) && (p = d + c + m)), w && (d += c), !c && 0 !== c || !d && 0 !== d ? void 0 !== _[o] && (p || p + "" != "NaN" && null != p) ? (i = new we(_, o, d || c || 0, 0, i, (-1), o, (!1), 0, h, p), i.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : G("invalid " + o + " tween value: " + t[o]) : (i = new we(_, o, c, d - c, i, 0, o, u !== !1 && ("px" === m || "zIndex" === o), 0, h, p), i.xs0 = m))
                        }
                        s && i && !i.plugin && (i.plugin = s)
                    }
                    return i
                }, c.setRatio = function(e) {
                    var t, i, n, r = this._firstPT,
                        s = 1e-6;
                    if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; r;) {
                                if (t = r.c * e + r.s, r.r ? t = Math.round(t) : s > t && t > -s && (t = 0), r.type)
                                    if (1 === r.type)
                                        if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
                                else r.t[r.p] = t + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e), r = r._next;
                        else
                            for (; r;) {
                                if (2 !== r.type)
                                    if (r.r && -1 !== r.type)
                                        if (t = Math.round(r.s + r.c), r.type) {
                                            if (1 === r.type) {
                                                for (n = r.l, i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                r.t[r.p] = i
                                            }
                                        } else r.t[r.p] = t + r.xs0;
                                else r.t[r.p] = r.e;
                                else r.setRatio(e);
                                r = r._next
                            }
                }, c._enableTransforms = function(e) {
                    this._transform = this._transform || qe(this._target, r, !0), this._transformType = this._transform.svg && Ce || !e && 3 !== this._transformType ? 2 : 3
                };
                var Ze = function(e) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                c._addLazySet = function(e, t, i) {
                    var n = this._firstPT = new we(e, t, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = Ze, n.data = this
                }, c._linkCSSP = function(e, t, i, n) {
                    return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
                }, c._mod = function(e) {
                    for (var t = this._firstPT; t;) "function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1), t = t._next
                }, c._kill = function(t) {
                    var i, n, r, s = t;
                    if (t.autoAlpha || t.alpha) {
                        s = {};
                        for (n in t) s[n] = t[n];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    for (t.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(t), n = i.plugin), i = i._next;
                    return e.prototype._kill.call(this, s)
                };
                var Ke = function(e, t, i) {
                    var n, r, s, o;
                    if (e.slice)
                        for (r = e.length; --r > -1;) Ke(e[r], t, i);
                    else
                        for (n = e.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (t.push(ie(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Ke(s, t, i)
                };
                return o.cascadeTo = function(e, i, n) {
                    var r, s, o, a, l = t.to(e, i, n),
                        c = [l],
                        u = [],
                        d = [],
                        h = [],
                        p = t._internals.reservedProps;
                    for (e = l._targets || l.target, Ke(e, u, h), l.render(i, !0, !0), Ke(e, d), l.render(0, !0, !0), l._enabled(!0), r = h.length; --r > -1;)
                        if (s = ne(h[r], u[r], d[r]), s.firstMPT) {
                            s = s.difs;
                            for (o in n) p[o] && (s[o] = n[o]);
                            a = {};
                            for (o in s) a[o] = u[r][o];
                            c.push(t.fromTo(h[r], i, a, s))
                        }
                    return c
                }, e.activate([o]), o
            }, !0),
            function() {
                var e = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.6.0",
                        priority: -1,
                        API: 2,
                        init: function(e, t, i) {
                            return this._tween = i, !0
                        }
                    }),
                    t = function(e) {
                        for (; e;) e.f || e.blob || (e.m = Math.round), e = e._next
                    },
                    i = e.prototype;
                i._onInitAllProps = function() {
                    for (var e, i, n, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), o = s.length, a = {}, l = r._propLookup.roundProps; --o > -1;) a[s[o]] = Math.round;
                    for (o = s.length; --o > -1;)
                        for (e = s[o], i = r._firstPT; i;) n = i._next, i.pg ? i.t._mod(a) : i.n === e && (2 === i.f && i.t ? t(i.t._firstPT) : (this._add(i.t, e, i.s, i.c), n && (n._prev = i._prev), i._prev ? i._prev._next = n : r._firstPT === i && (r._firstPT = n), i._next = i._prev = null, r._propLookup[e] = l)), i = n;
                    return !1
                }, i._add = function(e, t, i, n) {
                    this._addTween(e, t, i, i + n, t, Math.round), this._overwriteProps.push(t)
                }
            }(),
            function() {
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.6.1",
                    init: function(e, t, i, n) {
                        var r, s;
                        if ("function" != typeof e.setAttribute) return !1;
                        for (r in t) s = t[r], "function" == typeof s && (s = s(n, e)), this._addTween(e, "setAttribute", e.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);
                        return !0
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.3.1",
                API: 2,
                init: function(e, t, i, n) {
                    "object" != typeof t && (t = {
                        rotation: t
                    }), this.finals = {};
                    var r, s, o, a, l, c, u = t.useRadians === !0 ? 2 * Math.PI : 360,
                        d = 1e-6;
                    for (r in t) "useRadians" !== r && (a = t[r], "function" == typeof a && (a = a(n, e)), c = (a + "").split("_"), s = c[0], o = parseFloat("function" != typeof e[r] ? e[r] : e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, l = a - o, c.length && (s = c.join("_"), -1 !== s.indexOf("short") && (l %= u, l !== l % (u / 2) && (l = 0 > l ? l + u : l - u)), -1 !== s.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * u) % u - (l / u | 0) * u : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * u) % u - (l / u | 0) * u)), (l > d || -d > l) && (this._addTween(e, r, o, o + l, r), this._overwriteProps.push(r)));
                    return !0
                },
                set: function(e) {
                    var t;
                    if (1 !== e) this._super.setRatio.call(this, e);
                    else
                        for (t = this._firstPT; t;) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
                var t, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                    s = r.com.greensock,
                    o = 2 * Math.PI,
                    a = Math.PI / 2,
                    l = s._class,
                    c = function(t, i) {
                        var n = l("easing." + t, function() {}, !0),
                            r = n.prototype = new e;
                        return r.constructor = n, r.getRatio = i, n
                    },
                    u = e.register || function() {},
                    d = function(e, t, i, n, r) {
                        var s = l("easing." + e, {
                            easeOut: new t,
                            easeIn: new i,
                            easeInOut: new n
                        }, !0);
                        return u(s, e), s
                    },
                    h = function(e, t, i) {
                        this.t = e, this.v = t, i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
                    },
                    p = function(t, i) {
                        var n = l("easing." + t, function(e) {
                                this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = n.prototype = new e;
                        return r.constructor = n, r.getRatio = i, r.config = function(e) {
                            return new n(e)
                        }, n
                    },
                    f = d("Back", p("BackOut", function(e) {
                        return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
                    }), p("BackIn", function(e) {
                        return e * e * ((this._p1 + 1) * e - this._p1)
                    }), p("BackInOut", function(e) {
                        return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
                    })),
                    m = l("easing.SlowMo", function(e, t, i) {
                        t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                    }, !0),
                    g = m.prototype = new e;
                return g.constructor = m, g.getRatio = function(e) {
                    var t = e + (.5 - e) * this._p;
                    return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
                }, m.ease = new m(.7, .7), g.config = m.config = function(e, t, i) {
                    return new m(e, t, i)
                }, t = l("easing.SteppedEase", function(e, t) {
                    e = e || 1, this._p1 = 1 / e, this._p2 = e + (t ? 0 : 1), this._p3 = t ? 1 : 0
                }, !0), g = t.prototype = new e, g.constructor = t, g.getRatio = function(e) {
                    return 0 > e ? e = 0 : e >= 1 && (e = .999999999), ((this._p2 * e | 0) + this._p3) * this._p1
                }, g.config = t.config = function(e, i) {
                    return new t(e, i)
                }, i = l("easing.RoughEase", function(t) {
                    t = t || {};
                    for (var i, n, r, s, o, a, l = t.taper || "none", c = [], u = 0, d = 0 | (t.points || 20), p = d, f = t.randomize !== !1, m = t.clamp === !0, g = t.template instanceof e ? t.template : null, v = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) i = f ? Math.random() : 1 / d * p, n = g ? g.getRatio(i) : i, "none" === l ? r = v : "out" === l ? (s = 1 - i, r = s * s * v) : "in" === l ? r = i * i * v : .5 > i ? (s = 2 * i, r = s * s * .5 * v) : (s = 2 * (1 - i), r = s * s * .5 * v), f ? n += Math.random() * r - .5 * r : p % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), c[u++] = {
                        x: i,
                        y: n
                    };
                    for (c.sort(function(e, t) {
                            return e.x - t.x
                        }), a = new h(1, 1, null), p = d; --p > -1;) o = c[p], a = new h(o.x, o.y, a);
                    this._prev = new h(0, 0, 0 !== a.t ? a : a.next)
                }, !0), g = i.prototype = new e, g.constructor = i, g.getRatio = function(e) {
                    var t = this._prev;
                    if (e > t.t) {
                        for (; t.next && e >= t.t;) t = t.next;
                        t = t.prev
                    } else
                        for (; t.prev && e <= t.t;) t = t.prev;
                    return this._prev = t, t.v + (e - t.t) / t.gap * t.c
                }, g.config = function(e) {
                    return new i(e)
                }, i.ease = new i, d("Bounce", c("BounceOut", function(e) {
                    return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                }), c("BounceIn", function(e) {
                    return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                }), c("BounceInOut", function(e) {
                    var t = .5 > e;
                    return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
                })), d("Circ", c("CircOut", function(e) {
                    return Math.sqrt(1 - (e -= 1) * e)
                }), c("CircIn", function(e) {
                    return -(Math.sqrt(1 - e * e) - 1)
                }), c("CircInOut", function(e) {
                    return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                })), n = function(t, i, n) {
                    var r = l("easing." + t, function(e, t) {
                            this._p1 = e >= 1 ? e : 1, this._p2 = (t || n) / (1 > e ? e : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                        }, !0),
                        s = r.prototype = new e;
                    return s.constructor = r, s.getRatio = i, s.config = function(e, t) {
                        return new r(e, t)
                    }, r
                }, d("Elastic", n("ElasticOut", function(e) {
                    return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function(e) {
                    return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
                }, .3), n("ElasticInOut", function(e) {
                    return (e *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
                }, .45)), d("Expo", c("ExpoOut", function(e) {
                    return 1 - Math.pow(2, -10 * e)
                }), c("ExpoIn", function(e) {
                    return Math.pow(2, 10 * (e - 1)) - .001
                }), c("ExpoInOut", function(e) {
                    return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
                })), d("Sine", c("SineOut", function(e) {
                    return Math.sin(e * a)
                }), c("SineIn", function(e) {
                    return -Math.cos(e * a) + 1
                }), c("SineInOut", function(e) {
                    return -.5 * (Math.cos(Math.PI * e) - 1)
                })), l("easing.EaseLookup", {
                    find: function(t) {
                        return e.map[t]
                    }
                }, !0), u(r.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(t, "SteppedEase", "ease,"), f
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e, t) {
        "use strict";
        var i = {},
            n = e.document,
            r = e.GreenSockGlobals = e.GreenSockGlobals || e;
        if (!r.TweenLite) {
            var s, o, a, l, c, u = function(e) {
                    var t, i = e.split("."),
                        n = r;
                    for (t = 0; t < i.length; t++) n[i[t]] = n = n[i[t]] || {};
                    return n
                },
                d = u("com.greensock"),
                h = 1e-10,
                p = function(e) {
                    var t, i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i
                },
                f = function() {},
                m = function() {
                    var e = Object.prototype.toString,
                        t = e.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
                    }
                }(),
                g = {},
                v = function(n, s, o, a) {
                    this.sc = g[n] ? g[n].sc : [], g[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(c) {
                        for (var d, h, p, f, m = s.length, y = m; --m > -1;)(d = g[s[m]] || new v(s[m], [])).gsClass ? (l[m] = d.gsClass, y--) : c && d.sc.push(this);
                        if (0 === y && o) {
                            if (h = ("com.greensock." + n).split("."), p = h.pop(), f = u(h.join("."))[p] = this.gsClass = o.apply(o, l), a)
                                if (r[p] = i[p] = f, "undefined" != typeof module && module.exports)
                                    if (n === t) {
                                        module.exports = i[t] = f;
                                        for (m in i) f[m] = i[m]
                                    } else i[t] && (i[t][p] = f);
                            else "function" == typeof define && define.amd && define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                return f
                            });
                            for (m = 0; m < this.sc.length; m++) this.sc[m].check()
                        }
                    }, this.check(!0)
                },
                y = e._gsDefine = function(e, t, i, n) {
                    return new v(e, t, i, n)
                },
                w = d._class = function(e, t, i) {
                    return t = t || function() {}, y(e, [], function() {
                        return t
                    }, i), t
                };
            y.globals = r;
            var _ = [0, 0, 1, 1],
                b = w("easing.Ease", function(e, t, i, n) {
                    this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? _.concat(t) : _
                }, !0),
                T = b.map = {},
                x = b.register = function(e, t, i, n) {
                    for (var r, s, o, a, l = t.split(","), c = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
                        for (s = l[c], r = n ? w("easing." + s, null, !0) : d.easing[s] || {}, o = u.length; --o > -1;) a = u[o], T[s + "." + a] = T[a + s] = r[a] = e.getRatio ? e : e[a] || new e
                };
            for (a = b.prototype, a._calcEnd = !1, a.getRatio = function(e) {
                    if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
                    var t = this._type,
                        i = this._power,
                        n = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : .5 > e ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) a = s[o] + ",Power" + o, x(new b(null, null, 1, o), a, "easeOut", !0), x(new b(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), x(new b(null, null, 3, o), a, "easeInOut");
            T.linear = d.easing.Linear.easeIn, T.swing = d.easing.Quad.easeInOut;
            var k = w("events.EventDispatcher", function(e) {
                this._listeners = {}, this._eventTarget = e || this
            });
            a = k.prototype, a.addEventListener = function(e, t, i, n, r) {
                r = r || 0;
                var s, o, a = this._listeners[e],
                    u = 0;
                for (this !== l || c || l.wake(), null == a && (this._listeners[e] = a = []), o = a.length; --o > -1;) s = a[o], s.c === t && s.s === i ? a.splice(o, 1) : 0 === u && s.pr < r && (u = o + 1);
                a.splice(u, 0, {
                    c: t,
                    s: i,
                    up: n,
                    pr: r
                })
            }, a.removeEventListener = function(e, t) {
                var i, n = this._listeners[e];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === t) return void n.splice(i, 1)
            }, a.dispatchEvent = function(e) {
                var t, i, n, r = this._listeners[e];
                if (r)
                    for (t = r.length, t > 1 && (r = r.slice(0)), i = this._eventTarget; --t > -1;) n = r[t], n && (n.up ? n.c.call(n.s || i, {
                        type: e,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var S = e.requestAnimationFrame,
                C = e.cancelAnimationFrame,
                z = Date.now || function() {
                    return (new Date).getTime()
                },
                P = z();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !S;) S = e[s[o] + "RequestAnimationFrame"], C = e[s[o] + "CancelAnimationFrame"] || e[s[o] + "CancelRequestAnimationFrame"];
            w("Ticker", function(e, t) {
                var i, r, s, o, a, u = this,
                    d = z(),
                    p = !(t === !1 || !S) && "auto",
                    m = 500,
                    g = 33,
                    v = "tick",
                    y = function(e) {
                        var t, n, l = z() - P;
                        l > m && (d += l - g), P += l, u.time = (P - d) / 1e3, t = u.time - a, (!i || t > 0 || e === !0) && (u.frame++, a += t + (t >= o ? .004 : o - t), n = !0), e !== !0 && (s = r(y)), n && u.dispatchEvent(v)
                    };
                k.call(u), u.time = u.frame = 0, u.tick = function() {
                    y(!0)
                }, u.lagSmoothing = function(e, t) {
                    m = e || 1 / h, g = Math.min(t, m, 0)
                }, u.sleep = function() {
                    null != s && (p && C ? C(s) : clearTimeout(s), r = f, s = null, u === l && (c = !1))
                }, u.wake = function(e) {
                    null !== s ? u.sleep() : e ? d += -P + (P = z()) : u.frame > 10 && (P = z() - m + 5), r = 0 === i ? f : p && S ? S : function(e) {
                        return setTimeout(e, 1e3 * (a - u.time) + 1 | 0)
                    }, u === l && (c = !0), y(2)
                }, u.fps = function(e) {
                    return arguments.length ? (i = e, o = 1 / (i || 60), a = this.time + o, void u.wake()) : i
                }, u.useRAF = function(e) {
                    return arguments.length ? (u.sleep(), p = e, void u.fps(i)) : p
                }, u.fps(e), setTimeout(function() {
                    "auto" === p && u.frame < 5 && "hidden" !== n.visibilityState && u.useRAF(!1)
                }, 1500)
            }), a = d.Ticker.prototype = new d.events.EventDispatcher, a.constructor = d.Ticker;
            var M = w("core.Animation", function(e, t) {
                if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, U) {
                    c || l.wake();
                    var i = this.vars.useFrames ? G : U;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = M.ticker = new d.Ticker, a = M.prototype, a._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;
            var O = function() {
                c && z() - P > 2e3 && "hidden" !== n.visibilityState && l.wake();
                var e = setTimeout(O, 2e3);
                e.unref && e.unref()
            };
            O(), a.play = function(e, t) {
                return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
            }, a.pause = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!0)
            }, a.resume = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!1)
            }, a.seek = function(e, t) {
                return this.totalTime(Number(e), t !== !1)
            }, a.restart = function(e, t) {
                return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
            }, a.reverse = function(e, t) {
                return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
            }, a.render = function(e, t, i) {}, a.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, a.isActive = function() {
                var e, t = this._timeline,
                    i = this._startTime;
                return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime(!0)) >= i && e < i + this.totalDuration() / this._timeScale - 1e-7
            }, a._enabled = function(e, t) {
                return c || l.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
            }, a._kill = function(e, t) {
                return this._enabled(!1, !1)
            }, a.kill = function(e, t) {
                return this._kill(e, t), this
            }, a._uncache = function(e) {
                for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
                return this
            }, a._swapSelfInParams = function(e) {
                for (var t = e.length, i = e.concat(); --t > -1;) "{self}" === e[t] && (i[t] = this);
                return i
            }, a._callback = function(e) {
                var t = this.vars,
                    i = t[e],
                    n = t[e + "Params"],
                    r = t[e + "Scope"] || t.callbackScope || this,
                    s = n ? n.length : 0;
                switch (s) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, n[0]);
                        break;
                    case 2:
                        i.call(r, n[0], n[1]);
                        break;
                    default:
                        i.apply(r, n)
                }
            }, a.eventCallback = function(e, t, i, n) {
                if ("on" === (e || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[e];
                    null == t ? delete r[e] : (r[e] = t, r[e + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[e + "Scope"] = n), "onUpdate" === e && (this._onUpdate = t)
                }
                return this
            }, a.delay = function(e) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
            }, a.duration = function(e) {
                return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, a.totalDuration = function(e) {
                return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
            }, a.time = function(e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
            }, a.totalTime = function(e, t, i) {
                if (c || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > e && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (e > n && !i && (e = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - e : e) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (D.length && K(), this.render(e, t, !1), D.length && K())
                }
                return this
            }, a.progress = a.totalProgress = function(e, t) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * e, t) : i ? this._time / i : this.ratio
            }, a.startTime = function(e) {
                return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
            }, a.endTime = function(e) {
                return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
            }, a.timeScale = function(e) {
                if (!arguments.length) return this._timeScale;
                if (e = e || h, this._timeline && this._timeline.smoothChildTiming) {
                    var t = this._pauseTime,
                        i = t || 0 === t ? t : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / e
                }
                return this._timeScale = e, this._uncache(!1)
            }, a.reversed = function(e) {
                return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, a.paused = function(e) {
                if (!arguments.length) return this._paused;
                var t, i, n = this._timeline;
                return e != this._paused && n && (c || e || l.wake(), t = n.rawTime(), i = t - this._pauseTime, !e && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== i && this._initted && this.duration() && (t = n.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))), this._gc && !e && this._enabled(!0, !1), this
            };
            var E = w("core.SimpleTimeline", function(e) {
                M.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            a = E.prototype = new M, a.constructor = E, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function(e, t, i, n) {
                var r, s;
                if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (s = e._startTime; r && r._startTime > s;) r = r._prev;
                return r ? (e._next = r._next, r._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = r, this._recent = e, this._timeline && this._uncache(!0), this
            }, a._remove = function(e, t) {
                return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, a.render = function(e, t, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = e; r;) n = r._next, (r._active || e >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)), r = n
            }, a.rawTime = function() {
                return c || l.wake(), this._totalTime
            };
            var A = w("TweenLite", function(t, i, n) {
                    if (M.call(this, i, n), this.render = A.prototype.render, null == t) throw "Cannot tween a null target.";
                    this.target = t = "string" != typeof t ? t : A.selector(t) || t;
                    var r, s, o, a = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? V[A.defaultOverwrite] : "number" == typeof l ? l >> 0 : V[l], (a || t instanceof Array || t.push && m(t)) && "number" != typeof t[0])
                        for (this._targets = o = p(t), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(p(s))) : (this._siblings[r] = Q(s, this, !1), 1 === l && this._siblings[r].length > 1 && ee(s, this, null, 1, this._siblings[r])) : (s = o[r--] = A.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = Q(t, this, !1), 1 === l && this._siblings.length > 1 && ee(t, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -h, this.render(Math.min(0, -this._delay)))
                }, !0),
                L = function(t) {
                    return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
                },
                I = function(e, t) {
                    var i, n = {};
                    for (i in e) Y[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!q[i] || q[i] && q[i]._autoCSS) || (n[i] = e[i], delete e[i]);
                    e.css = n
                };
            a = A.prototype = new M, a.constructor = A, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, A.version = "1.20.2", A.defaultEase = a._ease = new b(null, null, 1, 1), A.defaultOverwrite = "auto", A.ticker = l, A.autoSleep = 120, A.lagSmoothing = function(e, t) {
                l.lagSmoothing(e, t)
            }, A.selector = e.$ || e.jQuery || function(t) {
                var i = e.$ || e.jQuery;
                return i ? (A.selector = i, i(t)) : "undefined" == typeof n ? t : n.querySelectorAll ? n.querySelectorAll(t) : n.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
            };
            var D = [],
                R = {},
                N = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                W = /[\+-]=-?[\.\d]/,
                F = function(e) {
                    for (var t, i = this._firstPT, n = 1e-6; i;) t = i.blob ? 1 === e && this.end ? this.end : e ? this.join("") : this.start : i.c * e + i.s, i.m ? t = i.m(t, this._target || i.t) : n > t && t > -n && !i.blob && (t = 0), i.f ? i.fp ? i.t[i.p](i.fp, t) : i.t[i.p](t) : i.t[i.p] = t, i = i._next
                },
                H = function(e, t, i, n) {
                    var r, s, o, a, l, c, u, d = [],
                        h = 0,
                        p = "",
                        f = 0;
                    for (d.start = e, d.end = t, e = d[0] = e + "", t = d[1] = t + "", i && (i(d), e = d[0], t = d[1]), d.length = 0, r = e.match(N) || [], s = t.match(N) || [], n && (n._next = null, n.blob = 1, d._firstPT = d._applyPT = n), l = s.length, a = 0; l > a; a++) u = s[a], c = t.substr(h, t.indexOf(u, h) - h), p += c || !a ? c : ",", h += c.length, f ? f = (f + 1) % 5 : "rgba(" === c.substr(-5) && (f = 1), u === r[a] || r.length <= a ? p += u : (p && (d.push(p), p = ""), o = parseFloat(r[a]), d.push(o), d._firstPT = {
                        _next: d._firstPT,
                        t: d,
                        p: d.length - 1,
                        s: o,
                        c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
                        f: 0,
                        m: f && 4 > f ? Math.round : 0
                    }), h += u.length;
                    return p += t.substr(h), p && d.push(p), d.setRatio = F, W.test(t) && (d.end = 0), d
                },
                B = function(e, t, i, n, r, s, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, e));
                    var c, u = typeof e[t],
                        d = "function" !== u ? "" : t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3),
                        h = "get" !== i ? i : d ? o ? e[d](o) : e[d]() : e[t],
                        p = "string" == typeof n && "=" === n.charAt(1),
                        f = {
                            t: e,
                            p: t,
                            s: h,
                            f: "function" === u,
                            pg: 0,
                            n: r || t,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: p ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - h || 0
                        };
                    return ("number" != typeof h || "number" != typeof n && !p) && (o || isNaN(h) || !p && isNaN(n) || "boolean" == typeof h || "boolean" == typeof n ? (f.fp = o, c = H(h, p ? parseFloat(f.s) + f.c : n, a || A.defaultStringFilter, f), f = {
                        t: c,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: r || t,
                        pr: 0,
                        m: 0
                    }) : (f.s = parseFloat(h), p || (f.c = parseFloat(n) - f.s || 0))), f.c ? ((f._next = this._firstPT) && (f._next._prev = f), this._firstPT = f, f) : void 0
                },
                j = A._internals = {
                    isArray: m,
                    isSelector: L,
                    lazyTweens: D,
                    blobDif: H
                },
                q = A._plugins = {},
                $ = j.tweenLookup = {},
                X = 0,
                Y = j.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1
                },
                V = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                G = M._rootFramesTimeline = new E,
                U = M._rootTimeline = new E,
                Z = 30,
                K = j.lazyRender = function() {
                    var e, t = D.length;
                    for (R = {}; --t > -1;) e = D[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
                    D.length = 0
                };
            U._startTime = l.time, G._startTime = l.frame, U._active = G._active = !0, setTimeout(K, 1), M._updateRoot = A.render = function() {
                var e, t, i;
                if (D.length && K(), U.render((l.time - U._startTime) * U._timeScale, !1, !1), G.render((l.frame - G._startTime) * G._timeScale, !1, !1), D.length && K(), l.frame >= Z) {
                    Z = l.frame + (parseInt(A.autoSleep, 10) || 120);
                    for (i in $) {
                        for (t = $[i].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                        0 === t.length && delete $[i]
                    }
                    if (i = U._first, (!i || i._paused) && A.autoSleep && !G._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", M._updateRoot);
            var Q = function(e, t, i) {
                    var n, r, s = e._gsTweenID;
                    if ($[s || (e._gsTweenID = s = "t" + X++)] || ($[s] = {
                            target: e,
                            tweens: []
                        }), t && (n = $[s].tweens, n[r = n.length] = t, i))
                        for (; --r > -1;) n[r] === t && n.splice(r, 1);
                    return $[s].tweens
                },
                J = function(e, t, i, n) {
                    var r, s, o = e.vars.onOverwrite;
                    return o && (r = o(e, t, i, n)), o = A.onOverwrite, o && (s = o(e, t, i, n)), r !== !1 && s !== !1
                },
                ee = function(e, t, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; l > s; s++)
                            if ((a = r[s]) !== t) a._gc || a._kill(null, e, t) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var c, u = t._startTime + h,
                        d = [],
                        p = 0,
                        f = 0 === t._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === t || a._gc || a._paused || (a._timeline !== t._timeline ? (c = c || te(t, 0, f), 0 === te(a, c, f) && (d[p++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((f || !a._initted) && u - a._startTime <= 2e-10 || (d[p++] = a)));
                    for (s = p; --s > -1;)
                        if (a = d[s], 2 === n && a._kill(i, e, t) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !J(a, t)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                te = function(e, t, i) {
                    for (var n = e._timeline, r = n._timeScale, s = e._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > t ? s - t : i && s === t || !e._initted && 2 * h > s - t ? h : (s += e.totalDuration() / e._timeScale / r) > t + h ? 0 : s - t - h
                };
            a._init = function() {
                var e, t, i, n, r, s, o = this.vars,
                    a = this._overwrittenProps,
                    l = this._duration,
                    c = !!o.immediateRender,
                    u = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = c && o.lazy !== !1, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = A.to(this.target, 0, r), c)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (c = !1), i = {};
                        for (n in o) Y[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = c && o.lazy !== !1, i.immediateRender = c, this._startAt = A.to(this.target, 0, i), c) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof b ? u : "function" == typeof u ? new b(u, o.easeParams) : T[u] || A.defaultEase : A.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, e = 0; s > e; e++) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null, e) && (t = !0);
                else t = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (t && A._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, a._initProps = function(t, i, n, r, s) {
                var o, a, l, c, u, d;
                if (null == t) return !1;
                R[t._gsTweenID] && K(), this.vars.css || t.style && t !== e && t.nodeType && q.css && this.vars.autoCSS !== !1 && I(this.vars, t);
                for (o in this.vars)
                    if (d = this.vars[o], Y[o]) d && (d instanceof Array || d.push && m(d)) && -1 !== d.join("").indexOf("{self}") && (this.vars[o] = d = this._swapSelfInParams(d, this));
                    else if (q[o] && (c = new q[o])._onInitTween(t, this.vars[o], this, s)) {
                    for (this._firstPT = u = {
                            _next: this._firstPT,
                            t: c,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: c._priority,
                            m: 0
                        }, a = c._overwriteProps.length; --a > -1;) i[c._overwriteProps[a]] = this._firstPT;
                    (c._priority || c._onInitAllProps) && (l = !0), (c._onDisable || c._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u)
                } else i[o] = B.call(this, t, o, "get", d, o, 0, null, this.vars.stringFilter, s);
                return r && this._kill(r, t) ? this._initProps(t, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && ee(t, this, i, this._overwrite, n) ? (this._kill(i, t), this._initProps(t, i, n, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (R[t._gsTweenID] = !0), l)
            }, a.render = function(e, t, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    c = this._rawPrevTime;
                if (e >= l - 1e-7 && e >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (0 > c || 0 >= e && e >= -1e-7 || c === h && "isPause" !== this.data) && c !== e && (i = !0, c > h && (r = "onReverseComplete")), this._rawPrevTime = o = !t || e || c === e ? e : h);
                else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && c > 0) && (r = "onReverseComplete", n = this._reversed), 0 > e && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (c >= 0 && (c !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !t || e || c === e ? e : h)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = e, this._easeType) {
                    var u = e / l,
                        d = this._easeType,
                        p = this._easePower;
                    (1 === d || 3 === d && u >= .5) && (u = 1 - u), 3 === d && (u *= 2), 1 === p ? u *= u : 2 === p ? u *= u * u : 3 === p ? u *= u * u * u : 4 === p && (u *= u * u * u * u), 1 === d ? this.ratio = 1 - u : 2 === d ? this.ratio = u : .5 > e / l ? this.ratio = u / 2 : this.ratio = 1 - u / 2
                } else this.ratio = this._ease.getRatio(e / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = c, D.push(this), void(this._lazy = [e, t]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && e >= 0 && (this._active = !0), 0 === a && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (0 > e && this._startAt && e !== -1e-4 && this._startAt.render(e, t, i), t || (this._time !== a || n || i) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === h && o !== h && (this._rawPrevTime = 0))
                }
            }, a._kill = function(e, t, i) {
                if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                t = "string" != typeof t ? t || this._targets || this.target : A.selector(t) || t;
                var n, r, s, o, a, l, c, u, d, h = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((m(t) || L(t)) && "number" != typeof t[0])
                    for (n = t.length; --n > -1;) this._kill(e, t[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (t === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (t !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (c = e || a, u = e !== r && "all" !== r && e !== a && ("object" != typeof e || !e._tempKill), i && (A.onOverwrite || this.vars.onOverwrite)) {
                            for (s in c) a[s] && (d || (d = []), d.push(s));
                            if ((d || !e) && !J(this, i, t, d)) return !1
                        }
                        for (s in c)(o = a[s]) && (h && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(c) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, a.invalidate = function() {
                return this._notifyPluginsOfEnabled && A._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], M.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -h, this.render(Math.min(0, -this._delay))), this
            }, a._enabled = function(e, t) {
                if (c || l.wake(), e && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = Q(n[i], this, !0);
                    else this._siblings = Q(this.target, this, !0)
                }
                return M.prototype._enabled.call(this, e, t), !(!this._notifyPluginsOfEnabled || !this._firstPT) && A._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
            }, A.to = function(e, t, i) {
                return new A(e, t, i)
            }, A.from = function(e, t, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new A(e, t, i)
            }, A.fromTo = function(e, t, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new A(e, t, n)
            }, A.delayedCall = function(e, t, i, n, r) {
                return new A(t, 0, {
                    delay: e,
                    onComplete: t,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: t,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, A.set = function(e, t) {
                return new A(e, 0, t)
            }, A.getTweensOf = function(e, t) {
                if (null == e) return [];
                e = "string" != typeof e ? e : A.selector(e) || e;
                var i, n, r, s;
                if ((m(e) || L(e)) && "number" != typeof e[0]) {
                    for (i = e.length, n = []; --i > -1;) n = n.concat(A.getTweensOf(e[i], t));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else if (e._gsTweenID)
                    for (n = Q(e).concat(), i = n.length; --i > -1;)(n[i]._gc || t && !n[i].isActive()) && n.splice(i, 1);
                return n || []
            }, A.killTweensOf = A.killDelayedCallsTo = function(e, t, i) {
                "object" == typeof t && (i = t, t = !1);
                for (var n = A.getTweensOf(e, t), r = n.length; --r > -1;) n[r]._kill(i, e)
            };
            var ie = w("plugins.TweenPlugin", function(e, t) {
                this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = ie.prototype
            }, !0);
            if (a = ie.prototype, ie.version = "1.19.0", ie.API = 2, a._firstPT = null, a._addTween = B, a.setRatio = F, a._kill = function(e) {
                    var t, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != e[this._propName]) this._overwriteProps = [];
                    else
                        for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
                    for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, a._mod = a._roundProps = function(e) {
                    for (var t, i = this._firstPT; i;) t = e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")], t && "function" == typeof t && (2 === i.f ? i.t._applyPT.m = t : i.m = t), i = i._next
                }, A._onPluginEvent = function(e, t) {
                    var i, n, r, s, o, a = t._firstPT;
                    if ("_onInitAllProps" === e) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = t._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[e] && a.t[e]() && (i = !0), a = a._next;
                    return i
                }, ie.activate = function(e) {
                    for (var t = e.length; --t > -1;) e[t].API === ie.API && (q[(new e[t])._propName] = e[t]);
                    return !0
                }, y.plugin = function(e) {
                    if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                    var t, i = e.propName,
                        n = e.priority || 0,
                        r = e.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = w("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            ie.call(this, i, n), this._overwriteProps = r || []
                        }, e.global === !0),
                        a = o.prototype = new ie(i);
                    a.constructor = o, o.API = e.API;
                    for (t in s) "function" == typeof e[t] && (a[s[t]] = e[t]);
                    return o.version = e.version, ie.activate([o]), o
                }, s = e._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (a in g) g[a].func || e.console.log("GSAP encountered missing dependency: " + a)
            }
            c = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), ! function(e, t, i, n) {
        "use strict";

        function r(e, t, i) {
            return setTimeout(c(e, i), t)
        }

        function s(e, t, i) {
            return !!Array.isArray(e) && (o(e, i[t], i), !0)
        }

        function o(e, t, i) {
            var r;
            if (e)
                if (e.forEach) e.forEach(t, i);
                else if (e.length !== n)
                for (r = 0; r < e.length;) t.call(i, e[r], r, e), r++;
            else
                for (r in e) e.hasOwnProperty(r) && t.call(i, e[r], r, e)
        }

        function a(t, i, n) {
            var r = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
            return function() {
                var i = new Error("get-stack-trace"),
                    n = i && i.stack ? i.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
                    s = e.console && (e.console.warn || e.console.log);
                return s && s.call(e.console, r, n), t.apply(this, arguments)
            }
        }

        function l(e, t, i) {
            var n, r = t.prototype;
            n = e.prototype = Object.create(r), n.constructor = e, n._super = r, i && de(n, i)
        }

        function c(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }

        function u(e, t) {
            return typeof e == fe ? e.apply(t ? t[0] || n : n, t) : e
        }

        function d(e, t) {
            return e === n ? t : e
        }

        function h(e, t, i) {
            o(g(t), function(t) {
                e.addEventListener(t, i, !1)
            })
        }

        function p(e, t, i) {
            o(g(t), function(t) {
                e.removeEventListener(t, i, !1)
            })
        }

        function f(e, t) {
            for (; e;) {
                if (e == t) return !0;
                e = e.parentNode
            }
            return !1
        }

        function m(e, t) {
            return e.indexOf(t) > -1
        }

        function g(e) {
            return e.trim().split(/\s+/g)
        }

        function v(e, t, i) {
            if (e.indexOf && !i) return e.indexOf(t);
            for (var n = 0; n < e.length;) {
                if (i && e[n][i] == t || !i && e[n] === t) return n;
                n++
            }
            return -1
        }

        function y(e) {
            return Array.prototype.slice.call(e, 0)
        }

        function w(e, t, i) {
            for (var n = [], r = [], s = 0; s < e.length;) {
                var o = t ? e[s][t] : e[s];
                v(r, o) < 0 && n.push(e[s]), r[s] = o, s++
            }
            return i && (n = t ? n.sort(function(e, i) {
                return e[t] > i[t]
            }) : n.sort()), n
        }

        function _(e, t) {
            for (var i, r, s = t[0].toUpperCase() + t.slice(1), o = 0; o < he.length;) {
                if (i = he[o], r = i ? i + s : t, r in e) return r;
                o++
            }
            return n
        }

        function b() {
            return _e++
        }

        function T(t) {
            var i = t.ownerDocument || t;
            return i.defaultView || i.parentWindow || e
        }

        function x(e, t) {
            var i = this;
            this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
                u(e.options.enable, [e]) && i.handler(t)
            }, this.init()
        }

        function k(e) {
            var t, i = e.options.inputClass;
            return new(t = i ? i : xe ? W : ke ? B : Te ? q : N)(e, S)
        }

        function S(e, t, i) {
            var n = i.pointers.length,
                r = i.changedPointers.length,
                s = t & Oe && n - r === 0,
                o = t & (Ae | Le) && n - r === 0;
            i.isFirst = !!s, i.isFinal = !!o, s && (e.session = {}), i.eventType = t, C(e, i), e.emit("hammer.input", i), e.recognize(i), e.session.prevInput = i
        }

        function C(e, t) {
            var i = e.session,
                n = t.pointers,
                r = n.length;
            i.firstInput || (i.firstInput = M(t)), r > 1 && !i.firstMultiple ? i.firstMultiple = M(t) : 1 === r && (i.firstMultiple = !1);
            var s = i.firstInput,
                o = i.firstMultiple,
                a = o ? o.center : s.center,
                l = t.center = O(n);
            t.timeStamp = ve(), t.deltaTime = t.timeStamp - s.timeStamp, t.angle = I(a, l), t.distance = L(a, l), z(i, t), t.offsetDirection = A(t.deltaX, t.deltaY);
            var c = E(t.deltaTime, t.deltaX, t.deltaY);
            t.overallVelocityX = c.x, t.overallVelocityY = c.y, t.overallVelocity = ge(c.x) > ge(c.y) ? c.x : c.y, t.scale = o ? R(o.pointers, n) : 1, t.rotation = o ? D(o.pointers, n) : 0, t.maxPointers = i.prevInput ? t.pointers.length > i.prevInput.maxPointers ? t.pointers.length : i.prevInput.maxPointers : t.pointers.length, P(i, t);
            var u = e.element;
            f(t.srcEvent.target, u) && (u = t.srcEvent.target), t.target = u
        }

        function z(e, t) {
            var i = t.center,
                n = e.offsetDelta || {},
                r = e.prevDelta || {},
                s = e.prevInput || {};
            t.eventType !== Oe && s.eventType !== Ae || (r = e.prevDelta = {
                x: s.deltaX || 0,
                y: s.deltaY || 0
            }, n = e.offsetDelta = {
                x: i.x,
                y: i.y
            }), t.deltaX = r.x + (i.x - n.x), t.deltaY = r.y + (i.y - n.y)
        }

        function P(e, t) {
            var i, r, s, o, a = e.lastInterval || t,
                l = t.timeStamp - a.timeStamp;
            if (t.eventType != Le && (l > Me || a.velocity === n)) {
                var c = t.deltaX - a.deltaX,
                    u = t.deltaY - a.deltaY,
                    d = E(l, c, u);
                r = d.x, s = d.y, i = ge(d.x) > ge(d.y) ? d.x : d.y, o = A(c, u), e.lastInterval = t
            } else i = a.velocity, r = a.velocityX, s = a.velocityY, o = a.direction;
            t.velocity = i, t.velocityX = r, t.velocityY = s, t.direction = o
        }

        function M(e) {
            for (var t = [], i = 0; i < e.pointers.length;) t[i] = {
                clientX: me(e.pointers[i].clientX),
                clientY: me(e.pointers[i].clientY)
            }, i++;
            return {
                timeStamp: ve(),
                pointers: t,
                center: O(t),
                deltaX: e.deltaX,
                deltaY: e.deltaY
            }
        }

        function O(e) {
            var t = e.length;
            if (1 === t) return {
                x: me(e[0].clientX),
                y: me(e[0].clientY)
            };
            for (var i = 0, n = 0, r = 0; t > r;) i += e[r].clientX, n += e[r].clientY, r++;
            return {
                x: me(i / t),
                y: me(n / t)
            }
        }

        function E(e, t, i) {
            return {
                x: t / e || 0,
                y: i / e || 0
            }
        }

        function A(e, t) {
            return e === t ? Ie : ge(e) >= ge(t) ? 0 > e ? De : Re : 0 > t ? Ne : We
        }

        function L(e, t, i) {
            i || (i = je);
            var n = t[i[0]] - e[i[0]],
                r = t[i[1]] - e[i[1]];
            return Math.sqrt(n * n + r * r)
        }

        function I(e, t, i) {
            i || (i = je);
            var n = t[i[0]] - e[i[0]],
                r = t[i[1]] - e[i[1]];
            return 180 * Math.atan2(r, n) / Math.PI
        }

        function D(e, t) {
            return I(t[1], t[0], qe) + I(e[1], e[0], qe)
        }

        function R(e, t) {
            return L(t[0], t[1], qe) / L(e[0], e[1], qe)
        }

        function N() {
            this.evEl = Xe, this.evWin = Ye, this.pressed = !1, x.apply(this, arguments)
        }

        function W() {
            this.evEl = Ue, this.evWin = Ze, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function F() {
            this.evTarget = Qe, this.evWin = Je, this.started = !1, x.apply(this, arguments)
        }

        function H(e, t) {
            var i = y(e.touches),
                n = y(e.changedTouches);
            return t & (Ae | Le) && (i = w(i.concat(n), "identifier", !0)), [i, n]
        }

        function B() {
            this.evTarget = tt, this.targetIds = {}, x.apply(this, arguments)
        }

        function j(e, t) {
            var i = y(e.touches),
                n = this.targetIds;
            if (t & (Oe | Ee) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
            var r, s, o = y(e.changedTouches),
                a = [],
                l = this.target;
            if (s = i.filter(function(e) {
                    return f(e.target, l)
                }), t === Oe)
                for (r = 0; r < s.length;) n[s[r].identifier] = !0, r++;
            for (r = 0; r < o.length;) n[o[r].identifier] && a.push(o[r]), t & (Ae | Le) && delete n[o[r].identifier], r++;
            return a.length ? [w(s.concat(a), "identifier", !0), a] : void 0
        }

        function q() {
            x.apply(this, arguments);
            var e = c(this.handler, this);
            this.touch = new B(this.manager, e), this.mouse = new N(this.manager, e), this.primaryTouch = null, this.lastTouches = []
        }

        function $(e, t) {
            e & Oe ? (this.primaryTouch = t.changedPointers[0].identifier, X.call(this, t)) : e & (Ae | Le) && X.call(this, t)
        }

        function X(e) {
            var t = e.changedPointers[0];
            if (t.identifier === this.primaryTouch) {
                var i = {
                    x: t.clientX,
                    y: t.clientY
                };
                this.lastTouches.push(i);
                var n = this.lastTouches,
                    r = function() {
                        var e = n.indexOf(i);
                        e > -1 && n.splice(e, 1)
                    };
                setTimeout(r, it)
            }
        }

        function Y(e) {
            for (var t = e.srcEvent.clientX, i = e.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
                var r = this.lastTouches[n],
                    s = Math.abs(t - r.x),
                    o = Math.abs(i - r.y);
                if (nt >= s && nt >= o) return !0
            }
            return !1
        }

        function V(e, t) {
            this.manager = e, this.set(t)
        }

        function G(e) {
            if (m(e, ct)) return ct;
            var t = m(e, ut),
                i = m(e, dt);
            return t && i ? ct : t || i ? t ? ut : dt : m(e, lt) ? lt : at
        }

        function U() {
            if (!st) return !1;
            var t = {},
                i = e.CSS && e.CSS.supports;
            return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(n) {
                t[n] = !i || e.CSS.supports("touch-action", n)
            }), t
        }

        function Z(e) {
            this.options = de({}, this.defaults, e || {}), this.id = b(), this.manager = null, this.options.enable = d(this.options.enable, !0), this.state = pt, this.simultaneous = {}, this.requireFail = []
        }

        function K(e) {
            return e & yt ? "cancel" : e & gt ? "end" : e & mt ? "move" : e & ft ? "start" : ""
        }

        function Q(e) {
            return e == We ? "down" : e == Ne ? "up" : e == De ? "left" : e == Re ? "right" : ""
        }

        function J(e, t) {
            var i = t.manager;
            return i ? i.get(e) : e
        }

        function ee() {
            Z.apply(this, arguments)
        }

        function te() {
            ee.apply(this, arguments), this.pX = null, this.pY = null
        }

        function ie() {
            ee.apply(this, arguments)
        }

        function ne() {
            Z.apply(this, arguments), this._timer = null, this._input = null
        }

        function re() {
            ee.apply(this, arguments)
        }

        function se() {
            ee.apply(this, arguments)
        }

        function oe() {
            Z.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function ae(e, t) {
            return t = t || {}, t.recognizers = d(t.recognizers, ae.defaults.preset), new le(e, t)
        }

        function le(e, t) {
            this.options = de({}, ae.defaults, t || {}), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = e, this.input = k(this), this.touchAction = new V(this, this.options.touchAction), ce(this, !0), o(this.options.recognizers, function(e) {
                var t = this.add(new e[0](e[1]));
                e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
            }, this)
        }

        function ce(e, t) {
            var i = e.element;
            if (i.style) {
                var n;
                o(e.options.cssProps, function(r, s) {
                    n = _(i.style, s), t ? (e.oldCssProps[n] = i.style[n], i.style[n] = r) : i.style[n] = e.oldCssProps[n] || ""
                }), t || (e.oldCssProps = {})
            }
        }

        function ue(e, i) {
            var n = t.createEvent("Event");
            n.initEvent(e, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
        }
        var de, he = ["", "webkit", "Moz", "MS", "ms", "o"],
            pe = t.createElement("div"),
            fe = "function",
            me = Math.round,
            ge = Math.abs,
            ve = Date.now;
        de = "function" != typeof Object.assign ? function(e) {
            if (e === n || null === e) throw new TypeError("Cannot convert undefined or null to object");
            for (var t = Object(e), i = 1; i < arguments.length; i++) {
                var r = arguments[i];
                if (r !== n && null !== r)
                    for (var s in r) r.hasOwnProperty(s) && (t[s] = r[s])
            }
            return t
        } : Object.assign;
        var ye = a(function(e, t, i) {
                for (var r = Object.keys(t), s = 0; s < r.length;)(!i || i && e[r[s]] === n) && (e[r[s]] = t[r[s]]), s++;
                return e
            }, "extend", "Use `assign`."),
            we = a(function(e, t) {
                return ye(e, t, !0)
            }, "merge", "Use `assign`."),
            _e = 1,
            be = /mobile|tablet|ip(ad|hone|od)|android/i,
            Te = "ontouchstart" in e,
            xe = _(e, "PointerEvent") !== n,
            ke = Te && be.test(navigator.userAgent),
            Se = "touch",
            Ce = "pen",
            ze = "mouse",
            Pe = "kinect",
            Me = 25,
            Oe = 1,
            Ee = 2,
            Ae = 4,
            Le = 8,
            Ie = 1,
            De = 2,
            Re = 4,
            Ne = 8,
            We = 16,
            Fe = De | Re,
            He = Ne | We,
            Be = Fe | He,
            je = ["x", "y"],
            qe = ["clientX", "clientY"];
        x.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(T(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(T(this.element), this.evWin, this.domHandler)
            }
        };
        var $e = {
                mousedown: Oe,
                mousemove: Ee,
                mouseup: Ae
            },
            Xe = "mousedown",
            Ye = "mousemove mouseup";
        l(N, x, {
            handler: function(e) {
                var t = $e[e.type];
                t & Oe && 0 === e.button && (this.pressed = !0), t & Ee && 1 !== e.which && (t = Ae), this.pressed && (t & Ae && (this.pressed = !1), this.callback(this.manager, t, {
                    pointers: [e],
                    changedPointers: [e],
                    pointerType: ze,
                    srcEvent: e
                }))
            }
        });
        var Ve = {
                pointerdown: Oe,
                pointermove: Ee,
                pointerup: Ae,
                pointercancel: Le,
                pointerout: Le
            },
            Ge = {
                2: Se,
                3: Ce,
                4: ze,
                5: Pe
            },
            Ue = "pointerdown",
            Ze = "pointermove pointerup pointercancel";
        e.MSPointerEvent && !e.PointerEvent && (Ue = "MSPointerDown", Ze = "MSPointerMove MSPointerUp MSPointerCancel"), l(W, x, {
            handler: function(e) {
                var t = this.store,
                    i = !1,
                    n = e.type.toLowerCase().replace("ms", ""),
                    r = Ve[n],
                    s = Ge[e.pointerType] || e.pointerType,
                    o = s == Se,
                    a = v(t, e.pointerId, "pointerId");
                r & Oe && (0 === e.button || o) ? 0 > a && (t.push(e), a = t.length - 1) : r & (Ae | Le) && (i = !0), 0 > a || (t[a] = e, this.callback(this.manager, r, {
                    pointers: t,
                    changedPointers: [e],
                    pointerType: s,
                    srcEvent: e
                }), i && t.splice(a, 1))
            }
        });
        var Ke = {
                touchstart: Oe,
                touchmove: Ee,
                touchend: Ae,
                touchcancel: Le
            },
            Qe = "touchstart",
            Je = "touchstart touchmove touchend touchcancel";
        l(F, x, {
            handler: function(e) {
                var t = Ke[e.type];
                if (t === Oe && (this.started = !0), this.started) {
                    var i = H.call(this, e, t);
                    t & (Ae | Le) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, t, {
                        pointers: i[0],
                        changedPointers: i[1],
                        pointerType: Se,
                        srcEvent: e
                    })
                }
            }
        });
        var et = {
                touchstart: Oe,
                touchmove: Ee,
                touchend: Ae,
                touchcancel: Le
            },
            tt = "touchstart touchmove touchend touchcancel";
        l(B, x, {
            handler: function(e) {
                var t = et[e.type],
                    i = j.call(this, e, t);
                i && this.callback(this.manager, t, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: Se,
                    srcEvent: e
                })
            }
        });
        var it = 2500,
            nt = 25;
        l(q, x, {
            handler: function(e, t, i) {
                var n = i.pointerType == Se,
                    r = i.pointerType == ze;
                if (!(r && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                    if (n) $.call(this, t, i);
                    else if (r && Y.call(this, i)) return;
                    this.callback(e, t, i)
                }
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var rt = _(pe.style, "touchAction"),
            st = rt !== n,
            ot = "compute",
            at = "auto",
            lt = "manipulation",
            ct = "none",
            ut = "pan-x",
            dt = "pan-y",
            ht = U();
        V.prototype = {
            set: function(e) {
                e == ot && (e = this.compute()), st && this.manager.element.style && ht[e] && (this.manager.element.style[rt] = e), this.actions = e.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var e = [];
                return o(this.manager.recognizers, function(t) {
                    u(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
                }), G(e.join(" "))
            },
            preventDefaults: function(e) {
                var t = e.srcEvent,
                    i = e.offsetDirection;
                if (this.manager.session.prevented) return void t.preventDefault();
                var n = this.actions,
                    r = m(n, ct) && !ht[ct],
                    s = m(n, dt) && !ht[dt],
                    o = m(n, ut) && !ht[ut];
                if (r) {
                    var a = 1 === e.pointers.length,
                        l = e.distance < 2,
                        c = e.deltaTime < 250;
                    if (a && l && c) return
                }
                return o && s ? void 0 : r || s && i & Fe || o && i & He ? this.preventSrc(t) : void 0
            },
            preventSrc: function(e) {
                this.manager.session.prevented = !0, e.preventDefault()
            }
        };
        var pt = 1,
            ft = 2,
            mt = 4,
            gt = 8,
            vt = gt,
            yt = 16,
            wt = 32;
        Z.prototype = {
            defaults: {},
            set: function(e) {
                return de(this.options, e), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function(e) {
                if (s(e, "recognizeWith", this)) return this;
                var t = this.simultaneous;
                return e = J(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
            },
            dropRecognizeWith: function(e) {
                return s(e, "dropRecognizeWith", this) ? this : (e = J(e, this), delete this.simultaneous[e.id], this)
            },
            requireFailure: function(e) {
                if (s(e, "requireFailure", this)) return this;
                var t = this.requireFail;
                return e = J(e, this), -1 === v(t, e) && (t.push(e), e.requireFailure(this)), this
            },
            dropRequireFailure: function(e) {
                if (s(e, "dropRequireFailure", this)) return this;
                e = J(e, this);
                var t = v(this.requireFail, e);
                return t > -1 && this.requireFail.splice(t, 1), this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(e) {
                return !!this.simultaneous[e.id]
            },
            emit: function(e) {
                function t(t) {
                    i.manager.emit(t, e)
                }
                var i = this,
                    n = this.state;
                gt > n && t(i.options.event + K(n)), t(i.options.event), e.additionalEvent && t(e.additionalEvent), n >= gt && t(i.options.event + K(n))
            },
            tryEmit: function(e) {
                return this.canEmit() ? this.emit(e) : void(this.state = wt)
            },
            canEmit: function() {
                for (var e = 0; e < this.requireFail.length;) {
                    if (!(this.requireFail[e].state & (wt | pt))) return !1;
                    e++
                }
                return !0
            },
            recognize: function(e) {
                var t = de({}, e);
                return u(this.options.enable, [this, t]) ? (this.state & (vt | yt | wt) && (this.state = pt), this.state = this.process(t), void(this.state & (ft | mt | gt | yt) && this.tryEmit(t))) : (this.reset(), void(this.state = wt))
            },
            process: function(e) {},
            getTouchAction: function() {},
            reset: function() {}
        }, l(ee, Z, {
            defaults: {
                pointers: 1
            },
            attrTest: function(e) {
                var t = this.options.pointers;
                return 0 === t || e.pointers.length === t
            },
            process: function(e) {
                var t = this.state,
                    i = e.eventType,
                    n = t & (ft | mt),
                    r = this.attrTest(e);
                return n && (i & Le || !r) ? t | yt : n || r ? i & Ae ? t | gt : t & ft ? t | mt : ft : wt
            }
        }), l(te, ee, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Be
            },
            getTouchAction: function() {
                var e = this.options.direction,
                    t = [];
                return e & Fe && t.push(dt), e & He && t.push(ut), t
            },
            directionTest: function(e) {
                var t = this.options,
                    i = !0,
                    n = e.distance,
                    r = e.direction,
                    s = e.deltaX,
                    o = e.deltaY;
                return r & t.direction || (t.direction & Fe ? (r = 0 === s ? Ie : 0 > s ? De : Re, i = s != this.pX, n = Math.abs(e.deltaX)) : (r = 0 === o ? Ie : 0 > o ? Ne : We, i = o != this.pY, n = Math.abs(e.deltaY))), e.direction = r, i && n > t.threshold && r & t.direction
            },
            attrTest: function(e) {
                return ee.prototype.attrTest.call(this, e) && (this.state & ft || !(this.state & ft) && this.directionTest(e))
            },
            emit: function(e) {
                this.pX = e.deltaX, this.pY = e.deltaY;
                var t = Q(e.direction);
                t && (e.additionalEvent = this.options.event + t), this._super.emit.call(this, e)
            }
        }), l(ie, ee, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ct]
            },
            attrTest: function(e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & ft)
            },
            emit: function(e) {
                if (1 !== e.scale) {
                    var t = e.scale < 1 ? "in" : "out";
                    e.additionalEvent = this.options.event + t
                }
                this._super.emit.call(this, e)
            }
        }), l(ne, Z, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 251,
                threshold: 9
            },
            getTouchAction: function() {
                return [at]
            },
            process: function(e) {
                var t = this.options,
                    i = e.pointers.length === t.pointers,
                    n = e.distance < t.threshold,
                    s = e.deltaTime > t.time;
                if (this._input = e, !n || !i || e.eventType & (Ae | Le) && !s) this.reset();
                else if (e.eventType & Oe) this.reset(), this._timer = r(function() {
                    this.state = vt, this.tryEmit()
                }, t.time, this);
                else if (e.eventType & Ae) return vt;
                return wt
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(e) {
                this.state === vt && (e && e.eventType & Ae ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = ve(), this.manager.emit(this.options.event, this._input)))
            }
        }), l(re, ee, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [ct]
            },
            attrTest: function(e) {
                return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & ft)
            }
        }), l(se, ee, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .3,
                direction: Fe | He,
                pointers: 1
            },
            getTouchAction: function() {
                return te.prototype.getTouchAction.call(this)
            },
            attrTest: function(e) {
                var t, i = this.options.direction;
                return i & (Fe | He) ? t = e.overallVelocity : i & Fe ? t = e.overallVelocityX : i & He && (t = e.overallVelocityY), this._super.attrTest.call(this, e) && i & e.offsetDirection && e.distance > this.options.threshold && e.maxPointers == this.options.pointers && ge(t) > this.options.velocity && e.eventType & Ae
            },
            emit: function(e) {
                var t = Q(e.offsetDirection);
                t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
            }
        }), l(oe, Z, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 9,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [lt]
            },
            process: function(e) {
                var t = this.options,
                    i = e.pointers.length === t.pointers,
                    n = e.distance < t.threshold,
                    s = e.deltaTime < t.time;
                if (this.reset(), e.eventType & Oe && 0 === this.count) return this.failTimeout();
                if (n && s && i) {
                    if (e.eventType != Ae) return this.failTimeout();
                    var o = !this.pTime || e.timeStamp - this.pTime < t.interval,
                        a = !this.pCenter || L(this.pCenter, e.center) < t.posThreshold;
                    this.pTime = e.timeStamp, this.pCenter = e.center, a && o ? this.count += 1 : this.count = 1, this._input = e;
                    var l = this.count % t.taps;
                    if (0 === l) return this.hasRequireFailures() ? (this._timer = r(function() {
                        this.state = vt, this.tryEmit()
                    }, t.interval, this), ft) : vt
                }
                return wt
            },
            failTimeout: function() {
                return this._timer = r(function() {
                    this.state = wt
                }, this.options.interval, this), wt
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == vt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), ae.VERSION = "2.0.7", ae.defaults = {
            domEvents: !1,
            touchAction: ot,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [re, {
                    enable: !1
                }],
                [ie, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [se, {
                    direction: Fe
                }],
                [te, {
                        direction: Fe
                    },
                    ["swipe"]
                ],
                [oe],
                [oe, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [ne]
            ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var _t = 1,
            bt = 2;
        le.prototype = {
            set: function(e) {
                return de(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
            },
            stop: function(e) {
                this.session.stopped = e ? bt : _t
            },
            recognize: function(e) {
                var t = this.session;
                if (!t.stopped) {
                    this.touchAction.preventDefaults(e);
                    var i, n = this.recognizers,
                        r = t.curRecognizer;
                    (!r || r && r.state & vt) && (r = t.curRecognizer = null);
                    for (var s = 0; s < n.length;) i = n[s], t.stopped === bt || r && i != r && !i.canRecognizeWith(r) ? i.reset() : i.recognize(e), !r && i.state & (ft | mt | gt) && (r = t.curRecognizer = i), s++
                }
            },
            get: function(e) {
                if (e instanceof Z) return e;
                for (var t = this.recognizers, i = 0; i < t.length; i++)
                    if (t[i].options.event == e) return t[i];
                return null
            },
            add: function(e) {
                if (s(e, "add", this)) return this;
                var t = this.get(e.options.event);
                return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
            },
            remove: function(e) {
                if (s(e, "remove", this)) return this;
                if (e = this.get(e)) {
                    var t = this.recognizers,
                        i = v(t, e); - 1 !== i && (t.splice(i, 1), this.touchAction.update())
                }
                return this
            },
            on: function(e, t) {
                if (e !== n && t !== n) {
                    var i = this.handlers;
                    return o(g(e), function(e) {
                        i[e] = i[e] || [], i[e].push(t)
                    }), this
                }
            },
            off: function(e, t) {
                if (e !== n) {
                    var i = this.handlers;
                    return o(g(e), function(e) {
                        t ? i[e] && i[e].splice(v(i[e], t), 1) : delete i[e]
                    }), this
                }
            },
            emit: function(e, t) {
                this.options.domEvents && ue(e, t);
                var i = this.handlers[e] && this.handlers[e].slice();
                if (i && i.length) {
                    t.type = e, t.preventDefault = function() {
                        t.srcEvent.preventDefault()
                    };
                    for (var n = 0; n < i.length;) i[n](t), n++
                }
            },
            destroy: function() {
                this.element && ce(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, de(ae, {
            INPUT_START: Oe,
            INPUT_MOVE: Ee,
            INPUT_END: Ae,
            INPUT_CANCEL: Le,
            STATE_POSSIBLE: pt,
            STATE_BEGAN: ft,
            STATE_CHANGED: mt,
            STATE_ENDED: gt,
            STATE_RECOGNIZED: vt,
            STATE_CANCELLED: yt,
            STATE_FAILED: wt,
            DIRECTION_NONE: Ie,
            DIRECTION_LEFT: De,
            DIRECTION_RIGHT: Re,
            DIRECTION_UP: Ne,
            DIRECTION_DOWN: We,
            DIRECTION_HORIZONTAL: Fe,
            DIRECTION_VERTICAL: He,
            DIRECTION_ALL: Be,
            Manager: le,
            Input: x,
            TouchAction: V,
            TouchInput: B,
            MouseInput: N,
            PointerEventInput: W,
            TouchMouseInput: q,
            SingleTouchInput: F,
            Recognizer: Z,
            AttrRecognizer: ee,
            Tap: oe,
            Pan: te,
            Swipe: se,
            Pinch: ie,
            Rotate: re,
            Press: ne,
            on: h,
            off: p,
            each: o,
            merge: we,
            extend: ye,
            assign: de,
            inherit: l,
            bindFn: c,
            prefixed: _
        });
        var Tt = "undefined" != typeof e ? e : "undefined" != typeof self ? self : {};
        Tt.Hammer = ae, "function" == typeof define && define.amd ? define(function() {
            return ae
        }) : "undefined" != typeof module && module.exports ? module.exports = ae : e[i] = ae
    }(window, document, "Hammer"),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery", "hammerjs"], e) : "object" == typeof exports ? e(require("jquery"), require("hammerjs")) : e(jQuery, Hammer)
    }(function(e, t) {
        function i(i, n) {
            var r = e(i);
            r.data("hammer") || r.data("hammer", new t(r[0], n))
        }
        e.fn.hammer = function(e) {
            return this.each(function() {
                i(this, e)
            })
        }, t.Manager.prototype.emit = function(t) {
            return function(i, n) {
                t.call(this, i, n), e(this.element).trigger({
                    type: i,
                    gesture: n
                })
            }
        }(t.Manager.prototype.emit)
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        e.extend(e.fn, {
            validate: function(t) {
                if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var i = e.data(this[0], "validator");
                return i ? i : (this.attr("novalidate", "novalidate"), i = new e.validator(t, this[0]), e.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                    i.submitButton = t.currentTarget, e(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.on("submit.validate", function(t) {
                    function n() {
                        var n, r;
                        return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (n = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)), !i.settings.submitHandler || (r = i.settings.submitHandler.call(i, i.currentForm, t), n && n.remove(), void 0 !== r && r)
                    }
                    return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
                })), i)
            },
            valid: function() {
                var t, i, n;
                return e(this[0]).is("form") ? t = this.validate().form() : (n = [], t = !0, i = e(this[0].form).validate(), this.each(function() {
                    t = i.element(this) && t, t || (n = n.concat(i.errorList))
                }), i.errorList = n), t
            },
            rules: function(t, i) {
                var n, r, s, o, a, l, c = this[0];
                if (null != c && (!c.form && c.hasAttribute("contenteditable") && (c.form = this.closest("form")[0], c.name = this.attr("name")), null != c.form)) {
                    if (t) switch (n = e.data(c.form, "validator").settings, r = n.rules, s = e.validator.staticRules(c), t) {
                        case "add":
                            e.extend(s, e.validator.normalizeRule(i)), delete s.messages, r[c.name] = s, i.messages && (n.messages[c.name] = e.extend(n.messages[c.name], i.messages));
                            break;
                        case "remove":
                            return i ? (l = {}, e.each(i.split(/\s/), function(e, t) {
                                l[t] = s[t], delete s[t]
                            }), l) : (delete r[c.name], s)
                    }
                    return o = e.validator.normalizeRules(e.extend({}, e.validator.classRules(c), e.validator.attributeRules(c), e.validator.dataRules(c), e.validator.staticRules(c)), c), o.required && (a = o.required, delete o.required, o = e.extend({
                        required: a
                    }, o)), o.remote && (a = o.remote, delete o.remote, o = e.extend(o, {
                        remote: a
                    })), o
                }
            }
        }), e.extend(e.expr.pseudos || e.expr[":"], {
            blank: function(t) {
                return !e.trim("" + e(t).val())
            },
            filled: function(t) {
                var i = e(t).val();
                return null !== i && !!e.trim("" + i)
            },
            unchecked: function(t) {
                return !e(t).prop("checked")
            }
        }), e.validator = function(t, i) {
            this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = i, this.init()
        }, e.validator.format = function(t, i) {
            return 1 === arguments.length ? function() {
                var i = e.makeArray(arguments);
                return i.unshift(t), e.validator.format.apply(this, i)
            } : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), e.each(i, function(e, i) {
                t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                    return i
                })
            }), t)
        }, e.extend(e.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                pendingClass: "pending",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                errorContainer: e([]),
                errorLabelContainer: e([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(e) {
                    this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
                },
                onfocusout: function(e) {
                    this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
                },
                onkeyup: function(t, i) {
                    var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                    9 === i.which && "" === this.elementValue(t) || e.inArray(i.keyCode, n) !== -1 || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
                },
                onclick: function(e) {
                    e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                },
                highlight: function(t, i, n) {
                    "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(n) : e(t).addClass(i).removeClass(n)
                },
                unhighlight: function(t, i, n) {
                    "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(n) : e(t).removeClass(i).addClass(n)
                }
            },
            setDefaults: function(t) {
                e.extend(e.validator.defaults, t)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                equalTo: "Please enter the same value again.",
                maxlength: e.validator.format("Please enter no more than {0} characters."),
                minlength: e.validator.format("Please enter at least {0} characters."),
                rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
                range: e.validator.format("Please enter a value between {0} and {1}."),
                max: e.validator.format("Please enter a value less than or equal to {0}."),
                min: e.validator.format("Please enter a value greater than or equal to {0}."),
                step: e.validator.format("Please enter a multiple of {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function t(t) {
                        !this.form && this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0], this.name = e(this).attr("name"));
                        var i = e.data(this.form, "validator"),
                            n = "on" + t.type.replace(/^validate/, ""),
                            r = i.settings;
                        r[n] && !e(this).is(r.ignore) && r[n].call(i, this, t)
                    }
                    this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var i, n = this.groups = {};
                    e.each(this.settings.groups, function(t, i) {
                        "string" == typeof i && (i = i.split(/\s/)), e.each(i, function(e, i) {
                            n[i] = t
                        })
                    }), i = this.settings.rules, e.each(i, function(t, n) {
                        i[t] = e.validator.normalizeRule(n)
                    }), e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function() {
                    return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                    return this.valid()
                },
                element: function(t) {
                    var i, n, r = this.clean(t),
                        s = this.validationTargetFor(r),
                        o = this,
                        a = !0;
                    return void 0 === s ? delete this.invalid[r.name] : (this.prepareElement(s), this.currentElements = e(s), n = this.groups[s.name], n && e.each(this.groups, function(e, t) {
                        t === n && e !== s.name && (r = o.validationTargetFor(o.clean(o.findByName(e))), r && r.name in o.invalid && (o.currentElements.push(r), a = o.check(r) && a))
                    }), i = this.check(s) !== !1, a = a && i, i ? this.invalid[s.name] = !1 : this.invalid[s.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !i)), a
                },
                showErrors: function(t) {
                    if (t) {
                        var i = this;
                        e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, function(e, t) {
                            return {
                                message: e,
                                element: i.findByName(t)[0]
                            }
                        }), this.successList = e.grep(this.successList, function(e) {
                            return !(e.name in t)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                    var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                    this.resetElements(t)
                },
                resetElements: function(e) {
                    var t;
                    if (this.settings.unhighlight)
                        for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                    else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(e) {
                    var t, i = 0;
                    for (t in e) void 0 !== e[t] && null !== e[t] && e[t] !== !1 && i++;
                    return i
                },
                hideErrors: function() {
                    this.hideThese(this.toHide)
                },
                hideThese: function(e) {
                    e.not(this.containers).text(""), this.addWrapper(e).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
                },
                findLastActive: function() {
                    var t = this.lastActive;
                    return t && 1 === e.grep(this.errorList, function(e) {
                        return e.element.name === t.name
                    }).length && t
                },
                elements: function() {
                    var t = this,
                        i = {};
                    return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                        var n = this.name || e(this).attr("name");
                        return !n && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0], this.name = n), !(n in i || !t.objectLength(e(this).rules())) && (i[n] = !0, !0)
                    })
                },
                clean: function(t) {
                    return e(t)[0]
                },
                errors: function() {
                    var t = this.settings.errorClass.split(" ").join(".");
                    return e(this.settings.errorElement + "." + t, this.errorContext)
                },
                resetInternals: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
                },
                reset: function() {
                    this.resetInternals(), this.currentElements = e([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(e) {
                    this.reset(), this.toHide = this.errorsFor(e)
                },
                elementValue: function(t) {
                    var i, n, r = e(t),
                        s = t.type;
                    return "radio" === s || "checkbox" === s ? this.findByName(t.name).filter(":checked").val() : "number" === s && "undefined" != typeof t.validity ? t.validity.badInput ? "NaN" : r.val() : (i = t.hasAttribute("contenteditable") ? r.text() : r.val(), "file" === s ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (n = i.lastIndexOf("/"), n >= 0 ? i.substr(n + 1) : (n = i.lastIndexOf("\\"), n >= 0 ? i.substr(n + 1) : i)) : "string" == typeof i ? i.replace(/\r/g, "") : i)
                },
                check: function(t) {
                    t = this.validationTargetFor(this.clean(t));
                    var i, n, r, s, o = e(t).rules(),
                        a = e.map(o, function(e, t) {
                            return t
                        }).length,
                        l = !1,
                        c = this.elementValue(t);
                    if ("function" == typeof o.normalizer ? s = o.normalizer : "function" == typeof this.settings.normalizer && (s = this.settings.normalizer), s) {
                        if (c = s.call(t, c), "string" != typeof c) throw new TypeError("The normalizer should return a string value.");
                        delete o.normalizer
                    }
                    for (n in o) {
                        r = {
                            method: n,
                            parameters: o[n]
                        };
                        try {
                            if (i = e.validator.methods[n].call(this, c, t, r.parameters), "dependency-mismatch" === i && 1 === a) {
                                l = !0;
                                continue
                            }
                            if (l = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                            if (!i) return this.formatAndAdd(t, r), !1
                        } catch (u) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", u), u instanceof TypeError && (u.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method."), u
                        }
                    }
                    if (!l) return this.objectLength(o) && this.successList.push(t), !0
                },
                customDataMessage: function(t, i) {
                    return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
                },
                customMessage: function(e, t) {
                    var i = this.settings.messages[e];
                    return i && (i.constructor === String ? i : i[t])
                },
                findDefined: function() {
                    for (var e = 0; e < arguments.length; e++)
                        if (void 0 !== arguments[e]) return arguments[e]
                },
                defaultMessage: function(t, i) {
                    "string" == typeof i && (i = {
                        method: i
                    });
                    var n = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                        r = /\$?\{(\d+)\}/g;
                    return "function" == typeof n ? n = n.call(this, i.parameters, t) : r.test(n) && (n = e.validator.format(n.replace(r, "{$1}"), i.parameters)), n
                },
                formatAndAdd: function(e, t) {
                    var i = this.defaultMessage(e, t);
                    this.errorList.push({
                        message: i,
                        element: e,
                        method: t.method
                    }), this.errorMap[e.name] = i, this.submitted[e.name] = i
                },
                addWrapper: function(e) {
                    return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
                },
                defaultShowErrors: function() {
                    var e, t, i;
                    for (e = 0; this.errorList[e]; e++) i = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                    if (this.settings.unhighlight)
                        for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return e(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(t, i) {
                    var n, r, s, o, a = this.errorsFor(t),
                        l = this.idOrName(t),
                        c = e(t).attr("aria-describedby");
                    a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(i)) : (a = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""), n = a, this.settings.wrapper && (n = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, n, e(t)) : n.insertAfter(t), a.is("label") ? a.attr("for", l) : 0 === a.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (s = a.attr("id"), c ? c.match(new RegExp("\\b" + this.escapeCssMeta(s) + "\\b")) || (c += " " + s) : c = s, e(t).attr("aria-describedby", c), r = this.groups[t.name], r && (o = this, e.each(o.groups, function(t, i) {
                        i === r && e("[name='" + o.escapeCssMeta(t) + "']", o.currentForm).attr("aria-describedby", a.attr("id"))
                    })))), !i && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, t)), this.toShow = this.toShow.add(a)
                },
                errorsFor: function(t) {
                    var i = this.escapeCssMeta(this.idOrName(t)),
                        n = e(t).attr("aria-describedby"),
                        r = "label[for='" + i + "'], label[for='" + i + "'] *";
                    return n && (r = r + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")), this.errors().filter(r)
                },
                escapeCssMeta: function(e) {
                    return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
                },
                idOrName: function(e) {
                    return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
                },
                validationTargetFor: function(t) {
                    return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
                },
                checkable: function(e) {
                    return /radio|checkbox/i.test(e.type)
                },
                findByName: function(t) {
                    return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
                },
                getLength: function(t, i) {
                    switch (i.nodeName.toLowerCase()) {
                        case "select":
                            return e("option:selected", i).length;
                        case "input":
                            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                    }
                    return t.length
                },
                depend: function(e, t) {
                    return !this.dependTypes[typeof e] || this.dependTypes[typeof e](e, t)
                },
                dependTypes: {
                    "boolean": function(e) {
                        return e
                    },
                    string: function(t, i) {
                        return !!e(t, i.form).length
                    },
                    "function": function(e, t) {
                        return e(t)
                    }
                },
                optional: function(t) {
                    var i = this.elementValue(t);
                    return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
                },
                startRequest: function(t) {
                    this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
                },
                stopRequest: function(t, i) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.submitButton && e("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function(t, i) {
                    return i = "string" == typeof i && i || "remote", e.data(t, "previousValue") || e.data(t, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(t, {
                            method: i
                        })
                    })
                },
                destroy: function() {
                    this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(t, i) {
                t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
            },
            classRules: function(t) {
                var i = {},
                    n = e(t).attr("class");
                return n && e.each(n.split(" "), function() {
                    this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
                }), i
            },
            normalizeAttributeRule: function(e, t, i, n) {
                /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (n = Number(n), isNaN(n) && (n = void 0)), n || 0 === n ? e[i] = n : t === i && "range" !== t && (e[i] = !0)
            },
            attributeRules: function(t) {
                var i, n, r = {},
                    s = e(t),
                    o = t.getAttribute("type");
                for (i in e.validator.methods) "required" === i ? (n = t.getAttribute(i), "" === n && (n = !0), n = !!n) : n = s.attr(i), this.normalizeAttributeRule(r, o, i, n);
                return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
            },
            dataRules: function(t) {
                var i, n, r = {},
                    s = e(t),
                    o = t.getAttribute("type");
                for (i in e.validator.methods) n = s.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(r, o, i, n);
                return r
            },
            staticRules: function(t) {
                var i = {},
                    n = e.data(t.form, "validator");
                return n.settings.rules && (i = e.validator.normalizeRule(n.settings.rules[t.name]) || {}), i
            },
            normalizeRules: function(t, i) {
                return e.each(t, function(n, r) {
                    if (r === !1) return void delete t[n];
                    if (r.param || r.depends) {
                        var s = !0;
                        switch (typeof r.depends) {
                            case "string":
                                s = !!e(r.depends, i.form).length;
                                break;
                            case "function":
                                s = r.depends.call(i, i)
                        }
                        s ? t[n] = void 0 === r.param || r.param : (e.data(i.form, "validator").resetElements(e(i)), delete t[n])
                    }
                }), e.each(t, function(n, r) {
                    t[n] = e.isFunction(r) && "normalizer" !== n ? r(i) : r
                }), e.each(["minlength", "maxlength"], function() {
                    t[this] && (t[this] = Number(t[this]))
                }), e.each(["rangelength", "range"], function() {
                    var i;
                    t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
                }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
            },
            normalizeRule: function(t) {
                if ("string" == typeof t) {
                    var i = {};
                    e.each(t.split(/\s/), function() {
                        i[this] = !0
                    }), t = i
                }
                return t
            },
            addMethod: function(t, i, n) {
                e.validator.methods[t] = i, e.validator.messages[t] = void 0 !== n ? n : e.validator.messages[t], i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
            },
            methods: {
                required: function(t, i, n) {
                    if (!this.depend(n, i)) return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var r = e(i).val();
                        return r && r.length > 0
                    }
                    return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
                },
                email: function(e, t) {
                    return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
                },
                url: function(e, t) {
                    return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
                },
                date: function(e, t) {
                    return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
                },
                dateISO: function(e, t) {
                    return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
                },
                number: function(e, t) {
                    return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
                },
                digits: function(e, t) {
                    return this.optional(t) || /^\d+$/.test(e)
                },
                minlength: function(t, i, n) {
                    var r = e.isArray(t) ? t.length : this.getLength(t, i);
                    return this.optional(i) || r >= n
                },
                maxlength: function(t, i, n) {
                    var r = e.isArray(t) ? t.length : this.getLength(t, i);
                    return this.optional(i) || r <= n
                },
                rangelength: function(t, i, n) {
                    var r = e.isArray(t) ? t.length : this.getLength(t, i);
                    return this.optional(i) || r >= n[0] && r <= n[1]
                },
                min: function(e, t, i) {
                    return this.optional(t) || e >= i
                },
                max: function(e, t, i) {
                    return this.optional(t) || e <= i
                },
                range: function(e, t, i) {
                    return this.optional(t) || e >= i[0] && e <= i[1]
                },
                step: function(t, i, n) {
                    var r, s = e(i).attr("type"),
                        o = "Step attribute on input type " + s + " is not supported.",
                        a = ["text", "number", "range"],
                        l = new RegExp("\\b" + s + "\\b"),
                        c = s && !l.test(a.join()),
                        u = function(e) {
                            var t = ("" + e).match(/(?:\.(\d+))?$/);
                            return t && t[1] ? t[1].length : 0
                        },
                        d = function(e) {
                            return Math.round(e * Math.pow(10, r))
                        },
                        h = !0;
                    if (c) throw new Error(o);
                    return r = u(n), (u(t) > r || d(t) % d(n) !== 0) && (h = !1), this.optional(i) || h
                },
                equalTo: function(t, i, n) {
                    var r = e(n);
                    return this.settings.onfocusout && r.not(".validate-equalTo-blur").length && r.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                        e(i).valid()
                    }), t === r.val()
                },
                remote: function(t, i, n, r) {
                    if (this.optional(i)) return "dependency-mismatch";
                    r = "string" == typeof r && r || "remote";
                    var s, o, a, l = this.previousValue(i, r);
                    return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[i.name][r], this.settings.messages[i.name][r] = l.message, n = "string" == typeof n && {
                        url: n
                    } || n, a = e.param(e.extend({
                        data: t
                    }, n.data)), l.old === a ? l.valid : (l.old = a, s = this, this.startRequest(i), o = {}, o[i.name] = t, e.ajax(e.extend(!0, {
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: o,
                        context: s.currentForm,
                        success: function(e) {
                            var n, o, a, c = e === !0 || "true" === e;
                            s.settings.messages[i.name][r] = l.originalMessage, c ? (a = s.formSubmitted, s.resetInternals(), s.toHide = s.errorsFor(i), s.formSubmitted = a, s.successList.push(i), s.invalid[i.name] = !1, s.showErrors()) : (n = {}, o = e || s.defaultMessage(i, {
                                method: r,
                                parameters: t
                            }), n[i.name] = l.message = o, s.invalid[i.name] = !0, s.showErrors(n)), l.valid = c, s.stopRequest(i, c)
                        }
                    }, n)), "pending")
                }
            }
        });
        var t, i = {};
        return e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, n) {
            var r = e.port;
            "abort" === e.mode && (i[r] && i[r].abort(), i[r] = n)
        }) : (t = e.ajax, e.ajax = function(n) {
            var r = ("mode" in n ? n : e.ajaxSettings).mode,
                s = ("port" in n ? n : e.ajaxSettings).port;
            return "abort" === r ? (i[s] && i[s].abort(),
                i[s] = t.apply(this, arguments), i[s]) : t.apply(this, arguments)
        }), e
    }),
    function(e) {
        function t(e, t, i, n, r) {
            this._listener = t, this._isOnce = i, this.context = n, this._signal = e, this._priority = r || 0
        }

        function i(e, t) {
            if ("function" != typeof e) throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", t))
        }

        function n() {
            this._bindings = [], this._prevParams = null;
            var e = this;
            this.dispatch = function() {
                n.prototype.dispatch.apply(e, arguments)
            }
        }
        t.prototype = {
            active: !0,
            params: null,
            execute: function(e) {
                var t;
                return this.active && this._listener && (e = this.params ? this.params.concat(e) : e, t = this._listener.apply(this.context, e), this._isOnce && this.detach()), t
            },
            detach: function() {
                return this.isBound() ? this._signal.remove(this._listener, this.context) : null
            },
            isBound: function() {
                return !!this._signal && !!this._listener
            },
            isOnce: function() {
                return this._isOnce
            },
            getListener: function() {
                return this._listener
            },
            getSignal: function() {
                return this._signal
            },
            _destroy: function() {
                delete this._signal, delete this._listener, delete this.context
            },
            toString: function() {
                return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
            }
        }, n.prototype = {
            VERSION: "1.0.0",
            memorize: !1,
            _shouldPropagate: !0,
            active: !0,
            _registerListener: function(e, i, n, r) {
                var s = this._indexOfListener(e, n);
                if (s !== -1) {
                    if (e = this._bindings[s], e.isOnce() !== i) throw Error("You cannot add" + (i ? "" : "Once") + "() then add" + (i ? "Once" : "") + "() the same listener without removing the relationship first.")
                } else e = new t(this, e, i, n, r), this._addBinding(e);
                return this.memorize && this._prevParams && e.execute(this._prevParams), e
            },
            _addBinding: function(e) {
                var t = this._bindings.length;
                do --t; while (this._bindings[t] && e._priority <= this._bindings[t]._priority);
                this._bindings.splice(t + 1, 0, e)
            },
            _indexOfListener: function(e, t) {
                for (var i, n = this._bindings.length; n--;)
                    if (i = this._bindings[n], i._listener === e && i.context === t) return n;
                return -1
            },
            has: function(e, t) {
                return this._indexOfListener(e, t) !== -1
            },
            add: function(e, t, n) {
                return i(e, "add"), this._registerListener(e, !1, t, n)
            },
            addOnce: function(e, t, n) {
                return i(e, "addOnce"), this._registerListener(e, !0, t, n)
            },
            remove: function(e, t) {
                i(e, "remove");
                var n = this._indexOfListener(e, t);
                return n !== -1 && (this._bindings[n]._destroy(), this._bindings.splice(n, 1)), e
            },
            removeAll: function() {
                for (var e = this._bindings.length; e--;) this._bindings[e]._destroy();
                this._bindings.length = 0
            },
            getNumListeners: function() {
                return this._bindings.length
            },
            halt: function() {
                this._shouldPropagate = !1
            },
            dispatch: function(e) {
                if (this.active) {
                    var t, i = Array.prototype.slice.call(arguments),
                        n = this._bindings.length;
                    if (this.memorize && (this._prevParams = i), n) {
                        t = this._bindings.slice(), this._shouldPropagate = !0;
                        do n--; while (t[n] && this._shouldPropagate && t[n].execute(i) !== !1)
                    }
                }
            },
            forget: function() {
                this._prevParams = null
            },
            dispose: function() {
                this.removeAll(), delete this._bindings, delete this._prevParams
            },
            toString: function() {
                return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
            }
        };
        var r = n;
        r.Signal = n, "function" == typeof define && define.amd ? define(function() {
            return r
        }) : "undefined" != typeof module && module.exports ? module.exports = r : e.signals = r
    }(this), ! function() {
        "use strict";
        var e, t = function(n, r) {
            function s(e) {
                return Math.floor(e)
            }

            function o() {
                var e = b.params.autoplay,
                    t = b.slides.eq(b.activeIndex);
                t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || b.params.autoplay), b.autoplayTimeoutId = setTimeout(function() {
                    b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? r.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
                }, e)
            }

            function a(t, i) {
                var n = e(t.target);
                if (!n.is(i))
                    if ("string" == typeof i) n = n.parents(i);
                    else if (i.nodeType) {
                    var r;
                    return n.parents().each(function(e, t) {
                        t === i && (r = i)
                    }), r ? i : void 0
                }
                if (0 !== n.length) return n[0]
            }

            function l(e, t) {
                t = t || {};
                var i = window.MutationObserver || window.WebkitMutationObserver,
                    n = new i(function(e) {
                        e.forEach(function(e) {
                            b.onResize(!0), b.emit("onObserverUpdate", b, e)
                        })
                    });
                n.observe(e, {
                    attributes: void 0 === t.attributes || t.attributes,
                    childList: void 0 === t.childList || t.childList,
                    characterData: void 0 === t.characterData || t.characterData
                }), b.observers.push(n)
            }

            function c(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = e.keyCode || e.charCode;
                if (!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === t || !b.isHorizontal() && 40 === t)) return !1;
                if (!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === t || !b.isHorizontal() && 38 === t)) return !1;
                if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                    if (37 === t || 39 === t || 38 === t || 40 === t) {
                        var i = !1;
                        if (b.container.parents("." + b.params.slideClass).length > 0 && 0 === b.container.parents("." + b.params.slideActiveClass).length) return;
                        var n = {
                                left: window.pageXOffset,
                                top: window.pageYOffset
                            },
                            r = window.innerWidth,
                            s = window.innerHeight,
                            o = b.container.offset();
                        b.rtl && (o.left = o.left - b.container[0].scrollLeft);
                        for (var a = [
                                [o.left, o.top],
                                [o.left + b.width, o.top],
                                [o.left, o.top + b.height],
                                [o.left + b.width, o.top + b.height]
                            ], l = 0; l < a.length; l++) {
                            var c = a[l];
                            c[0] >= n.left && c[0] <= n.left + r && c[1] >= n.top && c[1] <= n.top + s && (i = !0)
                        }
                        if (!i) return
                    }
                    b.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !b.rtl || 37 === t && b.rtl) && b.slideNext(), (37 === t && !b.rtl || 39 === t && b.rtl) && b.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && b.slideNext(), 38 === t && b.slidePrev()), b.emit("onKeyPress", b, t)
                }
            }

            function u(e) {
                var t = 0,
                    i = 0,
                    n = 0,
                    r = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), n = 10 * t, r = 10 * i, "deltaY" in e && (r = e.deltaY), "deltaX" in e && (n = e.deltaX), (n || r) && e.deltaMode && (1 === e.deltaMode ? (n *= 40, r *= 40) : (n *= 800, r *= 800)), n && !t && (t = n < 1 ? -1 : 1), r && !i && (i = r < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: n,
                    pixelY: r
                }
            }

            function d(e) {
                e.originalEvent && (e = e.originalEvent);
                var t = 0,
                    i = b.rtl ? -1 : 1,
                    n = u(e);
                if (b.params.mousewheelForceToAxis)
                    if (b.isHorizontal()) {
                        if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return;
                        t = n.pixelX * i
                    } else {
                        if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return;
                        t = n.pixelY
                    } else t = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * i : -n.pixelY;
                if (0 !== t) {
                    if (b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
                        var r = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
                            s = b.isBeginning,
                            o = b.isEnd;
                        if (r >= b.minTranslate() && (r = b.minTranslate()), r <= b.maxTranslate() && (r = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(r), b.updateProgress(), b.updateActiveIndex(), (!s && b.isBeginning || !o && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function() {
                                b.slideReset()
                            }, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), b.emit("onScroll", b, e), b.params.autoplay && b.params.autoplayDisableOnInteraction && b.stopAutoplay(), 0 === r || r === b.maxTranslate()) return
                    } else {
                        if ((new window.Date).getTime() - b.mousewheel.lastScrollTime > 60)
                            if (t < 0)
                                if (b.isEnd && !b.params.loop || b.animating) {
                                    if (b.params.mousewheelReleaseOnEdges) return !0
                                } else b.slideNext(), b.emit("onScroll", b, e);
                        else if (b.isBeginning && !b.params.loop || b.animating) {
                            if (b.params.mousewheelReleaseOnEdges) return !0
                        } else b.slidePrev(), b.emit("onScroll", b, e);
                        b.mousewheel.lastScrollTime = (new window.Date).getTime()
                    }
                    return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
                }
            }

            function h(t, i) {
                t = e(t);
                var n, r, s, o = b.rtl ? -1 : 1;
                n = t.attr("data-swiper-parallax") || "0", r = t.attr("data-swiper-parallax-x"), s = t.attr("data-swiper-parallax-y"), r || s ? (r = r || "0", s = s || "0") : b.isHorizontal() ? (r = n, s = "0") : (s = n, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * i * o + "%" : r * i * o + "px", s = s.indexOf("%") >= 0 ? parseInt(s, 10) * i + "%" : s * i + "px", t.transform("translate3d(" + r + ", " + s + ",0px)")
            }

            function p(e) {
                return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
            }
            if (!(this instanceof t)) return new t(n, r);
            var f = {
                    direction: "horizontal",
                    touchEventsTarget: "container",
                    initialSlide: 0,
                    speed: 300,
                    autoplay: !1,
                    autoplayDisableOnInteraction: !0,
                    autoplayStopOnLast: !1,
                    iOSEdgeSwipeDetection: !1,
                    iOSEdgeSwipeThreshold: 20,
                    freeMode: !1,
                    freeModeMomentum: !0,
                    freeModeMomentumRatio: 1,
                    freeModeMomentumBounce: !0,
                    freeModeMomentumBounceRatio: 1,
                    freeModeMomentumVelocityRatio: 1,
                    freeModeSticky: !1,
                    freeModeMinimumVelocity: .02,
                    autoHeight: !1,
                    setWrapperSize: !1,
                    virtualTranslate: !1,
                    effect: "slide",
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: !0
                    },
                    flip: {
                        slideShadows: !0,
                        limitRotation: !0
                    },
                    cube: {
                        slideShadows: !0,
                        shadow: !0,
                        shadowOffset: 20,
                        shadowScale: .94
                    },
                    fade: {
                        crossFade: !1
                    },
                    parallax: !1,
                    zoom: !1,
                    zoomMax: 3,
                    zoomMin: 1,
                    zoomToggle: !0,
                    scrollbar: null,
                    scrollbarHide: !0,
                    scrollbarDraggable: !1,
                    scrollbarSnapOnRelease: !1,
                    keyboardControl: !1,
                    mousewheelControl: !1,
                    mousewheelReleaseOnEdges: !1,
                    mousewheelInvert: !1,
                    mousewheelForceToAxis: !1,
                    mousewheelSensitivity: 1,
                    mousewheelEventsTarged: "container",
                    hashnav: !1,
                    hashnavWatchState: !1,
                    history: !1,
                    replaceState: !1,
                    breakpoints: void 0,
                    spaceBetween: 0,
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "column",
                    slidesPerGroup: 1,
                    centeredSlides: !1,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    roundLengths: !1,
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: !0,
                    shortSwipes: !0,
                    longSwipes: !0,
                    longSwipesRatio: .5,
                    longSwipesMs: 300,
                    followFinger: !0,
                    onlyExternal: !1,
                    threshold: 0,
                    touchMoveStopPropagation: !0,
                    touchReleaseOnEdges: !1,
                    uniqueNavElements: !0,
                    pagination: null,
                    paginationElement: "span",
                    paginationClickable: !1,
                    paginationHide: !1,
                    paginationBulletRender: null,
                    paginationProgressRender: null,
                    paginationFractionRender: null,
                    paginationCustomRender: null,
                    paginationType: "bullets",
                    resistance: !0,
                    resistanceRatio: .85,
                    nextButton: null,
                    prevButton: null,
                    watchSlidesProgress: !1,
                    watchSlidesVisibility: !1,
                    grabCursor: !1,
                    preventClicks: !0,
                    preventClicksPropagation: !0,
                    slideToClickedSlide: !1,
                    lazyLoading: !1,
                    lazyLoadingInPrevNext: !1,
                    lazyLoadingInPrevNextAmount: 1,
                    lazyLoadingOnTransitionStart: !1,
                    preloadImages: !0,
                    updateOnImagesReady: !0,
                    loop: !1,
                    loopAdditionalSlides: 0,
                    loopedSlides: null,
                    control: void 0,
                    controlInverse: !1,
                    controlBy: "slide",
                    normalizeSlideIndex: !0,
                    allowSwipeToPrev: !0,
                    allowSwipeToNext: !0,
                    swipeHandler: null,
                    noSwiping: !0,
                    noSwipingClass: "swiper-no-swiping",
                    passiveListeners: !0,
                    containerModifierClass: "swiper-container-",
                    slideClass: "swiper-slide",
                    slideActiveClass: "swiper-slide-active",
                    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                    slideVisibleClass: "swiper-slide-visible",
                    slideDuplicateClass: "swiper-slide-duplicate",
                    slideNextClass: "swiper-slide-next",
                    slideDuplicateNextClass: "swiper-slide-duplicate-next",
                    slidePrevClass: "swiper-slide-prev",
                    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                    wrapperClass: "swiper-wrapper",
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    buttonDisabledClass: "swiper-button-disabled",
                    paginationCurrentClass: "swiper-pagination-current",
                    paginationTotalClass: "swiper-pagination-total",
                    paginationHiddenClass: "swiper-pagination-hidden",
                    paginationProgressbarClass: "swiper-pagination-progressbar",
                    paginationClickableClass: "swiper-pagination-clickable",
                    paginationModifierClass: "swiper-pagination-",
                    lazyLoadingClass: "swiper-lazy",
                    lazyStatusLoadingClass: "swiper-lazy-loading",
                    lazyStatusLoadedClass: "swiper-lazy-loaded",
                    lazyPreloaderClass: "swiper-lazy-preloader",
                    notificationClass: "swiper-notification",
                    preloaderClass: "preloader",
                    zoomContainerClass: "swiper-zoom-container",
                    observer: !1,
                    observeParents: !1,
                    a11y: !1,
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}",
                    runCallbacksOnInit: !0
                },
                m = r && r.virtualTranslate;
            r = r || {};
            var g = {};
            for (var v in r)
                if ("object" != typeof r[v] || null === r[v] || r[v].nodeType || r[v] === window || r[v] === document || void 0 !== i && r[v] instanceof i || "undefined" != typeof jQuery && r[v] instanceof jQuery) g[v] = r[v];
                else {
                    g[v] = {};
                    for (var y in r[v]) g[v][y] = r[v][y]
                }
            for (var w in f)
                if (void 0 === r[w]) r[w] = f[w];
                else if ("object" == typeof r[w])
                for (var _ in f[w]) void 0 === r[w][_] && (r[w][_] = f[w][_]);
            var b = this;
            if (b.params = r, b.originalParams = g, b.classNames = [], void 0 !== e && void 0 !== i && (e = i), (void 0 !== e || (e = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i)) && (b.$ = e, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function() {
                    if (!b.params.breakpoints) return !1;
                    var e, t = !1,
                        i = [];
                    for (e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && i.push(e);
                    i.sort(function(e, t) {
                        return parseInt(e, 10) > parseInt(t, 10)
                    });
                    for (var n = 0; n < i.length; n++)(e = i[n]) >= window.innerWidth && !t && (t = e);
                    return t || "max"
                }, b.setBreakpoint = function() {
                    var e = b.getActiveBreakpoint();
                    if (e && b.currentBreakpoint !== e) {
                        var t = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
                            i = b.params.loop && t.slidesPerView !== b.params.slidesPerView;
                        for (var n in t) b.params[n] = t[n];
                        b.currentBreakpoint = e, i && b.destroyLoop && b.reLoop(!0)
                    }
                }, b.params.breakpoints && b.setBreakpoint(), b.container = e(n), 0 !== b.container.length)) {
                if (b.container.length > 1) {
                    var T = [];
                    return b.container.each(function() {
                        T.push(new t(this, r))
                    }), T
                }
                b.container[0].swiper = b, b.container.data("swiper", b), b.classNames.push(b.params.containerModifierClass + b.params.direction), b.params.freeMode && b.classNames.push(b.params.containerModifierClass + "free-mode"), b.support.flexbox || (b.classNames.push(b.params.containerModifierClass + "no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push(b.params.containerModifierClass + "autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), b.params.touchReleaseOnEdges && (b.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(b.params.effect) >= 0 && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push(b.params.containerModifierClass + "3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push(b.params.containerModifierClass + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, b.params.spaceBetween = 0, void 0 === m && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = e(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && b.paginationContainer.length > 1 && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass(b.params.paginationModifierClass + "clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass(b.params.paginationModifierClass + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = e(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && b.nextButton.length > 1 && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = e(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && b.prevButton.length > 1 && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function() {
                    return "horizontal" === b.params.direction
                }, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push(b.params.containerModifierClass + "rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), b.params.slidesPerColumn > 1 && b.classNames.push(b.params.containerModifierClass + "multirow"), b.device.android && b.classNames.push(b.params.containerModifierClass + "android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function() {
                    b.params.allowSwipeToNext = !1, b.params.allowSwipeToPrev === !1 && b.params.grabCursor && b.unsetGrabCursor()
                }, b.lockSwipeToPrev = function() {
                    b.params.allowSwipeToPrev = !1, b.params.allowSwipeToNext === !1 && b.params.grabCursor && b.unsetGrabCursor()
                }, b.lockSwipes = function() {
                    b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1, b.params.grabCursor && b.unsetGrabCursor()
                }, b.unlockSwipeToNext = function() {
                    b.params.allowSwipeToNext = !0, b.params.allowSwipeToPrev === !0 && b.params.grabCursor && b.setGrabCursor()
                }, b.unlockSwipeToPrev = function() {
                    b.params.allowSwipeToPrev = !0, b.params.allowSwipeToNext === !0 && b.params.grabCursor && b.setGrabCursor()
                }, b.unlockSwipes = function() {
                    b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0, b.params.grabCursor && b.setGrabCursor()
                }, b.setGrabCursor = function(e) {
                    b.container[0].style.cursor = "move", b.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", b.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", b.container[0].style.cursor = e ? "grabbing" : "grab"
                }, b.unsetGrabCursor = function() {
                    b.container[0].style.cursor = ""
                }, b.params.grabCursor && b.setGrabCursor(), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function(e, t, i, n, r, s) {
                    function o() {
                        s && s()
                    }
                    var a;
                    e.complete && r ? o() : t ? (a = new window.Image, a.onload = o, a.onerror = o, n && (a.sizes = n), i && (a.srcset = i), t && (a.src = t)) : o()
                }, b.preloadImages = function() {
                    function e() {
                        void 0 !== b && null !== b && b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
                    }
                    b.imagesToLoad = b.container.find("img");
                    for (var t = 0; t < b.imagesToLoad.length; t++) b.loadImage(b.imagesToLoad[t], b.imagesToLoad[t].currentSrc || b.imagesToLoad[t].getAttribute("src"), b.imagesToLoad[t].srcset || b.imagesToLoad[t].getAttribute("srcset"), b.imagesToLoad[t].sizes || b.imagesToLoad[t].getAttribute("sizes"), !0, e)
                }, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function() {
                    return void 0 === b.autoplayTimeoutId && !!b.params.autoplay && !b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void o())
                }, b.stopAutoplay = function(e) {
                    b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
                }, b.pauseAutoplay = function(e) {
                    b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, o()) : b.wrapper.transitionEnd(function() {
                        b && (b.autoplayPaused = !1, b.autoplaying ? o() : b.stopAutoplay())
                    }))
                }, b.minTranslate = function() {
                    return -b.snapGrid[0]
                }, b.maxTranslate = function() {
                    return -b.snapGrid[b.snapGrid.length - 1]
                }, b.updateAutoHeight = function() {
                    var e, t = [],
                        i = 0;
                    if ("auto" !== b.params.slidesPerView && b.params.slidesPerView > 1)
                        for (e = 0; e < Math.ceil(b.params.slidesPerView); e++) {
                            var n = b.activeIndex + e;
                            if (n > b.slides.length) break;
                            t.push(b.slides.eq(n)[0])
                        } else t.push(b.slides.eq(b.activeIndex)[0]);
                    for (e = 0; e < t.length; e++)
                        if (void 0 !== t[e]) {
                            var r = t[e].offsetHeight;
                            i = r > i ? r : i
                        }
                    i && b.wrapper.css("height", i + "px")
                }, b.updateContainerSize = function() {
                    var e, t;
                    e = void 0 !== b.params.width ? b.params.width : b.container[0].clientWidth, t = void 0 !== b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === t && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), t = t - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = t, b.size = b.isHorizontal() ? b.width : b.height)
                }, b.updateSlidesSize = function() {
                    b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
                    var e, t = b.params.spaceBetween,
                        i = -b.params.slidesOffsetBefore,
                        n = 0,
                        r = 0;
                    if (void 0 !== b.size) {
                        "string" == typeof t && t.indexOf("%") >= 0 && (t = parseFloat(t.replace("%", "")) / 100 * b.size), b.virtualSize = -t, b.rtl ? b.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : b.slides.css({
                            marginRight: "",
                            marginBottom: ""
                        });
                        var o;
                        b.params.slidesPerColumn > 1 && (o = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (o = Math.max(o, b.params.slidesPerView * b.params.slidesPerColumn)));
                        var a, l = b.params.slidesPerColumn,
                            c = o / l,
                            u = c - (b.params.slidesPerColumn * c - b.slides.length);
                        for (e = 0; e < b.slides.length; e++) {
                            a = 0;
                            var d = b.slides.eq(e);
                            if (b.params.slidesPerColumn > 1) {
                                var h, p, f;
                                "column" === b.params.slidesPerColumnFill ? (p = Math.floor(e / l), f = e - p * l, (p > u || p === u && f === l - 1) && ++f >= l && (f = 0, p++), h = p + f * o / l, d.css({
                                    "-webkit-box-ordinal-group": h,
                                    "-moz-box-ordinal-group": h,
                                    "-ms-flex-order": h,
                                    "-webkit-order": h,
                                    order: h
                                })) : (f = Math.floor(e / c), p = e - f * c), d.css("margin-" + (b.isHorizontal() ? "top" : "left"), 0 !== f && b.params.spaceBetween && b.params.spaceBetween + "px").attr("data-swiper-column", p).attr("data-swiper-row", f)
                            }
                            "none" !== d.css("display") && ("auto" === b.params.slidesPerView ? (a = b.isHorizontal() ? d.outerWidth(!0) : d.outerHeight(!0), b.params.roundLengths && (a = s(a))) : (a = (b.size - (b.params.slidesPerView - 1) * t) / b.params.slidesPerView, b.params.roundLengths && (a = s(a)), b.isHorizontal() ? b.slides[e].style.width = a + "px" : b.slides[e].style.height = a + "px"), b.slides[e].swiperSlideSize = a, b.slidesSizesGrid.push(a), b.params.centeredSlides ? (i = i + a / 2 + n / 2 + t, 0 === n && 0 !== e && (i = i - b.size / 2 - t), 0 === e && (i = i - b.size / 2 - t), Math.abs(i) < .001 && (i = 0), r % b.params.slidesPerGroup == 0 && b.snapGrid.push(i), b.slidesGrid.push(i)) : (r % b.params.slidesPerGroup == 0 && b.snapGrid.push(i), b.slidesGrid.push(i), i = i + a + t), b.virtualSize += a + t, n = a, r++)
                        }
                        b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter;
                        var m;
                        if (b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({
                                width: b.virtualSize + b.params.spaceBetween + "px"
                            }), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({
                                width: b.virtualSize + b.params.spaceBetween + "px"
                            }) : b.wrapper.css({
                                height: b.virtualSize + b.params.spaceBetween + "px"
                            })), b.params.slidesPerColumn > 1 && (b.virtualSize = (a + b.params.spaceBetween) * o, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.isHorizontal() ? b.wrapper.css({
                                width: b.virtualSize + b.params.spaceBetween + "px"
                            }) : b.wrapper.css({
                                height: b.virtualSize + b.params.spaceBetween + "px"
                            }), b.params.centeredSlides)) {
                            for (m = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && m.push(b.snapGrid[e]);
                            b.snapGrid = m
                        }
                        if (!b.params.centeredSlides) {
                            for (m = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && m.push(b.snapGrid[e]);
                            b.snapGrid = m, Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) > 1 && b.snapGrid.push(b.virtualSize - b.size)
                        }
                        0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({
                            marginLeft: t + "px"
                        }) : b.slides.css({
                            marginRight: t + "px"
                        }) : b.slides.css({
                            marginBottom: t + "px"
                        })), b.params.watchSlidesProgress && b.updateSlidesOffset()
                    }
                }, b.updateSlidesOffset = function() {
                    for (var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
                }, b.currentSlidesPerView = function() {
                    var e, t, i = 1;
                    if (b.params.centeredSlides) {
                        var n, r = b.slides[b.activeIndex].swiperSlideSize;
                        for (e = b.activeIndex + 1; e < b.slides.length; e++) b.slides[e] && !n && (r += b.slides[e].swiperSlideSize, i++, r > b.size && (n = !0));
                        for (t = b.activeIndex - 1; t >= 0; t--) b.slides[t] && !n && (r += b.slides[t].swiperSlideSize, i++, r > b.size && (n = !0))
                    } else
                        for (e = b.activeIndex + 1; e < b.slides.length; e++) b.slidesGrid[e] - b.slidesGrid[b.activeIndex] < b.size && i++;
                    return i
                }, b.updateSlidesProgress = function(e) {
                    if (void 0 === e && (e = b.translate || 0), 0 !== b.slides.length) {
                        void 0 === b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
                        var t = -e;
                        b.rtl && (t = e), b.slides.removeClass(b.params.slideVisibleClass);
                        for (var i = 0; i < b.slides.length; i++) {
                            var n = b.slides[i],
                                r = (t + (b.params.centeredSlides ? b.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + b.params.spaceBetween);
                            if (b.params.watchSlidesVisibility) {
                                var s = -(t - n.swiperSlideOffset),
                                    o = s + b.slidesSizesGrid[i];
                                (s >= 0 && s < b.size || o > 0 && o <= b.size || s <= 0 && o >= b.size) && b.slides.eq(i).addClass(b.params.slideVisibleClass)
                            }
                            n.progress = b.rtl ? -r : r
                        }
                    }
                }, b.updateProgress = function(e) {
                    void 0 === e && (e = b.translate || 0);
                    var t = b.maxTranslate() - b.minTranslate(),
                        i = b.isBeginning,
                        n = b.isEnd;
                    0 === t ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / t, b.isBeginning = b.progress <= 0, b.isEnd = b.progress >= 1), b.isBeginning && !i && b.emit("onReachBeginning", b), b.isEnd && !n && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
                }, b.updateActiveIndex = function() {
                    var e, t, i, n = b.rtl ? b.translate : -b.translate;
                    for (t = 0; t < b.slidesGrid.length; t++) void 0 !== b.slidesGrid[t + 1] ? n >= b.slidesGrid[t] && n < b.slidesGrid[t + 1] - (b.slidesGrid[t + 1] - b.slidesGrid[t]) / 2 ? e = t : n >= b.slidesGrid[t] && n < b.slidesGrid[t + 1] && (e = t + 1) : n >= b.slidesGrid[t] && (e = t);
                    b.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), i = Math.floor(e / b.params.slidesPerGroup), i >= b.snapGrid.length && (i = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = i, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses(), b.updateRealIndex())
                }, b.updateRealIndex = function() {
                    b.realIndex = parseInt(b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") || b.activeIndex, 10)
                }, b.updateClasses = function() {
                    b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass + " " + b.params.slideDuplicateActiveClass + " " + b.params.slideDuplicateNextClass + " " + b.params.slideDuplicatePrevClass);
                    var t = b.slides.eq(b.activeIndex);
                    t.addClass(b.params.slideActiveClass), r.loop && (t.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass));
                    var i = t.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
                    b.params.loop && 0 === i.length && (i = b.slides.eq(0), i.addClass(b.params.slideNextClass));
                    var n = t.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
                    if (b.params.loop && 0 === n.length && (n = b.slides.eq(-1), n.addClass(b.params.slidePrevClass)), r.loop && (i.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + i.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass), n.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + n.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass)), b.paginationContainer && b.paginationContainer.length > 0) {
                        var s, o = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
                        if (b.params.loop ? (s = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup), s > b.slides.length - 1 - 2 * b.loopedSlides && (s -= b.slides.length - 2 * b.loopedSlides), s > o - 1 && (s -= o), s < 0 && "bullets" !== b.params.paginationType && (s = o + s)) : s = void 0 !== b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && b.bullets.length > 0 && (b.bullets.removeClass(b.params.bulletActiveClass), b.paginationContainer.length > 1 ? b.bullets.each(function() {
                                e(this).index() === s && e(this).addClass(b.params.bulletActiveClass)
                            }) : b.bullets.eq(s).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(s + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(o)), "progress" === b.params.paginationType) {
                            var a = (s + 1) / o,
                                l = a,
                                c = 1;
                            b.isHorizontal() || (c = a, l = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + l + ") scaleY(" + c + ")").transition(b.params.speed)
                        }
                        "custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, s + 1, o)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
                    }
                    b.params.loop || (b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
                }, b.updatePagination = function() {
                    if (b.params.pagination && b.paginationContainer && b.paginationContainer.length > 0) {
                        var e = "";
                        if ("bullets" === b.params.paginationType) {
                            for (var t = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, i = 0; i < t; i++) e += b.params.paginationBulletRender ? b.params.paginationBulletRender(b, i, b.params.bulletClass) : "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
                            b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
                        }
                        "fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
                    }
                }, b.update = function(e) {
                    function t() {
                        b.rtl, b.translate, i = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(i), b.updateActiveIndex(), b.updateClasses()
                    }
                    if (b) {
                        b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set();
                        var i;
                        e ? (b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (t(), b.params.autoHeight && b.updateAutoHeight()) : (("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0)) || t()) : b.params.autoHeight && b.updateAutoHeight()
                    }
                }, b.onResize = function(e) {
                    b.params.onBeforeResize && b.params.onBeforeResize(b), b.params.breakpoints && b.setBreakpoint();
                    var t = b.params.allowSwipeToPrev,
                        i = b.params.allowSwipeToNext;
                    b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
                    var n = !1;
                    if (b.params.freeMode) {
                        var r = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
                        b.setWrapperTranslate(r), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
                    } else b.updateClasses(), n = ("auto" === b.params.slidesPerView || b.params.slidesPerView > 1) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
                    b.params.lazyLoading && !n && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = t, b.params.allowSwipeToNext = i, b.params.onAfterResize && b.params.onAfterResize(b)
                }, b.touchEventsDesktop = {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                }, window.navigator.pointerEnabled ? b.touchEventsDesktop = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled && (b.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), b.touchEvents = {
                    start: b.support.touch || !b.params.simulateTouch ? "touchstart" : b.touchEventsDesktop.start,
                    move: b.support.touch || !b.params.simulateTouch ? "touchmove" : b.touchEventsDesktop.move,
                    end: b.support.touch || !b.params.simulateTouch ? "touchend" : b.touchEventsDesktop.end
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function(e) {
                    var t = e ? "off" : "on",
                        i = e ? "removeEventListener" : "addEventListener",
                        n = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
                        s = b.support.touch ? n : document,
                        o = !!b.params.nested;
                    if (b.browser.ie) n[i](b.touchEvents.start, b.onTouchStart, !1), s[i](b.touchEvents.move, b.onTouchMove, o), s[i](b.touchEvents.end, b.onTouchEnd, !1);
                    else {
                        if (b.support.touch) {
                            var a = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            n[i](b.touchEvents.start, b.onTouchStart, a), n[i](b.touchEvents.move, b.onTouchMove, o), n[i](b.touchEvents.end, b.onTouchEnd, a)
                        }(r.simulateTouch && !b.device.ios && !b.device.android || r.simulateTouch && !b.support.touch && b.device.ios) && (n[i]("mousedown", b.onTouchStart, !1), document[i]("mousemove", b.onTouchMove, o), document[i]("mouseup", b.onTouchEnd, !1))
                    }
                    window[i]("resize", b.onResize), b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.nextButton[t]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[t]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.prevButton[t]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[t]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[t]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[t]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && n[i]("click", b.preventClicks, !0)
                }, b.attachEvents = function() {
                    b.initEvents()
                }, b.detachEvents = function() {
                    b.initEvents(!0)
                }, b.allowClick = !0, b.preventClicks = function(e) {
                    b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, b.onClickNext = function(e) {
                    e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext()
                }, b.onClickPrev = function(e) {
                    e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev()
                }, b.onClickIndex = function(t) {
                    t.preventDefault();
                    var i = e(this).index() * b.params.slidesPerGroup;
                    b.params.loop && (i += b.loopedSlides), b.slideTo(i)
                }, b.updateClickedSlide = function(t) {
                    var i = a(t, "." + b.params.slideClass),
                        n = !1;
                    if (i)
                        for (var r = 0; r < b.slides.length; r++) b.slides[r] === i && (n = !0);
                    if (!i || !n) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
                    if (b.clickedSlide = i, b.clickedIndex = e(i).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
                        var s, o = b.clickedIndex,
                            l = "auto" === b.params.slidesPerView ? b.currentSlidesPerView() : b.params.slidesPerView;
                        if (b.params.loop) {
                            if (b.animating) return;
                            s = parseInt(e(b.clickedSlide).attr("data-swiper-slide-index"), 10), b.params.centeredSlides ? o < b.loopedSlides - l / 2 || o > b.slides.length - b.loopedSlides + l / 2 ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                                b.slideTo(o)
                            }, 0)) : b.slideTo(o) : o > b.slides.length - l ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
                                b.slideTo(o)
                            }, 0)) : b.slideTo(o)
                        } else b.slideTo(o)
                    }
                };
                var x, k, S, C, z, P, M, O, E, A, L = "input, select, textarea, button, video",
                    I = Date.now(),
                    D = [];
                b.animating = !1, b.touches = {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                };
                var R, N;
                b.onTouchStart = function(t) {
                    if (t.originalEvent && (t = t.originalEvent), (R = "touchstart" === t.type) || !("which" in t) || 3 !== t.which) {
                        if (b.params.noSwiping && a(t, "." + b.params.noSwipingClass)) return void(b.allowClick = !0);
                        if (!b.params.swipeHandler || a(t, b.params.swipeHandler)) {
                            var i = b.touches.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX,
                                n = b.touches.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY;
                            if (!(b.device.ios && b.params.iOSEdgeSwipeDetection && i <= b.params.iOSEdgeSwipeThreshold)) {
                                if (x = !0, k = !1, S = !0, z = void 0, N = void 0, b.touches.startX = i, b.touches.startY = n, C = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, b.params.threshold > 0 && (O = !1), "touchstart" !== t.type) {
                                    var r = !0;
                                    e(t.target).is(L) && (r = !1), document.activeElement && e(document.activeElement).is(L) && document.activeElement.blur(), r && t.preventDefault()
                                }
                                b.emit("onTouchStart", b, t)
                            }
                        }
                    }
                }, b.onTouchMove = function(t) {
                    if (t.originalEvent && (t = t.originalEvent), !R || "mousemove" !== t.type) {
                        if (t.preventedByNestedSwiper) return b.touches.startX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, void(b.touches.startY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY);
                        if (b.params.onlyExternal) return b.allowClick = !1, void(x && (b.touches.startX = b.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, b.touches.startY = b.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, C = Date.now()));
                        if (R && b.params.touchReleaseOnEdges && !b.params.loop)
                            if (b.isHorizontal()) {
                                if (b.touches.currentX < b.touches.startX && b.translate <= b.maxTranslate() || b.touches.currentX > b.touches.startX && b.translate >= b.minTranslate()) return
                            } else if (b.touches.currentY < b.touches.startY && b.translate <= b.maxTranslate() || b.touches.currentY > b.touches.startY && b.translate >= b.minTranslate()) return;
                        if (R && document.activeElement && t.target === document.activeElement && e(t.target).is(L)) return k = !0, void(b.allowClick = !1);
                        if (S && b.emit("onTouchMove", b, t), !(t.targetTouches && t.targetTouches.length > 1)) {
                            if (b.touches.currentX = "touchmove" === t.type ? t.targetTouches[0].pageX : t.pageX, b.touches.currentY = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, void 0 === z) {
                                var i;
                                b.isHorizontal() && b.touches.currentY === b.touches.startY || !b.isHorizontal() && b.touches.currentX === b.touches.startX ? z = !1 : (i = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI, z = b.isHorizontal() ? i > b.params.touchAngle : 90 - i > b.params.touchAngle)
                            }
                            if (z && b.emit("onTouchMoveOpposite", b, t), void 0 === N && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (N = !0)), x) {
                                if (z) return void(x = !1);
                                if (N) {
                                    b.allowClick = !1, b.emit("onSliderMove", b, t), t.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && t.stopPropagation(), k || (r.loop && b.fixLoop(), M = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), A = !1, !b.params.grabCursor || b.params.allowSwipeToNext !== !0 && b.params.allowSwipeToPrev !== !0 || b.setGrabCursor(!0)), k = !0;
                                    var n = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
                                    n *= b.params.touchRatio, b.rtl && (n = -n), b.swipeDirection = n > 0 ? "prev" : "next", P = n + M;
                                    var s = !0;
                                    if (n > 0 && P > b.minTranslate() ? (s = !1, b.params.resistance && (P = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + M + n, b.params.resistanceRatio))) : n < 0 && P < b.maxTranslate() && (s = !1, b.params.resistance && (P = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - M - n, b.params.resistanceRatio))), s && (t.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && P < M && (P = M), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && P > M && (P = M), b.params.threshold > 0) {
                                        if (!(Math.abs(n) > b.params.threshold || O)) return void(P = M);
                                        if (!O) return O = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, P = M, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
                                    }
                                    b.params.followFinger && ((b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === D.length && D.push({
                                        position: b.touches[b.isHorizontal() ? "startX" : "startY"],
                                        time: C
                                    }), D.push({
                                        position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
                                        time: (new window.Date).getTime()
                                    })), b.updateProgress(P), b.setWrapperTranslate(P))
                                }
                            }
                        }
                    }
                }, b.onTouchEnd = function(t) {
                    if (t.originalEvent && (t = t.originalEvent), S && b.emit("onTouchEnd", b, t), S = !1, x) {
                        b.params.grabCursor && k && x && (b.params.allowSwipeToNext === !0 || b.params.allowSwipeToPrev === !0) && b.setGrabCursor(!1);
                        var i = Date.now(),
                            n = i - C;
                        if (b.allowClick && (b.updateClickedSlide(t), b.emit("onTap", b, t), n < 300 && i - I > 300 && (E && clearTimeout(E), E = setTimeout(function() {
                                b && (b.params.paginationHide && b.paginationContainer.length > 0 && !e(t.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, t))
                            }, 300)), n < 300 && i - I < 300 && (E && clearTimeout(E), b.emit("onDoubleTap", b, t))), I = Date.now(), setTimeout(function() {
                                b && (b.allowClick = !0)
                            }, 0), !x || !k || !b.swipeDirection || 0 === b.touches.diff || P === M) return void(x = k = !1);
                        x = k = !1;
                        var r;
                        if (r = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -P, b.params.freeMode) {
                            if (r < -b.minTranslate()) return void b.slideTo(b.activeIndex);
                            if (r > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
                            if (b.params.freeModeMomentum) {
                                if (D.length > 1) {
                                    var s = D.pop(),
                                        o = D.pop(),
                                        a = s.position - o.position,
                                        l = s.time - o.time;
                                    b.velocity = a / l, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (l > 150 || (new window.Date).getTime() - s.time > 300) && (b.velocity = 0)
                                } else b.velocity = 0;
                                b.velocity = b.velocity * b.params.freeModeMomentumVelocityRatio, D.length = 0;
                                var c = 1e3 * b.params.freeModeMomentumRatio,
                                    u = b.velocity * c,
                                    d = b.translate + u;
                                b.rtl && (d = -d);
                                var h, p = !1,
                                    f = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
                                if (d < b.maxTranslate()) b.params.freeModeMomentumBounce ? (d + b.maxTranslate() < -f && (d = b.maxTranslate() - f), h = b.maxTranslate(), p = !0, A = !0) : d = b.maxTranslate();
                                else if (d > b.minTranslate()) b.params.freeModeMomentumBounce ? (d - b.minTranslate() > f && (d = b.minTranslate() + f), h = b.minTranslate(), p = !0, A = !0) : d = b.minTranslate();
                                else if (b.params.freeModeSticky) {
                                    var m, g = 0;
                                    for (g = 0; g < b.snapGrid.length; g += 1)
                                        if (b.snapGrid[g] > -d) {
                                            m = g;
                                            break
                                        }
                                    d = Math.abs(b.snapGrid[m] - d) < Math.abs(b.snapGrid[m - 1] - d) || "next" === b.swipeDirection ? b.snapGrid[m] : b.snapGrid[m - 1], b.rtl || (d = -d)
                                }
                                if (0 !== b.velocity) c = b.rtl ? Math.abs((-d - b.translate) / b.velocity) : Math.abs((d - b.translate) / b.velocity);
                                else if (b.params.freeModeSticky) return void b.slideReset();
                                b.params.freeModeMomentumBounce && p ? (b.updateProgress(h), b.setWrapperTransition(c), b.setWrapperTranslate(d), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function() {
                                    b && A && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(h), b.wrapper.transitionEnd(function() {
                                        b && b.onTransitionEnd()
                                    }))
                                })) : b.velocity ? (b.updateProgress(d), b.setWrapperTransition(c), b.setWrapperTranslate(d), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
                                    b && b.onTransitionEnd()
                                }))) : b.updateProgress(d), b.updateActiveIndex()
                            }
                            return void((!b.params.freeModeMomentum || n >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex()))
                        }
                        var v, y = 0,
                            w = b.slidesSizesGrid[0];
                        for (v = 0; v < b.slidesGrid.length; v += b.params.slidesPerGroup) void 0 !== b.slidesGrid[v + b.params.slidesPerGroup] ? r >= b.slidesGrid[v] && r < b.slidesGrid[v + b.params.slidesPerGroup] && (y = v, w = b.slidesGrid[v + b.params.slidesPerGroup] - b.slidesGrid[v]) : r >= b.slidesGrid[v] && (y = v, w = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
                        var _ = (r - b.slidesGrid[y]) / w;
                        if (n > b.params.longSwipesMs) {
                            if (!b.params.longSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && (_ >= b.params.longSwipesRatio ? b.slideTo(y + b.params.slidesPerGroup) : b.slideTo(y)), "prev" === b.swipeDirection && (_ > 1 - b.params.longSwipesRatio ? b.slideTo(y + b.params.slidesPerGroup) : b.slideTo(y))
                        } else {
                            if (!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
                            "next" === b.swipeDirection && b.slideTo(y + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(y)
                        }
                    }
                }, b._slideTo = function(e, t) {
                    return b.slideTo(e, t, !0, !0)
                }, b.slideTo = function(e, t, i, n) {
                    void 0 === i && (i = !0), void 0 === e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
                    var r = -b.snapGrid[b.snapIndex];
                    if (b.params.autoplay && b.autoplaying && (n || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(t) : b.stopAutoplay()), b.updateProgress(r), b.params.normalizeSlideIndex)
                        for (var s = 0; s < b.slidesGrid.length; s++) - Math.floor(100 * r) >= Math.floor(100 * b.slidesGrid[s]) && (e = s);
                    return !(!b.params.allowSwipeToNext && r < b.translate && r < b.minTranslate() || !b.params.allowSwipeToPrev && r > b.translate && r > b.maxTranslate() && (b.activeIndex || 0) !== e || (void 0 === t && (t = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.updateRealIndex(), b.rtl && -r === b.translate || !b.rtl && r === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(r), 1) : (b.updateClasses(), b.onTransitionStart(i), 0 === t || b.browser.lteIE9 ? (b.setWrapperTranslate(r), b.setWrapperTransition(0), b.onTransitionEnd(i)) : (b.setWrapperTranslate(r), b.setWrapperTransition(t), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
                        b && b.onTransitionEnd(i)
                    }))), 0)))
                }, b.onTransitionStart = function(e) {
                    void 0 === e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
                }, b.onTransitionEnd = function(e) {
                    b.animating = !1, b.setWrapperTransition(0), void 0 === e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.history && b.history && b.history.setHistory(b.params.history, b.activeIndex), b.params.hashnav && b.hashnav && b.hashnav.setHash()
                }, b.slideNext = function(e, t, i) {
                    return b.params.loop ? !b.animating && (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, i)) : b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, i)
                }, b._slideNext = function(e) {
                    return b.slideNext(!0, e, !0)
                }, b.slidePrev = function(e, t, i) {
                    return b.params.loop ? !b.animating && (b.fixLoop(), b.container[0].clientLeft, b.slideTo(b.activeIndex - 1, t, e, i)) : b.slideTo(b.activeIndex - 1, t, e, i)
                }, b._slidePrev = function(e) {
                    return b.slidePrev(!0, e, !0)
                }, b.slideReset = function(e, t, i) {
                    return b.slideTo(b.activeIndex, t, e)
                }, b.disableTouchControl = function() {
                    return b.params.onlyExternal = !0, !0
                }, b.enableTouchControl = function() {
                    return b.params.onlyExternal = !1, !0
                }, b.setWrapperTransition = function(e, t) {
                    b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, t), b.emit("onSetTransition", b, e)
                }, b.setWrapperTranslate = function(e, t, i) {
                    var n = 0,
                        r = 0;
                    b.isHorizontal() ? n = b.rtl ? -e : e : r = e, b.params.roundLengths && (n = s(n), r = s(r)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + n + "px, " + r + "px, 0px)") : b.wrapper.transform("translate(" + n + "px, " + r + "px)")), b.translate = b.isHorizontal() ? n : r;
                    var o, a = b.maxTranslate() - b.minTranslate();
                    o = 0 === a ? 0 : (e - b.minTranslate()) / a, o !== b.progress && b.updateProgress(e), t && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, i), b.emit("onSetTranslate", b, b.translate)
                }, b.getTranslate = function(e, t) {
                    var i, n, r, s;
                    return void 0 === t && (t = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (r = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (n = r.transform || r.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(function(e) {
                        return e.replace(",", ".")
                    }).join(", ")), s = new window.WebKitCSSMatrix("none" === n ? "" : n)) : (s = r.MozTransform || r.OTransform || r.MsTransform || r.msTransform || r.transform || r.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), "x" === t && (n = window.WebKitCSSMatrix ? s.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = window.WebKitCSSMatrix ? s.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), b.rtl && n && (n = -n), n || 0)
                }, b.getWrapperTranslate = function(e) {
                    return void 0 === e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
                }, b.observers = [], b.initObservers = function() {
                    if (b.params.observeParents)
                        for (var e = b.container.parents(), t = 0; t < e.length; t++) l(e[t]);
                    l(b.container[0], {
                        childList: !1
                    }), l(b.wrapper[0], {
                        attributes: !1
                    })
                }, b.disconnectObservers = function() {
                    for (var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
                    b.observers = []
                }, b.createLoop = function() {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
                    var t = b.wrapper.children("." + b.params.slideClass);
                    "auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = t.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > t.length && (b.loopedSlides = t.length);
                    var i, n = [],
                        r = [];
                    for (t.each(function(i, s) {
                            var o = e(this);
                            i < b.loopedSlides && r.push(s), i < t.length && i >= t.length - b.loopedSlides && n.push(s), o.attr("data-swiper-slide-index", i)
                        }), i = 0; i < r.length; i++) b.wrapper.append(e(r[i].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
                    for (i = n.length - 1; i >= 0; i--) b.wrapper.prepend(e(n[i].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
                }, b.destroyLoop = function() {
                    b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
                }, b.reLoop = function(e) {
                    var t = b.activeIndex - b.loopedSlides;
                    b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(t + b.loopedSlides, 0, !1)
                }, b.fixLoop = function() {
                    var e;
                    b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
                }, b.appendSlide = function(e) {
                    if (b.params.loop && b.destroyLoop(), "object" == typeof e && e.length)
                        for (var t = 0; t < e.length; t++) e[t] && b.wrapper.append(e[t]);
                    else b.wrapper.append(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
                }, b.prependSlide = function(e) {
                    b.params.loop && b.destroyLoop();
                    var t = b.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var i = 0; i < e.length; i++) e[i] && b.wrapper.prepend(e[i]);
                        t = b.activeIndex + e.length
                    } else b.wrapper.prepend(e);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(t, 0, !1)
                }, b.removeSlide = function(e) {
                    b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
                    var t, i = b.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var n = 0; n < e.length; n++) t = e[n], b.slides[t] && b.slides.eq(t).remove(), t < i && i--;
                        i = Math.max(i, 0)
                    } else t = e, b.slides[t] && b.slides.eq(t).remove(), t < i && i--, i = Math.max(i, 0);
                    b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(i + b.loopedSlides, 0, !1) : b.slideTo(i, 0, !1)
                }, b.removeAllSlides = function() {
                    for (var e = [], t = 0; t < b.slides.length; t++) e.push(t);
                    b.removeSlide(e)
                }, b.effects = {
                    fade: {
                        setTranslate: function() {
                            for (var e = 0; e < b.slides.length; e++) {
                                var t = b.slides.eq(e),
                                    i = t[0].swiperSlideOffset,
                                    n = -i;
                                b.params.virtualTranslate || (n -= b.translate);
                                var r = 0;
                                b.isHorizontal() || (r = n, n = 0);
                                var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
                                t.css({
                                    opacity: s
                                }).transform("translate3d(" + n + "px, " + r + "px, 0px)")
                            }
                        },
                        setTransition: function(e) {
                            if (b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
                                var t = !1;
                                b.slides.transitionEnd(function() {
                                    if (!t && b) {
                                        t = !0, b.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], i = 0; i < e.length; i++) b.wrapper.trigger(e[i])
                                    }
                                })
                            }
                        }
                    },
                    flip: {
                        setTranslate: function() {
                            for (var t = 0; t < b.slides.length; t++) {
                                var i = b.slides.eq(t),
                                    n = i[0].progress;
                                b.params.flip.limitRotation && (n = Math.max(Math.min(i[0].progress, 1), -1));
                                var r = i[0].swiperSlideOffset,
                                    s = -180 * n,
                                    o = s,
                                    a = 0,
                                    l = -r,
                                    c = 0;
                                if (b.isHorizontal() ? b.rtl && (o = -o) : (c = l, l = 0, a = -o, o = 0), i[0].style.zIndex = -Math.abs(Math.round(n)) + b.slides.length, b.params.flip.slideShadows) {
                                    var u = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
                                        d = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
                                    0 === u.length && (u = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(u)), 0 === d.length && (d = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(d)), u.length && (u[0].style.opacity = Math.max(-n, 0)), d.length && (d[0].style.opacity = Math.max(n, 0))
                                }
                                i.transform("translate3d(" + l + "px, " + c + "px, 0px) rotateX(" + a + "deg) rotateY(" + o + "deg)")
                            }
                        },
                        setTransition: function(t) {
                            if (b.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t), b.params.virtualTranslate && 0 !== t) {
                                var i = !1;
                                b.slides.eq(b.activeIndex).transitionEnd(function() {
                                    if (!i && b && e(this).hasClass(b.params.slideActiveClass)) {
                                        i = !0, b.animating = !1;
                                        for (var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], n = 0; n < t.length; n++) b.wrapper.trigger(t[n])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function() {
                            var t, i = 0;
                            b.params.cube.shadow && (b.isHorizontal() ? (t = b.wrapper.find(".swiper-cube-shadow"), 0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(t)), t.css({
                                height: b.width + "px"
                            })) : (t = b.container.find(".swiper-cube-shadow"), 0 === t.length && (t = e('<div class="swiper-cube-shadow"></div>'), b.container.append(t))));
                            for (var n = 0; n < b.slides.length; n++) {
                                var r = b.slides.eq(n),
                                    s = 90 * n,
                                    o = Math.floor(s / 360);
                                b.rtl && (s = -s, o = Math.floor(-s / 360));
                                var a = Math.max(Math.min(r[0].progress, 1), -1),
                                    l = 0,
                                    c = 0,
                                    u = 0;
                                n % 4 == 0 ? (l = 4 * -o * b.size, u = 0) : (n - 1) % 4 == 0 ? (l = 0, u = 4 * -o * b.size) : (n - 2) % 4 == 0 ? (l = b.size + 4 * o * b.size, u = b.size) : (n - 3) % 4 == 0 && (l = -b.size, u = 3 * b.size + 4 * b.size * o), b.rtl && (l = -l), b.isHorizontal() || (c = l, l = 0);
                                var d = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + l + "px, " + c + "px, " + u + "px)";
                                if (a <= 1 && a > -1 && (i = 90 * n + 90 * a, b.rtl && (i = 90 * -n - 90 * a)), r.transform(d), b.params.cube.slideShadows) {
                                    var h = b.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                                        p = b.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                    0 === h.length && (h = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), r.append(h)), 0 === p.length && (p = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(p)), h.length && (h[0].style.opacity = Math.max(-a, 0)), p.length && (p[0].style.opacity = Math.max(a, 0))
                                }
                            }
                            if (b.wrapper.css({
                                    "-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
                                    "transform-origin": "50% 50% -" + b.size / 2 + "px"
                                }), b.params.cube.shadow)
                                if (b.isHorizontal()) t.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");
                                else {
                                    var f = Math.abs(i) - 90 * Math.floor(Math.abs(i) / 90),
                                        m = 1.5 - (Math.sin(2 * f * Math.PI / 360) / 2 + Math.cos(2 * f * Math.PI / 360) / 2),
                                        g = b.params.cube.shadowScale,
                                        v = b.params.cube.shadowScale / m,
                                        y = b.params.cube.shadowOffset;
                                    t.transform("scale3d(" + g + ", 1, " + v + ") translate3d(0px, " + (b.height / 2 + y) + "px, " + -b.height / 2 / v + "px) rotateX(-90deg)")
                                }
                            var w = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
                            b.wrapper.transform("translate3d(0px,0," + w + "px) rotateX(" + (b.isHorizontal() ? 0 : i) + "deg) rotateY(" + (b.isHorizontal() ? -i : 0) + "deg)")
                        },
                        setTransition: function(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function() {
                            for (var t = b.translate, i = b.isHorizontal() ? -t + b.width / 2 : -t + b.height / 2, n = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, r = b.params.coverflow.depth, s = 0, o = b.slides.length; s < o; s++) {
                                var a = b.slides.eq(s),
                                    l = b.slidesSizesGrid[s],
                                    c = a[0].swiperSlideOffset,
                                    u = (i - c - l / 2) / l * b.params.coverflow.modifier,
                                    d = b.isHorizontal() ? n * u : 0,
                                    h = b.isHorizontal() ? 0 : n * u,
                                    p = -r * Math.abs(u),
                                    f = b.isHorizontal() ? 0 : b.params.coverflow.stretch * u,
                                    m = b.isHorizontal() ? b.params.coverflow.stretch * u : 0;
                                Math.abs(m) < .001 && (m = 0), Math.abs(f) < .001 && (f = 0), Math.abs(p) < .001 && (p = 0), Math.abs(d) < .001 && (d = 0), Math.abs(h) < .001 && (h = 0);
                                var g = "translate3d(" + m + "px," + f + "px," + p + "px)  rotateX(" + h + "deg) rotateY(" + d + "deg)";
                                if (a.transform(g), a[0].style.zIndex = 1 - Math.abs(Math.round(u)), b.params.coverflow.slideShadows) {
                                    var v = b.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                                        y = b.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                                    0 === v.length && (v = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), a.append(v)), 0 === y.length && (y = e('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(y)), v.length && (v[0].style.opacity = u > 0 ? u : 0), y.length && (y[0].style.opacity = -u > 0 ? -u : 0)
                                }
                            }
                            b.browser.ie && (b.wrapper[0].style.perspectiveOrigin = i + "px 50%")
                        },
                        setTransition: function(e) {
                            b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, b.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function(t, i) {
                        if (void 0 !== t && (void 0 === i && (i = !0), 0 !== b.slides.length)) {
                            var n = b.slides.eq(t),
                                r = n.find("." + b.params.lazyLoadingClass + ":not(." + b.params.lazyStatusLoadedClass + "):not(." + b.params.lazyStatusLoadingClass + ")");
                            !n.hasClass(b.params.lazyLoadingClass) || n.hasClass(b.params.lazyStatusLoadedClass) || n.hasClass(b.params.lazyStatusLoadingClass) || (r = r.add(n[0])), 0 !== r.length && r.each(function() {
                                var t = e(this);
                                t.addClass(b.params.lazyStatusLoadingClass);
                                var r = t.attr("data-background"),
                                    s = t.attr("data-src"),
                                    o = t.attr("data-srcset"),
                                    a = t.attr("data-sizes");
                                b.loadImage(t[0], s || r, o, a, !1, function() {
                                    if (void 0 !== b && null !== b && b) {
                                        if (r ? (t.css("background-image", 'url("' + r + '")'), t.removeAttr("data-background")) : (o && (t.attr("srcset", o), t.removeAttr("data-srcset")), a && (t.attr("sizes", a), t.removeAttr("data-sizes")), s && (t.attr("src", s), t.removeAttr("data-src"))), t.addClass(b.params.lazyStatusLoadedClass).removeClass(b.params.lazyStatusLoadingClass), n.find("." + b.params.lazyPreloaderClass + ", ." + b.params.preloaderClass).remove(), b.params.loop && i) {
                                            var e = n.attr("data-swiper-slide-index");
                                            if (n.hasClass(b.params.slideDuplicateClass)) {
                                                var l = b.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + b.params.slideDuplicateClass + ")");
                                                b.lazy.loadImageInSlide(l.index(), !1)
                                            } else {
                                                var c = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                                b.lazy.loadImageInSlide(c.index(), !1)
                                            }
                                        }
                                        b.emit("onLazyImageReady", b, n[0], t[0])
                                    }
                                }), b.emit("onLazyImageLoad", b, n[0], t[0])
                            })
                        }
                    },
                    load: function() {
                        var t, i = b.params.slidesPerView;
                        if ("auto" === i && (i = 0), b.lazy.initialImageLoaded || (b.lazy.initialImageLoaded = !0), b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function() {
                            b.lazy.loadImageInSlide(e(this).index())
                        });
                        else if (i > 1)
                            for (t = b.activeIndex; t < b.activeIndex + i; t++) b.slides[t] && b.lazy.loadImageInSlide(t);
                        else b.lazy.loadImageInSlide(b.activeIndex);
                        if (b.params.lazyLoadingInPrevNext)
                            if (i > 1 || b.params.lazyLoadingInPrevNextAmount && b.params.lazyLoadingInPrevNextAmount > 1) {
                                var n = b.params.lazyLoadingInPrevNextAmount,
                                    r = i,
                                    s = Math.min(b.activeIndex + r + Math.max(n, r), b.slides.length),
                                    o = Math.max(b.activeIndex - Math.max(r, n), 0);
                                for (t = b.activeIndex + i; t < s; t++) b.slides[t] && b.lazy.loadImageInSlide(t);
                                for (t = o; t < b.activeIndex; t++) b.slides[t] && b.lazy.loadImageInSlide(t)
                            } else {
                                var a = b.wrapper.children("." + b.params.slideNextClass);
                                a.length > 0 && b.lazy.loadImageInSlide(a.index());
                                var l = b.wrapper.children("." + b.params.slidePrevClass);
                                l.length > 0 && b.lazy.loadImageInSlide(l.index())
                            }
                    },
                    onTransitionStart: function() {
                        b.params.lazyLoading && (b.params.lazyLoadingOnTransitionStart || !b.params.lazyLoadingOnTransitionStart && !b.lazy.initialImageLoaded) && b.lazy.load()
                    },
                    onTransitionEnd: function() {
                        b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
                    }
                }, b.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function(e) {
                        var t = b.scrollbar,
                            i = b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            n = i - t.track.offset()[b.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
                            r = -b.minTranslate() * t.moveDivider,
                            s = -b.maxTranslate() * t.moveDivider;
                        n < r ? n = r : n > s && (n = s), n = -n / t.moveDivider, b.updateProgress(n), b.setWrapperTranslate(n, !0)
                    },
                    dragStart: function(e) {
                        var t = b.scrollbar;
                        t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), b.params.scrollbarHide && t.track.css("opacity", 1), b.wrapper.transition(100), t.drag.transition(100), b.emit("onScrollbarDragStart", b)
                    },
                    dragMove: function(e) {
                        var t = b.scrollbar;
                        t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), b.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), b.emit("onScrollbarDragMove", b))
                    },
                    dragEnd: function(e) {
                        var t = b.scrollbar;
                        t.isTouched && (t.isTouched = !1, b.params.scrollbarHide && (clearTimeout(t.dragTimeout), t.dragTimeout = setTimeout(function() {
                            t.track.css("opacity", 0), t.track.transition(400)
                        }, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
                    },
                    draggableEvents: function() {
                        return b.params.simulateTouch !== !1 || b.support.touch ? b.touchEvents : b.touchEventsDesktop
                    }(),
                    enableDraggable: function() {
                        var t = b.scrollbar,
                            i = b.support.touch ? t.track : document;
                        e(t.track).on(t.draggableEvents.start, t.dragStart), e(i).on(t.draggableEvents.move, t.dragMove), e(i).on(t.draggableEvents.end, t.dragEnd)
                    },
                    disableDraggable: function() {
                        var t = b.scrollbar,
                            i = b.support.touch ? t.track : document;
                        e(t.track).off(t.draggableEvents.start, t.dragStart), e(i).off(t.draggableEvents.move, t.dragMove), e(i).off(t.draggableEvents.end, t.dragEnd)
                    },
                    set: function() {
                        if (b.params.scrollbar) {
                            var t = b.scrollbar;
                            t.track = e(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && t.track.length > 1 && 1 === b.container.find(b.params.scrollbar).length && (t.track = b.container.find(b.params.scrollbar)), t.drag = t.track.find(".swiper-scrollbar-drag"), 0 === t.drag.length && (t.drag = e('<div class="swiper-scrollbar-drag"></div>'), t.track.append(t.drag)), t.drag[0].style.width = "", t.drag[0].style.height = "", t.trackSize = b.isHorizontal() ? t.track[0].offsetWidth : t.track[0].offsetHeight, t.divider = b.size / b.virtualSize, t.moveDivider = t.divider * (t.trackSize / b.size), t.dragSize = t.trackSize * t.divider, b.isHorizontal() ? t.drag[0].style.width = t.dragSize + "px" : t.drag[0].style.height = t.dragSize + "px",
                                t.divider >= 1 ? t.track[0].style.display = "none" : t.track[0].style.display = "", b.params.scrollbarHide && (t.track[0].style.opacity = 0)
                        }
                    },
                    setTranslate: function() {
                        if (b.params.scrollbar) {
                            var e, t = b.scrollbar,
                                i = (b.translate, t.dragSize);
                            e = (t.trackSize - t.dragSize) * b.progress, b.rtl && b.isHorizontal() ? (e = -e, e > 0 ? (i = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (i = t.trackSize + e)) : e < 0 ? (i = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (i = t.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = i + "px") : (b.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = i + "px"), b.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
                                t.track[0].style.opacity = 0, t.track.transition(400)
                            }, 1e3))
                        }
                    },
                    setTransition: function(e) {
                        b.params.scrollbar && b.scrollbar.drag.transition(e)
                    }
                }, b.controller = {
                    LinearSpline: function(e, t) {
                        var i = function() {
                            var e, t, i;
                            return function(n, r) {
                                for (t = -1, e = n.length; e - t > 1;) n[i = e + t >> 1] <= r ? t = i : e = i;
                                return e
                            }
                        }();
                        this.x = e, this.y = t, this.lastIndex = e.length - 1;
                        var n, r;
                        this.x.length, this.interpolate = function(e) {
                            return e ? (r = i(this.x, e), n = r - 1, (e - this.x[n]) * (this.y[r] - this.y[n]) / (this.x[r] - this.x[n]) + this.y[n]) : 0
                        }
                    },
                    getInterpolateFunction: function(e) {
                        b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
                    },
                    setTranslate: function(e, i) {
                        function n(t) {
                            e = t.rtl && "horizontal" === t.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(t), s = -b.controller.spline.interpolate(-e)), s && "container" !== b.params.controlBy || (r = (t.maxTranslate() - t.minTranslate()) / (b.maxTranslate() - b.minTranslate()), s = (e - b.minTranslate()) * r + t.minTranslate()), b.params.controlInverse && (s = t.maxTranslate() - s), t.updateProgress(s), t.setWrapperTranslate(s, !1, b), t.updateActiveIndex()
                        }
                        var r, s, o = b.params.control;
                        if (Array.isArray(o))
                            for (var a = 0; a < o.length; a++) o[a] !== i && o[a] instanceof t && n(o[a]);
                        else o instanceof t && i !== o && n(o)
                    },
                    setTransition: function(e, i) {
                        function n(t) {
                            t.setWrapperTransition(e, b), 0 !== e && (t.onTransitionStart(), t.wrapper.transitionEnd(function() {
                                s && (t.params.loop && "slide" === b.params.controlBy && t.fixLoop(), t.onTransitionEnd())
                            }))
                        }
                        var r, s = b.params.control;
                        if (Array.isArray(s))
                            for (r = 0; r < s.length; r++) s[r] !== i && s[r] instanceof t && n(s[r]);
                        else s instanceof t && i !== s && n(s)
                    }
                }, b.hashnav = {
                    onHashCange: function(e, t) {
                        var i = document.location.hash.replace("#", "");
                        i !== b.slides.eq(b.activeIndex).attr("data-hash") && b.slideTo(b.wrapper.children("." + b.params.slideClass + '[data-hash="' + i + '"]').index())
                    },
                    attachEvents: function(t) {
                        var i = t ? "off" : "on";
                        e(window)[i]("hashchange", b.hashnav.onHashCange)
                    },
                    setHash: function() {
                        if (b.hashnav.initialized && b.params.hashnav)
                            if (b.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + b.slides.eq(b.activeIndex).attr("data-hash") || "");
                            else {
                                var e = b.slides.eq(b.activeIndex),
                                    t = e.attr("data-hash") || e.attr("data-history");
                                document.location.hash = t || ""
                            }
                    },
                    init: function() {
                        if (b.params.hashnav && !b.params.history) {
                            b.hashnav.initialized = !0;
                            var e = document.location.hash.replace("#", "");
                            if (e)
                                for (var t = 0, i = b.slides.length; t < i; t++) {
                                    var n = b.slides.eq(t),
                                        r = n.attr("data-hash") || n.attr("data-history");
                                    if (r === e && !n.hasClass(b.params.slideDuplicateClass)) {
                                        var s = n.index();
                                        b.slideTo(s, 0, b.params.runCallbacksOnInit, !0)
                                    }
                                }
                            b.params.hashnavWatchState && b.hashnav.attachEvents()
                        }
                    },
                    destroy: function() {
                        b.params.hashnavWatchState && b.hashnav.attachEvents(!0)
                    }
                }, b.history = {
                    init: function() {
                        if (b.params.history) {
                            if (!window.history || !window.history.pushState) return b.params.history = !1, void(b.params.hashnav = !0);
                            b.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, b.params.runCallbacksOnInit), b.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
                        }
                    },
                    setHistoryPopState: function() {
                        b.history.paths = b.history.getPathValues(), b.history.scrollToSlide(b.params.speed, b.history.paths.value, !1)
                    },
                    getPathValues: function() {
                        var e = window.location.pathname.slice(1).split("/"),
                            t = e.length;
                        return {
                            key: e[t - 2],
                            value: e[t - 1]
                        }
                    },
                    setHistory: function(e, t) {
                        if (b.history.initialized && b.params.history) {
                            var i = b.slides.eq(t),
                                n = this.slugify(i.attr("data-history"));
                            window.location.pathname.includes(e) || (n = e + "/" + n), b.params.replaceState ? window.history.replaceState(null, null, n) : window.history.pushState(null, null, n)
                        }
                    },
                    slugify: function(e) {
                        return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                    },
                    scrollToSlide: function(e, t, i) {
                        if (t)
                            for (var n = 0, r = b.slides.length; n < r; n++) {
                                var s = b.slides.eq(n),
                                    o = this.slugify(s.attr("data-history"));
                                if (o === t && !s.hasClass(b.params.slideDuplicateClass)) {
                                    var a = s.index();
                                    b.slideTo(a, e, i)
                                }
                            } else b.slideTo(0, e, i)
                    }
                }, b.disableKeyboardControl = function() {
                    b.params.keyboardControl = !1, e(document).off("keydown", c)
                }, b.enableKeyboardControl = function() {
                    b.params.keyboardControl = !0, e(document).on("keydown", c)
                }, b.mousewheel = {
                    event: !1,
                    lastScrollTime: (new window.Date).getTime()
                }, b.params.mousewheelControl && (b.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                    var e = "onwheel" in document;
                    if (!e) {
                        var t = document.createElement("div");
                        t.setAttribute("onwheel", "return;"), e = "function" == typeof t.onwheel
                    }
                    return !e && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0 && (e = document.implementation.hasFeature("Events.wheel", "3.0")), e
                }() ? "wheel" : "mousewheel"), b.disableMousewheelControl = function() {
                    if (!b.mousewheel.event) return !1;
                    var t = b.container;
                    return "container" !== b.params.mousewheelEventsTarged && (t = e(b.params.mousewheelEventsTarged)), t.off(b.mousewheel.event, d), b.params.mousewheelControl = !1, !0
                }, b.enableMousewheelControl = function() {
                    if (!b.mousewheel.event) return !1;
                    var t = b.container;
                    return "container" !== b.params.mousewheelEventsTarged && (t = e(b.params.mousewheelEventsTarged)), t.on(b.mousewheel.event, d), b.params.mousewheelControl = !0, !0
                }, b.parallax = {
                    setTranslate: function() {
                        b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            h(this, b.progress)
                        }), b.slides.each(function() {
                            var t = e(this);
                            t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                                h(this, Math.min(Math.max(t[0].progress, -1), 1))
                            })
                        })
                    },
                    setTransition: function(t) {
                        void 0 === t && (t = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            var i = e(this),
                                n = parseInt(i.attr("data-swiper-parallax-duration"), 10) || t;
                            0 === t && (n = 0), i.transition(n)
                        })
                    }
                }, b.zoom = {
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        slide: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        image: void 0,
                        imageWrap: void 0,
                        zoomMax: b.params.zoomMax
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    },
                    getDistanceBetweenTouches: function(e) {
                        if (e.targetTouches.length < 2) return 1;
                        var t = e.targetTouches[0].pageX,
                            i = e.targetTouches[0].pageY,
                            n = e.targetTouches[1].pageX,
                            r = e.targetTouches[1].pageY;
                        return Math.sqrt(Math.pow(n - t, 2) + Math.pow(r - i, 2))
                    },
                    onGestureStart: function(t) {
                        var i = b.zoom;
                        if (!b.support.gestures) {
                            if ("touchstart" !== t.type || "touchstart" === t.type && t.targetTouches.length < 2) return;
                            i.gesture.scaleStart = i.getDistanceBetweenTouches(t)
                        }
                        return i.gesture.slide && i.gesture.slide.length || (i.gesture.slide = e(this), 0 === i.gesture.slide.length && (i.gesture.slide = b.slides.eq(b.activeIndex)), i.gesture.image = i.gesture.slide.find("img, svg, canvas"), i.gesture.imageWrap = i.gesture.image.parent("." + b.params.zoomContainerClass), i.gesture.zoomMax = i.gesture.imageWrap.attr("data-swiper-zoom") || b.params.zoomMax, 0 !== i.gesture.imageWrap.length) ? (i.gesture.image.transition(0), void(i.isScaling = !0)) : void(i.gesture.image = void 0)
                    },
                    onGestureChange: function(e) {
                        var t = b.zoom;
                        if (!b.support.gestures) {
                            if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                            t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
                        }
                        t.gesture.image && 0 !== t.gesture.image.length && (b.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), t.scale < b.params.zoomMin && (t.scale = b.params.zoomMin + 1 - Math.pow(b.params.zoomMin - t.scale + 1, .5)), t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
                    },
                    onGestureEnd: function(e) {
                        var t = b.zoom;
                        !b.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), b.params.zoomMin), t.gesture.image.transition(b.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0))
                    },
                    onTouchStart: function(e, t) {
                        var i = e.zoom;
                        i.gesture.image && 0 !== i.gesture.image.length && (i.image.isTouched || ("android" === e.device.os && t.preventDefault(), i.image.isTouched = !0, i.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, i.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
                    },
                    onTouchMove: function(e) {
                        var t = b.zoom;
                        if (t.gesture.image && 0 !== t.gesture.image.length && (b.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
                            t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, t.image.startX = b.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = b.getTranslate(t.gesture.imageWrap[0], "y") || 0, t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, t.gesture.imageWrap.transition(0), b.rtl && (t.image.startX = -t.image.startX), b.rtl && (t.image.startY = -t.image.startY));
                            var i = t.image.width * t.scale,
                                n = t.image.height * t.scale;
                            if (!(i < t.gesture.slideWidth && n < t.gesture.slideHeight)) {
                                if (t.image.minX = Math.min(t.gesture.slideWidth / 2 - i / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - n / 2, 0), t.image.maxY = -t.image.minY, t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !t.image.isMoved && !t.isScaling) {
                                    if (b.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x) return void(t.image.isTouched = !1);
                                    if (!b.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y) return void(t.image.isTouched = !1)
                                }
                                e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                            }
                        }
                    },
                    onTouchEnd: function(e, t) {
                        var i = e.zoom;
                        if (i.gesture.image && 0 !== i.gesture.image.length) {
                            if (!i.image.isTouched || !i.image.isMoved) return i.image.isTouched = !1, void(i.image.isMoved = !1);
                            i.image.isTouched = !1, i.image.isMoved = !1;
                            var n = 300,
                                r = 300,
                                s = i.velocity.x * n,
                                o = i.image.currentX + s,
                                a = i.velocity.y * r,
                                l = i.image.currentY + a;
                            0 !== i.velocity.x && (n = Math.abs((o - i.image.currentX) / i.velocity.x)), 0 !== i.velocity.y && (r = Math.abs((l - i.image.currentY) / i.velocity.y));
                            var c = Math.max(n, r);
                            i.image.currentX = o, i.image.currentY = l;
                            var u = i.image.width * i.scale,
                                d = i.image.height * i.scale;
                            i.image.minX = Math.min(i.gesture.slideWidth / 2 - u / 2, 0), i.image.maxX = -i.image.minX, i.image.minY = Math.min(i.gesture.slideHeight / 2 - d / 2, 0), i.image.maxY = -i.image.minY, i.image.currentX = Math.max(Math.min(i.image.currentX, i.image.maxX), i.image.minX), i.image.currentY = Math.max(Math.min(i.image.currentY, i.image.maxY), i.image.minY), i.gesture.imageWrap.transition(c).transform("translate3d(" + i.image.currentX + "px, " + i.image.currentY + "px,0)")
                        }
                    },
                    onTransitionEnd: function(e) {
                        var t = e.zoom;
                        t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, t.scale = t.currentScale = 1)
                    },
                    toggleZoom: function(t, i) {
                        var n = t.zoom;
                        if (n.gesture.slide || (n.gesture.slide = t.clickedSlide ? e(t.clickedSlide) : t.slides.eq(t.activeIndex), n.gesture.image = n.gesture.slide.find("img, svg, canvas"), n.gesture.imageWrap = n.gesture.image.parent("." + t.params.zoomContainerClass)), n.gesture.image && 0 !== n.gesture.image.length) {
                            var r, s, o, a, l, c, u, d, h, p, f, m, g, v, y, w, _, b;
                            void 0 === n.image.touchesStart.x && i ? (r = "touchend" === i.type ? i.changedTouches[0].pageX : i.pageX, s = "touchend" === i.type ? i.changedTouches[0].pageY : i.pageY) : (r = n.image.touchesStart.x, s = n.image.touchesStart.y), n.scale && 1 !== n.scale ? (n.scale = n.currentScale = 1, n.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), n.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), n.gesture.slide = void 0) : (n.scale = n.currentScale = n.gesture.imageWrap.attr("data-swiper-zoom") || t.params.zoomMax, i ? (_ = n.gesture.slide[0].offsetWidth, b = n.gesture.slide[0].offsetHeight, o = n.gesture.slide.offset().left, a = n.gesture.slide.offset().top, l = o + _ / 2 - r, c = a + b / 2 - s, h = n.gesture.image[0].offsetWidth, p = n.gesture.image[0].offsetHeight, f = h * n.scale, m = p * n.scale, g = Math.min(_ / 2 - f / 2, 0), v = Math.min(b / 2 - m / 2, 0), y = -g, w = -v, u = l * n.scale, d = c * n.scale, u < g && (u = g), u > y && (u = y), d < v && (d = v), d > w && (d = w)) : (u = 0, d = 0), n.gesture.imageWrap.transition(300).transform("translate3d(" + u + "px, " + d + "px,0)"), n.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + n.scale + ")"))
                        }
                    },
                    attachEvents: function(t) {
                        var i = t ? "off" : "on";
                        if (b.params.zoom) {
                            var n = (b.slides, !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            });
                            b.support.gestures ? (b.slides[i]("gesturestart", b.zoom.onGestureStart, n), b.slides[i]("gesturechange", b.zoom.onGestureChange, n), b.slides[i]("gestureend", b.zoom.onGestureEnd, n)) : "touchstart" === b.touchEvents.start && (b.slides[i](b.touchEvents.start, b.zoom.onGestureStart, n), b.slides[i](b.touchEvents.move, b.zoom.onGestureChange, n), b.slides[i](b.touchEvents.end, b.zoom.onGestureEnd, n)), b[i]("touchStart", b.zoom.onTouchStart), b.slides.each(function(t, n) {
                                e(n).find("." + b.params.zoomContainerClass).length > 0 && e(n)[i](b.touchEvents.move, b.zoom.onTouchMove)
                            }), b[i]("touchEnd", b.zoom.onTouchEnd), b[i]("transitionEnd", b.zoom.onTransitionEnd), b.params.zoomToggle && b.on("doubleTap", b.zoom.toggleZoom)
                        }
                    },
                    init: function() {
                        b.zoom.attachEvents()
                    },
                    destroy: function() {
                        b.zoom.attachEvents(!0)
                    }
                }, b._plugins = [];
                for (var W in b.plugins) {
                    var F = b.plugins[W](b, b.params[W]);
                    F && b._plugins.push(F)
                }
                return b.callPlugins = function(e) {
                    for (var t = 0; t < b._plugins.length; t++) e in b._plugins[t] && b._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, b.emitterEventListeners = {}, b.emit = function(e) {
                    b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    var t;
                    if (b.emitterEventListeners[e])
                        for (t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, b.on = function(e, t) {
                    return e = p(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(t), b
                }, b.off = function(e, t) {
                    var i;
                    if (e = p(e), void 0 === t) return b.emitterEventListeners[e] = [], b;
                    if (b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
                        for (i = 0; i < b.emitterEventListeners[e].length; i++) b.emitterEventListeners[e][i] === t && b.emitterEventListeners[e].splice(i, 1);
                        return b
                    }
                }, b.once = function(e, t) {
                    e = p(e);
                    var i = function() {
                        t(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(e, i)
                    };
                    return b.on(e, i), b
                }, b.a11y = {
                    makeFocusable: function(e) {
                        return e.attr("tabIndex", "0"), e
                    },
                    addRole: function(e, t) {
                        return e.attr("role", t), e
                    },
                    addLabel: function(e, t) {
                        return e.attr("aria-label", t), e
                    },
                    disable: function(e) {
                        return e.attr("aria-disabled", !0), e
                    },
                    enable: function(e) {
                        return e.attr("aria-disabled", !1), e
                    },
                    onEnterKey: function(t) {
                        13 === t.keyCode && (e(t.target).is(b.params.nextButton) ? (b.onClickNext(t), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : e(t.target).is(b.params.prevButton) && (b.onClickPrev(t), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), e(t.target).is("." + b.params.bulletClass) && e(t.target)[0].click())
                    },
                    liveRegion: e('<span class="' + b.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                    notify: function(e) {
                        var t = b.a11y.liveRegion;
                        0 !== t.length && (t.html(""), t.html(e))
                    },
                    init: function() {
                        b.params.nextButton && b.nextButton && b.nextButton.length > 0 && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && b.prevButton.length > 0 && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), e(b.container).append(b.a11y.liveRegion)
                    },
                    initPagination: function() {
                        b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function() {
                            var t = e(this);
                            b.a11y.makeFocusable(t), b.a11y.addRole(t, "button"), b.a11y.addLabel(t, b.params.paginationBulletMessage.replace(/{{index}}/, t.index() + 1))
                        })
                    },
                    destroy: function() {
                        b.a11y.liveRegion && b.a11y.liveRegion.length > 0 && b.a11y.liveRegion.remove()
                    }
                }, b.init = function() {
                    b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.zoom && b.zoom && b.zoom.init(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnavReplaceState && (b.params.replaceState = b.params.hashnavReplaceState), b.params.history && b.history && b.history.init(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
                }, b.cleanupStyles = function() {
                    b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && e(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && e(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
                }, b.destroy = function(e, t) {
                    b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), t && b.cleanupStyles(), b.disconnectObservers(), b.params.zoom && b.zoom && b.zoom.destroy(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.params.history && !b.params.replaceState && window.removeEventListener("popstate", b.history.setHistoryPopState), b.params.hashnav && b.hashnav && b.hashnav.destroy(), b.emit("onDestroy"), e !== !1 && (b = null)
                }, b.init(), b
            }
        };
        t.prototype = {
            isSafari: function() {
                var e = window.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
            isArray: function(e) {
                return "[object Array]" === Object.prototype.toString.apply(e)
            },
            browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
                lteIE9: function() {
                    var e = document.createElement("div");
                    return e.innerHTML = "<!--[if lte IE 9]><i></i><![endif]-->", 1 === e.getElementsByTagName("i").length
                }()
            },
            device: function() {
                var e = window.navigator.userAgent,
                    t = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    i = e.match(/(iPad).*OS\s([\d_]+)/),
                    n = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                    r = !i && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
                return {
                    ios: i || r || n,
                    android: t
                }
            }(),
            support: {
                touch: window.Modernizr && Modernizr.touch === !0 || function() {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
                }(),
                transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
                    var e = document.createElement("div").style;
                    return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
                }(),
                flexbox: function() {
                    for (var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i++)
                        if (t[i] in e) return !0
                }(),
                observer: function() {
                    return "MutationObserver" in window || "WebkitMutationObserver" in window
                }(),
                passiveListener: function() {
                    var e = !1;
                    try {
                        var t = Object.defineProperty({}, "passive", {
                            get: function() {
                                e = !0
                            }
                        });
                        window.addEventListener("testPassiveListener", null, t)
                    } catch (e) {}
                    return e
                }(),
                gestures: function() {
                    return "ongesturestart" in window
                }()
            },
            plugins: {}
        };
        for (var i = (function() {
                var e = function(e) {
                        var t = this,
                            i = 0;
                        for (i = 0; i < e.length; i++) t[i] = e[i];
                        return t.length = e.length, this
                    },
                    t = function(t, i) {
                        var n = [],
                            r = 0;
                        if (t && !i && t instanceof e) return t;
                        if (t)
                            if ("string" == typeof t) {
                                var s, o, a = t.trim();
                                if (a.indexOf("<") >= 0 && a.indexOf(">") >= 0) {
                                    var l = "div";
                                    for (0 === a.indexOf("<li") && (l = "ul"), 0 === a.indexOf("<tr") && (l = "tbody"), 0 !== a.indexOf("<td") && 0 !== a.indexOf("<th") || (l = "tr"), 0 === a.indexOf("<tbody") && (l = "table"), 0 === a.indexOf("<option") && (l = "select"), o = document.createElement(l), o.innerHTML = t, r = 0; r < o.childNodes.length; r++) n.push(o.childNodes[r])
                                } else
                                    for (s = i || "#" !== t[0] || t.match(/[ .<>:~]/) ? (i || document).querySelectorAll(t) : [document.getElementById(t.split("#")[1])], r = 0; r < s.length; r++) s[r] && n.push(s[r])
                            } else if (t.nodeType || t === window || t === document) n.push(t);
                        else if (t.length > 0 && t[0].nodeType)
                            for (r = 0; r < t.length; r++) n.push(t[r]);
                        return new e(n)
                    };
                return e.prototype = {
                    addClass: function(e) {
                        if (void 0 === e) return this;
                        for (var t = e.split(" "), i = 0; i < t.length; i++)
                            for (var n = 0; n < this.length; n++) this[n].classList.add(t[i]);
                        return this
                    },
                    removeClass: function(e) {
                        for (var t = e.split(" "), i = 0; i < t.length; i++)
                            for (var n = 0; n < this.length; n++) this[n].classList.remove(t[i]);
                        return this
                    },
                    hasClass: function(e) {
                        return !!this[0] && this[0].classList.contains(e)
                    },
                    toggleClass: function(e) {
                        for (var t = e.split(" "), i = 0; i < t.length; i++)
                            for (var n = 0; n < this.length; n++) this[n].classList.toggle(t[i]);
                        return this
                    },
                    attr: function(e, t) {
                        if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
                        for (var i = 0; i < this.length; i++)
                            if (2 === arguments.length) this[i].setAttribute(e, t);
                            else
                                for (var n in e) this[i][n] = e[n], this[i].setAttribute(n, e[n]);
                        return this
                    },
                    removeAttr: function(e) {
                        for (var t = 0; t < this.length; t++) this[t].removeAttribute(e);
                        return this
                    },
                    data: function(e, t) {
                        if (void 0 !== t) {
                            for (var i = 0; i < this.length; i++) {
                                var n = this[i];
                                n.dom7ElementDataStorage || (n.dom7ElementDataStorage = {}), n.dom7ElementDataStorage[e] = t
                            }
                            return this
                        }
                        if (this[0]) {
                            var r = this[0].getAttribute("data-" + e);
                            return r ? r : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : void 0
                        }
                    },
                    transform: function(e) {
                        for (var t = 0; t < this.length; t++) {
                            var i = this[t].style;
                            i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
                        }
                        return this
                    },
                    transition: function(e) {
                        "string" != typeof e && (e += "ms");
                        for (var t = 0; t < this.length; t++) {
                            var i = this[t].style;
                            i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
                        }
                        return this
                    },
                    on: function(e, i, n, r) {
                        function s(e) {
                            var r = e.target;
                            if (t(r).is(i)) n.call(r, e);
                            else
                                for (var s = t(r).parents(), o = 0; o < s.length; o++) t(s[o]).is(i) && n.call(s[o], e)
                        }
                        var o, a, l = e.split(" ");
                        for (o = 0; o < this.length; o++)
                            if ("function" == typeof i || i === !1)
                                for ("function" == typeof i && (n = arguments[1], r = arguments[2] || !1), a = 0; a < l.length; a++) this[o].addEventListener(l[a], n, r);
                            else
                                for (a = 0; a < l.length; a++) this[o].dom7LiveListeners || (this[o].dom7LiveListeners = []), this[o].dom7LiveListeners.push({
                                    listener: n,
                                    liveListener: s
                                }), this[o].addEventListener(l[a], s, r);
                        return this
                    },
                    off: function(e, t, i, n) {
                        for (var r = e.split(" "), s = 0; s < r.length; s++)
                            for (var o = 0; o < this.length; o++)
                                if ("function" == typeof t || t === !1) "function" == typeof t && (i = arguments[1], n = arguments[2] || !1), this[o].removeEventListener(r[s], i, n);
                                else if (this[o].dom7LiveListeners)
                            for (var a = 0; a < this[o].dom7LiveListeners.length; a++) this[o].dom7LiveListeners[a].listener === i && this[o].removeEventListener(r[s], this[o].dom7LiveListeners[a].liveListener, n);
                        return this
                    },
                    once: function(e, t, i, n) {
                        function r(o) {
                            i(o), s.off(e, t, r, n)
                        }
                        var s = this;
                        "function" == typeof t && (t = !1, i = arguments[1], n = arguments[2]), s.on(e, t, r, n)
                    },
                    trigger: function(e, t) {
                        for (var i = 0; i < this.length; i++) {
                            var n;
                            try {
                                n = new window.CustomEvent(e, {
                                    detail: t,
                                    bubbles: !0,
                                    cancelable: !0
                                })
                            } catch (i) {
                                n = document.createEvent("Event"), n.initEvent(e, !0, !0), n.detail = t
                            }
                            this[i].dispatchEvent(n)
                        }
                        return this
                    },
                    transitionEnd: function(e) {
                        function t(s) {
                            if (s.target === this)
                                for (e.call(this, s), i = 0; i < n.length; i++) r.off(n[i], t)
                        }
                        var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                            r = this;
                        if (e)
                            for (i = 0; i < n.length; i++) r.on(n[i], t);
                        return this
                    },
                    width: function() {
                        return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
                    },
                    outerWidth: function(e) {
                        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                    },
                    height: function() {
                        return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
                    },
                    outerHeight: function(e) {
                        return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                    },
                    offset: function() {
                        if (this.length > 0) {
                            var e = this[0],
                                t = e.getBoundingClientRect(),
                                i = document.body,
                                n = e.clientTop || i.clientTop || 0,
                                r = e.clientLeft || i.clientLeft || 0,
                                s = window.pageYOffset || e.scrollTop,
                                o = window.pageXOffset || e.scrollLeft;
                            return {
                                top: t.top + s - n,
                                left: t.left + o - r
                            }
                        }
                        return null
                    },
                    css: function(e, t) {
                        var i;
                        if (1 === arguments.length) {
                            if ("string" != typeof e) {
                                for (i = 0; i < this.length; i++)
                                    for (var n in e) this[i].style[n] = e[n];
                                return this
                            }
                            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                        }
                        if (2 === arguments.length && "string" == typeof e) {
                            for (i = 0; i < this.length; i++) this[i].style[e] = t;
                            return this
                        }
                        return this
                    },
                    each: function(e) {
                        for (var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
                        return this
                    },
                    html: function(e) {
                        if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                        for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
                        return this
                    },
                    text: function(e) {
                        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                        for (var t = 0; t < this.length; t++) this[t].textContent = e;
                        return this
                    },
                    is: function(i) {
                        if (!this[0]) return !1;
                        var n, r;
                        if ("string" == typeof i) {
                            var s = this[0];
                            if (s === document) return i === document;
                            if (s === window) return i === window;
                            if (s.matches) return s.matches(i);
                            if (s.webkitMatchesSelector) return s.webkitMatchesSelector(i);
                            if (s.mozMatchesSelector) return s.mozMatchesSelector(i);
                            if (s.msMatchesSelector) return s.msMatchesSelector(i);
                            for (n = t(i), r = 0; r < n.length; r++)
                                if (n[r] === this[0]) return !0;
                            return !1
                        }
                        if (i === document) return this[0] === document;
                        if (i === window) return this[0] === window;
                        if (i.nodeType || i instanceof e) {
                            for (n = i.nodeType ? [i] : i, r = 0; r < n.length; r++)
                                if (n[r] === this[0]) return !0;
                            return !1
                        }
                        return !1
                    },
                    index: function() {
                        if (this[0]) {
                            for (var e = this[0], t = 0; null !== (e = e.previousSibling);) 1 === e.nodeType && t++;
                            return t
                        }
                    },
                    eq: function(t) {
                        if (void 0 === t) return this;
                        var i, n = this.length;
                        return t > n - 1 ? new e([]) : t < 0 ? (i = n + t, new e(i < 0 ? [] : [this[i]])) : new e([this[t]])
                    },
                    append: function(t) {
                        var i, n;
                        for (i = 0; i < this.length; i++)
                            if ("string" == typeof t) {
                                var r = document.createElement("div");
                                for (r.innerHTML = t; r.firstChild;) this[i].appendChild(r.firstChild)
                            } else if (t instanceof e)
                            for (n = 0; n < t.length; n++) this[i].appendChild(t[n]);
                        else this[i].appendChild(t);
                        return this
                    },
                    prepend: function(t) {
                        var i, n;
                        for (i = 0; i < this.length; i++)
                            if ("string" == typeof t) {
                                var r = document.createElement("div");
                                for (r.innerHTML = t, n = r.childNodes.length - 1; n >= 0; n--) this[i].insertBefore(r.childNodes[n], this[i].childNodes[0])
                            } else if (t instanceof e)
                            for (n = 0; n < t.length; n++) this[i].insertBefore(t[n], this[i].childNodes[0]);
                        else this[i].insertBefore(t, this[i].childNodes[0]);
                        return this
                    },
                    insertBefore: function(e) {
                        for (var i = t(e), n = 0; n < this.length; n++)
                            if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0]);
                            else if (i.length > 1)
                            for (var r = 0; r < i.length; r++) i[r].parentNode.insertBefore(this[n].cloneNode(!0), i[r])
                    },
                    insertAfter: function(e) {
                        for (var i = t(e), n = 0; n < this.length; n++)
                            if (1 === i.length) i[0].parentNode.insertBefore(this[n], i[0].nextSibling);
                            else if (i.length > 1)
                            for (var r = 0; r < i.length; r++) i[r].parentNode.insertBefore(this[n].cloneNode(!0), i[r].nextSibling)
                    },
                    next: function(i) {
                        return new e(this.length > 0 ? i ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(i) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
                    },
                    nextAll: function(i) {
                        var n = [],
                            r = this[0];
                        if (!r) return new e([]);
                        for (; r.nextElementSibling;) {
                            var s = r.nextElementSibling;
                            i ? t(s).is(i) && n.push(s) : n.push(s), r = s
                        }
                        return new e(n)
                    },
                    prev: function(i) {
                        return new e(this.length > 0 ? i ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(i) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
                    },
                    prevAll: function(i) {
                        var n = [],
                            r = this[0];
                        if (!r) return new e([]);
                        for (; r.previousElementSibling;) {
                            var s = r.previousElementSibling;
                            i ? t(s).is(i) && n.push(s) : n.push(s), r = s
                        }
                        return new e(n)
                    },
                    parent: function(e) {
                        for (var i = [], n = 0; n < this.length; n++) e ? t(this[n].parentNode).is(e) && i.push(this[n].parentNode) : i.push(this[n].parentNode);
                        return t(t.unique(i))
                    },
                    parents: function(e) {
                        for (var i = [], n = 0; n < this.length; n++)
                            for (var r = this[n].parentNode; r;) e ? t(r).is(e) && i.push(r) : i.push(r), r = r.parentNode;
                        return t(t.unique(i))
                    },
                    find: function(t) {
                        for (var i = [], n = 0; n < this.length; n++)
                            for (var r = this[n].querySelectorAll(t), s = 0; s < r.length; s++) i.push(r[s]);
                        return new e(i)
                    },
                    children: function(i) {
                        for (var n = [], r = 0; r < this.length; r++)
                            for (var s = this[r].childNodes, o = 0; o < s.length; o++) i ? 1 === s[o].nodeType && t(s[o]).is(i) && n.push(s[o]) : 1 === s[o].nodeType && n.push(s[o]);
                        return new e(t.unique(n))
                    },
                    remove: function() {
                        for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                        return this
                    },
                    add: function() {
                        var e, i, n = this;
                        for (e = 0; e < arguments.length; e++) {
                            var r = t(arguments[e]);
                            for (i = 0; i < r.length; i++) n[n.length] = r[i], n.length++
                        }
                        return n
                    }
                }, t.fn = e.prototype, t.unique = function(e) {
                    for (var t = [], i = 0; i < e.length; i++) t.indexOf(e[i]) === -1 && t.push(e[i]);
                    return t
                }, t
            }()), n = ["jQuery", "Zepto", "Dom7"], r = 0; r < n.length; r++) window[n[r]] && function(e) {
            e.fn.swiper = function(i) {
                var n;
                return e(this).each(function() {
                    var e = new t(this, i);
                    n || (n = e)
                }), n
            }
        }(window[n[r]]);
        var s;
        s = void 0 === i ? window.Dom7 || window.Zepto || window.jQuery : i, s && ("transitionEnd" in s.fn || (s.fn.transitionEnd = function(e) {
            function t(s) {
                if (s.target === this)
                    for (e.call(this, s), i = 0; i < n.length; i++) r.off(n[i], t)
            }
            var i, n = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                r = this;
            if (e)
                for (i = 0; i < n.length; i++) r.on(n[i], t);
            return this
        }), "transform" in s.fn || (s.fn.transform = function(e) {
            for (var t = 0; t < this.length; t++) {
                var i = this[t].style;
                i.webkitTransform = i.MsTransform = i.msTransform = i.MozTransform = i.OTransform = i.transform = e
            }
            return this
        }), "transition" in s.fn || (s.fn.transition = function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t++) {
                var i = this[t].style;
                i.webkitTransitionDuration = i.MsTransitionDuration = i.msTransitionDuration = i.MozTransitionDuration = i.OTransitionDuration = i.transitionDuration = e
            }
            return this
        }), "outerWidth" in s.fn || (s.fn.outerWidth = function(e) {
            return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
        })), window.Swiper = t
    }(), "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
        "use strict";
        return window.Swiper
    }),
    function() {
        ! function(e, t) {
            "use strict";
            "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.viewportUnitsBuggyfillHacks = t()
        }(this, function() {
            "use strict";

            function e(e, n, r, s) {
                var o = "content" === r && s.indexOf("viewport-units-buggyfill") > -1;
                if (o) {
                    var a = s.replace(i, "");
                    a.split(";").forEach(function(i) {
                        var r = i.split(":");
                        if (2 === r.length) {
                            var s = r[0].trim();
                            if ("viewport-units-buggyfill" !== s) {
                                var o = r[1].trim();
                                if (e.push([n, s, o]), t.test(o)) {
                                    var a = o.replace(t, "-webkit-calc(");
                                    e.push([n, s, a])
                                }
                            }
                        }
                    })
                }
            }
            var t = /calc\(/g,
                i = /["']/g,
                n = window.navigator.userAgent,
                r = /MSIE [0-9]\./i.test(n);
            return r || (r = !!navigator.userAgent.match(/MSIE 10\.|Trident.*rv[ :]*1[01]\.| Edge\/1\d\./)), {
                required: function(e) {
                    return e.isMobileSafari || r
                },
                initialize: function() {},
                initializeEvents: function(e, t, i) {
                    e.force || r && !e._listeningToResize && (window.addEventListener("resize", i, !0), e._listeningToResize = !0)
                },
                findDeclarations: function(t, i, n, r) {
                    null !== n && e(t, i, n, r)
                },
                overwriteDeclaration: function(e, t, i) {
                    return r && "filter" === t && (i = i.replace(/px/g, "")), i
                }
            }
        })
    }(),
    function() {
        ! function(e, t) {
            "use strict";
            "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.viewportUnitsBuggyfill = t()
        }(this, function() {
            "use strict";

            function e(e, t) {
                var i;
                return function() {
                    var n = this,
                        r = arguments,
                        s = function() {
                            e.apply(n, r)
                        };
                    clearTimeout(i), i = setTimeout(s, t)
                }
            }

            function t() {
                try {
                    return window.self !== window.top
                } catch (e) {
                    return !0
                }
            }

            function i(i) {
                if (!_) {
                    if (i === !0 && (i = {
                            force: !0
                        }), g = i || {}, g.isMobileSafari = P, g.isBadStockAndroid = M, !g.ignoreVmax || g.force || C || (S = !1), C || !g.force && !P && !S && !M && !z && (!g.hacks || !g.hacks.required(g))) return window.console && C && console.info("viewport-units-buggyfill requires a proper CSSOM and basic viewport unit support, which are not available in IE8 and below"), {
                        init: function() {}
                    };
                    window.dispatchEvent(new E("viewport-units-buggyfill-init")), g.hacks && g.hacks.initialize(g), _ = !0, w = document.createElement("style"), w.id = "patched-viewport", document[g.appendToBody ? "body" : "head"].appendChild(w), h(function() {
                        var i = e(r, g.refreshDebounceWait || 100);
                        window.addEventListener("orientationchange", i, !0), window.addEventListener("pageshow", i, !0), (g.force || S || t()) && (window.addEventListener("resize", i, !0), g._listeningToResize = !0), g.hacks && g.hacks.initializeEvents(g, r, i), r()
                    })
                }
            }

            function n() {
                w.textContent = l(), w.parentNode.appendChild(w), window.dispatchEvent(new E("viewport-units-buggyfill-style"))
            }

            function r() {
                _ && (o(), setTimeout(function() {
                    n()
                }, 1))
            }

            function s(e) {
                try {
                    if (!e.cssRules) return
                } catch (t) {
                    if ("SecurityError" !== t.name) throw t;
                    return
                }
                for (var i = [], n = 0; n < e.cssRules.length; n++) {
                    var r = e.cssRules[n];
                    i.push(r)
                }
                return i
            }

            function o() {
                return y = [], k.call(document.styleSheets, function(e) {
                    var t = s(e);
                    t && "patched-viewport" !== e.ownerNode.id && "ignore" !== e.ownerNode.getAttribute("data-viewport-units-buggyfill") && (e.media && e.media.mediaText && window.matchMedia && !window.matchMedia(e.media.mediaText).matches || k.call(t, a))
                }), y
            }

            function a(e) {
                if (7 === e.type) {
                    var t;
                    try {
                        t = e.cssText
                    } catch (i) {
                        return
                    }
                    return T.lastIndex = 0, void(T.test(t) && !x.test(t) && (y.push([e, null, t]), g.hacks && g.hacks.findDeclarations(y, e, null, t)))
                }
                if (!e.style) {
                    if (!e.cssRules) return;
                    return void k.call(e.cssRules, function(e) {
                        a(e)
                    })
                }
                k.call(e.style, function(t) {
                    var i = e.style.getPropertyValue(t);
                    e.style.getPropertyPriority(t) && (i += " !important"), T.lastIndex = 0, T.test(i) && (y.push([e, t, i]), g.hacks && g.hacks.findDeclarations(y, e, t, i))
                })
            }

            function l() {
                v = d();
                var e, t, i = [],
                    n = [];
                return y.forEach(function(r) {
                    var s = c.apply(null, r),
                        o = s.selector.length ? s.selector.join(" {\n") + " {\n" : "",
                        a = new Array(s.selector.length + 1).join("\n}");
                    return o && o === e ? (o && !e && (e = o, t = a), void n.push(s.content)) : (n.length && (i.push(e + n.join("\n") + t), n.length = 0), void(o ? (e = o, t = a, n.push(s.content)) : (i.push(s.content), e = null, t = null)))
                }), n.length && i.push(e + n.join("\n") + t), z && i.push("* { content: normal !important; }"), i.join("\n\n")
            }

            function c(e, t, i) {
                var n, r = [];
                n = i.replace(T, u), g.hacks && (n = g.hacks.overwriteDeclaration(e, t, n)), t && (r.push(e.selectorText), n = t + ": " + n + ";");
                for (var s = e.parentRule; s;) s.media ? r.unshift("@media " + s.media.mediaText) : s.conditionText && r.unshift("@supports " + s.conditionText), s = s.parentRule;
                return {
                    selector: r,
                    content: n
                }
            }

            function u(e, t, i) {
                var n = v[i],
                    r = parseFloat(t) / 100;
                return r * n + "px"
            }

            function d() {
                var e = window.innerHeight,
                    t = window.innerWidth;
                return {
                    vh: e,
                    vw: t,
                    vmax: Math.max(t, e),
                    vmin: Math.min(t, e)
                }
            }

            function h(e) {
                var t = 0,
                    i = function() {
                        t--, t || e()
                    };
                k.call(document.styleSheets, function(e) {
                    e.href && p(e.href) !== p(location.href) && "ignore" !== e.ownerNode.getAttribute("data-viewport-units-buggyfill") && (t++, f(e.ownerNode, i))
                }), t || e()
            }

            function p(e) {
                return e.slice(0, e.indexOf("/", e.indexOf("://") + 3))
            }

            function f(e, t) {
                m(e.href, function() {
                    var i = document.createElement("style");
                    i.media = e.media, i.setAttribute("data-href", e.href), i.textContent = this.responseText, e.parentNode.replaceChild(i, e), t()
                }, t)
            }

            function m(e, t, i) {
                var n = new XMLHttpRequest;
                if ("withCredentials" in n) n.open("GET", e, !0);
                else {
                    if ("undefined" == typeof XDomainRequest) throw new Error("cross-domain XHR not supported");
                    n = new XDomainRequest, n.open("GET", e)
                }
                return n.onload = t, n.onerror = i, n.send(), n
            }
            var g, v, y, w, _ = !1,
                b = window.navigator.userAgent,
                T = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g,
                x = /(https?:)?\/\//,
                k = [].forEach,
                S = /MSIE [0-9]\./i.test(b),
                C = /MSIE [0-8]\./i.test(b),
                z = b.indexOf("Opera Mini") > -1,
                P = /(iPhone|iPod|iPad).+AppleWebKit/i.test(b) && function() {
                    var e = b.match(/OS (\d)/);
                    return e && e.length > 1 && parseInt(e[1]) < 10
                }(),
                M = function() {
                    var e = b.indexOf(" Android ") > -1;
                    if (!e) return !1;
                    var t = b.indexOf("Version/") > -1;
                    if (!t) return !1;
                    var i = parseFloat((b.match("Android ([0-9.]+)") || [])[1]);
                    return i <= 4.4
                }();
            S || (S = !!navigator.userAgent.match(/MSIE 10\.|Trident.*rv[ :]*1[01]\.| Edge\/1\d\./));
            try {
                new E("test")
            } catch (O) {
                var E = function(e, t) {
                    var i;
                    return t = t || {
                        bubbles: !1,
                        cancelable: !1,
                        detail: void 0
                    }, i = document.createEvent("CustomEvent"), i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
                };
                E.prototype = window.Event.prototype, window.CustomEvent = E
            }
            return {
                version: "0.6.1",
                findProperties: o,
                getCss: l,
                init: i,
                refresh: r
            }
        })
    }();
var module, countdown = function(e) {
    function t(e, t) {
        var i = e.getTime();
        return e.setMonth(e.getMonth() + t), Math.round((e.getTime() - i) / 864e5)
    }

    function i(e) {
        var t = e.getTime(),
            i = new Date(t);
        return i.setMonth(e.getMonth() + 1), Math.round((i.getTime() - t) / 864e5)
    }

    function n(e, t) {
        if (t = t instanceof Date || null !== t && isFinite(t) ? new Date((+t)) : new Date, !e) return t;
        var i = +e.value || 0;
        return i ? (t.setTime(t.getTime() + i), t) : ((i = +e.milliseconds || 0) && t.setMilliseconds(t.getMilliseconds() + i), (i = +e.seconds || 0) && t.setSeconds(t.getSeconds() + i), (i = +e.minutes || 0) && t.setMinutes(t.getMinutes() + i), (i = +e.hours || 0) && t.setHours(t.getHours() + i), (i = +e.weeks || 0) && (i *= 7), (i += +e.days || 0) && t.setDate(t.getDate() + i), (i = +e.months || 0) && t.setMonth(t.getMonth() + i), (i = +e.millennia || 0) && (i *= 10), (i += +e.centuries || 0) && (i *= 10), (i += +e.decades || 0) && (i *= 10), (i += +e.years || 0) && t.setFullYear(t.getFullYear() + i), t)
    }

    function r(e, t) {
        return m(e) + (1 === e ? c[t] : u[t])
    }

    function s() {}

    function o(e, t, n, r, s, o) {
        if (0 <= e[n] && (t += e[n], delete e[n]), t /= s, 1 >= t + 1) return 0;
        if (0 <= e[r]) {
            switch (e[r] = +(e[r] + t).toFixed(o), r) {
                case "seconds":
                    if (60 !== e.seconds || isNaN(e.minutes)) break;
                    e.minutes++, e.seconds = 0;
                case "minutes":
                    if (60 !== e.minutes || isNaN(e.hours)) break;
                    e.hours++, e.minutes = 0;
                case "hours":
                    if (24 !== e.hours || isNaN(e.days)) break;
                    e.days++, e.hours = 0;
                case "days":
                    if (7 !== e.days || isNaN(e.weeks)) break;
                    e.weeks++, e.days = 0;
                case "weeks":
                    if (e.weeks !== i(e.refMonth) / 7 || isNaN(e.months)) break;
                    e.months++, e.weeks = 0;
                case "months":
                    if (12 !== e.months || isNaN(e.years)) break;
                    e.years++, e.months = 0;
                case "years":
                    if (10 !== e.years || isNaN(e.decades)) break;
                    e.decades++, e.years = 0;
                case "decades":
                    if (10 !== e.decades || isNaN(e.centuries)) break;
                    e.centuries++, e.decades = 0;
                case "centuries":
                    if (10 !== e.centuries || isNaN(e.millennia)) break;
                    e.millennia++, e.centuries = 0
            }
            return 0
        }
        return t
    }

    function a(e, n, r, s, a, l) {
        var c = new Date;
        e.start = n = n || c, e.end = r = r || c, e.units = s, e.value = r.getTime() - n.getTime(), 0 > e.value && (c = r, r = n, n = c), e.refMonth = new Date(n.getFullYear(), n.getMonth(), 15, 12, 0, 0);
        try {
            e.millennia = 0, e.centuries = 0, e.decades = 0, e.years = r.getFullYear() - n.getFullYear(), e.months = r.getMonth() - n.getMonth(), e.weeks = 0, e.days = r.getDate() - n.getDate(), e.hours = r.getHours() - n.getHours(), e.minutes = r.getMinutes() - n.getMinutes(), e.seconds = r.getSeconds() - n.getSeconds(), e.milliseconds = r.getMilliseconds() - n.getMilliseconds();
            var u;
            for (0 > e.milliseconds ? (u = v(-e.milliseconds / 1e3), e.seconds -= u, e.milliseconds += 1e3 * u) : 1e3 <= e.milliseconds && (e.seconds += y(e.milliseconds / 1e3), e.milliseconds %= 1e3), 0 > e.seconds ? (u = v(-e.seconds / 60), e.minutes -= u, e.seconds += 60 * u) : 60 <= e.seconds && (e.minutes += y(e.seconds / 60), e.seconds %= 60), 0 > e.minutes ? (u = v(-e.minutes / 60), e.hours -= u, e.minutes += 60 * u) : 60 <= e.minutes && (e.hours += y(e.minutes / 60), e.minutes %= 60), 0 > e.hours ? (u = v(-e.hours / 24), e.days -= u, e.hours += 24 * u) : 24 <= e.hours && (e.days += y(e.hours / 24), e.hours %= 24); 0 > e.days;) e.months--, e.days += t(e.refMonth, 1);
            if (7 <= e.days && (e.weeks += y(e.days / 7), e.days %= 7), 0 > e.months ? (u = v(-e.months / 12), e.years -= u, e.months += 12 * u) : 12 <= e.months && (e.years += y(e.months / 12), e.months %= 12), 10 <= e.years && (e.decades += y(e.years / 10), e.years %= 10, 10 <= e.decades && (e.centuries += y(e.decades / 10), e.decades %= 10, 10 <= e.centuries && (e.millennia += y(e.centuries / 10), e.centuries %= 10))), n = 0, !(1024 & s) || n >= a ? (e.centuries += 10 * e.millennia, delete e.millennia) : e.millennia && n++, !(512 & s) || n >= a ? (e.decades += 10 * e.centuries, delete e.centuries) : e.centuries && n++, !(256 & s) || n >= a ? (e.years += 10 * e.decades, delete e.decades) : e.decades && n++, !(128 & s) || n >= a ? (e.months += 12 * e.years, delete e.years) : e.years && n++, !(64 & s) || n >= a ? (e.months && (e.days += t(e.refMonth, e.months)), delete e.months, 7 <= e.days && (e.weeks += y(e.days / 7), e.days %= 7)) : e.months && n++, !(32 & s) || n >= a ? (e.days += 7 * e.weeks, delete e.weeks) : e.weeks && n++, !(16 & s) || n >= a ? (e.hours += 24 * e.days, delete e.days) : e.days && n++, !(8 & s) || n >= a ? (e.minutes += 60 * e.hours, delete e.hours) : e.hours && n++, !(4 & s) || n >= a ? (e.seconds += 60 * e.minutes, delete e.minutes) : e.minutes && n++, !(2 & s) || n >= a ? (e.milliseconds += 1e3 * e.seconds, delete e.seconds) : e.seconds && n++, !(1 & s) || n >= a) {
                var d = o(e, 0, "milliseconds", "seconds", 1e3, l);
                if (d && (d = o(e, d, "seconds", "minutes", 60, l)) && (d = o(e, d, "minutes", "hours", 60, l)) && (d = o(e, d, "hours", "days", 24, l)) && (d = o(e, d, "days", "weeks", 7, l)) && (d = o(e, d, "weeks", "months", i(e.refMonth) / 7, l))) {
                    s = d;
                    var h, p = e.refMonth,
                        f = p.getTime(),
                        m = new Date(f);
                    if (m.setFullYear(p.getFullYear() + 1), h = Math.round((m.getTime() - f) / 864e5), (d = o(e, s, "months", "years", h / i(e.refMonth), l)) && (d = o(e, d, "years", "decades", 10, l)) && (d = o(e, d, "decades", "centuries", 10, l)) && (d = o(e, d, "centuries", "millennia", 10, l))) throw Error("Fractional unit overflow")
                }
            }
        } finally {
            delete e.refMonth
        }
        return e
    }

    function l(e, t, i, r, o) {
        var l;
        i = +i || 222, r = 0 < r ? r : NaN, o = 0 < o ? 20 > o ? Math.round(o) : 20 : 0;
        var c = null;
        "function" == typeof e ? (l = e, e = null) : e instanceof Date || (null !== e && isFinite(e) ? e = new Date((+e)) : ("object" == typeof c && (c = e), e = null));
        var u = null;
        if ("function" == typeof t ? (l = t, t = null) : t instanceof Date || (null !== t && isFinite(t) ? t = new Date((+t)) : ("object" == typeof t && (u = t), t = null)), c && (e = n(c, t)), u && (t = n(u, e)), !e && !t) return new s;
        if (!l) return a(new s, e, t, i, r, o);
        var d, c = 1 & i ? 1e3 / 30 : 2 & i ? 1e3 : 4 & i ? 6e4 : 8 & i ? 36e5 : 16 & i ? 864e5 : 6048e5,
            u = function() {
                l(a(new s, e, t, i, r, o), d)
            };
        return u(), d = setInterval(u, c)
    }
    var c, u, d, h, p, f, m, g, v = Math.ceil,
        y = Math.floor;
    s.prototype.toString = function(e) {
        var t = g(this),
            i = t.length;
        return i ? 1 === i ? t[0] : (e = d + t.pop(), t.join(h) + e) : e ? "" + e : p
    }, s.prototype.toHTML = function(e, t) {
        e = e || "span";
        var i = g(this),
            n = i.length;
        if (!n) return (t = t || p) ? "<" + e + ">" + t + "</" + e + ">" : t;
        for (var r = 0; r < n; r++) i[r] = "<" + e + ">" + i[r] + "</" + e + ">";
        return 1 === n ? i[0] : (n = d + i.pop(), i.join(h) + n)
    }, s.prototype.addTo = function(e) {
        return n(this, e)
    }, g = function(e) {
        var t = [],
            i = e.millennia;
        return i && t.push(f(i, 10)), (i = e.centuries) && t.push(f(i, 9)), (i = e.decades) && t.push(f(i, 8)), (i = e.years) && t.push(f(i, 7)), (i = e.months) && t.push(f(i, 6)), (i = e.weeks) && t.push(f(i, 5)), (i = e.days) && t.push(f(i, 4)), (i = e.hours) && t.push(f(i, 3)), (i = e.minutes) && t.push(f(i, 2)), (i = e.seconds) && t.push(f(i, 1)), (i = e.milliseconds) && t.push(f(i, 0)), t
    }, l.MILLISECONDS = 1, l.SECONDS = 2, l.MINUTES = 4, l.HOURS = 8, l.DAYS = 16, l.WEEKS = 32, l.MONTHS = 64, l.YEARS = 128, l.DECADES = 256, l.CENTURIES = 512, l.MILLENNIA = 1024, l.DEFAULTS = 222, l.ALL = 2047;
    var w = l.setFormat = function(e) {
            if (e) {
                if ("singular" in e || "plural" in e) {
                    var t = e.singular || [];
                    t.split && (t = t.split("|"));
                    var i = e.plural || [];
                    i.split && (i = i.split("|"));
                    for (var n = 0; 10 >= n; n++) c[n] = t[n] || c[n], u[n] = i[n] || u[n]
                }
                "string" == typeof e.last && (d = e.last), "string" == typeof e.delim && (h = e.delim), "string" == typeof e.empty && (p = e.empty), "function" == typeof e.formatNumber && (m = e.formatNumber), "function" == typeof e.formatter && (f = e.formatter)
            }
        },
        _ = l.resetFormat = function() {
            c = " millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(";"), u = " milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(";"), d = " and ", h = ", ", p = "", m = function(e) {
                return e
            }, f = r
        };
    return l.setLabels = function(e, t, i, n, r, s, o) {
        w({
            singular: e,
            plural: t,
            last: i,
            delim: n,
            empty: r,
            formatNumber: s,
            formatter: o
        })
    }, l.resetLabels = _, _(), e && e.exports ? e.exports = l : "function" == typeof window.define && "undefined" != typeof window.define.amd && window.define("countdown", [], function() {
        return l
    }), l
}(module);
"function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }),
    function(e, t, i, n) {
        var r = {
            init: function(t, i) {
                var n = this;
                n.elem = i, n.$elem = e(i), n.imageSrc = n.$elem.data("zoom-image") ? n.$elem.data("zoom-image") : n.$elem.attr("src"), n.options = e.extend({}, e.fn.elevateZoom.options, t), n.options.tint && (n.options.lensColour = "none", n.options.lensOpacity = "1"), "inner" == n.options.zoomType && (n.options.showLens = !1), n.$elem.parent().removeAttr("title").removeAttr("alt"), n.zoomImage = n.imageSrc, n.refresh(1), e("#" + n.options.gallery + " a").click(function(t) {
                    return n.options.galleryActiveClass && (e("#" + n.options.gallery + " a").removeClass(n.options.galleryActiveClass), e(this).addClass(n.options.galleryActiveClass)), t.preventDefault(), e(this).data("zoom-image") ? n.zoomImagePre = e(this).data("zoom-image") : n.zoomImagePre = e(this).data("image"), n.swaptheimage(e(this).data("image"), n.zoomImagePre), !1
                })
            },
            refresh: function(e) {
                var t = this;
                setTimeout(function() {
                    t.fetch(t.imageSrc)
                }, e || t.options.refresh)
            },
            fetch: function(e) {
                var t = this,
                    i = new Image;
                i.onload = function() {
                    t.largeWidth = i.width, t.largeHeight = i.height, t.startZoom(), t.currentImage = t.imageSrc, t.options.onZoomedImageLoaded(t.$elem)
                }, i.src = e
            },
           
            setElements: function(e) {
                var t = this;
                return !!t.options.zoomEnabled && ("show" == e && t.isWindowSet && ("inner" == t.options.zoomType && t.showHideWindow("show"), "window" == t.options.zoomType && t.showHideWindow("show"), t.options.showLens && t.showHideLens("show"), t.options.tint && "inner" != t.options.zoomType && t.showHideTint("show")), void("hide" == e && ("window" == t.options.zoomType && t.showHideWindow("hide"), t.options.tint || t.showHideWindow("hide"), t.options.showLens && t.showHideLens("hide"), t.options.tint && t.showHideTint("hide"))))
            },
            setPosition: function(e) {
                var t = this;
                return !!t.options.zoomEnabled && (t.nzHeight = t.$elem.height(), t.nzWidth = t.$elem.width(), t.nzOffset = t.$elem.offset(), t.options.tint && "inner" != t.options.zoomType && (t.zoomTint.css({
                    top: 0
                }), t.zoomTint.css({
                    left: 0
                })), t.options.responsive && !t.options.scrollZoom && t.options.showLens && (t.nzHeight < t.options.zoomWindowWidth / t.widthRatio ? lensHeight = t.nzHeight : lensHeight = String(t.options.zoomWindowHeight / t.heightRatio), t.largeWidth < t.options.zoomWindowWidth ? lensWidth = t.nzWidth : lensWidth = t.options.zoomWindowWidth / t.widthRatio, t.widthRatio = t.largeWidth / t.nzWidth, t.heightRatio = t.largeHeight / t.nzHeight, "lens" != t.options.zoomType && (t.nzHeight < t.options.zoomWindowWidth / t.widthRatio ? lensHeight = t.nzHeight : lensHeight = String(t.options.zoomWindowHeight / t.heightRatio), t.nzWidth < t.options.zoomWindowHeight / t.heightRatio ? lensWidth = t.nzWidth : lensWidth = String(t.options.zoomWindowWidth / t.widthRatio), t.zoomLens.css("width", lensWidth), t.zoomLens.css("height", lensHeight), t.options.tint && (t.zoomTintImage.css("width", t.nzWidth), t.zoomTintImage.css("height", t.nzHeight))), "lens" == t.options.zoomType && t.zoomLens.css({
                    width: String(t.options.lensSize) + "px",
                    height: String(t.options.lensSize) + "px"
                })), t.zoomContainer.css({
                    top: t.nzOffset.top
                }), t.zoomContainer.css({
                    left: t.nzOffset.left
                }), t.mouseLeft = parseInt(e.pageX - t.nzOffset.left), t.mouseTop = parseInt(e.pageY - t.nzOffset.top), "window" == t.options.zoomType && (t.Etoppos = t.mouseTop < t.zoomLens.height() / 2, t.Eboppos = t.mouseTop > t.nzHeight - t.zoomLens.height() / 2 - 2 * t.options.lensBorderSize, t.Eloppos = t.mouseLeft < 0 + t.zoomLens.width() / 2, t.Eroppos = t.mouseLeft > t.nzWidth - t.zoomLens.width() / 2 - 2 * t.options.lensBorderSize), "inner" == t.options.zoomType && (t.Etoppos = t.mouseTop < t.nzHeight / 2 / t.heightRatio, t.Eboppos = t.mouseTop > t.nzHeight - t.nzHeight / 2 / t.heightRatio, t.Eloppos = t.mouseLeft < 0 + t.nzWidth / 2 / t.widthRatio, t.Eroppos = t.mouseLeft > t.nzWidth - t.nzWidth / 2 / t.widthRatio - 2 * t.options.lensBorderSize), t.mouseLeft < 0 || t.mouseTop < 0 || t.mouseLeft > t.nzWidth || t.mouseTop > t.nzHeight ? void t.setElements("hide") : (t.options.showLens && (t.lensLeftPos = String(Math.floor(t.mouseLeft - t.zoomLens.width() / 2)), t.lensTopPos = String(Math.floor(t.mouseTop - t.zoomLens.height() / 2))), t.Etoppos && (t.lensTopPos = 0), t.Eloppos && (t.windowLeftPos = 0, t.lensLeftPos = 0, t.tintpos = 0), "window" == t.options.zoomType && (t.Eboppos && (t.lensTopPos = Math.max(t.nzHeight - t.zoomLens.height() - 2 * t.options.lensBorderSize, 0)), t.Eroppos && (t.lensLeftPos = t.nzWidth - t.zoomLens.width() - 2 * t.options.lensBorderSize)), "inner" == t.options.zoomType && (t.Eboppos && (t.lensTopPos = Math.max(t.nzHeight - 2 * t.options.lensBorderSize, 0)), t.Eroppos && (t.lensLeftPos = t.nzWidth - t.nzWidth - 2 * t.options.lensBorderSize)), "lens" == t.options.zoomType && (t.windowLeftPos = String(((e.pageX - t.nzOffset.left) * t.widthRatio - t.zoomLens.width() / 2) * -1), t.windowTopPos = String(((e.pageY - t.nzOffset.top) * t.heightRatio - t.zoomLens.height() / 2) * -1), t.zoomLens.css({
                    backgroundPosition: t.windowLeftPos + "px " + t.windowTopPos + "px"
                }), t.changeBgSize && (t.nzHeight > t.nzWidth ? ("lens" == t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvalueheight + "px " + t.largeHeight / t.newvalueheight + "px"
                })) : ("lens" == t.options.zoomType && t.zoomLens.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                }), t.zoomWindow.css({
                    "background-size": t.largeWidth / t.newvaluewidth + "px " + t.largeHeight / t.newvaluewidth + "px"
                })), t.changeBgSize = !1), t.setWindowPostition(e)), t.options.tint && "inner" != t.options.zoomType && t.setTintPosition(e), "window" == t.options.zoomType && t.setWindowPostition(e), "inner" == t.options.zoomType && t.setWindowPostition(e), t.options.showLens && (t.fullwidth && "lens" != t.options.zoomType && (t.lensLeftPos = 0), t.zoomLens.css({
                    left: t.lensLeftPos + "px",
                    top: t.lensTopPos + "px"
                })), void 0))
            },
            showHideWindow: function(e) {
                var t = this;
                "show" == e && (t.isWindowActive || (t.options.zoomWindowFadeIn ? t.zoomWindow.stop(!0, !0, !1).fadeIn(t.options.zoomWindowFadeIn) : t.zoomWindow.show(), t.isWindowActive = !0)), "hide" == e && t.isWindowActive && (t.options.zoomWindowFadeOut ? t.zoomWindow.stop(!0, !0).fadeOut(t.options.zoomWindowFadeOut, function() {
                    t.loop && (clearInterval(t.loop), t.loop = !1)
                }) : t.zoomWindow.hide(), t.isWindowActive = !1)
            },
            showHideLens: function(e) {
                var t = this;
                "show" == e && (t.isLensActive || (t.options.lensFadeIn ? t.zoomLens.stop(!0, !0, !1).fadeIn(t.options.lensFadeIn) : t.zoomLens.show(), t.isLensActive = !0)), "hide" == e && t.isLensActive && (t.options.lensFadeOut ? t.zoomLens.stop(!0, !0).fadeOut(t.options.lensFadeOut) : t.zoomLens.hide(), t.isLensActive = !1)
            },
            showHideTint: function(e) {
                var t = this;
                "show" == e && (t.isTintActive || (t.options.zoomTintFadeIn ? t.zoomTint.css({
                    opacity: t.options.tintOpacity
                }).animate().stop(!0, !0).fadeIn("slow") : (t.zoomTint.css({
                    opacity: t.options.tintOpacity
                }).animate(), t.zoomTint.show()), t.isTintActive = !0)), "hide" == e && t.isTintActive && (t.options.zoomTintFadeOut ? t.zoomTint.stop(!0, !0).fadeOut(t.options.zoomTintFadeOut) : t.zoomTint.hide(), t.isTintActive = !1)
            },
            setLensPostition: function(e) {},
            setWindowPostition: function(t) {
                var i = this;
                if (isNaN(i.options.zoomWindowPosition)) i.externalContainer = e("#" + i.options.zoomWindowPosition), i.externalContainerWidth = i.externalContainer.width(), i.externalContainerHeight = i.externalContainer.height(), i.externalContainerOffset = i.externalContainer.offset(), i.windowOffsetTop = i.externalContainerOffset.top, i.windowOffsetLeft = i.externalContainerOffset.left;
                else switch (i.options.zoomWindowPosition) {
                    case 1:
                        i.windowOffsetTop = i.options.zoomWindowOffety, i.windowOffsetLeft = +i.nzWidth;
                        break;
                    case 2:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = (i.options.zoomWindowHeight / 2 - i.nzHeight / 2) * -1, i.windowOffsetLeft = i.nzWidth);
                        break;
                    case 3:
                        i.windowOffsetTop = i.nzHeight - i.zoomWindow.height() - 2 * i.options.borderSize,
                            i.windowOffsetLeft = i.nzWidth;
                        break;
                    case 4:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = i.nzWidth;
                        break;
                    case 5:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = i.nzWidth - i.zoomWindow.width() - 2 * i.options.borderSize;
                        break;
                    case 6:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = (i.options.zoomWindowWidth / 2 - i.nzWidth / 2 + 2 * i.options.borderSize) * -1);
                        break;
                    case 7:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = 0;
                        break;
                    case 8:
                        i.windowOffsetTop = i.nzHeight, i.windowOffsetLeft = (i.zoomWindow.width() + 2 * i.options.borderSize) * -1;
                        break;
                    case 9:
                        i.windowOffsetTop = i.nzHeight - i.zoomWindow.height() - 2 * i.options.borderSize, i.windowOffsetLeft = (i.zoomWindow.width() + 2 * i.options.borderSize) * -1;
                        break;
                    case 10:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = (i.options.zoomWindowHeight / 2 - i.nzHeight / 2) * -1, i.windowOffsetLeft = (i.zoomWindow.width() + 2 * i.options.borderSize) * -1);
                        break;
                    case 11:
                        i.windowOffsetTop = i.options.zoomWindowOffety, i.windowOffsetLeft = (i.zoomWindow.width() + 2 * i.options.borderSize) * -1;
                        break;
                    case 12:
                        i.windowOffsetTop = (i.zoomWindow.height() + 2 * i.options.borderSize) * -1, i.windowOffsetLeft = (i.zoomWindow.width() + 2 * i.options.borderSize) * -1;
                        break;
                    case 13:
                        i.windowOffsetTop = (i.zoomWindow.height() + 2 * i.options.borderSize) * -1, i.windowOffsetLeft = 0;
                        break;
                    case 14:
                        i.options.zoomWindowHeight > i.nzHeight && (i.windowOffsetTop = (i.zoomWindow.height() + 2 * i.options.borderSize) * -1, i.windowOffsetLeft = (i.options.zoomWindowWidth / 2 - i.nzWidth / 2 + 2 * i.options.borderSize) * -1);
                        break;
                    case 15:
                        i.windowOffsetTop = (i.zoomWindow.height() + 2 * i.options.borderSize) * -1, i.windowOffsetLeft = i.nzWidth - i.zoomWindow.width() - 2 * i.options.borderSize;
                        break;
                    case 16:
                        i.windowOffsetTop = (i.zoomWindow.height() + 2 * i.options.borderSize) * -1, i.windowOffsetLeft = i.nzWidth;
                        break;
                    default:
                        i.windowOffsetTop = i.options.zoomWindowOffety, i.windowOffsetLeft = i.nzWidth
                }
                i.isWindowSet = !0, i.windowOffsetTop = i.windowOffsetTop + i.options.zoomWindowOffety, i.windowOffsetLeft = i.windowOffsetLeft + i.options.zoomWindowOffetx, i.zoomWindow.css({
                    top: i.windowOffsetTop
                }), i.zoomWindow.css({
                    left: i.windowOffsetLeft
                }), "inner" == i.options.zoomType && (i.zoomWindow.css({
                    top: 0
                }), i.zoomWindow.css({
                    left: 0
                })), i.windowLeftPos = String(((t.pageX - i.nzOffset.left) * i.widthRatio - i.zoomWindow.width() / 2) * -1), i.windowTopPos = String(((t.pageY - i.nzOffset.top) * i.heightRatio - i.zoomWindow.height() / 2) * -1), i.Etoppos && (i.windowTopPos = 0), i.Eloppos && (i.windowLeftPos = 0), i.Eboppos && (i.windowTopPos = (i.largeHeight / i.currentZoomLevel - i.zoomWindow.height()) * -1), i.Eroppos && (i.windowLeftPos = (i.largeWidth / i.currentZoomLevel - i.zoomWindow.width()) * -1), i.fullheight && (i.windowTopPos = 0), i.fullwidth && (i.windowLeftPos = 0), "window" != i.options.zoomType && "inner" != i.options.zoomType || (1 == i.zoomLock && (i.widthRatio <= 1 && (i.windowLeftPos = 0), i.heightRatio <= 1 && (i.windowTopPos = 0)), "window" == i.options.zoomType && (i.largeHeight < i.options.zoomWindowHeight && (i.windowTopPos = 0), i.largeWidth < i.options.zoomWindowWidth && (i.windowLeftPos = 0)), i.options.easing ? (i.xp || (i.xp = 0), i.yp || (i.yp = 0), i.loop || (i.loop = setInterval(function() {
                    i.xp += (i.windowLeftPos - i.xp) / i.options.easingAmount, i.yp += (i.windowTopPos - i.yp) / i.options.easingAmount, i.scrollingLock ? (clearInterval(i.loop), i.xp = i.windowLeftPos, i.yp = i.windowTopPos, i.xp = ((t.pageX - i.nzOffset.left) * i.widthRatio - i.zoomWindow.width() / 2) * -1, i.yp = ((t.pageY - i.nzOffset.top) * i.heightRatio - i.zoomWindow.height() / 2) * -1, i.changeBgSize && (i.nzHeight > i.nzWidth ? ("lens" == i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    })) : ("lens" != i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvalueheight + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                    })), i.changeBgSize = !1), i.zoomWindow.css({
                        backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"
                    }), i.scrollingLock = !1, i.loop = !1) : Math.round(Math.abs(i.xp - i.windowLeftPos) + Math.abs(i.yp - i.windowTopPos)) < 1 ? (clearInterval(i.loop), i.zoomWindow.css({
                        backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"
                    }), i.loop = !1) : (i.changeBgSize && (i.nzHeight > i.nzWidth ? ("lens" == i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                    })) : ("lens" != i.options.zoomType && i.zoomLens.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                    }), i.zoomWindow.css({
                        "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                    })), i.changeBgSize = !1), i.zoomWindow.css({
                        backgroundPosition: i.xp + "px " + i.yp + "px"
                    }))
                }, 16))) : (i.changeBgSize && (i.nzHeight > i.nzWidth ? ("lens" == i.options.zoomType && i.zoomLens.css({
                    "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                }), i.zoomWindow.css({
                    "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                })) : ("lens" == i.options.zoomType && i.zoomLens.css({
                    "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                }), i.largeHeight / i.newvaluewidth < i.options.zoomWindowHeight ? i.zoomWindow.css({
                    "background-size": i.largeWidth / i.newvaluewidth + "px " + i.largeHeight / i.newvaluewidth + "px"
                }) : i.zoomWindow.css({
                    "background-size": i.largeWidth / i.newvalueheight + "px " + i.largeHeight / i.newvalueheight + "px"
                })), i.changeBgSize = !1), i.zoomWindow.css({
                    backgroundPosition: i.windowLeftPos + "px " + i.windowTopPos + "px"
                })))
            },
            setTintPosition: function(e) {
                var t = this;
                t.nzOffset = t.$elem.offset(), t.tintpos = String((e.pageX - t.nzOffset.left - t.zoomLens.width() / 2) * -1), t.tintposy = String((e.pageY - t.nzOffset.top - t.zoomLens.height() / 2) * -1), t.Etoppos && (t.tintposy = 0), t.Eloppos && (t.tintpos = 0), t.Eboppos && (t.tintposy = (t.nzHeight - t.zoomLens.height() - 2 * t.options.lensBorderSize) * -1), t.Eroppos && (t.tintpos = (t.nzWidth - t.zoomLens.width() - 2 * t.options.lensBorderSize) * -1), t.options.tint && (t.fullheight && (t.tintposy = 0), t.fullwidth && (t.tintpos = 0), t.zoomTintImage.css({
                    left: t.tintpos + "px"
                }), t.zoomTintImage.css({
                    top: t.tintposy + "px"
                }))
            },
            swaptheimage: function(t, i) {
                var n = this,
                    r = new Image;
                n.options.loadingIcon && (n.spinner = e("<div style=\"background: url('" + n.options.loadingIcon + "') no-repeat center;height:" + n.nzHeight + "px;width:" + n.nzWidth + 'px;z-index: 2000;position: absolute; background-position: center center;"></div>'), n.$elem.after(n.spinner)), n.options.onImageSwap(n.$elem), r.onload = function() {
                    n.largeWidth = r.width, n.largeHeight = r.height, n.zoomImage = i, n.zoomWindow.css({
                        "background-size": n.largeWidth + "px " + n.largeHeight + "px"
                    }), n.swapAction(t, i)
                }, r.src = i
            },
            swapAction: function(t, i) {
                var n = this,
                    r = new Image;
                if (r.onload = function() {
                        n.nzHeight = r.height, n.nzWidth = r.width, n.options.onImageSwapComplete(n.$elem), n.doneCallback()
                    }, r.src = t, n.currentZoomLevel = n.options.zoomLevel, n.options.maxZoomLevel = !1, "lens" == n.options.zoomType && n.zoomLens.css({
                        backgroundImage: "url('" + i + "')"
                    }), "window" == n.options.zoomType && n.zoomWindow.css({
                        backgroundImage: "url('" + i + "')"
                    }), "inner" == n.options.zoomType && n.zoomWindow.css({
                        backgroundImage: "url('" + i + "')"
                    }), n.currentImage = i, n.options.imageCrossfade) {
                    var s = n.$elem,
                        o = s.clone();
                    if (n.$elem.attr("src", t), n.$elem.after(o), o.stop(!0).fadeOut(n.options.imageCrossfade, function() {
                            e(this).remove()
                        }), n.$elem.width("auto").removeAttr("width"), n.$elem.height("auto").removeAttr("height"), s.fadeIn(n.options.imageCrossfade), n.options.tint && "inner" != n.options.zoomType) {
                        var a = n.zoomTintImage,
                            l = a.clone();
                        n.zoomTintImage.attr("src", i), n.zoomTintImage.after(l), l.stop(!0).fadeOut(n.options.imageCrossfade, function() {
                            e(this).remove()
                        }), a.fadeIn(n.options.imageCrossfade), n.zoomTint.css({
                            height: n.$elem.height()
                        }), n.zoomTint.css({
                            width: n.$elem.width()
                        })
                    }
                    n.zoomContainer.css("height", n.$elem.height()), n.zoomContainer.css("width", n.$elem.width()), "inner" == n.options.zoomType && (n.options.constrainType || (n.zoomWrap.parent().css("height", n.$elem.height()), n.zoomWrap.parent().css("width", n.$elem.width()), n.zoomWindow.css("height", n.$elem.height()), n.zoomWindow.css("width", n.$elem.width()))), n.options.imageCrossfade && (n.zoomWrap.css("height", n.$elem.height()), n.zoomWrap.css("width", n.$elem.width()))
                } else n.$elem.attr("src", t), n.options.tint && (n.zoomTintImage.attr("src", i), n.zoomTintImage.attr("height", n.$elem.height()), n.zoomTintImage.css({
                    height: n.$elem.height()
                }), n.zoomTint.css({
                    height: n.$elem.height()
                })), n.zoomContainer.css("height", n.$elem.height()), n.zoomContainer.css("width", n.$elem.width()), n.options.imageCrossfade && (n.zoomWrap.css("height", n.$elem.height()), n.zoomWrap.css("width", n.$elem.width()));
                n.options.constrainType && ("height" == n.options.constrainType && (n.zoomContainer.css("height", n.options.constrainSize), n.zoomContainer.css("width", "auto"), n.options.imageCrossfade ? (n.zoomWrap.css("height", n.options.constrainSize), n.zoomWrap.css("width", "auto"), n.constwidth = n.zoomWrap.width()) : (n.$elem.css("height", n.options.constrainSize), n.$elem.css("width", "auto"), n.constwidth = n.$elem.width()), "inner" == n.options.zoomType && (n.zoomWrap.parent().css("height", n.options.constrainSize), n.zoomWrap.parent().css("width", n.constwidth), n.zoomWindow.css("height", n.options.constrainSize), n.zoomWindow.css("width", n.constwidth)), n.options.tint && (n.tintContainer.css("height", n.options.constrainSize), n.tintContainer.css("width", n.constwidth), n.zoomTint.css("height", n.options.constrainSize), n.zoomTint.css("width", n.constwidth), n.zoomTintImage.css("height", n.options.constrainSize), n.zoomTintImage.css("width", n.constwidth))), "width" == n.options.constrainType && (n.zoomContainer.css("height", "auto"), n.zoomContainer.css("width", n.options.constrainSize), n.options.imageCrossfade ? (n.zoomWrap.css("height", "auto"), n.zoomWrap.css("width", n.options.constrainSize), n.constheight = n.zoomWrap.height()) : (n.$elem.css("height", "auto"), n.$elem.css("width", n.options.constrainSize), n.constheight = n.$elem.height()), "inner" == n.options.zoomType && (n.zoomWrap.parent().css("height", n.constheight), n.zoomWrap.parent().css("width", n.options.constrainSize), n.zoomWindow.css("height", n.constheight), n.zoomWindow.css("width", n.options.constrainSize)), n.options.tint && (n.tintContainer.css("height", n.constheight), n.tintContainer.css("width", n.options.constrainSize), n.zoomTint.css("height", n.constheight), n.zoomTint.css("width", n.options.constrainSize), n.zoomTintImage.css("height", n.constheight), n.zoomTintImage.css("width", n.options.constrainSize))))
            },
            doneCallback: function() {
                var e = this;
                e.options.loadingIcon && e.spinner.hide(), e.nzOffset = e.$elem.offset(), e.nzWidth = e.$elem.width(), e.nzHeight = e.$elem.height(), e.currentZoomLevel = e.options.zoomLevel, e.widthRatio = e.largeWidth / e.nzWidth, e.heightRatio = e.largeHeight / e.nzHeight, "window" == e.options.zoomType && (e.nzHeight < e.options.zoomWindowWidth / e.widthRatio ? lensHeight = e.nzHeight : lensHeight = String(e.options.zoomWindowHeight / e.heightRatio), e.options.zoomWindowWidth < e.options.zoomWindowWidth ? lensWidth = e.nzWidth : lensWidth = e.options.zoomWindowWidth / e.widthRatio, e.zoomLens && (e.zoomLens.css("width", lensWidth), e.zoomLens.css("height", lensHeight)))
            },
            getCurrentImage: function() {
                var e = this;
                return e.zoomImage
            },
            getGalleryList: function() {
                var t = this;
                return t.gallerylist = [], t.options.gallery ? e("#" + t.options.gallery + " a").each(function() {
                    var i = "";
                    e(this).data("zoom-image") ? i = e(this).data("zoom-image") : e(this).data("image") && (i = e(this).data("image")), i == t.zoomImage ? t.gallerylist.unshift({
                        href: "" + i,
                        title: e(this).find("img").attr("title")
                    }) : t.gallerylist.push({
                        href: "" + i,
                        title: e(this).find("img").attr("title")
                    })
                }) : t.gallerylist.push({
                    href: "" + t.zoomImage,
                    title: e(this).find("img").attr("title")
                }), t.gallerylist
            },
            changeZoomLevel: function(e) {
                var t = this;
                t.scrollingLock = !0, t.newvalue = parseFloat(e).toFixed(2), newvalue = parseFloat(e).toFixed(2), maxheightnewvalue = t.largeHeight / (t.options.zoomWindowHeight / t.nzHeight * t.nzHeight), maxwidthtnewvalue = t.largeWidth / (t.options.zoomWindowWidth / t.nzWidth * t.nzWidth), "inner" != t.options.zoomType && (maxheightnewvalue <= newvalue ? (t.heightRatio = t.largeHeight / maxheightnewvalue / t.nzHeight, t.newvalueheight = maxheightnewvalue, t.fullheight = !0) : (t.heightRatio = t.largeHeight / newvalue / t.nzHeight, t.newvalueheight = newvalue, t.fullheight = !1), maxwidthtnewvalue <= newvalue ? (t.widthRatio = t.largeWidth / maxwidthtnewvalue / t.nzWidth, t.newvaluewidth = maxwidthtnewvalue, t.fullwidth = !0) : (t.widthRatio = t.largeWidth / newvalue / t.nzWidth, t.newvaluewidth = newvalue, t.fullwidth = !1), "lens" == t.options.zoomType && (maxheightnewvalue <= newvalue ? (t.fullwidth = !0, t.newvaluewidth = maxheightnewvalue) : (t.widthRatio = t.largeWidth / newvalue / t.nzWidth, t.newvaluewidth = newvalue, t.fullwidth = !1))), "inner" == t.options.zoomType && (maxheightnewvalue = parseFloat(t.largeHeight / t.nzHeight).toFixed(2), maxwidthtnewvalue = parseFloat(t.largeWidth / t.nzWidth).toFixed(2), newvalue > maxheightnewvalue && (newvalue = maxheightnewvalue), newvalue > maxwidthtnewvalue && (newvalue = maxwidthtnewvalue), maxheightnewvalue <= newvalue ? (t.heightRatio = t.largeHeight / newvalue / t.nzHeight, newvalue > maxheightnewvalue ? t.newvalueheight = maxheightnewvalue : t.newvalueheight = newvalue, t.fullheight = !0) : (t.heightRatio = t.largeHeight / newvalue / t.nzHeight, newvalue > maxheightnewvalue ? t.newvalueheight = maxheightnewvalue : t.newvalueheight = newvalue, t.fullheight = !1), maxwidthtnewvalue <= newvalue ? (t.widthRatio = t.largeWidth / newvalue / t.nzWidth, newvalue > maxwidthtnewvalue ? t.newvaluewidth = maxwidthtnewvalue : t.newvaluewidth = newvalue, t.fullwidth = !0) : (t.widthRatio = t.largeWidth / newvalue / t.nzWidth, t.newvaluewidth = newvalue, t.fullwidth = !1)), scrcontinue = !1, "inner" == t.options.zoomType && (t.nzWidth >= t.nzHeight && (t.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, t.fullheight = !0, t.fullwidth = !0)), t.nzHeight > t.nzWidth && (t.newvaluewidth <= maxwidthtnewvalue ? scrcontinue = !0 : (scrcontinue = !1, t.fullheight = !0, t.fullwidth = !0))), "inner" != t.options.zoomType && (scrcontinue = !0), scrcontinue && (t.zoomLock = 0, t.changeZoom = !0, t.options.zoomWindowHeight / t.heightRatio <= t.nzHeight && (t.currentZoomLevel = t.newvalueheight, "lens" != t.options.zoomType && "inner" != t.options.zoomType && (t.changeBgSize = !0, t.zoomLens.css({
                    height: String(t.options.zoomWindowHeight / t.heightRatio) + "px"
                })), "lens" != t.options.zoomType && "inner" != t.options.zoomType || (t.changeBgSize = !0)), t.options.zoomWindowWidth / t.widthRatio <= t.nzWidth && ("inner" != t.options.zoomType && t.newvaluewidth > t.newvalueheight && (t.currentZoomLevel = t.newvaluewidth), "lens" != t.options.zoomType && "inner" != t.options.zoomType && (t.changeBgSize = !0, t.zoomLens.css({
                    width: String(t.options.zoomWindowWidth / t.widthRatio) + "px"
                })), "lens" != t.options.zoomType && "inner" != t.options.zoomType || (t.changeBgSize = !0)), "inner" == t.options.zoomType && (t.changeBgSize = !0, t.nzWidth > t.nzHeight && (t.currentZoomLevel = t.newvaluewidth), t.nzHeight > t.nzWidth && (t.currentZoomLevel = t.newvaluewidth))), t.setPosition(t.currentLoc)
            },
            closeAll: function() {
                self.zoomWindow && self.zoomWindow.hide(), self.zoomLens && self.zoomLens.hide(), self.zoomTint && self.zoomTint.hide()
            },
            changeState: function(e) {
                var t = this;
                "enable" == e && (t.options.zoomEnabled = !0), "disable" == e && (t.options.zoomEnabled = !1)
            }
        };
        e.fn.elevateZoom = function(t) {
            return this.each(function() {
                var i = Object.create(r);
                i.init(t, this), e.data(this, "elevateZoom", i)
            })
        }, e.fn.elevateZoom.options = {
            zoomActivation: "hover",
            zoomEnabled: !0,
            preloading: 1,
            zoomLevel: 1,
            scrollZoom: !1,
            scrollZoomIncrement: .1,
            minZoomLevel: !1,
            maxZoomLevel: !1,
            easing: !1,
            easingAmount: 12,
            lensSize: 200,
            zoomWindowWidth: 400,
            zoomWindowHeight: 400,
            zoomWindowOffetx: 0,
            zoomWindowOffety: 0,
            zoomWindowPosition: 1,
            zoomWindowBgColour: "#fff",
            lensFadeIn: !1,
            lensFadeOut: !1,
            debug: !1,
            zoomWindowFadeIn: !1,
            zoomWindowFadeOut: !1,
            zoomWindowAlwaysShow: !1,
            zoomTintFadeIn: !1,
            zoomTintFadeOut: !1,
            borderSize: 4,
            showLens: !0,
            borderColour: "#888",
            lensBorderSize: 1,
            lensBorderColour: "#000",
            lensShape: "square",
            zoomType: "window",
            containLensZoom: !1,
            lensColour: "white",
            lensOpacity: .4,
            lenszoom: !1,
            tint: !1,
            tintColour: "#333",
            tintOpacity: .4,
            gallery: !1,
            galleryActiveClass: "zoomGalleryActive",
            imageCrossfade: !1,
            constrainType: !1,
            constrainSize: !1,
            loadingIcon: !1,
            responsive: !0,
            onComplete: e.noop,
            onDestroy: function() {},
            onZoomedImageLoaded: function() {},
            onImageSwap: e.noop,
            onImageSwapComplete: e.noop
        }
    }(jQuery, window, document), ! function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function(e) {
        var t = -1,
            i = -1,
            n = function(e) {
                return parseFloat(e) || 0
            },
            r = function(t) {
                var i = 1,
                    r = e(t),
                    s = null,
                    o = [];
                return r.each(function() {
                    var t = e(this),
                        r = t.offset().top - n(t.css("margin-top")),
                        a = o.length > 0 ? o[o.length - 1] : null;
                    null === a ? o.push(t) : Math.floor(Math.abs(s - r)) <= i ? o[o.length - 1] = a.add(t) : o.push(t), s = r
                }), o
            },
            s = function(t) {
                var i = {
                    byRow: !0,
                    property: "height",
                    target: null,
                    remove: !1
                };
                return "object" == typeof t ? e.extend(i, t) : ("boolean" == typeof t ? i.byRow = t : "remove" === t && (i.remove = !0), i)
            },
            o = e.fn.matchHeight = function(t) {
                var i = s(t);
                if (i.remove) {
                    var n = this;
                    return this.css(i.property, ""), e.each(o._groups, function(e, t) {
                        t.elements = t.elements.not(n)
                    }), this
                }
                return this.length <= 1 && !i.target ? this : (o._groups.push({
                    elements: this,
                    options: i
                }), o._apply(this, i), this)
            };
        o.version = "0.7.0", o._groups = [], o._throttle = 80, o._maintainScroll = !1, o._beforeUpdate = null, o._afterUpdate = null, o._rows = r, o._parse = n, o._parseOptions = s, o._apply = function(t, i) {
            var a = s(i),
                l = e(t),
                c = [l],
                u = e(window).scrollTop(),
                d = e("html").outerHeight(!0),
                h = l.parents().filter(":hidden");
            return h.each(function() {
                var t = e(this);
                t.data("style-cache", t.attr("style"))
            }), h.css("display", "block"), a.byRow && !a.target && (l.each(function() {
                var t = e(this),
                    i = t.css("display");
                "inline-block" !== i && "flex" !== i && "inline-flex" !== i && (i = "block"), t.data("style-cache", t.attr("style")), t.css({
                    display: i,
                    "padding-top": "0",
                    "padding-bottom": "0",
                    "margin-top": "0",
                    "margin-bottom": "0",
                    "border-top-width": "0",
                    "border-bottom-width": "0",
                    height: "100px",
                    overflow: "hidden"
                })
            }), c = r(l), l.each(function() {
                var t = e(this);
                t.attr("style", t.data("style-cache") || "")
            })), e.each(c, function(t, i) {
                var r = e(i),
                    s = 0;
                if (a.target) s = a.target.outerHeight(!1);
                else {
                    if (a.byRow && r.length <= 1) return void r.css(a.property, "");
                    r.each(function() {
                        var t = e(this),
                            i = t.attr("style"),
                            n = t.css("display");
                        "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                        var r = {
                            display: n
                        };
                        r[a.property] = "", t.css(r), t.outerHeight(!1) > s && (s = t.outerHeight(!1)), i ? t.attr("style", i) : t.css("display", "")
                    })
                }
                r.each(function() {
                    var t = e(this),
                        i = 0;
                    a.target && t.is(a.target) || ("border-box" !== t.css("box-sizing") && (i += n(t.css("border-top-width")) + n(t.css("border-bottom-width")), i += n(t.css("padding-top")) + n(t.css("padding-bottom"))), t.css(a.property, s - i + "px"))
                })
            }), h.each(function() {
                var t = e(this);
                t.attr("style", t.data("style-cache") || null)
            }), o._maintainScroll && e(window).scrollTop(u / d * e("html").outerHeight(!0)), this
        }, o._applyDataApi = function() {
            var t = {};
            e("[data-match-height], [data-mh]").each(function() {
                var i = e(this),
                    n = i.attr("data-mh") || i.attr("data-match-height");
                n in t ? t[n] = t[n].add(i) : t[n] = i
            }), e.each(t, function() {
                this.matchHeight(!0)
            })
        };
        var a = function(t) {
            o._beforeUpdate && o._beforeUpdate(t, o._groups), e.each(o._groups, function() {
                o._apply(this.elements, this.options)
            }), o._afterUpdate && o._afterUpdate(t, o._groups)
        };
        o._update = function(n, r) {
            if (r && "resize" === r.type) {
                var s = e(window).width();
                if (s === t) return;
                t = s
            }
            n ? -1 === i && (i = setTimeout(function() {
                a(r), i = -1
            }, o._throttle)) : a(r)
        }, e(o._applyDataApi), e(window).bind("load", function(e) {
            o._update(!1, e)
        }), e(window).bind("resize orientationchange", function(e) {
            o._update(!0, e)
        })
    }), MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", MarkerClusterer.prototype.extend = function(e, t) {
        return function(e) {
            for (var t in e.prototype) this.prototype[t] = e.prototype[t];
            return this
        }.apply(e, [t])
    }, MarkerClusterer.prototype.onAdd = function() {
        this.setReady_(!0)
    }, MarkerClusterer.prototype.draw = function() {}, MarkerClusterer.prototype.setupStyles_ = function() {
        if (!this.styles_.length)
            for (var e, t = 0; e = this.sizes[t]; t++) this.styles_.push({
                url: this.imagePath_ + (t + 1) + "." + this.imageExtension_,
                height: e,
                width: e
            })
    }, MarkerClusterer.prototype.fitMapToMarkers = function() {
        for (var e, t = this.getMarkers(), i = new google.maps.LatLngBounds, n = 0; e = t[n]; n++) i.extend(e.getPosition());
        this.map_.fitBounds(i)
    }, MarkerClusterer.prototype.setStyles = function(e) {
        this.styles_ = e
    }, MarkerClusterer.prototype.getStyles = function() {
        return this.styles_
    }, MarkerClusterer.prototype.isZoomOnClick = function() {
        return this.zoomOnClick_
    }, MarkerClusterer.prototype.isAverageCenter = function() {
        return this.averageCenter_
    }, MarkerClusterer.prototype.getMarkers = function() {
        return this.markers_
    }, MarkerClusterer.prototype.getTotalMarkers = function() {
        return this.markers_.length
    }, MarkerClusterer.prototype.setMaxZoom = function(e) {
        this.maxZoom_ = e
    }, MarkerClusterer.prototype.getMaxZoom = function() {
        return this.maxZoom_
    }, MarkerClusterer.prototype.calculator_ = function(e, t) {
        for (var i = 0, n = e.length, r = n; 0 !== r;) r = parseInt(r / 10, 10), i++;
        return i = Math.min(i, t), {
            text: n,
            index: i
        }
    }, MarkerClusterer.prototype.setCalculator = function(e) {
        this.calculator_ = e
    }, MarkerClusterer.prototype.getCalculator = function() {
        return this.calculator_
    }, MarkerClusterer.prototype.addMarkers = function(e, t) {
        if (e.length)
            for (var i, n = 0; i = e[n]; n++) this.pushMarkerTo_(i);
        else if (Object.keys(e).length)
            for (var i in e) this.pushMarkerTo_(e[i]);
        t || this.redraw()
    }, MarkerClusterer.prototype.pushMarkerTo_ = function(e) {
        if (e.isAdded = !1, e.draggable) {
            var t = this;
            google.maps.event.addListener(e, "dragend", function() {
                e.isAdded = !1, t.repaint()
            })
        }
        this.markers_.push(e)
    }, MarkerClusterer.prototype.addMarker = function(e, t) {
        this.pushMarkerTo_(e), t || this.redraw()
    }, MarkerClusterer.prototype.removeMarker_ = function(e) {
        var t = -1;
        if (this.markers_.indexOf) t = this.markers_.indexOf(e);
        else
            for (var i, n = 0; i = this.markers_[n]; n++)
                if (i == e) {
                    t = n;
                    break
                } return t != -1 && (e.setMap(null), this.markers_.splice(t, 1), !0)
    }, MarkerClusterer.prototype.removeMarker = function(e, t) {
        var i = this.removeMarker_(e);
        return !(t || !i) && (this.resetViewport(), this.redraw(), !0)
    }, MarkerClusterer.prototype.removeMarkers = function(e, t) {
        for (var i, n = e === this.getMarkers() ? e.slice() : e, r = !1, s = 0; i = n[s]; s++) {
            var o = this.removeMarker_(i);
            r = r || o
        }
        if (!t && r) return this.resetViewport(), this.redraw(), !0
    }, MarkerClusterer.prototype.setReady_ = function(e) {
        this.ready_ || (this.ready_ = e, this.createClusters_())
    }, MarkerClusterer.prototype.getTotalClusters = function() {
        return this.clusters_.length
    }, MarkerClusterer.prototype.getMap = function() {
        return this.map_
    }, MarkerClusterer.prototype.setMap = function(e) {
        this.map_ = e
    }, MarkerClusterer.prototype.getGridSize = function() {
        return this.gridSize_
    }, MarkerClusterer.prototype.setGridSize = function(e) {
        this.gridSize_ = e
    }, MarkerClusterer.prototype.getMinClusterSize = function() {
        return this.minClusterSize_
    }, MarkerClusterer.prototype.setMinClusterSize = function(e) {
        this.minClusterSize_ = e
    }, MarkerClusterer.prototype.getExtendedBounds = function(e) {
        var t = this.getProjection(),
            i = new google.maps.LatLng(e.getNorthEast().lat(), e.getNorthEast().lng()),
            n = new google.maps.LatLng(e.getSouthWest().lat(), e.getSouthWest().lng()),
            r = t.fromLatLngToDivPixel(i);
        r.x += this.gridSize_, r.y -= this.gridSize_;
        var s = t.fromLatLngToDivPixel(n);
        s.x -= this.gridSize_, s.y += this.gridSize_;
        var o = t.fromDivPixelToLatLng(r),
            a = t.fromDivPixelToLatLng(s);
        return e.extend(o), e.extend(a), e
    }, MarkerClusterer.prototype.isMarkerInBounds_ = function(e, t) {
        return t.contains(e.getPosition())
    }, MarkerClusterer.prototype.clearMarkers = function() {
        this.resetViewport(!0), this.markers_ = []
    }, MarkerClusterer.prototype.resetViewport = function(e) {
        for (var t, i = 0; t = this.clusters_[i]; i++) t.remove();
        for (var n, i = 0; n = this.markers_[i]; i++) n.isAdded = !1, e && n.setMap(null);
        this.clusters_ = []
    }, MarkerClusterer.prototype.repaint = function() {
        var e = this.clusters_.slice();
        this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function() {
            for (var t, i = 0; t = e[i]; i++) t.remove()
        }, 0)
    }, MarkerClusterer.prototype.redraw = function() {
        this.createClusters_()
    }, MarkerClusterer.prototype.distanceBetweenPoints_ = function(e, t) {
        if (!e || !t) return 0;
        var i = 6371,
            n = (t.lat() - e.lat()) * Math.PI / 180,
            r = (t.lng() - e.lng()) * Math.PI / 180,
            s = Math.sin(n / 2) * Math.sin(n / 2) + Math.cos(e.lat() * Math.PI / 180) * Math.cos(t.lat() * Math.PI / 180) * Math.sin(r / 2) * Math.sin(r / 2),
            o = 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)),
            a = i * o;
        return a
    }, MarkerClusterer.prototype.addToClosestCluster_ = function(e) {
        for (var t, i = 4e4, n = null, r = (e.getPosition(), 0); t = this.clusters_[r]; r++) {
            var s = t.getCenter();
            if (s) {
                var o = this.distanceBetweenPoints_(s, e.getPosition());
                o < i && (i = o, n = t)
            }
        }
        if (n && n.isMarkerInClusterBounds(e)) n.addMarker(e);
        else {
            var t = new Cluster(this);
            t.addMarker(e), this.clusters_.push(t)
        }
    }, MarkerClusterer.prototype.createClusters_ = function() {
        if (this.ready_)
            for (var e, t = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), i = this.getExtendedBounds(t), n = 0; e = this.markers_[n]; n++) !e.isAdded && this.isMarkerInBounds_(e, i) && this.addToClosestCluster_(e)
    }, Cluster.prototype.isMarkerAlreadyAdded = function(e) {
        if (this.markers_.indexOf) return this.markers_.indexOf(e) != -1;
        for (var t, i = 0; t = this.markers_[i]; i++)
            if (t == e) return !0;
        return !1
    }, Cluster.prototype.addMarker = function(e) {
        if (this.isMarkerAlreadyAdded(e)) return !1;
        if (this.center_) {
            if (this.averageCenter_) {
                var t = this.markers_.length + 1,
                    i = (this.center_.lat() * (t - 1) + e.getPosition().lat()) / t,
                    n = (this.center_.lng() * (t - 1) + e.getPosition().lng()) / t;
                this.center_ = new google.maps.LatLng(i, n), this.calculateBounds_()
            }
        } else this.center_ = e.getPosition(), this.calculateBounds_();
        e.isAdded = !0, this.markers_.push(e);
        var r = this.markers_.length;
        if (r < this.minClusterSize_ && e.getMap() != this.map_ && e.setMap(this.map_), r == this.minClusterSize_)
            for (var s = 0; s < r; s++) this.markers_[s].setMap(null);
        return r >= this.minClusterSize_ && e.setMap(null), this.updateIcon(), !0
    }, Cluster.prototype.getMarkerClusterer = function() {
        return this.markerClusterer_
    }, Cluster.prototype.getBounds = function() {
        for (var e, t = new google.maps.LatLngBounds(this.center_, this.center_), i = this.getMarkers(), n = 0; e = i[n]; n++) t.extend(e.getPosition());
        return t
    }, Cluster.prototype.remove = function() {
        this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_
    }, Cluster.prototype.getSize = function() {
        return this.markers_.length
    }, Cluster.prototype.getMarkers = function() {
        return this.markers_
    }, Cluster.prototype.getCenter = function() {
        return this.center_
    }, Cluster.prototype.calculateBounds_ = function() {
        var e = new google.maps.LatLngBounds(this.center_, this.center_);
        this.bounds_ = this.markerClusterer_.getExtendedBounds(e)
    }, Cluster.prototype.isMarkerInClusterBounds = function(e) {
        return this.bounds_.contains(e.getPosition())
    }, Cluster.prototype.getMap = function() {
        return this.map_
    }, Cluster.prototype.updateIcon = function() {
        var e = this.map_.getZoom(),
            t = this.markerClusterer_.getMaxZoom();
        if (t && e > t)
            for (var i, n = 0; i = this.markers_[n]; n++) i.setMap(this.map_);
        else {
            if (this.markers_.length < this.minClusterSize_) return void this.clusterIcon_.hide();
            var r = this.markerClusterer_.getStyles().length,
                s = this.markerClusterer_.getCalculator()(this.markers_, r);
            this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(s), this.clusterIcon_.show()
        }
    }, ClusterIcon.prototype.triggerClusterClick = function() {
        var e = this.cluster_.getMarkerClusterer();
        google.maps.event.trigger(e.map_, "clusterclick", this.cluster_), e.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds())
    }, ClusterIcon.prototype.onAdd = function() {
        if (this.div_ = document.createElement("DIV"), this.visible_) {
            var e = this.getPosFromLatLng_(this.center_);
            this.div_.style.cssText = this.createCss(e), this.div_.innerHTML = this.sums_.text
        }
        var t = this.getPanes();
        t.overlayMouseTarget.appendChild(this.div_);
        var i = this;
        google.maps.event.addDomListener(this.div_, "click", function() {
            i.triggerClusterClick()
        })
    }, ClusterIcon.prototype.getPosFromLatLng_ = function(e) {
        var t = this.getProjection().fromLatLngToDivPixel(e);
        return t.x -= parseInt(this.width_ / 2, 10), t.y -= parseInt(this.height_ / 2, 10), t
    }, ClusterIcon.prototype.draw = function() {
        if (this.visible_) {
            var e = this.getPosFromLatLng_(this.center_);
            this.div_.style.top = e.y + "px", this.div_.style.left = e.x + "px", this.div_.style.zIndex = google.maps.Marker.MAX_ZINDEX + 1
        }
    }, ClusterIcon.prototype.hide = function() {
        this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
    }, ClusterIcon.prototype.show = function() {
        if (this.div_) {
            var e = this.getPosFromLatLng_(this.center_);
            this.div_.style.cssText = this.createCss(e), this.div_.style.display = ""
        }
        this.visible_ = !0
    }, ClusterIcon.prototype.remove = function() {
        this.setMap(null)
    }, ClusterIcon.prototype.onRemove = function() {
        this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
    }, ClusterIcon.prototype.setSums = function(e) {
        this.sums_ = e, this.text_ = e.text, this.index_ = e.index, this.div_ && (this.div_.innerHTML = e.text), this.useStyle()
    }, ClusterIcon.prototype.useStyle = function() {
        var e = Math.max(0, this.sums_.index - 1);
        e = Math.min(this.styles_.length - 1, e);
        var t = this.styles_[e];
        this.url_ = t.url, this.height_ = t.height, this.width_ = t.width, this.textColor_ = t.textColor, this.anchor_ = t.anchor, this.textSize_ = t.textSize, this.backgroundPosition_ = t.backgroundPosition
    }, ClusterIcon.prototype.setCenter = function(e) {
        this.center_ = e
    }, ClusterIcon.prototype.createCss = function(e) {
        var t = [];
        t.push("background-image:url(" + this.url_ + ");");
        var i = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
        t.push("background-position:" + i + ";"), "object" == typeof this.anchor_ ? ("number" == typeof this.anchor_[0] && this.anchor_[0] > 0 && this.anchor_[0] < this.height_ ? t.push("height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;") : t.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), "number" == typeof this.anchor_[1] && this.anchor_[1] > 0 && this.anchor_[1] < this.width_ ? t.push("width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;") : t.push("width:" + this.width_ + "px; text-align:center;")) : t.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
        var n = this.textColor_ ? this.textColor_ : "black",
            r = this.textSize_ ? this.textSize_ : 11;
        return t.push("cursor:pointer; top:" + e.y + "px; left:" + e.x + "px; color:" + n + "; position:absolute; font-size:" + r + "px; font-family:Arial,sans-serif; font-weight:bold"), t.join("")
    };
var window = window || {};
window.MarkerClusterer = MarkerClusterer, MarkerClusterer.prototype.addMarker = MarkerClusterer.prototype.addMarker, MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize,
    Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove, Object.keys = Object.keys || function(e) {
        var t = [];
        for (var i in e) e.hasOwnProperty(i) && t.push(i);
        return t
    }, "object" == typeof module && (module.exports = MarkerClusterer), "object" == typeof navigator && function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : e.Plyr = t()
    }(this, function() {
        "use strict";

        function e(e, t) {
            return e(t = {
                exports: {}
            }, t.exports), t.exports
        }

        function t(e) {
            var t, i;
            this.promise = new e(function(e, n) {
                if (void 0 !== t || void 0 !== i) throw TypeError("Bad Promise constructor");
                t = e, i = n
            }), this.resolve = ue(t), this.reject = ue(i)
        }

        function i(e, t, i) {
            var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                r = this,
                s = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
            if (e && "addEventListener" in e && !Bs.empty(t) && Bs["function"](i)) {
                var a = t.split(" "),
                    l = o;
                js && (l = {
                    passive: s,
                    capture: o
                }), a.forEach(function(t) {
                    r && r.eventListeners && n && r.eventListeners.push({
                        element: e,
                        type: t,
                        callback: i,
                        options: l
                    }), e[n ? "addEventListener" : "removeEventListener"](t, i, l)
                })
            }
        }

        function n(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments[2],
                r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            i.call(this, e, t, n, !0, r, s)
        }

        function r(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments[2],
                r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            i.call(this, e, t, n, !1, r, s)
        }

        function s(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments[2],
                s = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            i.call(this, e, t, function a() {
                r(e, t, a, s, o);
                for (var i = arguments.length, l = Array(i), c = 0; c < i; c++) l[c] = arguments[c];
                n.apply(this, l)
            }, !0, s, o)
        }

        function o(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if (Bs.element(e) && !Bs.empty(t)) {
                var r = new CustomEvent(t, {
                    bubbles: i,
                    detail: Object.assign({}, n, {
                        plyr: this
                    })
                });
                e.dispatchEvent(r)
            }
        }

        function a(e, t) {
            var i = e.length ? e : [e];
            Array.from(i).reverse().forEach(function(e, i) {
                var n = i > 0 ? t.cloneNode(!0) : t,
                    r = e.parentNode,
                    s = e.nextSibling;
                n.appendChild(e), s ? r.insertBefore(n, s) : r.appendChild(n)
            })
        }

        function l(e, t) {
            Bs.element(e) && !Bs.empty(t) && Object.entries(t).filter(function(e) {
                var t = Ys(e, 2)[1];
                return !Bs.nullOrUndefined(t)
            }).forEach(function(t) {
                var i = Ys(t, 2),
                    n = i[0],
                    r = i[1];
                return e.setAttribute(n, r)
            })
        }

        function c(e, t, i) {
            var n = document.createElement(e);
            return Bs.object(t) && l(n, t), Bs.string(i) && (n.innerText = i), n
        }

        function u(e, t, i, n) {
            Bs.element(t) && t.appendChild(c(e, i, n))
        }

        function d(e) {
            Bs.nodeList(e) || Bs.array(e) ? Array.from(e).forEach(d) : Bs.element(e) && Bs.element(e.parentNode) && e.parentNode.removeChild(e)
        }

        function h(e) {
            if (Bs.element(e))
                for (var t = e.childNodes.length; t > 0;) e.removeChild(e.lastChild), t -= 1
        }

        function p(e, t) {
            return Bs.element(t) && Bs.element(t.parentNode) && Bs.element(e) ? (t.parentNode.replaceChild(e, t), e) : null
        }

        function f(e, t) {
            if (!Bs.string(e) || Bs.empty(e)) return {};
            var i = {},
                n = t;
            return e.split(",").forEach(function(e) {
                var t = e.trim(),
                    r = t.replace(".", ""),
                    s = t.replace(/[[\]]/g, "").split("="),
                    o = s[0],
                    a = s.length > 1 ? s[1].replace(/["']/g, "") : "";
                switch (t.charAt(0)) {
                    case ".":
                        Bs.object(n) && Bs.string(n["class"]) && (n["class"] += " " + r), i["class"] = r;
                        break;
                    case "#":
                        i.id = t.replace("#", "");
                        break;
                    case "[":
                        i[o] = a
                }
            }), i
        }

        function m(e, t) {
            if (Bs.element(e)) {
                var i = t;
                Bs["boolean"](i) || (i = !e.hidden), i ? e.setAttribute("hidden", "") : e.removeAttribute("hidden")
            }
        }

        function g(e, t, i) {
            if (Bs.nodeList(e)) return Array.from(e).map(function(e) {
                return g(e, t, i)
            });
            if (Bs.element(e)) {
                var n = "toggle";
                return void 0 !== i && (n = i ? "add" : "remove"), e.classList[n](t), e.classList.contains(t)
            }
            return !1
        }

        function v(e, t) {
            return Bs.element(e) && e.classList.contains(t)
        }

        function y(e, t) {
            var i = {
                Element: Element
            };
            return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
                return Array.from(document.querySelectorAll(t)).includes(this)
            }).call(e, t)
        }

        function w(e) {
            return this.elements.container.querySelectorAll(e)
        }

        function _(e) {
            return this.elements.container.querySelector(e)
        }

        function b() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            Bs.element(e) && (e.focus(), t && g(e, this.config.classNames.tabFocus))
        }

        function T(e) {
            setTimeout(function() {
                try {
                    m(e, !0), e.offsetHeight, m(e, !1)
                } catch (e) {}
            }, 0)
        }

        function x(e) {
            return Bs.array(e) ? e.filter(function(t, i) {
                return e.indexOf(t) === i
            }) : e
        }

        function k(e, t) {
            return t.split(".").reduce(function(e, t) {
                return e && e[t]
            }, e)
        }

        function S() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
            if (!i.length) return e;
            var r = i.shift();
            return Bs.object(r) ? (Object.keys(r).forEach(function(t) {
                Bs.object(r[t]) ? (Object.keys(e).includes(t) || Object.assign(e, Xs({}, t, {})), S(e[t], r[t])) : Object.assign(e, Xs({}, t, r[t]))
            }), S.apply(void 0, [e].concat(i))) : e
        }

        function C(e) {
            for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) i[n - 1] = arguments[n];
            return Bs.empty(e) ? e : e.toString().replace(/{(\d+)}/g, function(e, t) {
                return i[t].toString()
            })
        }

        function z() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
            return e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1"), "g"), i.toString())
        }

        function P() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString().replace(/\w\S*/g, function(e) {
                return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
            })
        }

        function M() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
            return (e = function() {
                var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").toString();
                return e = z(e, "-", " "), e = z(e, "_", " "), z(e = P(e), " ", "")
            }(e)).charAt(0).toLowerCase() + e.slice(1)
        }

        function O(e) {
            var t = document.createElement("div");
            return t.appendChild(e), t.innerHTML
        }

        function E(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "text";
            return new Promise(function(e, i) {
                try {
                    var n = new XMLHttpRequest;
                    if (!("withCredentials" in n)) return;
                    n.addEventListener("load", function() {
                        if ("text" === t) try {
                            e(JSON.parse(n.responseText))
                        } catch (i) {
                            e(n.responseText)
                        } else e(n.response)
                    }), n.addEventListener("error", function() {
                        throw new Error(n.status)
                    }), n.open("GET", r, !0), n.responseType = t, n.send()
                } catch (r) {
                    i(r)
                }
            })
        }

        function A(e, t) {
            if (Bs.string(e)) {
                var i = Bs.string(t),
                    n = function() {
                        return null !== document.getElementById(t)
                    },
                    r = function(e, t) {
                        e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e)
                    };
                if (!i || !n()) {
                    var s = Js.supported,
                        o = document.createElement("div");
                    if (o.setAttribute("hidden", ""), i && o.setAttribute("id", t), s) {
                        var a = window.localStorage.getItem("cache-" + t);
                        if (null !== a) {
                            var l = JSON.parse(a);
                            r(o, l.content)
                        }
                    }
                    E(e).then(function(e) {
                        Bs.empty(e) || (s && window.localStorage.setItem("cache-" + t, JSON.stringify({
                            content: e
                        })), r(o, e))
                    })["catch"](function() {})
                }
            }
        }

        function L() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!Bs.number(e)) return L(null, t, i);
            var n = function(e) {
                    return ("0" + e).slice(-2)
                },
                r = eo(e),
                s = to(e),
                o = io(e);
            return t || r > 0 ? r += ":" : r = "", (i && e > 0 ? "-" : "") + r + n(s) + ":" + n(o)
        }

        function I(e) {
            var t = e;
            if (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) {
                var i = document.createElement("a");
                i.href = t, t = i.href
            }
            try {
                return new URL(t)
            } catch (e) {
                return null
            }
        }

        function D(e) {
            var t = new URLSearchParams;
            return Bs.object(e) && Object.entries(e).forEach(function(e) {
                var i = Ys(e, 2),
                    n = i[0],
                    r = i[1];
                t.set(n, r)
            }), t
        }

        function R() {
            if (this.enabled) {
                var e = this.player.elements.buttons.fullscreen;
                Bs.element(e) && (e.pressed = this.active), o.call(this.player, this.target, this.active ? "enterfullscreen" : "exitfullscreen", !0), Gs.isIos || function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (Bs.element(e)) {
                        var n = w.call(this, "button:not(:disabled), input:not(:disabled), [tabindex]"),
                            r = n[0],
                            s = n[n.length - 1];
                        i.call(this, this.elements.container, "keydown", function(e) {
                            if ("Tab" === e.key && 9 === e.keyCode) {
                                var t = document.activeElement;
                                t !== s || e.shiftKey ? t === r && e.shiftKey && (s.focus(), e.preventDefault()) : (r.focus(), e.preventDefault())
                            }
                        }, t, !1)
                    }
                }.call(this.player, this.target, this.active)
            }
        }

        function N() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            e ? this.scrollPosition = {
                x: window.scrollX || 0,
                y: window.scrollY || 0
            } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", g(this.target, this.player.config.classNames.fullscreen.fallback, e), R.call(this)
        }

        function W(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
            return new Promise(function(i, n) {
                var r = new Image,
                    s = function() {
                        delete r.onload, delete r.onerror, (r.naturalWidth >= t ? i : n)(r)
                    };
                Object.assign(r, {
                    onload: s,
                    onerror: s,
                    src: e
                })
            })
        }

        function F(e) {
            return new Promise(function(t, i) {
                fo(e, {
                    success: t,
                    error: i
                })
            })
        }

        function H(e) {
            e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, o.call(this, this.media, e ? "play" : "pause"))
        }

        function B(e) {
            e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, o.call(this, this.media, e ? "play" : "pause"))
        }
        var j = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
            q = e(function(e) {
                var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
                "number" == typeof __g && (__g = t)
            }),
            $ = e(function(e) {
                var t = e.exports = {
                    version: "2.5.7"
                };
                "number" == typeof __e && (__e = t)
            }),
            X = ($.version, function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }),
            Y = function(e) {
                if (!X(e)) throw TypeError(e + " is not an object!");
                return e
            },
            V = function(e) {
                try {
                    return !!e()
                } catch (e) {
                    return !0
                }
            },
            G = !V(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }),
            U = q.document,
            Z = X(U) && X(U.createElement),
            K = function(e) {
                return Z ? U.createElement(e) : {}
            },
            Q = !G && !V(function() {
                return 7 != Object.defineProperty(K("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            }),
            J = function(e, t) {
                if (!X(e)) return e;
                var i, n;
                if (t && "function" == typeof(i = e.toString) && !X(n = i.call(e))) return n;
                if ("function" == typeof(i = e.valueOf) && !X(n = i.call(e))) return n;
                if (!t && "function" == typeof(i = e.toString) && !X(n = i.call(e))) return n;
                throw TypeError("Can't convert object to primitive value")
            },
            ee = Object.defineProperty,
            te = {
                f: G ? Object.defineProperty : function(e, t, i) {
                    if (Y(e), t = J(t, !0), Y(i), Q) try {
                        return ee(e, t, i)
                    } catch (e) {}
                    if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
                    return "value" in i && (e[t] = i.value), e
                }
            },
            ie = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            },
            ne = G ? function(e, t, i) {
                return te.f(e, t, ie(1, i))
            } : function(e, t, i) {
                return e[t] = i, e
            },
            re = {}.hasOwnProperty,
            se = function(e, t) {
                return re.call(e, t)
            },
            oe = 0,
            ae = Math.random(),
            le = function(e) {
                return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++oe + ae).toString(36))
            },
            ce = e(function(e) {
                var t = le("src"),
                    i = Function.toString,
                    n = ("" + i).split("toString");
                $.inspectSource = function(e) {
                    return i.call(e)
                }, (e.exports = function(e, i, r, s) {
                    var o = "function" == typeof r;
                    o && (se(r, "name") || ne(r, "name", i)), e[i] !== r && (o && (se(r, t) || ne(r, t, e[i] ? "" + e[i] : n.join(String(i)))), e === q ? e[i] = r : s ? e[i] ? e[i] = r : ne(e, i, r) : (delete e[i], ne(e, i, r)))
                })(Function.prototype, "toString", function() {
                    return "function" == typeof this && this[t] || i.call(this)
                })
            }),
            ue = function(e) {
                if ("function" != typeof e) throw TypeError(e + " is not a function!");
                return e
            },
            de = function(e, t, i) {
                if (ue(e), void 0 === t) return e;
                switch (i) {
                    case 1:
                        return function(i) {
                            return e.call(t, i)
                        };
                    case 2:
                        return function(i, n) {
                            return e.call(t, i, n)
                        };
                    case 3:
                        return function(i, n, r) {
                            return e.call(t, i, n, r)
                        }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            },
            he = function(e, t, i) {
                var n, r, s, o, a = e & he.F,
                    l = e & he.G,
                    c = e & he.S,
                    u = e & he.P,
                    d = e & he.B,
                    h = l ? q : c ? q[t] || (q[t] = {}) : (q[t] || {}).prototype,
                    p = l ? $ : $[t] || ($[t] = {}),
                    f = p.prototype || (p.prototype = {});
                for (n in l && (i = t), i) s = ((r = !a && h && void 0 !== h[n]) ? h : i)[n], o = d && r ? de(s, q) : u && "function" == typeof s ? de(Function.call, s) : s, h && ce(h, n, s, e & he.U), p[n] != s && ne(p, n, o), u && f[n] != s && (f[n] = s)
            };
        q.core = $, he.F = 1, he.G = 2, he.S = 4, he.P = 8, he.B = 16, he.W = 32, he.U = 64, he.R = 128;
        for (var pe, fe = he, me = le("typed_array"), ge = le("view"), ve = !(!q.ArrayBuffer || !q.DataView), ye = ve, we = 0, _e = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); we < 9;)(pe = q[_e[we++]]) ? (ne(pe.prototype, me, !0), ne(pe.prototype, ge, !0)) : ye = !1;
        var be = {
                ABV: ve,
                CONSTR: ye,
                TYPED: me,
                VIEW: ge
            },
            Te = function(e, t, i) {
                for (var n in t) ce(e, n, t[n], i);
                return e
            },
            xe = function(e, t, i, n) {
                if (!(e instanceof t) || void 0 !== n && n in e) throw TypeError(i + ": incorrect invocation!");
                return e
            },
            ke = Math.ceil,
            Se = Math.floor,
            Ce = function(e) {
                return isNaN(e = +e) ? 0 : (e > 0 ? Se : ke)(e)
            },
            ze = Math.min,
            Pe = function(e) {
                return e > 0 ? ze(Ce(e), 9007199254740991) : 0
            },
            Me = function(e) {
                if (void 0 === e) return 0;
                var t = Ce(e),
                    i = Pe(t);
                if (t !== i) throw RangeError("Wrong length!");
                return i
            },
            Oe = {}.toString,
            Ee = function(e) {
                return Oe.call(e).slice(8, -1)
            },
            Ae = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
                return "String" == Ee(e) ? e.split("") : Object(e)
            },
            Le = function(e) {
                if (null == e) throw TypeError("Can't call method on  " + e);
                return e
            },
            Ie = function(e) {
                return Ae(Le(e))
            },
            De = Math.max,
            Re = Math.min,
            Ne = function(e, t) {
                return (e = Ce(e)) < 0 ? De(e + t, 0) : Re(e, t)
            },
            We = function(e) {
                return function(t, i, n) {
                    var r, s = Ie(t),
                        o = Pe(s.length),
                        a = Ne(n, o);
                    if (e && i != i) {
                        for (; o > a;)
                            if ((r = s[a++]) != r) return !0
                    } else
                        for (; o > a; a++)
                            if ((e || a in s) && s[a] === i) return e || a || 0; return !e && -1
                }
            },
            Fe = e(function(e) {
                var t = q["__core-js_shared__"] || (q["__core-js_shared__"] = {});
                (e.exports = function(e, i) {
                    return t[e] || (t[e] = void 0 !== i ? i : {})
                })("versions", []).push({
                    version: $.version,
                    mode: "global",
                    copyright: "ÂŠ 2018 Denis Pushkarev (zloirock.ru)"
                })
            }),
            He = Fe("keys"),
            Be = function(e) {
                return He[e] || (He[e] = le(e))
            },
            je = We(!1),
            qe = Be("IE_PROTO"),
            $e = function(e, t) {
                var i, n = Ie(e),
                    r = 0,
                    s = [];
                for (i in n) i != qe && se(n, i) && s.push(i);
                for (; t.length > r;) se(n, i = t[r++]) && (~je(s, i) || s.push(i));
                return s
            },
            Xe = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
            Ye = Xe.concat("length", "prototype"),
            Ve = {
                f: Object.getOwnPropertyNames || function(e) {
                    return $e(e, Ye)
                }
            },
            Ge = function(e) {
                return Object(Le(e))
            },
            Ue = function(e) {
                for (var t = Ge(this), i = Pe(t.length), n = arguments.length, r = Ne(n > 1 ? arguments[1] : void 0, i), s = n > 2 ? arguments[2] : void 0, o = void 0 === s ? i : Ne(s, i); o > r;) t[r++] = e;
                return t
            },
            Ze = e(function(e) {
                var t = Fe("wks"),
                    i = q.Symbol,
                    n = "function" == typeof i;
                (e.exports = function(e) {
                    return t[e] || (t[e] = n && i[e] || (n ? i : le)("Symbol." + e))
                }).store = t
            }),
            Ke = te.f,
            Qe = Ze("toStringTag"),
            Je = function(e, t, i) {
                e && !se(e = i ? e : e.prototype, Qe) && Ke(e, Qe, {
                    configurable: !0,
                    value: t
                })
            },
            et = e(function(e, t) {
                function i(e, t, i) {
                    var n, r, s, o = new Array(i),
                        a = 8 * i - t - 1,
                        l = (1 << a) - 1,
                        c = l >> 1,
                        u = 23 === t ? k(2, -24) - k(2, -77) : 0,
                        d = 0,
                        h = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for ((e = x(e)) != e || e === b ? (r = e != e ? 1 : 0, n = l) : (n = S(C(e) / z), e * (s = k(2, -n)) < 1 && (n--, s *= 2), (e += n + c >= 1 ? u / s : u * k(2, 1 - c)) * s >= 2 && (n++, s /= 2), n + c >= l ? (r = 0, n = l) : n + c >= 1 ? (r = (e * s - 1) * k(2, t), n += c) : (r = e * k(2, c - 1) * k(2, t), n = 0)); t >= 8; o[d++] = 255 & r, r /= 256, t -= 8);
                    for (n = n << t | r, a += t; a > 0; o[d++] = 255 & n, n /= 256, a -= 8);
                    return o[--d] |= 128 * h, o
                }

                function n(e, t, i) {
                    var n, r = 8 * i - t - 1,
                        s = (1 << r) - 1,
                        o = s >> 1,
                        a = r - 7,
                        l = i - 1,
                        c = e[l--],
                        u = 127 & c;
                    for (c >>= 7; a > 0; u = 256 * u + e[l], l--, a -= 8);
                    for (n = u & (1 << -a) - 1, u >>= -a, a += t; a > 0; n = 256 * n + e[l], l--, a -= 8);
                    if (0 === u) u = 1 - o;
                    else {
                        if (u === s) return n ? NaN : c ? -b : b;
                        n += k(2, t), u -= o
                    }
                    return (c ? -1 : 1) * n * k(2, u - t)
                }

                function r(e) {
                    return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
                }

                function s(e) {
                    return [255 & e]
                }

                function o(e) {
                    return [255 & e, e >> 8 & 255]
                }

                function a(e) {
                    return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
                }

                function l(e) {
                    return i(e, 52, 8)
                }

                function c(e) {
                    return i(e, 23, 4)
                }

                function u(e, t, i) {
                    f(e[m], t, {
                        get: function() {
                            return this[i]
                        }
                    })
                }

                function d(e, t, i, n) {
                    var r = Me(+i);
                    if (r + t > e[M]) throw _(g);
                    var s = e[P]._b,
                        o = r + e[O],
                        a = s.slice(o, o + t);
                    return n ? a : a.reverse()
                }

                function h(e, t, i, n, r, s) {
                    var o = Me(+i);
                    if (o + t > e[M]) throw _(g);
                    for (var a = e[P]._b, l = o + e[O], c = n(+r), u = 0; u < t; u++) a[l + u] = c[s ? u : t - u - 1]
                }
                var p = Ve.f,
                    f = te.f,
                    m = "prototype",
                    g = "Wrong index!",
                    v = q.ArrayBuffer,
                    y = q.DataView,
                    w = q.Math,
                    _ = q.RangeError,
                    b = q.Infinity,
                    T = v,
                    x = w.abs,
                    k = w.pow,
                    S = w.floor,
                    C = w.log,
                    z = w.LN2,
                    P = G ? "_b" : "buffer",
                    M = G ? "_l" : "byteLength",
                    O = G ? "_o" : "byteOffset";
                if (be.ABV) {
                    if (!V(function() {
                            v(1)
                        }) || !V(function() {
                            new v((-1))
                        }) || V(function() {
                            return new v, new v(1.5), new v(NaN), "ArrayBuffer" != v.name
                        })) {
                        for (var E, A = (v = function(e) {
                                return xe(this, v), new T(Me(e))
                            })[m] = T[m], L = p(T), I = 0; L.length > I;)(E = L[I++]) in v || ne(v, E, T[E]);
                        A.constructor = v
                    }
                    var D = new y(new v(2)),
                        R = y[m].setInt8;
                    D.setInt8(0, 2147483648), D.setInt8(1, 2147483649), !D.getInt8(0) && D.getInt8(1) || Te(y[m], {
                        setInt8: function(e, t) {
                            R.call(this, e, t << 24 >> 24)
                        },
                        setUint8: function(e, t) {
                            R.call(this, e, t << 24 >> 24)
                        }
                    }, !0)
                } else v = function(e) {
                    xe(this, v, "ArrayBuffer");
                    var t = Me(e);
                    this._b = Ue.call(new Array(t), 0), this[M] = t
                }, y = function(e, t, i) {
                    xe(this, y, "DataView"), xe(e, v, "DataView");
                    var n = e[M],
                        r = Ce(t);
                    if (r < 0 || r > n) throw _("Wrong offset!");
                    if (r + (i = void 0 === i ? n - r : Pe(i)) > n) throw _("Wrong length!");
                    this[P] = e, this[O] = r, this[M] = i
                }, G && (u(v, "byteLength", "_l"), u(y, "buffer", "_b"), u(y, "byteLength", "_l"), u(y, "byteOffset", "_o")), Te(y[m], {
                    getInt8: function(e) {
                        return d(this, 1, e)[0] << 24 >> 24
                    },
                    getUint8: function(e) {
                        return d(this, 1, e)[0]
                    },
                    getInt16: function(e) {
                        var t = d(this, 2, e, arguments[1]);
                        return (t[1] << 8 | t[0]) << 16 >> 16
                    },
                    getUint16: function(e) {
                        var t = d(this, 2, e, arguments[1]);
                        return t[1] << 8 | t[0]
                    },
                    getInt32: function(e) {
                        return r(d(this, 4, e, arguments[1]))
                    },
                    getUint32: function(e) {
                        return r(d(this, 4, e, arguments[1])) >>> 0
                    },
                    getFloat32: function(e) {
                        return n(d(this, 4, e, arguments[1]), 23, 4)
                    },
                    getFloat64: function(e) {
                        return n(d(this, 8, e, arguments[1]), 52, 8)
                    },
                    setInt8: function(e, t) {
                        h(this, 1, e, s, t)
                    },
                    setUint8: function(e, t) {
                        h(this, 1, e, s, t)
                    },
                    setInt16: function(e, t) {
                        h(this, 2, e, o, t, arguments[2])
                    },
                    setUint16: function(e, t) {
                        h(this, 2, e, o, t, arguments[2])
                    },
                    setInt32: function(e, t) {
                        h(this, 4, e, a, t, arguments[2])
                    },
                    setUint32: function(e, t) {
                        h(this, 4, e, a, t, arguments[2])
                    },
                    setFloat32: function(e, t) {
                        h(this, 4, e, c, t, arguments[2])
                    },
                    setFloat64: function(e, t) {
                        h(this, 8, e, l, t, arguments[2])
                    }
                });
                Je(v, "ArrayBuffer"), Je(y, "DataView"), ne(y[m], be.VIEW, !0), t.ArrayBuffer = v, t.DataView = y
            }),
            tt = Ze("species"),
            it = function(e, t) {
                var i, n = Y(e).constructor;
                return void 0 === n || null == (i = Y(n)[tt]) ? t : ue(i)
            },
            nt = Ze("species"),
            rt = function(e) {
                var t = q[e];
                G && t && !t[nt] && te.f(t, nt, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            },
            st = q.ArrayBuffer,
            ot = et.ArrayBuffer,
            at = et.DataView,
            lt = be.ABV && st.isView,
            ct = ot.prototype.slice,
            ut = be.VIEW;
        fe(fe.G + fe.W + fe.F * (st !== ot), {
            ArrayBuffer: ot
        }), fe(fe.S + fe.F * !be.CONSTR, "ArrayBuffer", {
            isView: function(e) {
                return lt && lt(e) || X(e) && ut in e
            }
        }), fe(fe.P + fe.U + fe.F * V(function() {
            return !new ot(2).slice(1, void 0).byteLength
        }), "ArrayBuffer", {
            slice: function(e, t) {
                if (void 0 !== ct && void 0 === t) return ct.call(Y(this), e);
                for (var i = Y(this).byteLength, n = Ne(e, i), r = Ne(void 0 === t ? i : t, i), s = new(it(this, ot))(Pe(r - n)), o = new at(this), a = new at(s), l = 0; n < r;) a.setUint8(l++, o.getUint8(n++));
                return s
            }
        }), rt("ArrayBuffer");
        var dt = Ze("toStringTag"),
            ht = "Arguments" == Ee(function() {
                return arguments
            }()),
            pt = function(e) {
                var t, i, n;
                return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(i = function(e, t) {
                    try {
                        return e[t]
                    } catch (e) {}
                }(t = Object(e), dt)) ? i : ht ? Ee(t) : "Object" == (n = Ee(t)) && "function" == typeof t.callee ? "Arguments" : n
            },
            ft = {},
            mt = Ze("iterator"),
            gt = Array.prototype,
            vt = function(e) {
                return void 0 !== e && (ft.Array === e || gt[mt] === e)
            },
            yt = Object.keys || function(e) {
                return $e(e, Xe)
            },
            wt = G ? Object.defineProperties : function(e, t) {
                Y(e);
                for (var i, n = yt(t), r = n.length, s = 0; r > s;) te.f(e, i = n[s++], t[i]);
                return e
            },
            _t = q.document,
            bt = _t && _t.documentElement,
            Tt = Be("IE_PROTO"),
            xt = function() {},
            kt = function() {
                var e, t = K("iframe"),
                    i = Xe.length;
                for (t.style.display = "none", bt.appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object</script>"), e.close(), kt = e.F; i--;) delete kt.prototype[Xe[i]];
                return kt()
            },
            St = Object.create || function(e, t) {
                var i;
                return null !== e ? (xt.prototype = Y(e), i = new xt, xt.prototype = null, i[Tt] = e) : i = kt(), void 0 === t ? i : wt(i, t)
            },
            Ct = Be("IE_PROTO"),
            zt = Object.prototype,
            Pt = Object.getPrototypeOf || function(e) {
                return e = Ge(e), se(e, Ct) ? e[Ct] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? zt : null
            },
            Mt = Ze("iterator"),
            Ot = $.getIteratorMethod = function(e) {
                if (null != e) return e[Mt] || e["@@iterator"] || ft[pt(e)]
            },
            Et = Array.isArray || function(e) {
                return "Array" == Ee(e)
            },
            At = Ze("species"),
            Lt = function(e, t) {
                return new(function(e) {
                    var t;
                    return Et(e) && ("function" != typeof(t = e.constructor) || t !== Array && !Et(t.prototype) || (t = void 0), X(t) && null === (t = t[At]) && (t = void 0)), void 0 === t ? Array : t
                }(e))(t)
            },
            It = function(e, t) {
                var i = 1 == e,
                    n = 2 == e,
                    r = 3 == e,
                    s = 4 == e,
                    o = 6 == e,
                    a = 5 == e || o,
                    l = t || Lt;
                return function(t, c, u) {
                    for (var d, h, p = Ge(t), f = Ae(p), m = de(c, u, 3), g = Pe(f.length), v = 0, y = i ? l(t, g) : n ? l(t, 0) : void 0; g > v; v++)
                        if ((a || v in f) && (h = m(d = f[v], v, p), e))
                            if (i) y[v] = h;
                            else if (h) switch (e) {
                        case 3:
                            return !0;
                        case 5:
                            return d;
                        case 6:
                            return v;
                        case 2:
                            y.push(d)
                    } else if (s) return !1;
                    return o ? -1 : r || s ? s : y
                }
            },
            Dt = Ze("unscopables"),
            Rt = Array.prototype;
        null == Rt[Dt] && ne(Rt, Dt, {});
        var Nt = function(e) {
                Rt[Dt][e] = !0
            },
            Wt = function(e, t) {
                return {
                    value: t,
                    done: !!e
                }
            },
            Ft = {};
        ne(Ft, Ze("iterator"), function() {
            return this
        });
        var Ht = function(e, t, i) {
                e.prototype = St(Ft, {
                    next: ie(1, i)
                }), Je(e, t + " Iterator")
            },
            Bt = Ze("iterator"),
            jt = !([].keys && "next" in [].keys()),
            qt = function() {
                return this
            },
            $t = function(e, t, i, n, r, s, o) {
                Ht(i, t, n);
                var a, l, c, u = function(e) {
                        if (!jt && e in f) return f[e];
                        switch (e) {
                            case "keys":
                            case "values":
                                return function() {
                                    return new i(this, e)
                                }
                        }
                        return function() {
                            return new i(this, e)
                        }
                    },
                    d = t + " Iterator",
                    h = "values" == r,
                    p = !1,
                    f = e.prototype,
                    m = f[Bt] || f["@@iterator"] || r && f[r],
                    g = m || u(r),
                    v = r ? h ? u("entries") : g : void 0,
                    y = "Array" == t && f.entries || m;
                if (y && (c = Pt(y.call(new e))) !== Object.prototype && c.next && (Je(c, d, !0), "function" != typeof c[Bt] && ne(c, Bt, qt)), h && m && "values" !== m.name && (p = !0, g = function() {
                        return m.call(this)
                    }), (jt || p || !f[Bt]) && ne(f, Bt, g), ft[t] = g, ft[d] = qt, r)
                    if (a = {
                            values: h ? g : u("values"),
                            keys: s ? g : u("keys"),
                            entries: v
                        }, o)
                        for (l in a) l in f || ce(f, l, a[l]);
                    else fe(fe.P + fe.F * (jt || p), t, a);
                return a
            },
            Xt = $t(Array, "Array", function(e, t) {
                this._t = Ie(e), this._i = 0, this._k = t
            }, function() {
                var e = this._t,
                    t = this._k,
                    i = this._i++;
                return !e || i >= e.length ? (this._t = void 0, Wt(1)) : Wt(0, "keys" == t ? i : "values" == t ? e[i] : [i, e[i]])
            }, "values");
        ft.Arguments = ft.Array, Nt("keys"), Nt("values"), Nt("entries");
        var Yt = Ze("iterator"),
            Vt = !1;
        try {
            [7][Yt]()["return"] = function() {
                Vt = !0
            }
        } catch (j) {}
        var Gt = function(e, t) {
                if (!t && !Vt) return !1;
                var i = !1;
                try {
                    var n = [7],
                        r = n[Yt]();
                    r.next = function() {
                        return {
                            done: i = !0
                        }
                    }, n[Yt] = function() {
                        return r
                    }, e(n)
                } catch (e) {}
                return i
            },
            Ut = [].copyWithin || function(e, t) {
                var i = Ge(this),
                    n = Pe(i.length),
                    r = Ne(e, n),
                    s = Ne(t, n),
                    o = arguments.length > 2 ? arguments[2] : void 0,
                    a = Math.min((void 0 === o ? n : Ne(o, n)) - s, n - r),
                    l = 1;
                for (s < r && r < s + a && (l = -1, s += a - 1, r += a - 1); a-- > 0;) s in i ? i[r] = i[s] : delete i[r], r += l, s += l;
                return i
            },
            Zt = {
                f: {}.propertyIsEnumerable
            },
            Kt = Object.getOwnPropertyDescriptor,
            Qt = {
                f: G ? Kt : function(e, t) {
                    if (e = Ie(e), t = J(t, !0), Q) try {
                        return Kt(e, t)
                    } catch (e) {}
                    if (se(e, t)) return ie(!Zt.f.call(e, t), e[t])
                }
            },
            Jt = e(function(e) {
                if (G) {
                    var t = q,
                        i = V,
                        n = fe,
                        r = be,
                        s = et,
                        o = de,
                        a = xe,
                        l = ie,
                        c = ne,
                        u = Te,
                        d = Ce,
                        h = Pe,
                        p = Me,
                        f = Ne,
                        m = J,
                        g = se,
                        v = pt,
                        y = X,
                        w = Ge,
                        _ = vt,
                        b = St,
                        T = Pt,
                        x = Ve.f,
                        k = Ot,
                        S = le,
                        C = Ze,
                        z = It,
                        P = We,
                        M = it,
                        O = Xt,
                        E = ft,
                        A = Gt,
                        L = rt,
                        I = Ue,
                        D = Ut,
                        R = te,
                        N = Qt,
                        W = R.f,
                        F = N.f,
                        H = t.RangeError,
                        B = t.TypeError,
                        j = t.Uint8Array,
                        $ = Array.prototype,
                        Y = s.ArrayBuffer,
                        U = s.DataView,
                        Z = z(0),
                        K = z(2),
                        Q = z(3),
                        ee = z(4),
                        re = z(5),
                        oe = z(6),
                        ae = P(!0),
                        ce = P(!1),
                        ue = O.values,
                        he = O.keys,
                        pe = O.entries,
                        me = $.lastIndexOf,
                        ge = $.reduce,
                        ve = $.reduceRight,
                        ye = $.join,
                        we = $.sort,
                        _e = $.slice,
                        ke = $.toString,
                        Se = $.toLocaleString,
                        ze = C("iterator"),
                        Oe = C("toStringTag"),
                        Ee = S("typed_constructor"),
                        Ae = S("def_constructor"),
                        Le = r.CONSTR,
                        Ie = r.TYPED,
                        De = r.VIEW,
                        Re = z(1, function(e, t) {
                            return qe(M(e, e[Ae]), t)
                        }),
                        Fe = i(function() {
                            return 1 === new j(new Uint16Array([1]).buffer)[0]
                        }),
                        He = !!j && !!j.prototype.set && i(function() {
                            new j(1).set({})
                        }),
                        Be = function(e, t) {
                            var i = d(e);
                            if (i < 0 || i % t) throw H("Wrong offset!");
                            return i
                        },
                        je = function(e) {
                            if (y(e) && Ie in e) return e;
                            throw B(e + " is not a typed array!")
                        },
                        qe = function(e, t) {
                            if (!(y(e) && Ee in e)) throw B("It is not a typed array constructor!");
                            return new e(t)
                        },
                        $e = function(e, t) {
                            return Xe(M(e, e[Ae]), t)
                        },
                        Xe = function(e, t) {
                            for (var i = 0, n = t.length, r = qe(e, n); n > i;) r[i] = t[i++];
                            return r
                        },
                        Ye = function(e, t, i) {
                            W(e, t, {
                                get: function() {
                                    return this._d[i]
                                }
                            })
                        },
                        Ke = function(e) {
                            var t, i, n, r, s, a, l = w(e),
                                c = arguments.length,
                                u = c > 1 ? arguments[1] : void 0,
                                d = void 0 !== u,
                                p = k(l);
                            if (null != p && !_(p)) {
                                for (a = p.call(l), n = [], t = 0; !(s = a.next()).done; t++) n.push(s.value);
                                l = n
                            }
                            for (d && c > 2 && (u = o(u, arguments[2], 2)), t = 0, i = h(l.length), r = qe(this, i); i > t; t++) r[t] = d ? u(l[t], t) : l[t];
                            return r
                        },
                        Qe = function() {
                            for (var e = 0, t = arguments.length, i = qe(this, t); t > e;) i[e] = arguments[e++];
                            return i
                        },
                        Je = !!j && i(function() {
                            Se.call(new j(1))
                        }),
                        tt = function() {
                            return Se.apply(Je ? _e.call(je(this)) : je(this), arguments)
                        },
                        nt = {
                            copyWithin: function(e, t) {
                                return D.call(je(this), e, t, arguments.length > 2 ? arguments[2] : void 0)
                            },
                            every: function(e) {
                                return ee(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            fill: function(e) {
                                return I.apply(je(this), arguments)
                            },
                            filter: function(e) {
                                return $e(this, K(je(this), e, arguments.length > 1 ? arguments[1] : void 0))
                            },
                            find: function(e) {
                                return re(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            findIndex: function(e) {
                                return oe(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            forEach: function(e) {
                                Z(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            indexOf: function(e) {
                                return ce(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            includes: function(e) {
                                return ae(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            join: function(e) {
                                return ye.apply(je(this), arguments)
                            },
                            lastIndexOf: function(e) {
                                return me.apply(je(this), arguments)
                            },
                            map: function(e) {
                                return Re(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            reduce: function(e) {
                                return ge.apply(je(this), arguments)
                            },
                            reduceRight: function(e) {
                                return ve.apply(je(this), arguments)
                            },
                            reverse: function() {
                                for (var e, t = je(this).length, i = Math.floor(t / 2), n = 0; n < i;) e = this[n], this[n++] = this[--t], this[t] = e;
                                return this
                            },
                            some: function(e) {
                                return Q(je(this), e, arguments.length > 1 ? arguments[1] : void 0)
                            },
                            sort: function(e) {
                                return we.call(je(this), e)
                            },
                            subarray: function(e, t) {
                                var i = je(this),
                                    n = i.length,
                                    r = f(e, n);
                                return new(M(i, i[Ae]))(i.buffer, i.byteOffset + r * i.BYTES_PER_ELEMENT, h((void 0 === t ? n : f(t, n)) - r))
                            }
                        },
                        st = function(e, t) {
                            return $e(this, _e.call(je(this), e, t))
                        },
                        ot = function(e) {
                            je(this);
                            var t = Be(arguments[1], 1),
                                i = this.length,
                                n = w(e),
                                r = h(n.length),
                                s = 0;
                            if (r + t > i) throw H("Wrong length!");
                            for (; s < r;) this[t + s] = n[s++]
                        },
                        at = {
                            entries: function() {
                                return pe.call(je(this))
                            },
                            keys: function() {
                                return he.call(je(this))
                            },
                            values: function() {
                                return ue.call(je(this))
                            }
                        },
                        lt = function(e, t) {
                            return y(e) && e[Ie] && "symbol" != typeof t && t in e && String(+t) == String(t)
                        },
                        ct = function(e, t) {
                            return lt(e, t = m(t, !0)) ? l(2, e[t]) : F(e, t)
                        },
                        ut = function(e, t, i) {
                            return !(lt(e, t = m(t, !0)) && y(i) && g(i, "value")) || g(i, "get") || g(i, "set") || i.configurable || g(i, "writable") && !i.writable || g(i, "enumerable") && !i.enumerable ? W(e, t, i) : (e[t] = i.value, e)
                        };
                    Le || (N.f = ct, R.f = ut), n(n.S + n.F * !Le, "Object", {
                        getOwnPropertyDescriptor: ct,
                        defineProperty: ut
                    }), i(function() {
                        ke.call({})
                    }) && (ke = Se = function() {
                        return ye.call(this)
                    });
                    var dt = u({}, nt);
                    u(dt, at), c(dt, ze, at.values), u(dt, {
                        slice: st,
                        set: ot,
                        constructor: function() {},
                        toString: ke,
                        toLocaleString: tt
                    }), Ye(dt, "buffer", "b"), Ye(dt, "byteOffset", "o"), Ye(dt, "byteLength", "l"), Ye(dt, "length", "e"), W(dt, Oe, {
                        get: function() {
                            return this[Ie]
                        }
                    }), e.exports = function(e, s, o, l) {
                        var u = e + ((l = !!l) ? "Clamped" : "") + "Array",
                            d = "get" + e,
                            f = "set" + e,
                            m = t[u],
                            g = m || {},
                            w = m && T(m),
                            _ = !m || !r.ABV,
                            k = {},
                            S = m && m.prototype,
                            C = function(e, t) {
                                W(e, t, {
                                    get: function() {
                                        return function(e, t) {
                                            var i = e._d;
                                            return i.v[d](t * s + i.o, Fe)
                                        }(this, t)
                                    },
                                    set: function(e) {
                                        return function(e, t, i) {
                                            var n = e._d;
                                            l && (i = (i = Math.round(i)) < 0 ? 0 : i > 255 ? 255 : 255 & i), n.v[f](t * s + n.o, i, Fe)
                                        }(this, t, e)
                                    },
                                    enumerable: !0
                                })
                            };
                        _ ? (m = o(function(e, t, i, n) {
                            a(e, m, u, "_d");
                            var r, o, l, d, f = 0,
                                g = 0;
                            if (y(t)) {
                                if (!(t instanceof Y || "ArrayBuffer" == (d = v(t)) || "SharedArrayBuffer" == d)) return Ie in t ? Xe(m, t) : Ke.call(m, t);
                                r = t, g = Be(i, s);
                                var w = t.byteLength;
                                if (void 0 === n) {
                                    if (w % s) throw H("Wrong length!");
                                    if ((o = w - g) < 0) throw H("Wrong length!")
                                } else if ((o = h(n) * s) + g > w) throw H("Wrong length!");
                                l = o / s
                            } else l = p(t), r = new Y(o = l * s);
                            for (c(e, "_d", {
                                    b: r,
                                    o: g,
                                    l: o,
                                    e: l,
                                    v: new U(r)
                                }); f < l;) C(e, f++)
                        }), S = m.prototype = b(dt), c(S, "constructor", m)) : i(function() {
                            m(1)
                        }) && i(function() {
                            new m((-1))
                        }) && A(function(e) {
                            new m, new m(null), new m(1.5), new m(e)
                        }, !0) || (m = o(function(e, t, i, n) {
                            var r;
                            return a(e, m, u), y(t) ? t instanceof Y || "ArrayBuffer" == (r = v(t)) || "SharedArrayBuffer" == r ? void 0 !== n ? new g(t, Be(i, s), n) : void 0 !== i ? new g(t, Be(i, s)) : new g(t) : Ie in t ? Xe(m, t) : Ke.call(m, t) : new g(p(t))
                        }), Z(w !== Function.prototype ? x(g).concat(x(w)) : x(g), function(e) {
                            e in m || c(m, e, g[e])
                        }), m.prototype = S, S.constructor = m);
                        var z = S[ze],
                            P = !!z && ("values" == z.name || null == z.name),
                            M = at.values;
                        c(m, Ee, !0), c(S, Ie, u), c(S, De, !0), c(S, Ae, m), (l ? new m(1)[Oe] == u : Oe in S) || W(S, Oe, {
                            get: function() {
                                return u
                            }
                        }), k[u] = m, n(n.G + n.W + n.F * (m != g), k), n(n.S, u, {
                            BYTES_PER_ELEMENT: s
                        }), n(n.S + n.F * i(function() {
                            g.of.call(m, 1)
                        }), u, {
                            from: Ke,
                            of: Qe
                        }), "BYTES_PER_ELEMENT" in S || c(S, "BYTES_PER_ELEMENT", s), n(n.P, u, nt), L(u), n(n.P + n.F * He, u, {
                            set: ot
                        }), n(n.P + n.F * !P, u, at), S.toString != ke && (S.toString = ke), n(n.P + n.F * i(function() {
                            new m(1).slice()
                        }), u, {
                            slice: st
                        }), n(n.P + n.F * (i(function() {
                            return [1, 2].toLocaleString() != new m([1, 2]).toLocaleString()
                        }) || !i(function() {
                            S.toLocaleString.call([1, 2])
                        })), u, {
                            toLocaleString: tt
                        }), E[u] = P ? z : M, P || c(S, ze, M)
                    }
                } else e.exports = function() {}
            });
        Jt("Int8", 1, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Uint8", 1, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Uint8", 1, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }, !0), Jt("Int16", 2, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Uint16", 2, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Int32", 4, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Uint32", 4, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Float32", 4, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        }), Jt("Float64", 8, function(e) {
            return function(t, i, n) {
                return e(this, t, i, n)
            }
        });
        var ei = function(e, t, i, n) {
                try {
                    return n ? t(Y(i)[0], i[1]) : t(i)
                } catch (t) {
                    var r = e["return"];
                    throw void 0 !== r && Y(r.call(e)), t
                }
            },
            ti = e(function(e) {
                var t = {},
                    i = {},
                    n = e.exports = function(e, n, r, s, o) {
                        var a, l, c, u, d = o ? function() {
                                return e
                            } : Ot(e),
                            h = de(r, s, n ? 2 : 1),
                            p = 0;
                        if ("function" != typeof d) throw TypeError(e + " is not iterable!");
                        if (vt(d)) {
                            for (a = Pe(e.length); a > p; p++)
                                if ((u = n ? h(Y(l = e[p])[0], l[1]) : h(e[p])) === t || u === i) return u
                        } else
                            for (c = d.call(e); !(l = c.next()).done;)
                                if ((u = ei(c, h, l.value, n)) === t || u === i) return u
                    };
                n.BREAK = t, n.RETURN = i
            }),
            ii = e(function(e) {
                var t = le("meta"),
                    i = te.f,
                    n = 0,
                    r = Object.isExtensible || function() {
                        return !0
                    },
                    s = !V(function() {
                        return r(Object.preventExtensions({}))
                    }),
                    o = function(e) {
                        i(e, t, {
                            value: {
                                i: "O" + ++n,
                                w: {}
                            }
                        })
                    },
                    a = e.exports = {
                        KEY: t,
                        NEED: !1,
                        fastKey: function(e, i) {
                            if (!X(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                            if (!se(e, t)) {
                                if (!r(e)) return "F";
                                if (!i) return "E";
                                o(e)
                            }
                            return e[t].i
                        },
                        getWeak: function(e, i) {
                            if (!se(e, t)) {
                                if (!r(e)) return !0;
                                if (!i) return !1;
                                o(e)
                            }
                            return e[t].w
                        },
                        onFreeze: function(e) {
                            return s && a.NEED && r(e) && !se(e, t) && o(e), e
                        }
                    }
            }),
            ni = (ii.KEY, ii.NEED, ii.fastKey, ii.getWeak, ii.onFreeze, function(e, t) {
                if (!X(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
                return e
            }),
            ri = te.f,
            si = ii.fastKey,
            oi = G ? "_s" : "size",
            ai = function(e, t) {
                var i, n = si(t);
                if ("F" !== n) return e._i[n];
                for (i = e._f; i; i = i.n)
                    if (i.k == t) return i
            },
            li = {
                getConstructor: function(e, t, i, n) {
                    var r = e(function(e, s) {
                        xe(e, r, t, "_i"), e._t = t, e._i = St(null), e._f = void 0, e._l = void 0, e[oi] = 0, null != s && ti(s, i, e[n], e)
                    });
                    return Te(r.prototype, {
                        clear: function() {
                            for (var e = ni(this, t), i = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete i[n.i];
                            e._f = e._l = void 0, e[oi] = 0;
                        },
                        "delete": function(e) {
                            var i = ni(this, t),
                                n = ai(i, e);
                            if (n) {
                                var r = n.n,
                                    s = n.p;
                                delete i._i[n.i], n.r = !0, s && (s.n = r), r && (r.p = s), i._f == n && (i._f = r), i._l == n && (i._l = s), i[oi]--
                            }
                            return !!n
                        },
                        forEach: function(e) {
                            ni(this, t);
                            for (var i, n = de(e, arguments.length > 1 ? arguments[1] : void 0, 3); i = i ? i.n : this._f;)
                                for (n(i.v, i.k, this); i && i.r;) i = i.p
                        },
                        has: function(e) {
                            return !!ai(ni(this, t), e)
                        }
                    }), G && ri(r.prototype, "size", {
                        get: function() {
                            return ni(this, t)[oi]
                        }
                    }), r
                },
                def: function(e, t, i) {
                    var n, r, s = ai(e, t);
                    return s ? s.v = i : (e._l = s = {
                        i: r = si(t, !0),
                        k: t,
                        v: i,
                        p: n = e._l,
                        n: void 0,
                        r: !1
                    }, e._f || (e._f = s), n && (n.n = s), e[oi]++, "F" !== r && (e._i[r] = s)), e
                },
                getEntry: ai,
                setStrong: function(e, t, i) {
                    $t(e, t, function(e, i) {
                        this._t = ni(e, t), this._k = i, this._l = void 0
                    }, function() {
                        for (var e = this._k, t = this._l; t && t.r;) t = t.p;
                        return this._t && (this._l = t = t ? t.n : this._t._f) ? Wt(0, "keys" == e ? t.k : "values" == e ? t.v : [t.k, t.v]) : (this._t = void 0, Wt(1))
                    }, i ? "entries" : "values", !i, !0), rt(t)
                }
            },
            ci = function(e, t) {
                if (Y(e), !X(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
            },
            ui = {
                set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, i) {
                    try {
                        (i = de(Function.call, Qt.f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
                    } catch (e) {
                        t = !0
                    }
                    return function(e, n) {
                        return ci(e, n), t ? e.__proto__ = n : i(e, n), e
                    }
                }({}, !1) : void 0),
                check: ci
            },
            di = ui.set,
            hi = function(e, t, i, n, r, s) {
                var o = q[e],
                    a = o,
                    l = r ? "set" : "add",
                    c = a && a.prototype,
                    u = {},
                    d = function(e) {
                        var t = c[e];
                        ce(c, e, "delete" == e ? function(e) {
                            return !(s && !X(e)) && t.call(this, 0 === e ? 0 : e)
                        } : "has" == e ? function(e) {
                            return !(s && !X(e)) && t.call(this, 0 === e ? 0 : e)
                        } : "get" == e ? function(e) {
                            return s && !X(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                        } : "add" == e ? function(e) {
                            return t.call(this, 0 === e ? 0 : e), this
                        } : function(e, i) {
                            return t.call(this, 0 === e ? 0 : e, i), this
                        })
                    };
                if ("function" == typeof a && (s || c.forEach && !V(function() {
                        (new a).entries().next()
                    }))) {
                    var h = new a,
                        p = h[l](s ? {} : -0, 1) != h,
                        f = V(function() {
                            h.has(1)
                        }),
                        m = Gt(function(e) {
                            new a(e)
                        }),
                        g = !s && V(function() {
                            for (var e = new a, t = 5; t--;) e[l](t, t);
                            return !e.has(-0)
                        });
                    m || ((a = t(function(t, i) {
                        xe(t, a, e);
                        var n = function(e, t, i) {
                            var n, r = t.constructor;
                            return r !== i && "function" == typeof r && (n = r.prototype) !== i.prototype && X(n) && di && di(e, n), e
                        }(new o, t, a);
                        return null != i && ti(i, r, n[l], n), n
                    })).prototype = c, c.constructor = a), (f || g) && (d("delete"), d("has"), r && d("get")), (g || p) && d(l), s && c.clear && delete c.clear
                } else a = n.getConstructor(t, e, r, l), Te(a.prototype, i), ii.NEED = !0;
                return Je(a, e), u[e] = a, fe(fe.G + fe.W + fe.F * (a != o), u), s || n.setStrong(a, e, r), a
            },
            pi = (hi("Map", function(e) {
                return function() {
                    return e(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, {
                get: function(e) {
                    var t = li.getEntry(ni(this, "Map"), e);
                    return t && t.v
                },
                set: function(e, t) {
                    return li.def(ni(this, "Map"), 0 === e ? 0 : e, t)
                }
            }, li, !0), hi("Set", function(e) {
                return function() {
                    return e(this, arguments.length > 0 ? arguments[0] : void 0)
                }
            }, {
                add: function(e) {
                    return li.def(ni(this, "Set"), e = 0 === e ? 0 : e, e)
                }
            }, li), {
                f: Object.getOwnPropertySymbols
            }),
            fi = Object.assign,
            mi = !fi || V(function() {
                var e = {},
                    t = {},
                    i = Symbol(),
                    n = "abcdefghijklmnopqrst";
                return e[i] = 7, n.split("").forEach(function(e) {
                    t[e] = e
                }), 7 != fi({}, e)[i] || Object.keys(fi({}, t)).join("") != n
            }) ? function(e, t) {
                for (var i = Ge(e), n = arguments.length, r = 1, s = pi.f, o = Zt.f; n > r;)
                    for (var a, l = Ae(arguments[r++]), c = s ? yt(l).concat(s(l)) : yt(l), u = c.length, d = 0; u > d;) o.call(l, a = c[d++]) && (i[a] = l[a]);
                return i
            } : fi,
            gi = ii.getWeak,
            vi = It(5),
            yi = It(6),
            wi = 0,
            _i = function(e) {
                return e._l || (e._l = new bi)
            },
            bi = function() {
                this.a = []
            },
            Ti = function(e, t) {
                return vi(e.a, function(e) {
                    return e[0] === t
                })
            };
        bi.prototype = {
            get: function(e) {
                var t = Ti(this, e);
                if (t) return t[1]
            },
            has: function(e) {
                return !!Ti(this, e)
            },
            set: function(e, t) {
                var i = Ti(this, e);
                i ? i[1] = t : this.a.push([e, t])
            },
            "delete": function(e) {
                var t = yi(this.a, function(t) {
                    return t[0] === e
                });
                return ~t && this.a.splice(t, 1), !!~t
            }
        };
        var xi = {
            getConstructor: function(e, t, i, n) {
                var r = e(function(e, s) {
                    xe(e, r, t, "_i"), e._t = t, e._i = wi++, e._l = void 0, null != s && ti(s, i, e[n], e)
                });
                return Te(r.prototype, {
                    "delete": function(e) {
                        if (!X(e)) return !1;
                        var i = gi(e);
                        return !0 === i ? _i(ni(this, t))["delete"](e) : i && se(i, this._i) && delete i[this._i]
                    },
                    has: function(e) {
                        if (!X(e)) return !1;
                        var i = gi(e);
                        return !0 === i ? _i(ni(this, t)).has(e) : i && se(i, this._i)
                    }
                }), r
            },
            def: function(e, t, i) {
                var n = gi(Y(t), !0);
                return !0 === n ? _i(e).set(t, i) : n[e._i] = i, e
            },
            ufstore: _i
        };
        e(function(e) {
            var t, i = It(0),
                n = ii.getWeak,
                r = Object.isExtensible,
                s = xi.ufstore,
                o = {},
                a = function(e) {
                    return function() {
                        return e(this, arguments.length > 0 ? arguments[0] : void 0)
                    }
                },
                l = {
                    get: function(e) {
                        if (X(e)) {
                            var t = n(e);
                            return !0 === t ? s(ni(this, "WeakMap")).get(e) : t ? t[this._i] : void 0
                        }
                    },
                    set: function(e, t) {
                        return xi.def(ni(this, "WeakMap"), e, t)
                    }
                },
                c = e.exports = hi("WeakMap", a, l, xi, !0, !0);
            V(function() {
                return 7 != (new c).set((Object.freeze || Object)(o), 7).get(o)
            }) && (t = xi.getConstructor(a, "WeakMap"), mi(t.prototype, l), ii.NEED = !0, i(["delete", "has", "get", "set"], function(e) {
                var i = c.prototype,
                    n = i[e];
                ce(i, e, function(i, s) {
                    if (X(i) && !r(i)) {
                        this._f || (this._f = new t);
                        var o = this._f[e](i, s);
                        return "set" == e ? this : o
                    }
                    return n.call(this, i, s)
                })
            }))
        }), hi("WeakSet", function(e) {
            return function() {
                return e(this, arguments.length > 0 ? arguments[0] : void 0)
            }
        }, {
            add: function(e) {
                return xi.def(ni(this, "WeakSet"), e, !0)
            }
        }, xi, !1, !0);
        var ki = (q.Reflect || {}).apply,
            Si = Function.apply;
        fe(fe.S + fe.F * !V(function() {
            ki(function() {})
        }), "Reflect", {
            apply: function(e, t, i) {
                var n = ue(e),
                    r = Y(i);
                return ki ? ki(n, t, r) : Si.call(n, t, r)
            }
        });
        var Ci = function(e, t, i) {
                var n = void 0 === i;
                switch (t.length) {
                    case 0:
                        return n ? e() : e.call(i);
                    case 1:
                        return n ? e(t[0]) : e.call(i, t[0]);
                    case 2:
                        return n ? e(t[0], t[1]) : e.call(i, t[0], t[1]);
                    case 3:
                        return n ? e(t[0], t[1], t[2]) : e.call(i, t[0], t[1], t[2]);
                    case 4:
                        return n ? e(t[0], t[1], t[2], t[3]) : e.call(i, t[0], t[1], t[2], t[3])
                }
                return e.apply(i, t)
            },
            zi = [].slice,
            Pi = {},
            Mi = Function.bind || function(e) {
                var t = ue(this),
                    i = zi.call(arguments, 1),
                    n = function() {
                        var r = i.concat(zi.call(arguments));
                        return this instanceof n ? function(e, t, i) {
                            if (!(t in Pi)) {
                                for (var n = [], r = 0; r < t; r++) n[r] = "a[" + r + "]";
                                Pi[t] = Function("F,a", "return new F(" + n.join(",") + ")")
                            }
                            return Pi[t](e, i)
                        }(t, r.length, r) : Ci(t, r, e)
                    };
                return X(t.prototype) && (n.prototype = t.prototype), n
            },
            Oi = (q.Reflect || {}).construct,
            Ei = V(function() {
                function e() {}
                return !(Oi(function() {}, [], e) instanceof e)
            }),
            Ai = !V(function() {
                Oi(function() {})
            });
        fe(fe.S + fe.F * (Ei || Ai), "Reflect", {
            construct: function(e, t) {
                ue(e), Y(t);
                var i = arguments.length < 3 ? e : ue(arguments[2]);
                if (Ai && !Ei) return Oi(e, t, i);
                if (e == i) {
                    switch (t.length) {
                        case 0:
                            return new e;
                        case 1:
                            return new e(t[0]);
                        case 2:
                            return new e(t[0], t[1]);
                        case 3:
                            return new e(t[0], t[1], t[2]);
                        case 4:
                            return new e(t[0], t[1], t[2], t[3])
                    }
                    var n = [null];
                    return n.push.apply(n, t), new(Mi.apply(e, n))
                }
                var r = i.prototype,
                    s = St(X(r) ? r : Object.prototype),
                    o = Function.apply.call(e, s, t);
                return X(o) ? o : s
            }
        }), fe(fe.S + fe.F * V(function() {
            Reflect.defineProperty(te.f({}, 1, {
                value: 1
            }), 1, {
                value: 2
            })
        }), "Reflect", {
            defineProperty: function(e, t, i) {
                Y(e), t = J(t, !0), Y(i);
                try {
                    return te.f(e, t, i), !0
                } catch (e) {
                    return !1
                }
            }
        });
        var Li = Qt.f;
        fe(fe.S, "Reflect", {
            deleteProperty: function(e, t) {
                var i = Li(Y(e), t);
                return !(i && !i.configurable) && delete e[t]
            }
        }), fe(fe.S, "Reflect", {
            get: function bo(e, t) {
                var i, n, r = arguments.length < 3 ? e : arguments[2];
                return Y(e) === r ? e[t] : (i = Qt.f(e, t)) ? se(i, "value") ? i.value : void 0 !== i.get ? i.get.call(r) : void 0 : X(n = Pt(e)) ? bo(n, t, r) : void 0
            }
        }), fe(fe.S, "Reflect", {
            getOwnPropertyDescriptor: function(e, t) {
                return Qt.f(Y(e), t)
            }
        }), fe(fe.S, "Reflect", {
            getPrototypeOf: function(e) {
                return Pt(Y(e))
            }
        }), fe(fe.S, "Reflect", {
            has: function(e, t) {
                return t in e
            }
        });
        var Ii = Object.isExtensible;
        fe(fe.S, "Reflect", {
            isExtensible: function(e) {
                return Y(e), !Ii || Ii(e)
            }
        });
        var Di = q.Reflect,
            Ri = Di && Di.ownKeys || function(e) {
                var t = Ve.f(Y(e)),
                    i = pi.f;
                return i ? t.concat(i(e)) : t
            };
        fe(fe.S, "Reflect", {
            ownKeys: Ri
        });
        var Ni = Object.preventExtensions;
        fe(fe.S, "Reflect", {
            preventExtensions: function(e) {
                Y(e);
                try {
                    return Ni && Ni(e), !0
                } catch (e) {
                    return !1
                }
            }
        }), fe(fe.S, "Reflect", {
            set: function To(e, t, i) {
                var n, r, s = arguments.length < 4 ? e : arguments[3],
                    o = Qt.f(Y(e), t);
                if (!o) {
                    if (X(r = Pt(e))) return To(r, t, i, s);
                    o = ie(0)
                }
                if (se(o, "value")) {
                    if (!1 === o.writable || !X(s)) return !1;
                    if (n = Qt.f(s, t)) {
                        if (n.get || n.set || !1 === n.writable) return !1;
                        n.value = i, te.f(s, t, n)
                    } else te.f(s, t, ie(0, i));
                    return !0
                }
                return void 0 !== o.set && (o.set.call(s, i), !0)
            }
        }), ui && fe(fe.S, "Reflect", {
            setPrototypeOf: function(e, t) {
                ui.check(e, t);
                try {
                    return ui.set(e, t), !0
                } catch (e) {
                    return !1
                }
            }
        });
        var Wi, Fi, Hi, Bi = q.process,
            ji = q.setImmediate,
            qi = q.clearImmediate,
            $i = q.MessageChannel,
            Xi = q.Dispatch,
            Yi = 0,
            Vi = {},
            Gi = function() {
                var e = +this;
                if (Vi.hasOwnProperty(e)) {
                    var t = Vi[e];
                    delete Vi[e], t()
                }
            },
            Ui = function(e) {
                Gi.call(e.data)
            };
        ji && qi || (ji = function(e) {
            for (var t = [], i = 1; arguments.length > i;) t.push(arguments[i++]);
            return Vi[++Yi] = function() {
                Ci("function" == typeof e ? e : Function(e), t)
            }, Wi(Yi), Yi
        }, qi = function(e) {
            delete Vi[e]
        }, "process" == Ee(Bi) ? Wi = function(e) {
            Bi.nextTick(de(Gi, e, 1))
        } : Xi && Xi.now ? Wi = function(e) {
            Xi.now(de(Gi, e, 1))
        } : $i ? (Hi = (Fi = new $i).port2, Fi.port1.onmessage = Ui, Wi = de(Hi.postMessage, Hi, 1)) : q.addEventListener && "function" == typeof postMessage && !q.importScripts ? (Wi = function(e) {
            q.postMessage(e + "", "*")
        }, q.addEventListener("message", Ui, !1)) : Wi = "onreadystatechange" in K("script") ? function(e) {
            bt.appendChild(K("script")).onreadystatechange = function() {
                bt.removeChild(this), Gi.call(e)
            }
        } : function(e) {
            setTimeout(de(Gi, e, 1), 0)
        });
        var Zi, Ki, Qi, Ji, en = {
                set: ji,
                clear: qi
            },
            tn = en.set,
            nn = q.MutationObserver || q.WebKitMutationObserver,
            rn = q.process,
            sn = q.Promise,
            on = "process" == Ee(rn),
            an = {
                f: function(e) {
                    return new t(e)
                }
            },
            ln = function(e) {
                try {
                    return {
                        e: !1,
                        v: e()
                    }
                } catch (e) {
                    return {
                        e: !0,
                        v: e
                    }
                }
            },
            cn = q.navigator,
            un = cn && cn.userAgent || "",
            dn = en.set,
            hn = function() {
                var e, t, i, n = function() {
                    var n, r;
                    for (on && (n = rn.domain) && n.exit(); e;) {
                        r = e.fn, e = e.next;
                        try {
                            r()
                        } catch (n) {
                            throw e ? i() : t = void 0, n
                        }
                    }
                    t = void 0, n && n.enter()
                };
                if (on) i = function() {
                    rn.nextTick(n)
                };
                else if (!nn || q.navigator && q.navigator.standalone)
                    if (sn && sn.resolve) {
                        var r = sn.resolve(void 0);
                        i = function() {
                            r.then(n)
                        }
                    } else i = function() {
                        tn.call(q, n)
                    };
                else {
                    var s = !0,
                        o = document.createTextNode("");
                    new nn(n).observe(o, {
                        characterData: !0
                    }), i = function() {
                        o.data = s = !s
                    }
                }
                return function(n) {
                    var r = {
                        fn: n,
                        next: void 0
                    };
                    t && (t.next = r), e || (e = r, i()), t = r
                }
            }(),
            pn = q.TypeError,
            fn = q.process,
            mn = fn && fn.versions,
            gn = mn && mn.v8 || "",
            vn = q.Promise,
            yn = "process" == pt(fn),
            wn = function() {},
            _n = Ki = an.f,
            bn = !! function() {
                try {
                    var e = vn.resolve(1),
                        t = (e.constructor = {})[Ze("species")] = function(e) {
                            e(wn, wn)
                        };
                    return (yn || "function" == typeof PromiseRejectionEvent) && e.then(wn) instanceof t && 0 !== gn.indexOf("6.6") && -1 === un.indexOf("Chrome/66")
                } catch (e) {}
            }(),
            Tn = function(e) {
                var t;
                return !(!X(e) || "function" != typeof(t = e.then)) && t
            },
            xn = function(e, t) {
                if (!e._n) {
                    e._n = !0;
                    var i = e._c;
                    hn(function() {
                        for (var n = e._v, r = 1 == e._s, s = 0, o = function(e) {
                                var t, i, s, o = r ? e.ok : e.fail,
                                    a = e.resolve,
                                    l = e.reject,
                                    c = e.domain;
                                try {
                                    o ? (r || (2 == u._h && Cn(u), u._h = 1), !0 === o ? t = n : (c && c.enter(), t = o(n), c && (c.exit(), s = !0)), t === e.promise ? l(pn("Promise-chain cycle")) : (i = Tn(t)) ? i.call(t, a, l) : a(t)) : l(n)
                                } catch (u) {
                                    c && !s && c.exit(), l(u)
                                }
                            }; i.length > s;) o(i[s++]);
                        e._c = [], e._n = !1, t && !e._h && kn(e)
                    })
                }
            },
            kn = function(e) {
                dn.call(q, function() {
                    var t, i, n, r = e._v,
                        s = Sn(e);
                    if (s && (t = ln(function() {
                            yn ? fn.emit("unhandledRejection", r, e) : (i = q.onunhandledrejection) ? i({
                                promise: e,
                                reason: r
                            }) : (n = q.console) && n.error && n.error("Unhandled promise rejection", r)
                        }), e._h = yn || Sn(e) ? 2 : 1), e._a = void 0, s && t.e) throw t.v
                })
            },
            Sn = function(e) {
                return 1 !== e._h && 0 === (e._a || e._c).length
            },
            Cn = function(e) {
                dn.call(q, function() {
                    var t;
                    yn ? fn.emit("rejectionHandled", e) : (t = q.onrejectionhandled) && t({
                        promise: e,
                        reason: e._v
                    })
                })
            },
            zn = function(e) {
                var t = this;
                t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), xn(t, !0))
            },
            Pn = function(e) {
                var t, i = this;
                if (!i._d) {
                    i._d = !0, i = i._w || i;
                    try {
                        if (i === e) throw pn("Promise can't be resolved itself");
                        (t = Tn(e)) ? hn(function() {
                            var e = {
                                _w: i,
                                _d: !1
                            };
                            try {
                                t.call(n, de(Pn, e, 1), de(zn, e, 1))
                            } catch (n) {
                                zn.call(e, n)
                            }
                        }): (i._v = e, i._s = 1, xn(i, !1))
                    } catch (e) {
                        zn.call({
                            _w: i,
                            _d: !1
                        }, e)
                    }
                }
            };
        bn || (vn = function(e) {
            xe(this, vn, "Promise", "_h"), ue(e), Zi.call(this);
            try {
                e(de(Pn, this, 1), de(zn, this, 1))
            } catch (e) {
                zn.call(this, e)
            }
        }, (Zi = function(e) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
        }).prototype = Te(vn.prototype, {
            then: function(e, t) {
                var i = _n(it(this, vn));
                return i.ok = "function" != typeof e || e, i.fail = "function" == typeof t && t, i.domain = yn ? fn.domain : void 0, this._c.push(i), this._a && this._a.push(i), this._s && xn(this, !1), i.promise
            },
            "catch": function(e) {
                return this.then(void 0, e)
            }
        }), Qi = function() {
            var e = new Zi;
            this.promise = e, this.resolve = de(Pn, e, 1), this.reject = de(zn, e, 1)
        }, an.f = _n = function(e) {
            return e === vn || e === Ji ? new Qi(e) : Ki(e)
        }), fe(fe.G + fe.W + fe.F * !bn, {
            Promise: vn
        }), Je(vn, "Promise"), rt("Promise"), Ji = $.Promise, fe(fe.S + fe.F * !bn, "Promise", {
            reject: function(e) {
                var t = _n(this);
                return (0, t.reject)(e), t.promise
            }
        }), fe(fe.S + fe.F * !bn, "Promise", {
            resolve: function(e) {
                return function(e, t) {
                    if (Y(e), X(t) && t.constructor === e) return t;
                    var i = an.f(e);
                    return (0, i.resolve)(t), i.promise
                }(this, e)
            }
        }), fe(fe.S + fe.F * !(bn && Gt(function(e) {
            vn.all(e)["catch"](wn)
        })), "Promise", {
            all: function(e) {
                var t = this,
                    i = _n(t),
                    n = i.resolve,
                    r = i.reject,
                    s = ln(function() {
                        var i = [],
                            s = 0,
                            o = 1;
                        ti(e, !1, function(e) {
                            var a = s++,
                                l = !1;
                            i.push(void 0), o++, t.resolve(e).then(function(e) {
                                l || (l = !0, i[a] = e, --o || n(i))
                            }, r)
                        }), --o || n(i)
                    });
                return s.e && r(s.v), i.promise
            },
            race: function(e) {
                var t = this,
                    i = _n(t),
                    n = i.reject,
                    r = ln(function() {
                        ti(e, !1, function(e) {
                            t.resolve(e).then(i.resolve, n)
                        })
                    });
                return r.e && n(r.v), i.promise
            }
        });
        var Mn = {
                f: Ze
            },
            On = te.f,
            En = function(e) {
                var t = $.Symbol || ($.Symbol = q.Symbol || {});
                "_" == e.charAt(0) || e in t || On(t, e, {
                    value: Mn.f(e)
                })
            },
            An = Ve.f,
            Ln = {}.toString,
            In = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
            Dn = {
                f: function(e) {
                    return In && "[object Window]" == Ln.call(e) ? function(e) {
                        try {
                            return An(e)
                        } catch (e) {
                            return In.slice()
                        }
                    }(e) : An(Ie(e))
                }
            },
            Rn = ii.KEY,
            Nn = Qt.f,
            Wn = te.f,
            Fn = Dn.f,
            Hn = q.Symbol,
            Bn = q.JSON,
            jn = Bn && Bn.stringify,
            qn = Ze("_hidden"),
            $n = Ze("toPrimitive"),
            Xn = {}.propertyIsEnumerable,
            Yn = Fe("symbol-registry"),
            Vn = Fe("symbols"),
            Gn = Fe("op-symbols"),
            Un = Object.prototype,
            Zn = "function" == typeof Hn,
            Kn = q.QObject,
            Qn = !Kn || !Kn.prototype || !Kn.prototype.findChild,
            Jn = G && V(function() {
                return 7 != St(Wn({}, "a", {
                    get: function() {
                        return Wn(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }) ? function(e, t, i) {
                var n = Nn(Un, t);
                n && delete Un[t], Wn(e, t, i), n && e !== Un && Wn(Un, t, n)
            } : Wn,
            er = function(e) {
                var t = Vn[e] = St(Hn.prototype);
                return t._k = e, t
            },
            tr = Zn && "symbol" == typeof Hn.iterator ? function(e) {
                return "symbol" == typeof e
            } : function(e) {
                return e instanceof Hn
            },
            ir = function(e, t, i) {
                return e === Un && ir(Gn, t, i), Y(e), t = J(t, !0), Y(i), se(Vn, t) ? (i.enumerable ? (se(e, qn) && e[qn][t] && (e[qn][t] = !1), i = St(i, {
                    enumerable: ie(0, !1)
                })) : (se(e, qn) || Wn(e, qn, ie(1, {})), e[qn][t] = !0), Jn(e, t, i)) : Wn(e, t, i)
            },
            nr = function(e, t) {
                Y(e);
                for (var i, n = function(e) {
                        var t = yt(e),
                            i = pi.f;
                        if (i)
                            for (var n, r = i(e), s = Zt.f, o = 0; r.length > o;) s.call(e, n = r[o++]) && t.push(n);
                        return t
                    }(t = Ie(t)), r = 0, s = n.length; s > r;) ir(e, i = n[r++], t[i]);
                return e
            },
            rr = function(e) {
                var t = Xn.call(this, e = J(e, !0));
                return !(this === Un && se(Vn, e) && !se(Gn, e)) && (!(t || !se(this, e) || !se(Vn, e) || se(this, qn) && this[qn][e]) || t)
            },
            sr = function(e, t) {
                if (e = Ie(e), t = J(t, !0), e !== Un || !se(Vn, t) || se(Gn, t)) {
                    var i = Nn(e, t);
                    return !i || !se(Vn, t) || se(e, qn) && e[qn][t] || (i.enumerable = !0), i
                }
            },
            or = function(e) {
                for (var t, i = Fn(Ie(e)), n = [], r = 0; i.length > r;) se(Vn, t = i[r++]) || t == qn || t == Rn || n.push(t);
                return n
            },
            ar = function(e) {
                for (var t, i = e === Un, n = Fn(i ? Gn : Ie(e)), r = [], s = 0; n.length > s;) !se(Vn, t = n[s++]) || i && !se(Un, t) || r.push(Vn[t]);
                return r
            };
        Zn || (ce((Hn = function() {
            if (this instanceof Hn) throw TypeError("Symbol is not a constructor!");
            var e = le(arguments.length > 0 ? arguments[0] : void 0),
                t = function(i) {
                    this === Un && t.call(Gn, i), se(this, qn) && se(this[qn], e) && (this[qn][e] = !1), Jn(this, e, ie(1, i))
                };
            return G && Qn && Jn(Un, e, {
                configurable: !0,
                set: t
            }), er(e)
        }).prototype, "toString", function() {
            return this._k
        }), Qt.f = sr, te.f = ir, Ve.f = Dn.f = or, Zt.f = rr, pi.f = ar, G && ce(Un, "propertyIsEnumerable", rr, !0), Mn.f = function(e) {
            return er(Ze(e))
        }), fe(fe.G + fe.W + fe.F * !Zn, {
            Symbol: Hn
        });
        for (var lr = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), cr = 0; lr.length > cr;) Ze(lr[cr++]);
        for (var ur = yt(Ze.store), dr = 0; ur.length > dr;) En(ur[dr++]);
        fe(fe.S + fe.F * !Zn, "Symbol", {
            "for": function(e) {
                return se(Yn, e += "") ? Yn[e] : Yn[e] = Hn(e)
            },
            keyFor: function(e) {
                if (!tr(e)) throw TypeError(e + " is not a symbol!");
                for (var t in Yn)
                    if (Yn[t] === e) return t
            },
            useSetter: function() {
                Qn = !0
            },
            useSimple: function() {
                Qn = !1
            }
        }), fe(fe.S + fe.F * !Zn, "Object", {
            create: function(e, t) {
                return void 0 === t ? St(e) : nr(St(e), t)
            },
            defineProperty: ir,
            defineProperties: nr,
            getOwnPropertyDescriptor: sr,
            getOwnPropertyNames: or,
            getOwnPropertySymbols: ar
        }), Bn && fe(fe.S + fe.F * (!Zn || V(function() {
            var e = Hn();
            return "[null]" != jn([e]) || "{}" != jn({
                a: e
            }) || "{}" != jn(Object(e))
        })), "JSON", {
            stringify: function(e) {
                for (var t, i, n = [e], r = 1; arguments.length > r;) n.push(arguments[r++]);
                if (i = t = n[1], (X(t) || void 0 !== e) && !tr(e)) return Et(t) || (t = function(e, t) {
                    if ("function" == typeof i && (t = i.call(this, e, t)), !tr(t)) return t
                }), n[1] = t, jn.apply(Bn, n)
            }
        }), Hn.prototype[$n] || ne(Hn.prototype, $n, Hn.prototype.valueOf), Je(Hn, "Symbol"), Je(Math, "Math", !0), Je(q.JSON, "JSON", !0);
        var hr = function(e, t) {
                var i = ($.Object || {})[e] || Object[e],
                    n = {};
                n[e] = t(i), fe(fe.S + fe.F * V(function() {
                    i(1)
                }), "Object", n)
            },
            pr = ii.onFreeze;
        hr("freeze", function(e) {
            return function(t) {
                return e && X(t) ? e(pr(t)) : t
            }
        });
        var fr = ii.onFreeze;
        hr("seal", function(e) {
            return function(t) {
                return e && X(t) ? e(fr(t)) : t
            }
        });
        var mr = ii.onFreeze;
        hr("preventExtensions", function(e) {
            return function(t) {
                return e && X(t) ? e(mr(t)) : t
            }
        }), hr("isFrozen", function(e) {
            return function(t) {
                return !X(t) || !!e && e(t)
            }
        }), hr("isSealed", function(e) {
            return function(t) {
                return !X(t) || !!e && e(t)
            }
        }), hr("isExtensible", function(e) {
            return function(t) {
                return !!X(t) && (!e || e(t))
            }
        });
        var gr = Qt.f;
        hr("getOwnPropertyDescriptor", function() {
            return function(e, t) {
                return gr(Ie(e), t)
            }
        }), hr("getPrototypeOf", function() {
            return function(e) {
                return Pt(Ge(e))
            }
        }), hr("keys", function() {
            return function(e) {
                return yt(Ge(e))
            }
        }), hr("getOwnPropertyNames", function() {
            return Dn.f
        }), fe(fe.S + fe.F, "Object", {
            assign: mi
        });
        var vr = Object.is || function(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
        };
        fe(fe.S, "Object", {
            is: vr
        });
        var yr = te.f,
            wr = Function.prototype,
            _r = /^\s*function ([^ (]*)/;
        "name" in wr || G && yr(wr, "name", {
            configurable: !0,
            get: function() {
                try {
                    return ("" + this).match(_r)[1]
                } catch (e) {
                    return ""
                }
            }
        }), fe(fe.S, "String", {
            raw: function(e) {
                for (var t = Ie(e.raw), i = Pe(t.length), n = arguments.length, r = [], s = 0; i > s;) r.push(String(t[s++])), s < n && r.push(String(arguments[s]));
                return r.join("")
            }
        });
        var br = String.fromCharCode,
            Tr = String.fromCodePoint;
        fe(fe.S + fe.F * (!!Tr && 1 != Tr.length), "String", {
            fromCodePoint: function(e) {
                for (var t, i = [], n = arguments.length, r = 0; n > r;) {
                    if (t = +arguments[r++], Ne(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");
                    i.push(t < 65536 ? br(t) : br(55296 + ((t -= 65536) >> 10), t % 1024 + 56320))
                }
                return i.join("")
            }
        });
        var xr, kr = (xr = !1, function(e, t) {
            var i, n, r = String(Le(e)),
                s = Ce(t),
                o = r.length;
            return s < 0 || s >= o ? xr ? "" : void 0 : (i = r.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === o || (n = r.charCodeAt(s + 1)) < 56320 || n > 57343 ? xr ? r.charAt(s) : i : xr ? r.slice(s, s + 2) : n - 56320 + (i - 55296 << 10) + 65536
        });
        fe(fe.P, "String", {
            codePointAt: function(e) {
                return kr(this, e)
            }
        });
        var Sr = function(e) {
            var t = String(Le(this)),
                i = "",
                n = Ce(e);
            if (n < 0 || n == 1 / 0) throw RangeError("Count can't be negative");
            for (; n > 0;
                (n >>>= 1) && (t += t)) 1 & n && (i += t);
            return i
        };
        fe(fe.P, "String", {
            repeat: Sr
        });
        var Cr = Ze("match"),
            zr = function(e) {
                var t;
                return X(e) && (void 0 !== (t = e[Cr]) ? !!t : "RegExp" == Ee(e))
            },
            Pr = function(e, t, i) {
                if (zr(t)) throw TypeError("String#" + i + " doesn't accept regex!");
                return String(Le(e))
            },
            Mr = Ze("match"),
            Or = function(e) {
                var t = /./;
                try {
                    "/./" [e](t)
                } catch (i) {
                    try {
                        return t[Mr] = !1, !"/./" [e](t)
                    } catch (e) {}
                }
                return !0
            },
            Er = "".startsWith;
        fe(fe.P + fe.F * Or("startsWith"), "String", {
            startsWith: function(e) {
                var t = Pr(this, e, "startsWith"),
                    i = Pe(Math.min(arguments.length > 1 ? arguments[1] : void 0, t.length)),
                    n = String(e);
                return Er ? Er.call(t, n, i) : t.slice(i, i + n.length) === n
            }
        });
        var Ar = "".endsWith;
        fe(fe.P + fe.F * Or("endsWith"), "String", {
            endsWith: function(e) {
                var t = Pr(this, e, "endsWith"),
                    i = arguments.length > 1 ? arguments[1] : void 0,
                    n = Pe(t.length),
                    r = void 0 === i ? n : Math.min(Pe(i), n),
                    s = String(e);
                return Ar ? Ar.call(t, s, r) : t.slice(r - s.length, r) === s
            }
        }), fe(fe.P + fe.F * Or("includes"), "String", {
            includes: function(e) {
                return !!~Pr(this, e, "includes").indexOf(e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), G && "g" != /./g.flags && te.f(RegExp.prototype, "flags", {
            configurable: !0,
            get: function() {
                var e = Y(this),
                    t = "";
                return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
            }
        });
        var Lr = function(e, t, i) {
            var n = Ze(e),
                r = i(Le, n, "" [e]),
                s = r[0],
                o = r[1];
            V(function() {
                var t = {};
                return t[n] = function() {
                    return 7
                }, 7 != "" [e](t)
            }) && (ce(String.prototype, e, s), ne(RegExp.prototype, n, 2 == t ? function(e, t) {
                return o.call(e, this, t)
            } : function(e) {
                return o.call(e, this)
            }))
        };
        Lr("match", 1, function(e, t, i) {
            return [function(i) {
                var n = e(this),
                    r = null == i ? void 0 : i[t];
                return void 0 !== r ? r.call(i, n) : new RegExp(i)[t](String(n))
            }, i]
        }), Lr("replace", 2, function(e, t, i) {
            return [function(n, r) {
                var s = e(this),
                    o = null == n ? void 0 : n[t];
                return void 0 !== o ? o.call(n, s, r) : i.call(String(s), n, r)
            }, i]
        }), Lr("split", 2, function(e, t, i) {
            var n = zr,
                r = i,
                s = [].push;
            if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length) {
                var o = void 0 === /()??/.exec("")[1];
                i = function(e, t) {
                    var i = String(this);
                    if (void 0 === e && 0 === t) return [];
                    if (!n(e)) return r.call(i, e, t);
                    var a, l, c, u, d, h = [],
                        p = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
                        f = 0,
                        m = void 0 === t ? 4294967295 : t >>> 0,
                        g = new RegExp(e.source, p + "g");
                    for (o || (a = new RegExp("^" + g.source + "$(?!\\s)", p));
                        (l = g.exec(i)) && !((c = l.index + l[0].length) > f && (h.push(i.slice(f, l.index)), !o && l.length > 1 && l[0].replace(a, function() {
                            for (d = 1; d < arguments.length - 2; d++) void 0 === arguments[d] && (l[d] = void 0)
                        }), l.length > 1 && l.index < i.length && s.apply(h, l.slice(1)), u = l[0].length, f = c, h.length >= m));) g.lastIndex === l.index && g.lastIndex++;
                    return f === i.length ? !u && g.test("") || h.push("") : h.push(i.slice(f)), h.length > m ? h.slice(0, m) : h
                }
            } else "0".split(void 0, 0).length && (i = function(e, t) {
                return void 0 === e && 0 === t ? [] : r.call(this, e, t)
            });
            return [function(n, r) {
                var s = e(this),
                    o = null == n ? void 0 : n[t];
                return void 0 !== o ? o.call(n, s, r) : i.call(String(s), n, r)
            }, i]
        }), Lr("search", 1, function(e, t, i) {
            return [function(i) {
                var n = e(this),
                    r = null == i ? void 0 : i[t];
                return void 0 !== r ? r.call(i, n) : new RegExp(i)[t](String(n))
            }, i]
        });
        var Ir = function(e, t, i) {
            t in e ? te.f(e, t, ie(0, i)) : e[t] = i
        };
        fe(fe.S + fe.F * !Gt(function(e) {}), "Array", {
            from: function(e) {
                var t, i, n, r, s = Ge(e),
                    o = "function" == typeof this ? this : Array,
                    a = arguments.length,
                    l = a > 1 ? arguments[1] : void 0,
                    c = void 0 !== l,
                    u = 0,
                    d = Ot(s);
                if (c && (l = de(l, a > 2 ? arguments[2] : void 0, 2)), null == d || o == Array && vt(d))
                    for (i = new o(t = Pe(s.length)); t > u; u++) Ir(i, u, c ? l(s[u], u) : s[u]);
                else
                    for (r = d.call(s), i = new o; !(n = r.next()).done; u++) Ir(i, u, c ? ei(r, l, [n.value, u], !0) : n.value);
                return i.length = u, i
            }
        }), fe(fe.S + fe.F * V(function() {
            function e() {}
            return !(Array.of.call(e) instanceof e)
        }), "Array", {
            of: function() {
                for (var e = 0, t = arguments.length, i = new("function" == typeof this ? this : Array)(t); t > e;) Ir(i, e, arguments[e++]);
                return i.length = t, i
            }
        }), fe(fe.P, "Array", {
            copyWithin: Ut
        }), Nt("copyWithin");
        var Dr = It(5),
            Rr = !0;
        "find" in [] && Array(1).find(function() {
            Rr = !1
        }), fe(fe.P + fe.F * Rr, "Array", {
            find: function(e) {
                return Dr(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), Nt("find");
        var Nr = It(6),
            Wr = !0;
        "findIndex" in [] && Array(1).findIndex(function() {
            Wr = !1
        }), fe(fe.P + fe.F * Wr, "Array", {
            findIndex: function(e) {
                return Nr(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), Nt("findIndex"), fe(fe.P, "Array", {
            fill: Ue
        }), Nt("fill");
        var Fr = q.isFinite;
        fe(fe.S, "Number", {
            isFinite: function(e) {
                return "number" == typeof e && Fr(e)
            }
        });
        var Hr = Math.floor,
            Br = function(e) {
                return !X(e) && isFinite(e) && Hr(e) === e
            };
        fe(fe.S, "Number", {
            isInteger: Br
        });
        var jr = Math.abs;
        fe(fe.S, "Number", {
            isSafeInteger: function(e) {
                return Br(e) && jr(e) <= 9007199254740991
            }
        }), fe(fe.S, "Number", {
            isNaN: function(e) {
                return e != e
            }
        }), fe(fe.S, "Number", {
            EPSILON: Math.pow(2, -52)
        }), fe(fe.S, "Number", {
            MIN_SAFE_INTEGER: -9007199254740991
        }), fe(fe.S, "Number", {
            MAX_SAFE_INTEGER: 9007199254740991
        });
        var qr = Math.log1p || function(e) {
                return (e = +e) > -1e-8 && e < 1e-8 ? e - e * e / 2 : Math.log(1 + e)
            },
            $r = Math.sqrt,
            Xr = Math.acosh;
        fe(fe.S + fe.F * !(Xr && 710 == Math.floor(Xr(Number.MAX_VALUE)) && Xr(1 / 0) == 1 / 0), "Math", {
            acosh: function(e) {
                return (e = +e) < 1 ? NaN : e > 94906265.62425156 ? Math.log(e) + Math.LN2 : qr(e - 1 + $r(e - 1) * $r(e + 1))
            }
        });
        var Yr = Math.asinh;
        fe(fe.S + fe.F * !(Yr && 1 / Yr(0) > 0), "Math", {
            asinh: function xo(e) {
                return isFinite(e = +e) && 0 != e ? e < 0 ? -xo(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e
            }
        });
        var Vr = Math.atanh;
        fe(fe.S + fe.F * !(Vr && 1 / Vr(-0) < 0), "Math", {
            atanh: function(e) {
                return 0 == (e = +e) ? e : Math.log((1 + e) / (1 - e)) / 2
            }
        });
        var Gr = Math.sign || function(e) {
            return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
        };
        fe(fe.S, "Math", {
            cbrt: function(e) {
                return Gr(e = +e) * Math.pow(Math.abs(e), 1 / 3)
            }
        }), fe(fe.S, "Math", {
            clz32: function(e) {
                return (e >>>= 0) ? 31 - Math.floor(Math.log(e + .5) * Math.LOG2E) : 32
            }
        });
        var Ur = Math.exp;
        fe(fe.S, "Math", {
            cosh: function(e) {
                return (Ur(e = +e) + Ur(-e)) / 2
            }
        });
        var Zr = Math.expm1,
            Kr = !Zr || Zr(10) > 22025.465794806718 || Zr(10) < 22025.465794806718 || -2e-17 != Zr(-2e-17) ? function(e) {
                return 0 == (e = +e) ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : Math.exp(e) - 1
            } : Zr;
        fe(fe.S + fe.F * (Kr != Math.expm1), "Math", {
            expm1: Kr
        });
        var Qr = Math.pow,
            Jr = Qr(2, -52),
            es = Qr(2, -23),
            ts = Qr(2, 127) * (2 - es),
            is = Qr(2, -126),
            ns = Math.fround || function(e) {
                var t, i, n = Math.abs(e),
                    r = Gr(e);
                return n < is ? r * (n / is / es + 1 / Jr - 1 / Jr) * is * es : (i = (t = (1 + es / Jr) * n) - (t - n)) > ts || i != i ? r * (1 / 0) : r * i
            };
        fe(fe.S, "Math", {
            fround: ns
        });
        var rs = Math.abs;
        fe(fe.S, "Math", {
            hypot: function(e, t) {
                for (var i, n, r = 0, s = 0, o = arguments.length, a = 0; s < o;) a < (i = rs(arguments[s++])) ? (r = r * (n = a / i) * n + 1, a = i) : r += i > 0 ? (n = i / a) * n : i;
                return a === 1 / 0 ? 1 / 0 : a * Math.sqrt(r)
            }
        });
        var ss = Math.imul;
        fe(fe.S + fe.F * V(function() {
            return -5 != ss(4294967295, 5) || 2 != ss.length
        }), "Math", {
            imul: function(e, t) {
                var i = +e,
                    n = +t,
                    r = 65535 & i,
                    s = 65535 & n;
                return 0 | r * s + ((65535 & i >>> 16) * s + r * (65535 & n >>> 16) << 16 >>> 0)
            }
        }), fe(fe.S, "Math", {
            log1p: qr
        }), fe(fe.S, "Math", {
            log10: function(e) {
                return Math.log(e) * Math.LOG10E
            }
        }), fe(fe.S, "Math", {
            log2: function(e) {
                return Math.log(e) / Math.LN2
            }
        }), fe(fe.S, "Math", {
            sign: Gr
        });
        var os = Math.exp;
        fe(fe.S + fe.F * V(function() {
            return -2e-17 != !Math.sinh(-2e-17)
        }), "Math", {
            sinh: function(e) {
                return Math.abs(e = +e) < 1 ? (Kr(e) - Kr(-e)) / 2 : (os(e - 1) - os(-e - 1)) * (Math.E / 2)
            }
        });
        var as = Math.exp;
        fe(fe.S, "Math", {
            tanh: function(e) {
                var t = Kr(e = +e),
                    i = Kr(-e);
                return t == 1 / 0 ? 1 : i == 1 / 0 ? -1 : (t - i) / (as(e) + as(-e))
            }
        }), fe(fe.S, "Math", {
            trunc: function(e) {
                return (e > 0 ? Math.floor : Math.ceil)(e)
            }
        });
        var ls = We(!0);
        fe(fe.P, "Array", {
            includes: function(e) {
                return ls(this, e, arguments.length > 1 ? arguments[1] : void 0)
            }
        }), Nt("includes");
        var cs = Zt.f,
            us = function(e) {
                return function(t) {
                    for (var i, n = Ie(t), r = yt(n), s = r.length, o = 0, a = []; s > o;) cs.call(n, i = r[o++]) && a.push(e ? [i, n[i]] : n[i]);
                    return a
                }
            },
            ds = us(!1);
        fe(fe.S, "Object", {
            values: function(e) {
                return ds(e)
            }
        });
        var hs = us(!0);
        fe(fe.S, "Object", {
            entries: function(e) {
                return hs(e)
            }
        }), fe(fe.S, "Object", {
            getOwnPropertyDescriptors: function(e) {
                for (var t, i, n = Ie(e), r = Qt.f, s = Ri(n), o = {}, a = 0; s.length > a;) void 0 !== (i = r(n, t = s[a++])) && Ir(o, t, i);
                return o
            }
        });
        var ps = function(e, t, i, n) {
            var r = String(Le(e)),
                s = r.length,
                o = void 0 === i ? " " : String(i),
                a = Pe(t);
            if (a <= s || "" == o) return r;
            var l = a - s,
                c = Sr.call(o, Math.ceil(l / o.length));
            return c.length > l && (c = c.slice(0, l)), n ? c + r : r + c
        };
        fe(fe.P + fe.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(un), "String", {
            padStart: function(e) {
                return ps(this, e, arguments.length > 1 ? arguments[1] : void 0, !0)
            }
        }), fe(fe.P + fe.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(un), "String", {
            padEnd: function(e) {
                return ps(this, e, arguments.length > 1 ? arguments[1] : void 0, !1)
            }
        });
        var fs = [].slice,
            ms = /MSIE .\./.test(un),
            gs = function(e) {
                return function(t, i) {
                    var n = arguments.length > 2,
                        r = !!n && fs.call(arguments, 2);
                    return e(n ? function() {
                        ("function" == typeof t ? t : Function(t)).apply(this, r)
                    } : t, i)
                }
            };
        fe(fe.G + fe.B + fe.F * ms, {
            setTimeout: gs(q.setTimeout),
            setInterval: gs(q.setInterval)
        }), fe(fe.G + fe.B, {
            setImmediate: en.set,
            clearImmediate: en.clear
        });
        for (var vs = Ze("iterator"), ys = Ze("toStringTag"), ws = ft.Array, _s = {
                CSSRuleList: !0,
                CSSStyleDeclaration: !1,
                CSSValueList: !1,
                ClientRectList: !1,
                DOMRectList: !1,
                DOMStringList: !1,
                DOMTokenList: !0,
                DataTransferItemList: !1,
                FileList: !1,
                HTMLAllCollection: !1,
                HTMLCollection: !1,
                HTMLFormElement: !1,
                HTMLSelectElement: !1,
                MediaList: !0,
                MimeTypeArray: !1,
                NamedNodeMap: !1,
                NodeList: !0,
                PaintRequestList: !1,
                Plugin: !1,
                PluginArray: !1,
                SVGLengthList: !1,
                SVGNumberList: !1,
                SVGPathSegList: !1,
                SVGPointList: !1,
                SVGStringList: !1,
                SVGTransformList: !1,
                SourceBufferList: !1,
                StyleSheetList: !0,
                TextTrackCueList: !1,
                TextTrackList: !1,
                TouchList: !1
            }, bs = yt(_s), Ts = 0; Ts < bs.length; Ts++) {
            var xs, ks = bs[Ts],
                Ss = _s[ks],
                Cs = q[ks],
                zs = Cs && Cs.prototype;
            if (zs && (zs[vs] || ne(zs, vs, ws), zs[ys] || ne(zs, ys, ks), ft[ks] = ws, Ss))
                for (xs in Xt) zs[xs] || ce(zs, xs, Xt[xs], !0)
        }
        e(function(e) {
                ! function(t) {
                    function i(e, t, i, s) {
                        var o = t && t.prototype instanceof r ? t : r,
                            a = Object.create(o.prototype),
                            l = new h(s || []);
                        return a._invoke = function(e, t, i) {
                            var r = x;
                            return function(s, o) {
                                if (r === S) throw new Error("Generator is already running");
                                if (r === C) {
                                    if ("throw" === s) throw o;
                                    return f()
                                }
                                for (i.method = s, i.arg = o;;) {
                                    var a = i.delegate;
                                    if (a) {
                                        var l = c(a, i);
                                        if (l) {
                                            if (l === z) continue;
                                            return l
                                        }
                                    }
                                    if ("next" === i.method) i.sent = i._sent = i.arg;
                                    else if ("throw" === i.method) {
                                        if (r === x) throw r = C, i.arg;
                                        i.dispatchException(i.arg)
                                    } else "return" === i.method && i.abrupt("return", i.arg);
                                    r = S;
                                    var u = n(e, t, i);
                                    if ("normal" === u.type) {
                                        if (r = i.done ? C : k, u.arg === z) continue;
                                        return {
                                            value: u.arg,
                                            done: i.done
                                        }
                                    }
                                    "throw" === u.type && (r = C, i.method = "throw", i.arg = u.arg)
                                }
                            }
                        }(e, i, l), a
                    }

                    function n(e, t, i) {
                        try {
                            return {
                                type: "normal",
                                arg: e.call(t, i)
                            }
                        } catch (e) {
                            return {
                                type: "throw",
                                arg: e
                            }
                        }
                    }

                    function r() {}

                    function s() {}

                    function o() {}

                    function a(e) {
                        ["next", "throw", "return"].forEach(function(t) {
                            e[t] = function(e) {
                                return this._invoke(t, e)
                            }
                        })
                    }

                    function l(e) {
                        function i(t, r, s, o) {
                            var a = n(e[t], e, r);
                            if ("throw" !== a.type) {
                                var l = a.arg,
                                    c = l.value;
                                return c && "object" == typeof c && v.call(c, "__await") ? Promise.resolve(c.__await).then(function(e) {
                                    i("next", e, s, o)
                                }, function(e) {
                                    i("throw", e, s, o)
                                }) : Promise.resolve(c).then(function(e) {
                                    l.value = e, s(l)
                                }, o)
                            }
                            o(a.arg)
                        }
                        var r;
                        "object" == typeof t.process && t.process.domain && (i = t.process.domain.bind(i)), this._invoke = function(e, t) {
                            function n() {
                                return new Promise(function(n, r) {
                                    i(e, t, n, r)
                                })
                            }
                            return r = r ? r.then(n, n) : n()
                        }
                    }

                    function c(e, t) {
                        var i = e.iterator[t.method];
                        if (i === m) {
                            if (t.delegate = null, "throw" === t.method) {
                                if (e.iterator["return"] && (t.method = "return", t.arg = m, c(e, t), "throw" === t.method)) return z;
                                t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                            }
                            return z
                        }
                        var r = n(i, e.iterator, t.arg);
                        if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, z;
                        var s = r.arg;
                        return s ? s.done ? (t[e.resultName] = s.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = m), t.delegate = null, z) : s : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, z)
                    }

                    function u(e) {
                        var t = {
                            tryLoc: e[0]
                        };
                        1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                    }

                    function d(e) {
                        var t = e.completion || {};
                        t.type = "normal", delete t.arg, e.completion = t
                    }

                    function h(e) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], e.forEach(u, this), this.reset(!0)
                    }

                    function p(e) {
                        if (e) {
                            var t = e[w];
                            if (t) return t.call(e);
                            if ("function" == typeof e.next) return e;
                            if (!isNaN(e.length)) {
                                var i = -1,
                                    n = function r() {
                                        for (; ++i < e.length;)
                                            if (v.call(e, i)) return r.value = e[i], r.done = !1, r;
                                        return r.value = m, r.done = !0, r
                                    };
                                return n.next = n
                            }
                        }
                        return {
                            next: f
                        }
                    }

                    function f() {
                        return {
                            value: m,
                            done: !0
                        }
                    }
                    var m, g = Object.prototype,
                        v = g.hasOwnProperty,
                        y = "function" == typeof Symbol ? Symbol : {},
                        w = y.iterator || "@@iterator",
                        _ = y.asyncIterator || "@@asyncIterator",
                        b = y.toStringTag || "@@toStringTag",
                        T = t.regeneratorRuntime;
                    if (T) e.exports = T;
                    else {
                        (T = t.regeneratorRuntime = e.exports).wrap = i;
                        var x = "suspendedStart",
                            k = "suspendedYield",
                            S = "executing",
                            C = "completed",
                            z = {},
                            P = {};
                        P[w] = function() {
                            return this
                        };
                        var M = Object.getPrototypeOf,
                            O = M && M(M(p([])));
                        O && O !== g && v.call(O, w) && (P = O);
                        var E = o.prototype = r.prototype = Object.create(P);
                        s.prototype = E.constructor = o, o.constructor = s, o[b] = s.displayName = "GeneratorFunction", T.isGeneratorFunction = function(e) {
                                var t = "function" == typeof e && e.constructor;
                                return !!t && (t === s || "GeneratorFunction" === (t.displayName || t.name))
                            }, T.mark = function(e) {
                                return Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : (e.__proto__ = o, b in e || (e[b] = "GeneratorFunction")), e.prototype = Object.create(E), e
                            }, T.awrap = function(e) {
                                return {
                                    __await: e
                                }
                            }, a(l.prototype), l.prototype[_] = function() {
                                return this
                            }, T.AsyncIterator = l, T.async = function(e, t, n, r) {
                                var s = new l(i(e, t, n, r));
                                return T.isGeneratorFunction(t) ? s : s.next().then(function(e) {
                                    return e.done ? e.value : s.next()
                                })
                            },
                            a(E), E[b] = "Generator", E[w] = function() {
                                return this
                            }, E.toString = function() {
                                return "[object Generator]"
                            }, T.keys = function(e) {
                                var t = [];
                                for (var i in e) t.push(i);
                                return t.reverse(),
                                    function n() {
                                        for (; t.length;) {
                                            var i = t.pop();
                                            if (i in e) return n.value = i, n.done = !1, n
                                        }
                                        return n.done = !0, n
                                    }
                            }, T.values = p, h.prototype = {
                                constructor: h,
                                reset: function(e) {
                                    if (this.prev = 0, this.next = 0, this.sent = this._sent = m, this.done = !1, this.delegate = null, this.method = "next", this.arg = m, this.tryEntries.forEach(d), !e)
                                        for (var t in this) "t" === t.charAt(0) && v.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = m)
                                },
                                stop: function() {
                                    this.done = !0;
                                    var e = this.tryEntries[0].completion;
                                    if ("throw" === e.type) throw e.arg;
                                    return this.rval
                                },
                                dispatchException: function(e) {
                                    function t(t, n) {
                                        return s.type = "throw", s.arg = e, i.next = t, n && (i.method = "next", i.arg = m), !!n
                                    }
                                    if (this.done) throw e;
                                    for (var i = this, n = this.tryEntries.length - 1; n >= 0; --n) {
                                        var r = this.tryEntries[n],
                                            s = r.completion;
                                        if ("root" === r.tryLoc) return t("end");
                                        if (r.tryLoc <= this.prev) {
                                            var o = v.call(r, "catchLoc"),
                                                a = v.call(r, "finallyLoc");
                                            if (o && a) {
                                                if (this.prev < r.catchLoc) return t(r.catchLoc, !0);
                                                if (this.prev < r.finallyLoc) return t(r.finallyLoc)
                                            } else if (o) {
                                                if (this.prev < r.catchLoc) return t(r.catchLoc, !0)
                                            } else {
                                                if (!a) throw new Error("try statement without catch or finally");
                                                if (this.prev < r.finallyLoc) return t(r.finallyLoc)
                                            }
                                        }
                                    }
                                },
                                abrupt: function(e, t) {
                                    for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                        var n = this.tryEntries[i];
                                        if (n.tryLoc <= this.prev && v.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                                            var r = n;
                                            break
                                        }
                                    }
                                    r && ("break" === e || "continue" === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                                    var s = r ? r.completion : {};
                                    return s.type = e, s.arg = t, r ? (this.method = "next", this.next = r.finallyLoc, z) : this.complete(s)
                                },
                                complete: function(e, t) {
                                    if ("throw" === e.type) throw e.arg;
                                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), z
                                },
                                finish: function(e) {
                                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                        var i = this.tryEntries[t];
                                        if (i.finallyLoc === e) return this.complete(i.completion, i.afterLoc), d(i), z
                                    }
                                },
                                "catch": function(e) {
                                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                        var i = this.tryEntries[t];
                                        if (i.tryLoc === e) {
                                            var n = i.completion;
                                            if ("throw" === n.type) {
                                                var r = n.arg;
                                                d(i)
                                            }
                                            return r
                                        }
                                    }
                                    throw new Error("illegal catch attempt")
                                },
                                delegateYield: function(e, t, i) {
                                    return this.delegate = {
                                        iterator: p(e),
                                        resultName: t,
                                        nextLoc: i
                                    }, "next" === this.method && (this.arg = m), z
                                }
                            }
                    }
                }("object" == typeof j ? j : "object" == typeof window ? window : "object" == typeof self ? self : j)
            }), ! function() {
                if ("undefined" != typeof window) try {
                    var e = new window.CustomEvent("test", {
                        cancelable: !0
                    });
                    if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
                } catch (e) {
                    var t = function(e, t) {
                        var i, n;
                        return t = t || {
                            bubbles: !1,
                            cancelable: !1,
                            detail: void 0
                        }, (i = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n = i.preventDefault, i.preventDefault = function() {
                            n.call(this);
                            try {
                                Object.defineProperty(this, "defaultPrevented", {
                                    get: function() {
                                        return !0
                                    }
                                })
                            } catch (e) {
                                this.defaultPrevented = !0
                            }
                        }, i
                    };
                    t.prototype = window.Event.prototype, window.CustomEvent = t
                }
            }(),
            function(e) {
                var t = function() {
                        try {
                            return !!Symbol.iterator
                        } catch (e) {
                            return !1
                        }
                    }(),
                    i = function(e) {
                        var i = {
                            next: function() {
                                var t = e.shift();
                                return {
                                    done: void 0 === t,
                                    value: t
                                }
                            }
                        };
                        return t && (i[Symbol.iterator] = function() {
                            return i
                        }), i
                    },
                    n = function(e) {
                        return encodeURIComponent(e).replace(/%20/g, "+")
                    },
                    r = function(e) {
                        return decodeURIComponent(e).replace(/\+/g, " ")
                    };
                "URLSearchParams" in e && "a=1" === new URLSearchParams("?a=1").toString() || function() {
                    var s = function(e) {
                            if (Object.defineProperty(this, "_entries", {
                                    value: {}
                                }), "string" == typeof e) {
                                if ("" !== e)
                                    for (var t, i = (e = e.replace(/^\?/, "")).split("&"), n = 0; n < i.length; n++) t = i[n].split("="), this.append(r(t[0]), t.length > 1 ? r(t[1]) : "")
                            } else if (e instanceof s) {
                                var o = this;
                                e.forEach(function(e, t) {
                                    o.append(e, t)
                                })
                            }
                        },
                        o = s.prototype;
                    o.append = function(e, t) {
                        e in this._entries ? this._entries[e].push(t.toString()) : this._entries[e] = [t.toString()]
                    }, o["delete"] = function(e) {
                        delete this._entries[e]
                    }, o.get = function(e) {
                        return e in this._entries ? this._entries[e][0] : null
                    }, o.getAll = function(e) {
                        return e in this._entries ? this._entries[e].slice(0) : []
                    }, o.has = function(e) {
                        return e in this._entries
                    }, o.set = function(e, t) {
                        this._entries[e] = [t.toString()]
                    }, o.forEach = function(e, t) {
                        var i;
                        for (var n in this._entries)
                            if (this._entries.hasOwnProperty(n)) {
                                i = this._entries[n];
                                for (var r = 0; r < i.length; r++) e.call(t, i[r], n, this)
                            }
                    }, o.keys = function() {
                        var e = [];
                        return this.forEach(function(t, i) {
                            e.push(i)
                        }), i(e)
                    }, o.values = function() {
                        var e = [];
                        return this.forEach(function(t) {
                            e.push(t)
                        }), i(e)
                    }, o.entries = function() {
                        var e = [];
                        return this.forEach(function(t, i) {
                            e.push([i, t])
                        }), i(e)
                    }, t && (o[Symbol.iterator] = o.entries), o.toString = function() {
                        var e = [];
                        return this.forEach(function(t, i) {
                            e.push(n(i) + "=" + n(t))
                        }), e.join("&")
                    }, e.URLSearchParams = s
                }()
            }(void 0 !== j ? j : "undefined" != typeof window ? window : "undefined" != typeof self ? self : j),
            function(e) {
                if (function() {
                        try {
                            var e = new URL("b", "http://a");
                            return e.pathname = "c%20d", "http://a/c%20d" === e.href && e.searchParams
                        } catch (e) {
                            return !1
                        }
                    }() || function() {
                        var t = e.URL,
                            i = function(e, t) {
                                "string" != typeof e && (e = String(e));
                                var i, n = document;
                                if (t && (void 0 === r.location || t !== r.location.href)) {
                                    (i = (n = document.implementation.createHTMLDocument("")).createElement("base")).href = t, n.head.appendChild(i);
                                    try {
                                        if (0 !== i.href.indexOf(t)) throw new Error(i.href)
                                    } catch (r) {
                                        throw new Error("URL unable to set base " + t + " due to " + r)
                                    }
                                }
                                var s = n.createElement("a");
                                if (s.href = e, i && (n.body.appendChild(s), s.href = s.href), ":" === s.protocol || !/:/.test(s.href)) throw new TypeError("Invalid URL");
                                Object.defineProperty(this, "_anchorElement", {
                                    value: s
                                })
                            },
                            n = i.prototype;
                        ["hash", "host", "hostname", "port", "protocol", "search"].forEach(function(e) {
                            ! function(e) {
                                Object.defineProperty(n, e, {
                                    get: function() {
                                        return this._anchorElement[e]
                                    },
                                    set: function(t) {
                                        this._anchorElement[e] = t
                                    },
                                    enumerable: !0
                                })
                            }(e)
                        }), Object.defineProperties(n, {
                            toString: {
                                get: function() {
                                    var e = this;
                                    return function() {
                                        return e.href
                                    }
                                }
                            },
                            href: {
                                get: function() {
                                    return this._anchorElement.href.replace(/\?$/, "")
                                },
                                set: function(e) {
                                    this._anchorElement.href = e
                                },
                                enumerable: !0
                            },
                            pathname: {
                                get: function() {
                                    return this._anchorElement.pathname.replace(/(^\/?)/, "/")
                                },
                                set: function(e) {
                                    this._anchorElement.pathname = e
                                },
                                enumerable: !0
                            },
                            origin: {
                                get: function() {
                                    var e = {
                                            "http:": 80,
                                            "https:": 443,
                                            "ftp:": 21
                                        }[this._anchorElement.protocol],
                                        t = this._anchorElement.port != e && "" !== this._anchorElement.port;
                                    return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "")
                                },
                                enumerable: !0
                            },
                            password: {
                                get: function() {
                                    return ""
                                },
                                set: function(e) {},
                                enumerable: !0
                            },
                            username: {
                                get: function() {
                                    return ""
                                },
                                set: function(e) {},
                                enumerable: !0
                            },
                            searchParams: {
                                get: function() {
                                    var e = new URLSearchParams(this.search),
                                        t = this;
                                    return ["append", "delete", "set"].forEach(function(i) {
                                        var n = e[i];
                                        e[i] = function() {
                                            n.apply(e, arguments), t.search = e.toString()
                                        }
                                    }), e
                                },
                                enumerable: !0
                            }
                        }), i.createObjectURL = function(e) {
                            return t.createObjectURL.apply(t, arguments)
                        }, i.revokeObjectURL = function(e) {
                            return t.revokeObjectURL.apply(t, arguments)
                        }, e.URL = i
                    }(), void 0 !== e.location && !("origin" in e.location)) {
                    var t = function() {
                        return e.location.protocol + "//" + e.location.hostname + (e.location.port ? ":" + e.location.port : "")
                    };
                    try {
                        Object.defineProperty(e.location, "origin", {
                            get: t,
                            enumerable: !0
                        })
                    } catch (i) {
                        setInterval(function() {
                            e.location.origin = t()
                        }, 100)
                    }
                }
            }(void 0 !== j ? j : "undefined" != typeof window ? window : "undefined" != typeof self ? self : j);
        var Ps, Ms, Os, Es, As, Ls = function(e) {
                return null != e ? e.constructor : null
            }
         
     
    }), ! function(e, t) {
        "function" == typeof define && define.amd ? define([], function() {
            return e.svg4everybody = t()
        }) : "object" == typeof module && module.exports ? module.exports = t() : e.svg4everybody = t()
    }(this, function() {
        function e(e, t, i) {
            if (i) {
                var n = document.createDocumentFragment(),
                    r = !t.hasAttribute("viewBox") && i.getAttribute("viewBox");
                r && t.setAttribute("viewBox", r);
                for (var s = i.cloneNode(!0); s.childNodes.length;) n.appendChild(s.firstChild);
                e.appendChild(n)
            }
        }

        function t(t) {
            t.onreadystatechange = function() {
                if (4 === t.readyState) {
                    var i = t._cachedDocument;
                    i || (i = t._cachedDocument = document.implementation.createHTMLDocument(""), i.body.innerHTML = t.responseText, t._cachedTarget = {}), t._embeds.splice(0).map(function(n) {
                        var r = t._cachedTarget[n.id];
                        r || (r = t._cachedTarget[n.id] = i.getElementById(n.id)), e(n.parent, n.svg, r)
                    })
                }
            }, t.onreadystatechange()
        }

        function i(i) {
            function r() {
                for (var i = 0; i < f.length;) {
                    var a = f[i],
                        l = a.parentNode,
                        c = n(l),
                        u = a.getAttribute("xlink:href") || a.getAttribute("href");
                    if (!u && o.attributeName && (u = a.getAttribute(o.attributeName)), c && u) {
                        if (s)
                            if (!o.validate || o.validate(u, c, a)) {
                                l.removeChild(a);
                                var d = u.split("#"),
                                    g = d.shift(),
                                    v = d.join("#");
                                if (g.length) {
                                    var y = h[g];
                                    y || (y = h[g] = new XMLHttpRequest, y.open("GET", g), y.send(), y._embeds = []), y._embeds.push({
                                        parent: l,
                                        svg: c,
                                        id: v
                                    }), t(y)
                                } else e(l, c, document.getElementById(v))
                            } else ++i, ++m
                    } else ++i
                }(!f.length || f.length - m > 0) && p(r, 67)
            }
            var s, o = Object(i),
                a = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
                l = /\bAppleWebKit\/(\d+)\b/,
                c = /\bEdge\/12\.(\d+)\b/,
                u = /\bEdge\/.(\d+)\b/,
                d = window.top !== window.self;
            s = "polyfill" in o ? o.polyfill : a.test(navigator.userAgent) || (navigator.userAgent.match(c) || [])[1] < 10547 || (navigator.userAgent.match(l) || [])[1] < 537 || u.test(navigator.userAgent) && d;
            var h = {},
                p = window.requestAnimationFrame || setTimeout,
                f = document.getElementsByTagName("use"),
                m = 0;
            s && r()
        }

        function n(e) {
            for (var t = e;
                "svg" !== t.nodeName.toLowerCase() && (t = t.parentNode););
            return t
        }
        return i
    }),
    function(e) {
        function t(t, i) {
            var n = i > 9 ? "" + i : "0" + i,
                r = e(t);
            if (n = n.split(""), r.get(0)) {
                var s = '<span class="initiative-countdown__timer_unit">' + n[0] + '</span><span class="initiative-countdown__timer_unit">' + n[1] + "</span>";
                r.html(s)
            }
        }

        function i(e) {
            var t = e.split(" "),
                i = t[0].split("-"),
                n = t[1].split(":"),
                r = i[1] - 1,
                s = new Date(i[0], r, i[2], n[0], n[1], n[2]);
            return s
        }
        if (e(".initiative-countdown__timer").get(0)) {
            var n = _timestampUrl,
                r = new Date(2017, 11, 24, 10, 0, 0),
                s = null;
            e.getJSON(n, function(e) {
                s = i(e.datetime)
            });
            var o = Date.now() / 1e3;
            setInterval(function() {
                if (null !== s) {
                    var e = Math.round(Date.now() / 1e3 - o),
                        i = new Date(s.getTime() + 1e3 * e),
                        n = countdown(i, r);
                    t(".jsDays", n.days), t(".jsHours", n.hours), t(".jsMinutes", n.minutes), t(".jsSeconds", n.seconds), (i === r || i > r) && location.reload()
                }
            }, 1e3)
        }
    }(jQuery.noConflict());
var Duracell = Duracell || {};
! function(e) {
    e.min = function(e, t) {
        return e < t ? e : t
    }, e.max = function(e, t) {
        return e > t ? e : t;
    }, e.clamp = function(e, t, i) {
        return e < t ? t : e > i ? i : e
    }, e.lerp = function(e, t, i) {
        return (i - t) * e + t
    }, e.norm = function(e, t, i) {
        return (e - t) / (i - t)
    }, e.map = function(t, i, n, r, s) {
        return e.lerp(e.norm(t, i, n), r, s)
    }
}(Duracell),
function(e, t, i, n, r) {
    var s = {
            minSlideWidth: 250,
            openedWidth: 530
        },
        o = "rtl" == r("html").attr("dir"),
        a = function(e, i, n) {
            this.wrapper = e, this.element = e.find(".slide-image"), this.content = e.find(".slide-content"), this.header = e.find("h3"), this.moreLink = e.find(".button"), this.bunny = e.find(".slide-bunny"), this.opened = new t.Signal, this.closed = new t.Signal, this.index = i, this.openedWidth = n.openedWidth, this.openClick = this.openClick.bind(this), e.on("click", this.openClick)
        },
        l = a.prototype;
    Object.defineProperties(l, {
        state: {
            get: function() {
                return this.wrapper.attr("data-state")
            },
            set: function(e) {
                this.wrapper.attr("data-state", e)
            }
        }
    }), l.openClick = function(e) {
        !r(e.target).hasClass("button") && Modernizr.mq("(min-width: 768px)") && (e.preventDefault(), "opened" == this.state ? this.closed.dispatch(this.index) : this.opened.dispatch(this.index))
    }, l.open = function() {
        this.state = "opened";
        var e, t = new n;
        return t.add(i.to(this.element, .3, {
            scale: 1
        }), .3), t.add(i.to(this.wrapper, .3, {
            width: this.openedWidth
        }), .3), t.add(i.to(this.wrapper, .1, {
            overflow: "visible"
        }), .6), e = o ? {
            left: 0,
            zIndex: 1
        } : {
            right: 0,
            zIndex: 1
        }, t.add(i.to(this.bunny, .3, e), .3), e = o ? {
            left: -75
        } : {
            right: -75
        }, t.add(i.to(this.bunny, .3, e), .6), t.add(i.to(this.header, .3, {
            width: 0
        }), .3), t.add(i.to(this.header, .5, {
            width: "100%"
        }), .61), t.add(i.to(this.moreLink, .15, {
            bottom: 25,
            ease: Sine.easeOut
        }), .6), t.add(i.to(this.moreLink, .15, {
            zIndex: 1,
            bottom: 73,
            ease: Sine.easeIn
        }), .75), t.add(i.delayedCall(0, function() {
            /*this.wrapper.addClass("opened")*/
        }, null, this), .6), t.add(i.to(this.content, .3, {
            width: "100%"
        }), .75), t
    }, l.close = function(e) {
        this.state = e ? "closed" : "minimized";
        var t, r = new n;
        return r.add(i.to(this.element, .3, {
            scale: .8
        }), .3), r.add(i.to(this.wrapper, .3, {
            width: e ? this.closedWidth : this.minimizedWidth,
            overflow: "hidden"
        }), .3), r.add(i.to(this.wrapper, 0, {
            overflow: "hidden"
        }), .1), this.wrapper.hasClass("opened") && (r.add(i.to(this.moreLink, .15, {
            bottom: 25,
            zIndex: -1,
            ease: Sine.easeOut
        }), 0), r.add(i.to(this.moreLink, .15, {
            bottom: 200,
            ease: Sine.easeIn
        }), .15), r.add(i.to(this.header, .2, {
            width: 0
        }), .3), r.add(i.to(this.header, .5, {
            width: "100%"
        }), .61), t = o ? {
            left: 0,
            zIndex: 0
        } : {
            right: 0,
            zIndex: 0
        }, r.add(i.to(this.bunny, .1, t), 0), t = o ? {
            left: -450
        } : {
            right: -450
        }, r.add(i.to(this.bunny, .2, t), .1), r.add(i.to(this.content, .3, {
            width: 0
        }), .3), r.add(i.delayedCall(0, function() {
            this.wrapper.removeClass("opened closed minimized")
        }, null, this), .6)), r
    }, l.openPhone = function() {
        this.state = "opened";
        var e = new n;
        return e.add(i.to(this.wrapper, .3, {
            paddingBottom: "80%",
            ease: Sine.easeIn,
            className: "+=opened"
        }), 0), e.add(i.to(this.element, .3, {
            top: "0%",
            ease: Sine.easeOut
        }), 0), e.add(i.to(this.content, .3, {
            opacity: 1
        }), .15), e.add(i.to(this.moreLink, .3, {
            opacity: 1,
            ease: Sine.easeOut
        }), .3), e
    }, l.closePhone = function() {
        this.state = "closed";
        var e = new n;
        return e.add(i.to(this.wrapper, .3, {
            paddingBottom: "26.666667%",
            ease: Sine.easeOut,
            className: "-=opened"
        }), 0), e.add(i.to(this.element, .3, {
            top: "-120%",
            ease: Sine.easeIn
        }), 0), e.add(i.to(this.content, .2, {
            opacity: 0
        }), 0), e.add(i.to(this.moreLink, .15, {
            opacity: 0,
            ease: Sine.easeOut
        }), 0), e
    }, l.cleanup = function() {
        this.wrapper.removeAttr("style"), this.element.removeAttr("style"), this.moreLink.removeAttr("style"), this.header.removeAttr("style"), this.bunny.removeAttr("style"), this.content.removeAttr("style")
    };
    var c = function(e, t) {
            this.options = t = r.extend({}, s, t);
            for (var i = [], n = e.find("li"), o = 0, l = n.length; o < l; o++) {
                var c = n.eq(o),
                    u = new a(c, o, t),
                    d = u.opened.add(this.openSlide),
                    h = u.closed.add(this.closeSlide);
                d.context = this, h.context = this, i.push(u)
            }
            this.slides = i, this.element = e, this.wrapper = e.find("ul"), this.bunny = e.find(".carousel-bunny"), this.arrows = e.find(".arrows"), this.prevArrow = this.arrows.find(".prev"), this.nextArrow = this.arrows.find(".next"), this.currentSlide = 0, this.locked = !1, this.prev = this.prev.bind(this), this.prevArrow.on("click", this.prev), this.next = this.next.bind(this), this.nextArrow.on("click", this.next), this.gesture = this.gesture.bind(this), this.hammer = new Hammer(this.wrapper.get(0)), this.hammer.on("panstart panleft panright panend swipeleft swiperight", this.gesture), this.hammer.get("pan").set({
                direction: Hammer.DIRECTION_HORIZONTAL
            }), this.reset()
        },
        l = c.prototype;
    Object.defineProperties(l, {
        diff: {
            get: function() {
                for (var e = this.offset, t = 0; t < this.currentSlide; t++) {
                    var i = this.slides[t];
                    switch (i.state) {
                        case "minimized":
                            e -= i.minimizedWidth;
                            break;
                        case "opened":
                            e -= i.openedWidth;
                            break;
                        case "closed":
                            e -= i.closedWidth
                    }
                }
                return e
            }
        },
        isOpen: {
            get: function() {
                for (var e = !1, t = 0, i = this.numSlides; t < i; t++) e = e || "opened" == this.slides[t].state;
                return e
            }
        }
    }), l.reset = function() {
        var t = Modernizr.mq("(min-width: 768px)"),
            i = this.element.parent().width(),
            n = this.slides.length,
            r = this.options.minSlideWidth,
            s = e.min(Math.floor(i / r), n),
            a = this.slides[0].openedWidth,
            l = .8 * n * a,
            c = e.min(Math.round(i / s), .8 * a),
            u = Math.round((e.min(i, l) - a) / (s - 1)),
            d = this.sliderView != t;
        this.offset = i > l ? (i - l) / 2 : 0, this.minLeft = i - c * n, this.capacity = s, this.numSlides = n, this.sliderView = t, this.bunny.css("left", o ? this.offset + .1 * Math.min(i, l) + "px" : this.offset + .9 * Math.min(i, l) - this.bunny.width() + "px"), this.hammer.get("pan").set({
            enable: t
        }), this.hammer.get("swipe").set({
            enable: t
        }), t ? this.checkArrows() : (this.wrapper.removeAttr("style"), this.element.removeAttr("style"));
        for (var h = 0, p = this.slides.length; h < p; h++) {
            var f = this.slides[h];
            f.minimizedWidth = u, f.closedWidth = c, t && !d || (f.state = "closed", f.cleanup()), t || f.wrapper.css({
                "padding-bottom": "26.666667%",
                top: "-120%"
            })
        }
        if (t) {
            for (; this.currentSlide > n - s;) this.currentSlide--;
            this.close()
        }
    }, l.showBunny = function() {
        var e = new n,
            t = this.bunny.find(".bunny-head"),
            r = this.bunny.find(".bunny-hand-left-back"),
            s = this.bunny.find(".bunny-hand-left-front"),
            o = this.bunny.find(".bunny-hand-right-back"),
            a = this.bunny.find(".bunny-hand-right-front");
        return e.add(i.to(t, .3, {
            top: 0,
            rotate: 0
        }), 0), e.add(i.to(r, .15, {
            top: 170
        }), 0), e.add(i.to(r, .15, {
            top: 190
        }), .15), e.add(i.to(s, .15, {
            top: 170,
            zIndex: 1
        }), 0), e.add(i.to(s, .15, {
            top: 190
        }), .15), e.add(i.to(o, .15, {
            top: 170
        }), 0), e.add(i.to(o, .15, {
            top: 190
        }), .15), e.add(i.to(a, .15, {
            top: 170,
            zIndex: 1
        }), 0), e.add(i.to(a, .15, {
            top: 190
        }), .15), e
    }, l.hideBunny = function() {
        var e = new n,
            t = this.bunny.find(".bunny-head"),
            r = this.bunny.find(".bunny-hand-left-back"),
            s = this.bunny.find(".bunny-hand-left-front"),
            o = this.bunny.find(".bunny-hand-right-back"),
            a = this.bunny.find(".bunny-hand-right-front");
        return e.add(i.to(t, .3, {
            top: 230,
            rotate: -10
        }), 0), e.add(i.to(r, .15, {
            top: 180
        }), 0), e.add(i.to(r, .15, {
            top: 230
        }), .15), e.add(i.to(s, .15, {
            top: 180,
            zIndex: -1
        }), 0), e.add(i.to(s, .15, {
            top: 230
        }), .15), e.add(i.to(o, .15, {
            top: 180
        }), 0), e.add(i.to(o, .15, {
            top: 230
        }), .15), e.add(i.to(a, .15, {
            top: 180,
            zIndex: -1
        }), 0), e.add(i.to(a, .15, {
            top: 230
        }), .15), e
    }, l.checkArrows = function() {
        var e;
        this.capacity < this.slides.length ? (this.arrows.show(), this.currentSlide <= 0 ? (e = o ? {
            right: -50
        } : {
            left: -50
        }, i.to(this.prevArrow, .3, e)) : (e = o ? {
            right: 0
        } : {
            left: 0
        }, i.to(this.prevArrow, .3, e)), this.currentSlide >= this.numSlides - this.capacity ? (e = o ? {
            left: -50
        } : {
            right: -50
        }, i.to(this.nextArrow, .3, e)) : (e = o ? {
            left: 0
        } : {
            right: 0
        }, i.to(this.nextArrow, .3, e))) : this.arrows.hide()
    }, l.prev = function(e) {
        e && e.preventDefault(), !this.locked && this.currentSlide > 0 && this.currentSlide <= this.numSlides - this.capacity && (this.currentSlide--, this.close())
    }, l.next = function(e) {
        e && e.preventDefault(), !this.locked && this.currentSlide >= 0 && this.currentSlide < this.numSlides - this.capacity && (this.currentSlide++, this.close())
    }, l.gesture = function(t) {
        if (!Modernizr.desktop && !this.locked) switch (t.type) {
            case "panstart":
                this.isOpen && this.close(), this.startDragX = parseInt(this.wrapper.get(0)._gsTransform.x);
                break;
            case "panleft":
            case "panright":
                var n = this.startDragX + t.deltaX;
                (o && n < 0 || !o && n > 0) && (n /= 16), o && n > -this.minLeft ? n = -this.minLeft - (-this.minLeft - n) / 16 : !o && n < this.minLeft && (n = this.minLeft - (this.minLeft - n) / 16);
                var r = this.numSlides - this.capacity;
                this.currentSlide = e.clamp(Math.abs(Math.round(e.map(n, this.minLeft, 0, r, 0))), 0, r), i.set(this.wrapper, {
                    x: n - this.offset
                });
                break;
            case "panend":
                this.close();
                break;
            case "swipeleft":
                o ? this.prev() : this.next();
                break;
            case "swiperight":
                o ? this.next() : this.prev()
        }
    }, l.openSlide = function(e) {
        if (!this.locked) {
            this.locked = !0;
            for (var t = new n({
                    onComplete: this.unlock,
                    onCompleteScope: this
                }), r = !1, s = 0, a = this.numSlides; s < a; s++) {
                var l = this.slides[s];
                r = r || "opened" == l.state, s == e ? t.add(this.sliderView ? l.open() : l.openPhone(), 0) : t.add(this.sliderView ? l.close() : l.closePhone(), 0)
            }
            this.sliderView && (r || t.add(this.hideBunny(), 0), t.add(i.to(this.wrapper, .3, {
                x: o ? -this.diff : this.diff
            }), .3))
        }
    }, l.closeSlide = function(e) {
        if (!this.locked) {
            this.locked = !0;
            var t = new n({
                    onComplete: this.unlock,
                    onCompleteScope: this
                }),
                i = this.slides[e];
            this.sliderView || "opened" != i.state || t.add(i.closePhone())
        }
    }, l.close = function() {
        if (!this.locked && this.sliderView) {
            this.locked = !0, this.checkArrows();
            for (var e = new n({
                    onComplete: this.unlock,
                    onCompleteScope: this
                }), t = this.isOpen, r = 0, s = this.numSlides; r < s; r++) e.add(this.slides[r].close(!0), 0);
            e.add(i.to(this.wrapper, .3, {
                x: o ? -this.diff : this.diff
            }), t ? .3 : 0), t && e.add(this.showBunny(), .45)
        }
    }, l.unlock = function() {
        this.locked = !1
    }, e.FancyCarousel = c
}(Duracell, signals, TweenMax, TimelineMax, jQuery.noConflict()),
function(e, t) {
    e(function() {
        e(".js-in-action-slider").each(function() {
            var i, n = new t.FancyCarousel(e(".fancy-carousel"));
            Modernizr.desktop && (n.hideBunny(), e(".carousel-bunny").css("opacity", 1), new ScrollMagic.Scene({
                triggerElement: ".fancy-carousel ul"
            }).addTo(new ScrollMagic.Controller).on("enter", function() {
                n.showBunny()
            })), e(window).on("resize orientationchange", function() {
                clearTimeout(i), i = setTimeout(function() {
                    n.reset()
                }, 500)
            }), e(document).on("click", function(t) {
                var i = e(t.target);
                i.parents(".fancy-carousel li").length || n.close()
            })
        })
    })
}(jQuery.noConflict(), Duracell),
function() {
    var e;
    e = window.jQuery || window.Zepto || window.$, e.fn.fancySelect = function(t) {
        var i, n;
        return null == t && (t = {}), n = e.extend({
            forceiOS: !1,
            includeBlank: !1,
            optionTemplate: function(e) {
                return e.text()
            },
            triggerTemplate: function(e) {
                return e.text()
            }
        }, t), i = "mobile" === Detectizr.device.type || "tablet" === Detectizr.device.type, this.each(function() {
            var t, r, s, o, a, l, c;
            if (o = e(this), !o.hasClass("fancified") && "SELECT" === o[0].tagName) return o.addClass("fancified"), o.wrap('<div class="fancy-select">'), c = o.parent(), o.data("class") && c.addClass(o.data("class")), c.append('<div class="trigger">'), i && !n.forceiOS || c.append('<ul class="options">'), a = c.find(".trigger"), s = c.find(".options"), r = o.prop("disabled"), r && c.addClass("disabled"), l = function() {
                var e;
                return e = n.triggerTemplate(o.find(":selected")), a.html(e)
            }, o.on("blur.fs", function() {
                if (a.hasClass("open")) return setTimeout(function() {
                    return a.trigger("close.fs")
                }, 120)
            }), a.on("close.fs", function() {
                return a.removeClass("open"), s.removeClass("open")
            }), a.on("click.fs", function() {
                var t, l;
                if (!r)
                    if (a.toggleClass("open"), i && !n.forceiOS) {
                        if (a.hasClass("open")) return o.focus()
                    } else if (a.hasClass("open") && (l = a.parent(), t = l.offsetParent(), l.offset().top + l.outerHeight() + s.outerHeight() + 20 > e(window).height() + e(window).scrollTop() ? s.addClass("overflowing") : s.removeClass("overflowing")), s.toggleClass("open"), !i) return o.focus()
            }), o.on("enable", function() {
                return o.prop("disabled", !1), c.removeClass("disabled"), r = !1, t()
            }), o.on("disable", function() {
                return o.prop("disabled", !0), c.addClass("disabled"), r = !0
            }), o.on("change.fs", function(e) {
                return a.addClass("selected"), l()
            }), o.on("keydown", function(e) {
                var t, i, n;
                if (n = e.which, t = s.find(".hover"), t.removeClass("hover"), s.hasClass("open")) {
                    if (38 === n ? (e.preventDefault(), t.length && t.index() > 0 ? t.prev().addClass("hover") : s.find("li:last-child").addClass("hover")) : 40 === n ? (e.preventDefault(), t.length && t.index() < s.find("li").length - 1 ? t.next().addClass("hover") : s.find("li:first-child").addClass("hover")) : 27 === n ? (e.preventDefault(), a.trigger("click.fs")) : 13 === n || 32 === n ? (e.preventDefault(), t.trigger("mousedown.fs")) : 9 === n && a.hasClass("open") && a.trigger("close.fs"), i = s.find(".hover"), i.length) return s.scrollTop(0), s.scrollTop(i.position().top - 12)
                } else if (13 === n || 32 === n || 38 === n || 40 === n) return e.preventDefault(), a.trigger("click.fs")
            }), s.on("mousedown.fs", "li", function(t) {
                var n;
                return n = e(this), o.val(n.data("raw-value")), i || o.trigger("blur.fs").trigger("focus.fs"), s.find(".selected").removeClass("selected"), n.addClass("selected"), a.addClass("selected"), o.val(n.data("raw-value")).trigger("change.fs").trigger("blur.fs").trigger("focus.fs")
            }), s.on("mouseenter.fs", "li", function() {
                var t, i;
                return i = e(this), t = s.find(".hover"), t.removeClass("hover"), i.addClass("hover")
            }), s.on("mouseleave.fs", "li", function() {
                return s.find(".hover").removeClass("hover")
            }), t = function() {
                var t;
                if (l(), !i || n.forceiOS) return t = o.find("option"), o.find("option").each(function(t, i) {
                    var r;
                    if (i = e(i), !i.prop("disabled") && (i.val() || n.includeBlank)) {
                        if (r = n.optionTemplate(i), o.hasClass("optional-text")) {
                            var a = r.split(" - ");
                            a[1] && (r = a[0] + "<span>" + a[1] + "</span>")
                        }
                        return i.prop("selected") ? s.append('<li data-raw-value="' + i.val() + '" class="selected">' + r + "</li>") : s.append('<li data-raw-value="' + i.val() + '">' + r + "</li>")
                    }
                })
            }, o.on("update.fs", function() {
                return c.find(".options").empty(), t()
            }), t()
        })
    }
}.call(this),
    function(e) {
        e.fn.CircularCarousel = function(t) {
            function i(e, t, i) {
                var n = 0,
                    r = 0,
                    o = -i * (Math.PI / 180),
                    d = Math.sin(o),
                    h = Math.cos(o),
                    p = u,
                    w = u + 1;
                for (g = [], f.eq(u).addClass("active"); r < m;) {
                    n += 360 / m;
                    var _ = n * (Math.PI / 180),
                        b = Math.sin(_),
                        T = Math.cos(_),
                        x = e + (c * T * h - l * b * d),
                        k = t + (c * T * d + l * b * h);
                    x = Math.floor(x), k = Math.floor(k), p++, p < 0 ? p = m - 1 : p === m && (p = 0), w++, w < 0 ? w = m - 1 : w >= m && (w = 0), f.eq(p).css("margin-top", x + "px"), f.eq(p).css("margin-left", k + "px");
                    var S = {
                        top: f.eq(w).offset().top,
                        index: w
                    };
                    g.push(S), r++
                }
                var C = f.eq(u),
                    z = f.eq(y);
                a.trigger("itemBeforeActive", C), a.trigger("itemBeforeDeactivate", z);
                setTimeout(function() {
                    a.trigger("itemActive", C), a.trigger("itemAfterDeactivate", z)
                }, v);
                s(u)
            }

            function n(e, t, n) {
                var s = 0;
                if (1 === t)
                    for (; s < e;) {
                        setTimeout(function() {
                            var e = f.eq(u);
                            e.removeClass("active"), y = u, u++, r(), i(d, h, p, null)
                        }, s * n);
                        s++
                    } else {
                        s = e;
                        for (var o = 0; s > 0;) {
                            setTimeout(function() {
                                var e = f.eq(u);
                                e.removeClass("active"), y = u, u--, r(), i(d, h, p, null)
                            }, o * n);
                            o++, s--
                        }
                    }
            }

            function r() {
                u < 0 ? u = m - 1 : u >= m && (u = 0)
            }

            function s(e) {
                for (var t = g.sort(function(e, t) {
                        return e.top - t.top
                    }), i = 0; i < t.length;) t[i].index === e && (f.eq(t[i].index - 1).css({
                    "z-index": t.length - 1
                }), f.eq(t[i].index).css({
                    "z-index": t.length - 1
                })), f.eq(t[i].index).css("z-index", i), i++;
                var n = u + 1;
                n < 0 ? n = m - 1 : n >= m && (n = 0), f.eq(n).css("z-index", m), f.eq(u).css("z-index", m + 1)
            }

            function o(e, t, i) {
                for (var n = 0, r = 0, s = t; s !== i;) r++, s = s === e.length - 1 ? 0 : s + 1;
                for (s = t; s !== i;) n++, s = 0 === s ? e.length - 1 : s - 1;
                return n > r ? {
                    direction: 1,
                    steps: r
                } : {
                    direction: 0,
                    steps: n
                }
            }
            var a = e(this),
                l = t.ovalWidth,
                c = t.ovalHeight,
                u = t.activeItem,
                d = t.offsetX,
                h = t.offsetY,
                p = t.angle,
                f = a.find("." + t.className),
                m = f.length,
                g = [],
                v = t.duration,
                y = u;
            i(d, h, p);
            var w = (setTimeout(function() {
                f.addClass("transition");
                var e = t.duration / 1e3 + "s";
                f.css("transition-duration", e)
            }, 10), {
                cycleActive: function(e) {
                    var t = f.eq(u);
                    t.removeClass("active"), y = u, u = "previous" === e ? u - 1 : u + 1, r(), i(d, h, p, null)
                },
                cycleActiveTo: function(e) {
                    var t = f.eq(u);
                    t.removeClass("active");
                    var s = Math.abs(e - u);
                    if (s >= 2) {
                        var a = o(f, u, e);
                        n(a.steps, a.direction, v - 100)
                    } else y = u, u = e, r(), i(d, h, p, null)
                },
                on: function(e, t) {
                    a.on(e, t)
                }
            });
            return w
        }
    }(jQuery);
var Duracell = Duracell || {};
! function(e, t) {
    e(function() {
        "use strict";

        function i() {
            C = new Swiper(".jsDeviceSelectorSlider", z), setTimeout(function() {
                C.update(!0)
            }, 2e3)
        }

        function n() {
            null !== C ? setTimeout(function() {
                C.attachEvents(), C.update(!0), C.onResize(), C.slideTo(0)
            }, 2e3) : i()
        }

        function r() {
            null !== C && (C.update(!0), C.onResize(), C.detachEvents(), e(".jsDeviceSelectorSlider .swiper-wrapper").removeAttr("style"))
        }

        function s() {
            var t = e(".logo-slider");
            if (0 !== t.length) {
                t.data("swiper") && (t.data("swiper").destroy(!0, !0), t.data("swiper", null)), t.addClass("slider-off");
                var i = t.find(".swiper-slide").length;
                i > 3 && Modernizr.mq("screen and (max-width: 767px)") && a(t, {
                    slidesPerView: 3
                }), i > 4 && Modernizr.mq("screen and (min-width: 768px) and (max-width: 1199px)") && a(t, {
                    slidesPerView: 4
                }), i > 5 && Modernizr.mq("screen and (min-width: 1200px)") && a(t, {
                    slidesPerView: 5
                })
            }
        }

        function o() {
            var t = e(".video-slider");
            if (0 !== t.length) {
                t.data("swiper") && (t.data("swiper").destroy(!0, !0), t.data("swiper", null)), t.addClass("slider-off");
                var i = t.find(".swiper-slide"),
                    n = i.length;
                t.on("click", "a[data-video]", function(t) {
                    t.preventDefault();
                    var i, n = e(this).attr("data-video-type");
                    "youtube" === n && (i = e('<iframe frameborder="0" allowfullscreen></iframe>').attr("src", "https://www.youtube.com/embed/" + e(this).attr("data-video"))), "youku" === n && (i = e('<iframe frameborder="0" allowfullscreen></iframe>').attr("src", "//player.youku.com/embed/" + e(this).attr("data-video") + "==")), e(".video-container").find(".embed-responsive").empty().append(i)
                }), n > 1 && Modernizr.mq("screen and (max-width: 767px)") && a(t, {
                    slidesPerView: 1
                }), n > 2 && Modernizr.mq("screen and (min-width: 768px) and (max-width: 1199px)") && a(t, {
                    slidesPerView: 2,
                    spaceBetween: 20
                }), n > 3 && Modernizr.mq("screen and (min-width: 1200px)") && a(t, {
                    slidesPerView: 3,
                    spaceBetween: 20
                }), n < 3 && Modernizr.mq("screen and (min-width: 1200px)") && t.find(".swiper-wrapper").css("justify-content", "center")
            }
        }

        function a(t, i) {
            t.removeClass("slider-off"), i = e.extend({
                loop: !0,
                simulateTouch: !1,
                centeredSlides: !1
            }, i);
            var n = new Swiper(t.find(".swiper-container").get(0), i);
            t.find(".icon-prev").off("click").on("click", function(e) {
                e.preventDefault(), n.slidePrev()
            }), t.find(".icon-next").off("click").on("click", function(e) {
                e.preventDefault(), n.slideNext()
            }), t.data("swiper", n)
        }

        function l() {
            Modernizr.mobile || Modernizr.mq("screen and (max-width: 767px)") ? e(".product-listing .col-phone-12, .review, .press-item, .facts-content .facts, .desktop .facts-content .fact, .tablet .facts-content .fact").matchHeight({
                remove: !0
            }) : e(".product-listing .col-phone-12, .review, .press-item, .facts-content .facts, .desktop .facts-content .fact, .tablet .facts-content .fact").matchHeight()
        }

        function c(t, i, n, r) {
            function s(t) {
                t.preventDefault();
                var i = e(".jsBinContainer");
                e(i).get(0) && (e(c).insertBefore(".jsBinPlaceholder"), e(".jsBinPlaceholder").remove()), f.fadeOut(250, function() {
                    f.remove(), l.each(function() {
                        e(this)[0].play()
                    })
                })
            }
            null !== t && t.preventDefault();
            var o = i || e(this).attr("data-video-source"),
                a = n || e(this).attr("data-video-type"),
                r = r || e(this).attr("data-autoplay"),
                l = e("video"),
                c = e(this).parents(".slide-content").find(".jsBinWrapper");
            if (r) var u = "&autoplay=1";
            if (l.each(function() {
                    e(this)[0].pause()
                }), Object.keys(window[o]).length > 1) {
                for (var d = "", h = 0; h < Object.keys(window[o]).length; h++) {
                    var p = 0 === h ? "active" : "";
                    d += '<a href="#" data-video-type="' + a + '" data-video-id="' + window[o][h][1] + '" class="' + p + '">' + window[o][h][0] + "</a>"
                }
                "youtube" === a && e("body").append('<div class="popup-overlay popup-video"><div class="container"><div class="row"><div class="col-phone-12"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//www.youtube.com/embed/' + window[o][0][1] + "?rel=0" + u + '" allowfullscreen></iframe></div></div><div class="col-phone-12 video-list">' + d + '</div></div></div><a href="#" class="close"><span class="sr-only">Close</span></a></div>'), "youku" === a && e("body").append('<div class="popup-overlay popup-video"><div class="container"><div class="row"><div class="col-phone-12"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.youku.com/embed/' + window[o][0][1] + '==" frameborder="0" allowfullscreen></iframe></div></div><div class="col-phone-12 video-list">' + d + '</div></div></div><a href="#" class="close"><span class="sr-only">Close</span></a></div>'), e(".video-list a").on("click", function(t) {
                    t.preventDefault(), t.stopPropagation(), e(this).siblings().removeClass("active"), e(this).addClass("active"), "youtube" === e(this).attr("data-video-type") && e(".popup-video").find("iframe").attr("src", "//www.youtube.com/embed/" + e(this).attr("data-video-id")).load(), "youku" === e(this).attr("data-video-type") && e(".popup-video").find("iframe").attr("src", "//player.youku.com/embed/" + e(this).attr("data-video-id") + "==").load()
                })
            } else "youtube" === a && e("body").append('<div class="popup-overlay popup-video"><div class="container"><div class="button-container jsBinContainer"></div><div class="row"><div class="col-phone-12"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//www.youtube.com/embed/' + window[o][0][1] + "?rel=0" + u + '" allowfullscreen></iframe></div></div></div></div><a href="#" class="close"><span class="sr-only">Close</span></a></div>'), "youku" === a && e("body").append('<div class="popup-overlay popup-video"><div class="container"><div class="button-container jsBinContainer"></div><div class="row"><div class="col-phone-12"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.youku.com/embed/' + window[o][0][1] + '==" frameborder="0" allowfullscreen></iframe></div></div></div></div><a href="#" class="close"><span class="sr-only">Close</span></a></div>');
            var f = e(".popup-video");
            f.fadeIn(250), e(c).get(0) && (e('<div class="jsBinPlaceholder"></div>').insertAfter(e(c)), e(c).appendTo(e(".popup-video .container"))), f.on("click", s), f.find("a.close").on("click", s)
        }

        function u(t) {
            function i(e) {
                e.preventDefault(), r.fadeOut(250, function() {
                    r.remove()
                })
            }
            t.preventDefault();
            var n = e(this).attr("data-twitch-source");
            e("body").append('<div class="popup-overlay popup-video"><div class="container"><div class="row"><div class="col-phone-12"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://player.twitch.tv/?video=' + n + '&autoplay=false" allowfullscreen></iframe></div></div></div></div><a href="#" class="close"><span class="sr-only">Close</span></a></div>');
            var r = e(".popup-video");
            r.fadeIn(250), r.on("click", i), r.find("> a").on("click", i)
        }

        function d(t) {
            function i(t) {
                t.preventDefault(), s.fadeOut(250, function() {
                    s.remove(), r.each(function() {
                        e(this)[0].play()
                    })
                })
            }
            t.preventDefault();
            var n = e(this).attr("data-youku-source"),
                r = e("video");
            r.each(function() {
                e(this)[0].pause()
            }), e("body").append('<div class="popup-overlay popup-video"><div class="container"><div class="row"><div class="col-phone-12"><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="//player.youku.com/embed/' + n + '==" frameborder="0" allowfullscreen></iframe></div></div></div></div><a href="#" class="close"><span class="sr-only">Close</span></a></div>');
            var s = e(".popup-video");
            s.fadeIn(250), s.on("click", i), s.find("a.close").on("click", i)
        }

        function h(t) {
            if (0 !== Y.length) {
                var i = '<div class="zoomGallery"><div class="container"><div class="row"><div class="col-phone-12"><a class="close" href="#"></a><div class="zoomGalleryThumbs"></div><div class="zoomGalleryImage"><img src="' + t.currentTarget.dataset.zoomImage + '" alt="' + t.currentTarget.alt + '"></div></div></div></div></div>';
                e(".single-product-head").append(i);
                var n = e(".zoomGallery"),
                    r = n.find(".zoomGalleryThumbs"),
                    s = n.find(".zoomGalleryImage");
                e([r.get(0), s.get(0)]).css("height", n.height() - 40), Y.filter(".current-packshot").clone().appendTo(r), V.filter("[data-extra-item]").clone().appendTo(r), r.find("img").wrap("<div></div>");
                var o = r.find("div");
                o.find('[data-gallery-item="' + Y.filter(":visible").attr("data-gallery-item") + '"]').parent().addClass("current"), r.find("img").show().on("click", function(t) {
                    s.find("img").fadeOut(125, function() {
                        e(this).attr("src", t.currentTarget.dataset.zoomImage).fadeIn(125)
                    }), o.removeClass("current"), e(this).parent().addClass("current")
                }), n.fadeIn(250).find("a.close").on("click", function(e) {
                    e.preventDefault(), n.fadeOut(250, function() {
                        n.remove()
                    })
                })
            }
        }

        function p() {
            e(".single-product-head .gallery-thumbs div").removeClass("active"), Y.filter(":visible")[0].hasAttribute("data-packshot") ? V.filter('[data-packshot="' + Y.filter(":visible").attr("data-packshot") + '"]').parent().addClass("active") : V.filter('[data-extra-item="' + Y.filter(":visible").attr("data-extra-item") + '"]').parent().addClass("active")
        }

        function f() {
            "desktop" === Detectizr.device.type && (e(".zoomContainer").remove(), e.each(Y, function() {
                e(this).removeData("elevateZoom")
            }), Y.filter(":visible").elevateZoom(U))
        }

        function m(t) {
            var i = new TimelineLite,
                n = e(t).find(".bunny-head"),
                r = e(t).find(".bunny-hand-left-back"),
                s = e(t).find(".bunny-hand-left-front"),
                o = e(t).find(".bunny-hand-right-back"),
                a = e(t).find(".bunny-hand-right-front");
            return i.add(TweenLite.to(n, .3, {
                top: 0,
                rotate: 0
            }), 0), i.add(TweenLite.to(r, .15, {
                top: 170
            }), 0), i.add(TweenLite.to(r, .15, {
                top: 190
            }), .15), i.add(TweenLite.to(s, .15, {
                top: 170,
                zIndex: 1
            }), 0), i.add(TweenLite.to(s, .15, {
                top: 190
            }), .15), i.add(TweenLite.to(o, .15, {
                top: 170
            }), 0), i.add(TweenLite.to(o, .15, {
                top: 190
            }), .15), i.add(TweenLite.to(a, .15, {
                top: 170,
                zIndex: 1
            }), 0), i.add(TweenLite.to(a, .15, {
                top: 190
            }), .15), i
        }

        function g(t) {
            var i = new TimelineLite,
                n = e(t).find(".bunny-head"),
                r = e(t).find(".bunny-hand-left-back"),
                s = e(t).find(".bunny-hand-left-front"),
                o = e(t).find(".bunny-hand-right-back"),
                a = e(t).find(".bunny-hand-right-front");
            return i.add(TweenLite.to(n, .3, {
                top: 230,
                rotate: -10
            }), 0), i.add(TweenLite.to(r, .15, {
                top: 180
            }), 0), i.add(TweenLite.to(r, .15, {
                top: 230
            }), .15), i.add(TweenLite.to(s, .15, {
                top: 180,
                zIndex: -1
            }), 0), i.add(TweenLite.to(s, .15, {
                top: 230
            }), .15), i.add(TweenLite.to(o, .15, {
                top: 180
            }), 0), i.add(TweenLite.to(o, .15, {
                top: 230
            }), .15), i.add(TweenLite.to(a, .15, {
                top: 180,
                zIndex: -1
            }), 0), i.add(TweenLite.to(a, .15, {
                top: 230
            }), .15), i
        }

        function v() {
            Detectizr.detect();
            var t = {
                desktop: {
                    pageVisit: function() {
                        Tracking_Call_Duracell(1, "", "")
                    },
                    clickEvents: {
                        "11st": function() {
                            Tracking_Call_Duracell(2, "", "")
                        },
                        auction: function() {
                            Tracking_Call_Duracell(3, "", "")
                        },
                        gmarket: function() {
                            Tracking_Call_Duracell(4, "", "")
                        }
                    }
                },
                tablet: {
                    pageVisit: function() {
                        Tracking_Call_Duracell(9, "", "")
                    },
                    clickEvents: {
                        "11st": function() {
                            Tracking_Call_Duracell(10, "", "")
                        },
                        auction: function() {
                            Tracking_Call_Duracell(11, "", "")
                        },
                        gmarket: function() {
                            Tracking_Call_Duracell(12, "", "")
                        }
                    }
                },
                mobile: {
                    pageVisit: function() {
                        Tracking_Call_Duracell(5, "", "")
                    },
                    clickEvents: {
                        "11st": function() {
                            Tracking_Call_Duracell(6, "", "")
                        },
                        auction: function() {
                            Tracking_Call_Duracell(7, "", "")
                        },
                        gmarket: function() {
                            Tracking_Call_Duracell(8, "", "")
                        }
                    }
                }
            };
            t[Detectizr.device.type].pageVisit(), e("a[data-tracking-name]").on("click", function(i) {
                var n = e(this).data("tracking-name");
                t[Detectizr.device.type].clickEvents[n]()
            })
        }

        function y() {
            e(document).on("contextmenu", function(e) {
                return !1
            })
        }

        function w() {
            e(".comparison-table .headers > div").each(function(t, i) {
                var n = e(i).height(),
                    r = e(this).parents(".table-wrapper").find(".swiper-slide"),
                    s = e(r).find("div:nth-child(" + (t + 1) + ")");
                e(s).hasClass("top") || e(s).height() !== n && e(s).css("min-height", n)
            })
        }


        var T = e(window),
            x = Modernizr.csstransforms && Modernizr.csstransitions,
            k = function() {
                function t() {
                    A.searchOpened === !0 && a(), A.cselectOpened === !0 && c(), f.show(0, function() {
                        /e(this).addClass("opened"), m.addClass("active")*/
                    }), A.mobileOpened = !0, e(".site-wrapper, body, html").addClass("no-scroll")
                }

                function i() {
                    r([w[0], k[0]]), x.length > 0 && r([b[0]]), A.cselectOpened === !0 && c(), f.removeClass("opened"), f.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                        f.hide(), m.removeClass("active"), g.removeAttr("checked")
                    }), A.mobileOpened = !1, e(".site-wrapper, body, html").removeClass("no-scroll")
                }

                function n(e, t, i) {
                    A.searchOpened === !0 && a(), A.cselectOpened === !0 && c(), f.addClass("mm-opened"), e.fadeIn(i, function() {
                        void 0 != C && (C.onResize(), C.update(!0))
                    }), t.parent().addClass("current-menu-item")
                }

                function r(t, i) {
                    _.get(0) && e(_[0]).parent().removeClass("current-menu-item"), S.get(0) && e(S[0]).parent().removeClass("current-menu-item"), Array.isArray(t) && (t = t.filter(function(e) {
                        return void 0 !== e
                    })), x.length > 0 && e([x[0]]).parent().removeClass("current-menu-item"), e(t).filter(":visible").fadeOut(i, function() {
                        A.inActionOpened = !1, A.productsOpened = !1, f.removeClass("mm-opened")
                    })
                }

                function s() {
                    r([w[0], k[0]], 0), x.length > 0 && r([b[0]], 0), Modernizr.mq("screen and (min-width: 1200px)") ? (e(".inaction-menu, .initiative-menu .products-menu").css("height", T.innerHeight() - 90), P.height(T.innerHeight() - 90)) : e(".inaction-menu, .products-menu, .initiative-menu").css("height", "auto")
                }

                function o() {
                    A.inActionOpened !== !0 && A.productsOpened !== !0 || (r([w[0], k[0]], E), x.length > 0 && r([b[0]], E)), A.mobileOpened === !0 && i(0), A.cselectOpened === !0 && c(), y.addClass("active"), v.addClass("search-opened"), f.addClass("search-opened"), A.searchOpened = !0
                }

                function a() {
                    y.removeClass("active"), v.removeClass("search-opened"), f.removeClass("search-opened"), A.searchOpened = !1
                }

                function l() {
                    A.inActionOpened !== !0 && A.productsOpened !== !0 && A.initiativeOpened !== !0 || (r([w[0], k[0]], E), x.length > 0 && r([b[0]], E)), A.searchOpened === !0 && a(), A.mobileOpened === !0 && i(), f.hasClass("folded") && f.removeClass("folded"), M.addClass("active"), P.fadeIn(250, function() {
                        A.cselectOpened = !0
                    })
                }

                function c() {
                    M.removeClass("active"), P.fadeOut(250, function() {
                        A.cselectOpened = !1
                    })
                }

                function u() {
                    var e = P.find("ul"),
                        t = e.find("li"),
                        i = t.first().outerHeight(!0) + 20;
                    "mobile" === Detectizr.device.type && e.height(i * Math.ceil(t.length / 2)), "tablet" === Detectizr.device.type && e.height(i * Math.ceil(t.length / 3)), "desktop" === Detectizr.device.type && e.height(i * Math.ceil(t.length / 4))
                }

                function d() {
                    var t = e([w[0], k[0], b[0], P[0]]);
                    t.get(0) && (Modernizr.mq("screen and (min-width: 1200px)") && (t.each(function(t, i) {
                        void 0 !== i && e(i).height(T.innerHeight() - 90)
                    }), f.removeAttr("style"), m.removeClass("active")), Modernizr.mq("screen and (max-width: 1199px)") && t.css("height", "auto"))
                }

                function h() {
                    s(), u()
                }
                var p = e(".navigation-top-bar"),
                    v = e(".navigation-search"),
                    y = e(".search-toggle"),
                    w = e(".inaction-menu"),
                    _ = e(".inaction-toggle > a"),
                    b = e(".initiative-menu"),
                    x = e(".initiative-toggle > a"),
                    k = e(".products-menu"),
                    S = e(".products-toggle > a"),
                    z = e(".products-menu h3"),
                    P = e(".navigation-country-selector"),
                    M = e(".country-toggle > a"),
                    O = e(".navigation-country-selector .col-phone-12 > a"),
                    E = 250,
                    A = {
                        mobileOpened: !1,
                        searchOpened: !1,
                        productsOpened: !1,
                        inActionOpened: !1,
                        initiativeOpened: !1,
                        cselectOpened: !1
                    };
                e([p[0], f[0], v[0]]).hover(function() {
                    A.searchOpened === !1 && A.productsOpened === !1 && A.inActionOpened === !1 && A.cselectOpened === !1 && A.initiativeOpened === !1 && f.hasClass("folded") && f.removeClass("folded")
                }, function() {
                    A.searchOpened === !1 && A.productsOpened === !1 && A.inActionOpened === !1 && A.cselectOpened === !1 && A.initiativeOpened === !1 && T.scrollTop() > 90 && f.addClass("folded")
                }), m.on("click", function() {
                    e(this).hasClass("active") ? i() : t()
                }), z.on("click", function() {
                    e(this).hasClass("active") ? e(this).removeClass("active") : (z.removeClass("active"), e(this).addClass("active"))
                }), y.on("click", function(t) {
                    t.preventDefault(), e(this).hasClass("active") ? a() : o()
                }), M.on("click", function(t) {
                    t.preventDefault(), e(this).hasClass("active") ? c() : l()
                }), O.on("click", function(e) {
                    e.preventDefault(), M.removeClass("active"), c()
                }), _.on("click", function(t) {
                    return t.preventDefault(), A.searchOpened === !0 && a(), A.inActionOpened === !1 && A.productsOpened === !1 && A.initiativeOpened === !1 ? (n(w, e(this), E), void(A.inActionOpened = !0)) : A.inActionOpened !== !1 || A.productsOpened !== !0 && A.initiativeOpened !== !0 ? void(A.inActionOpened === !0 && (r(w, E), A.inActionOpened = !1, A.productsOpened = !1, A.initiativeOpened = !1)) : (r(k, 0), x.length > 0 && r(b, 0), A.productsOpened = !1, A.initiativeOpened = !1, n(w, e(this), 0), void(A.inActionOpened = !0))
                }), x.on("click", function(t) {
                    return t.preventDefault(), A.searchOpened === !0 && a(), A.initiativeOpened === !1 && A.productsOpened === !1 && A.inActionOpened === !1 ? (n(b, e(this), E), void(A.initiativeOpened = !0)) : A.initiativeOpened !== !1 || A.productsOpened !== !0 && A.inActionOpened !== !0 ? void(A.initiativeOpened === !0 && (r(b, E), A.inActionOpened = !1, A.productsOpened = !1, A.initiativeOpened = !1)) : (r(k, 0), r(w, 0), A.productsOpened = !1, A.inActionOpened = !1, n(b, e(this), 0), void(A.initiativeOpened = !0))
                }), S.on("click", function(t) {
                    return t.preventDefault(), A.searchOpened === !0 && a(), A.inActionOpened === !1 && A.productsOpened === !1 && A.initiativeOpened === !1 ? (n(k, e(this), E), void(A.productsOpened = !0)) : A.inActionOpened !== !0 || A.productsOpened !== !1 && A.initiativeOpened !== !1 ? void(A.productsOpened === !0 && (r(k, E), A.inActionOpened = !1, A.productsOpened = !1, A.initiativeOpened = !1)) : (r(w, 0), r(b, 0), A.inActionOpened = !1, A.initiativeOpened = !1, n(k, e(this), 0), void(A.productsOpened = !0))
                });
                var L = e(window).scrollTop();
                return T.on("wheel scroll mousewheel DOMMouseScroll", function(t) {
                    if (Modernizr.mq("screen and (min-width: 1200px)")) {
                        var i = (normalizeWheel(t.originalEvent), e(window).scrollTop());
                        A.searchOpened === !1 && A.productsOpened === !1 && A.inActionOpened === !1 && A.cselectOpened === !1 && (i > L ? i > 90 && f.addClass("folded") : f.removeClass("folded"), L = i)
                    }
                }), {
                    init: h,
                    resize: d
                }
            },
            S = {
                pagination: ".swiper-pagination",
                paginationClickable: !0,
                simulateTouch: !1,
                loop: !0,
                speed: 300,
                autoplay: !1
            };
        new Swiper(".header-slider .swiper-container", e.extend(S, t.homeSliderOptions));
        var C = null,
            z = {
                prevButton: ".jsDeviceSelectorSliderPrev",
                nextButton: ".jsDeviceSelectorSliderNext",
                slidesPerView: "auto",
                simulateTouch: !1
            },
            P = e(".js-video-in-slider");
        "desktop" !== Detectizr.device.type ? e(P).each(function(t, i) {
            e(i).removeAttr("autoplay playsinline loop preload").attr("poster", e(i).attr("data-image"))
        }) : e(P).each(function(t, i) {
            e(i).attr("src", e(i).attr("data-src"))
        }), window.innerWidth > 768 && i(), e(window).on("resize", function() {
            window.innerWidth > 768 ? n() : r()
        }), a(e(".product-slider"), {
            loop: !1,
            slidesPerView: 3,
            breakpoints: {
                1200: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 1
                }
            },
            onReachBeginning: function() {
                "mobile" === Detectizr.device.type && e(".product-slider").find(".icon-prev").fadeOut(100)
            },
            onReachEnd: function() {
                "mobile" === Detectizr.device.type && e(".product-slider").find(".icon-next").fadeOut(100)
            },
            onSlideChangeEnd: function(t) {
                "mobile" === Detectizr.device.type && t.isBeginning === !1 && t.isEnd === !1 && e(".product-slider").find(".icon-prev, .icon-next").fadeIn()
            }
        }), a(e(".thumbs-slider"), {
            loop: !1,
            slidesPerView: 3,
            breakpoints: {
                1200: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 1
                }
            },
            onReachBeginning: function() {
                "mobile" === Detectizr.device.type && e(".thumbs-slider").find(".icon-prev").fadeOut(100)
            },
            onReachEnd: function() {
                "mobile" === Detectizr.device.type && e(".thumbs-slider").find(".icon-next").fadeOut(100)
            },
            onSlideChangeEnd: function(t) {
                "mobile" === Detectizr.device.type && t.isBeginning === !1 && t.isEnd === !1 && e(".thumbs-slider").find(".icon-prev, .icon-next").fadeIn()
            }
        }), a(e(".comparison-table"), {
            loop: !1,
            slidesPerView: 3,
            breakpoints: {
                1200: {
                    slidesPerView: 1
                }
            },
            onReachBeginning: function() {
                "mobile" === Detectizr.device.type && e(".comparison-table").find(".icon-prev").fadeOut(100)
            },
            onReachEnd: function() {
                "mobile" === Detectizr.device.type && e(".comparison-table").find(".icon-next").fadeOut(100)
            },
            onSlideChangeEnd: function(t) {
                t.isBeginning === !1 && t.isEnd === !1 && "mobile" === Detectizr.device.type && e(".comparison-table").find(".icon-prev, .icon-next").fadeIn()
            }
        }), a(e(".comparison-table--slider"), {
            loop: !1,
            slidesPerView: 6,
            prevButton: ".comparison-table--slider .icon-prev",
            nextButton: ".comparison-table--slider .icon-next",
            breakpoints: {
                1365: {
                    slidesPerView: 4
                },
                1200: {
                    slidesPerView: 1
                }
            }
        });
        var M = e(".hotspot"),
            O = e(".fact");
        M.on("click", function(t) {
            t.preventDefault(), M.removeClass("active"), e(this).addClass("active");
            var i = e(this).attr("data-hs");
            O.removeClass("active"), e('.fact[data-hs="' + i + '"]').addClass("active")
        });
        var E = e(".faq-section .faq-entry a, .faq-section .faq-entry h3, .about-us-page .box a, .about-us-page .box h3");
        if (E.on("click", function(t) {
                t.preventDefault();
                var i = e(this).parents(".faq-entry, .box"),
                    n = i.hasClass("active");
                E.parent().removeClass("active"), n || i.addClass("active")
            }), e("select.filter").fancySelect({
                includeBlank: !0
            }), e("[data-video-source]").on("click", c), e("[data-twitch-source]").on("click", u), e("[data-youku-source]").on("click", d), e(".bin-example .single-product-head .button").on("click", function(t) {
                function i(t) {
                    t.preventDefault(), n.fadeOut(250, function() {
                        e("html,body").removeClass("no-scroll")
                    })
                }
                t.preventDefault();
                var n = e(".popup-bin");
                n.fadeIn(250, function() {
                    e("html,body").addClass("no-scroll")
                }), n.find(".close").on("click", i)
            }), e(".bin-example .customer-reviews-head .button").on("click", function(t) {
                function i(t) {
                    t.preventDefault(), n.fadeOut(250, function() {
                        e("html,body").removeClass("no-scroll")
                    })
                }
                t.preventDefault();
                var n = e(".popup-review");
                n.fadeIn(250, function() {
                    e("html,body").addClass("no-scroll")
                }), n.find(".close").on("click", i)
            }), e(".contact-us-head a.form-toggle").on("click", function(t) {
                t.preventDefault(), e(".contact-us-head").addClass("open"), e(".contact-us-form").removeClass("hidden").parent().addClass("open")
            }), "desktop" === Detectizr.device.type && Modernizr.mq("screen and (min-width: 1200px)")) {
            var A = e("#seq-image");
            if (A.length) {
                for (var L = A.attr("data-img-base-url"), I = ["sequences/waving-bunny/CP-master_p005-v003_0.png", "sequences/waving-bunny/CP-master_p005-v003_2.png", "sequences/waving-bunny/CP-master_p005-v003_4.png", "sequences/waving-bunny/CP-master_p005-v003_6.png", "sequences/waving-bunny/CP-master_p005-v003_8.png", "sequences/waving-bunny/CP-master_p005-v003_10.png", "sequences/waving-bunny/CP-master_p005-v003_12.png", "sequences/waving-bunny/CP-master_p005-v003_14.png", "sequences/waving-bunny/CP-master_p005-v003_16.png", "sequences/waving-bunny/CP-master_p005-v003_18.png", "sequences/waving-bunny/CP-master_p005-v003_20.png", "sequences/waving-bunny/CP-master_p005-v003_22.png", "sequences/waving-bunny/CP-master_p005-v003_24.png", "sequences/waving-bunny/CP-master_p005-v003_26.png", "sequences/waving-bunny/CP-master_p005-v003_28.png", "sequences/waving-bunny/CP-master_p005-v003_30.png", "sequences/waving-bunny/CP-master_p005-v003_32.png", "sequences/waving-bunny/CP-master_p005-v003_34.png", "sequences/waving-bunny/CP-master_p005-v003_36.png", "sequences/waving-bunny/CP-master_p005-v003_38.png", "sequences/waving-bunny/CP-master_p005-v003_40.png", "sequences/waving-bunny/CP-master_p005-v003_42.png", "sequences/waving-bunny/CP-master_p005-v003_44.png", "sequences/waving-bunny/CP-master_p005-v003_46.png", "sequences/waving-bunny/CP-master_p005-v003_48.png", "sequences/waving-bunny/CP-master_p005-v003_50.png", "sequences/waving-bunny/CP-master_p005-v003_52.png", "sequences/waving-bunny/CP-master_p005-v003_53.png"], D = ["sequences/waving-bear/Bear_Flip_00000.png", "sequences/waving-bear/Bear_Flip_00001.png", "sequences/waving-bear/Bear_Flip_00002.png", "sequences/waving-bear/Bear_Flip_00003.png", "sequences/waving-bear/Bear_Flip_00004.png", "sequences/waving-bear/Bear_Flip_00005.png", "sequences/waving-bear/Bear_Flip_00006.png", "sequences/waving-bear/Bear_Flip_00007.png", "sequences/waving-bear/Bear_Flip_00008.png", "sequences/waving-bear/Bear_Flip_00009.png", "sequences/waving-bear/Bear_Flip_00010.png", "sequences/waving-bear/Bear_Flip_00011.png", "sequences/waving-bear/Bear_Flip_00012.png", "sequences/waving-bear/Bear_Flip_00013.png", "sequences/waving-bear/Bear_Flip_00014.png", "sequences/waving-bear/Bear_Flip_00015.png", "sequences/waving-bear/Bear_Flip_00016.png", "sequences/waving-bear/Bear_Flip_00017.png", "sequences/waving-bear/Bear_Flip_00018.png", "sequences/waving-bear/Bear_Flip_00019.png", "sequences/waving-bear/Bear_Flip_00020.png", "sequences/waving-bear/Bear_Flip_00021.png", "sequences/waving-bear/Bear_Flip_00022.png", "sequences/waving-bear/Bear_Flip_00023.png", "sequences/waving-bear/Bear_Flip_00024.png", "sequences/waving-bear/Bear_Flip_00025.png", "sequences/waving-bear/Bear_Flip_00026.png", "sequences/waving-bear/Bear_Flip_00027.png"], R = e(".site-wrapper").hasClass("tr-TR") ? D : I, N = {
                        curImg: 0
                    }, W = TweenMax.to(N, 2, {
                        curImg: R.length - 1,
                        roundProps: "curImg",
                        immediateRender: !0,
                        ease: Linear.easeNone,
                        onUpdate: function() {
                            A.attr("src", L + R[N.curImg])
                        }
                    }), F = new ScrollMagic.Controller, H = 0; H < R.length; H++) e("<img />").attr("src", L + R[H]);
                A.attr("src", L + R[0]), new ScrollMagic.Scene({
                    triggerElement: "#trigger",
                    duration: 0
                }).setTween(W).addTo(F)
            }
        }
        if (x && "desktop" === Detectizr.device.type) {
            var B = e(".about-us-page .content");
            if (B) {
                var j = new ScrollMagic.Controller;
                new ScrollMagic.Scene({
                    triggerElement: ".first"
                }).setClassToggle(".first p, .first h3", "trans").addTo(j), new ScrollMagic.Scene({
                    triggerElement: ".second"
                }).setClassToggle(".second p, .second h3", "trans").addTo(j), new ScrollMagic.Scene({
                    triggerElement: ".third"
                }).setClassToggle(".third p, .third h3", "trans").addTo(j), new ScrollMagic.Scene({
                    triggerElement: ".fourth"
                }).setClassToggle(".fourth p, .fourth h3", "trans").addTo(j)
            }
            var q = e(".facts-headline .col-phone-12 > div");
            if (q) {
                var $ = new ScrollMagic.Controller;
                new ScrollMagic.Scene({
                    triggerElement: ".facts-headline"
                }).setClassToggle(".facts-headline img, .facts-headline h2, .facts-headline h3, .facts-headline li", "trans").addTo($)
            }
        }
        var X = e(".contact-us-form__wpcf7");
        X.length > 0 && (X.find("select").on("change", function() {
            e(this).parents("label").attr("data-after", e(this).find(":selected").text())
        }), e("input[type=file]").on("change", function() {
            e(this).parent().find("span").remove(), e(this).parent().append("<span>" + e(this)[0].files[0].name + "</span>")
        }), e("input[type=checkbox].wpcf7-form-control").unwrap());
        var Y = e(".single-product-head .gallery-main img"),
            V = e(".single-product-head .gallery-thumbs img"),
            G = e(".single-product-head .gallery-message p"),
            U = {
                borderSize: 0,
                lensBorderColour: "#fff",
                lensOpacity: .3,
                lensFadeIn: 250,
                lensFadeOut: 250,
                zoomWindowBgColour: "#111",
                zoomWindowWidth: 680,
                zoomWindowHeight: 470,
                zoomWindowOffetx: 30,
                zoomWindowOffety: 0,
                zoomWindowFadeIn: 250,
                zoomWindowFadeOut: 250,
                easing: !0
            };
        if (Y.length > 0 && (Y.on("click", h), V.eq(0).addClass("current-packshot"), V.eq(0).parent().addClass("active"), "desktop" === Detectizr.device.type && Modernizr.mq("screen and (min-width: 1200px") && (Y.eq(0).elevateZoom(U), Y.on("mouseover", function() {
                G.fadeIn(100)
            }).on("mouseout", function() {
                G.fadeOut(100)
            })), V.on("click", function() {
                Y.hide(), e(this)[0].hasAttribute("data-packshot") ? Y.filter('[data-packshot="' + e(this).attr("data-packshot") + '"]').show() : Y.filter('[data-extra-item="' + e(this).attr("data-extra-item") + '"]').show(), p(), "desktop" === Detectizr.device.type && f()
            })), t.reinitZoomItems = function() {
                if ("desktop" === Detectizr.device.type || "tablet" === Detectizr.device.type) {
                    var t = e(".single-product-head .gallery-thumbs [data-packshot]"),
                        i = t.eq(Y.filter(":visible").attr("data-packshot"));
                    e.each(t, function() {
                        e(this).hide().removeClass("current-packshot"), e(this).parent().hide()
                    }), i.show().addClass("current-packshot"), i.parent().show(), p(), "desktop" === Detectizr.device.type && f()
                }
                if ("mobile" === Detectizr.device.type) {
                    var n = e(".thumbs-slider");
                    n.get(0) && n.data("swiper") && n.data("swiper").slideTo(0)
                }
            }, t.campaignVideo = function(e, t, i, n) {
                if (void 0 === e || void 0 === t || void 0 === i) return console.error("campaignVideo: check required parameters"), !1;
                var r = window.location.search.split("?")[1];
                if (!r) return !1;
                var s = r.split("&"),
                    o = s.find(function(t) {
                        return t == e
                    });
                void 0 !== o && c(null, t, i, n)
            }, "ie" === Detectizr.browser.name) {
            var Z = e(".comparison-table .battery").not(".top, .blank").find(".sizes, .usage, .capacity, .mouse, .game, .pictures, .duratech, .iname, .fullcharge, .led, .cellsac, .xbatteries, .guarantee, .dimensions").add(".comparison-table .battery.headers > div").not(".top");
            e.each(Z, function(t, i) {
                e(i).wrapInner("<div class='ie-wrap'></div>")
            })
        }
        "mobile" === Detectizr.device.type && "tablet" === Detectizr.device.type || (w(), e(window).on("resize", function() {
            w()
        }), e(".jsBunny").each(function(t, i) {
            g(i), e(".jsBunny").css("opacity", 1), new ScrollMagic.Scene({
                triggerElement: ".jsTriggerScrollMagic"
            }).addTo(new ScrollMagic.Controller).on("enter", function() {
                m(i)
            })
        })), T.on("resize", function() {
            Detectizr.detect(), "mobile" !== Detectizr.device.type && "tablet" !== Detectizr.device.type || viewportUnitsBuggyfill.refresh(), o(), K.resize(), l()
        }), Detectizr.detect();
        var K = new k;
        K.init(), y(), s(), o(), l(), b(), e("body.page-template-initiative-back-to-school-18").get(0) && v(), window.resizeIframe && window.resizeIframe()
    })
}(jQuery.noConflict(), Duracell);
var _createClass = function() {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        return function(t, i, n) {
            return i && e(t.prototype, i), n && e(t, n), t
        }
    }(),
    Slider = function() {
        function e() {
            var t = this;
            _classCallCheck(this, e), this.el = {
                slickSliderWrapper: jQuery(".ssis-section-fourth .slider"),
                breakpoint: window.matchMedia("(min-width: 1200px)"),
                checkInit: !1
            }, this.breakpointChecker = function() {
                t.el.slickSliderWrapper.get(0) && (t.el.breakpoint.matches || t.el.slickSliderWrapper.hasClass("slick-initialized") || t.el.slickSliderWrapper.slick({
                    infinite: !1,
                    speed: 1e3,
                    swipe: !0,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: !0,
                    responsive: [{
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }]
                }), t.el.breakpoint.matches && t.el.slickSliderWrapper.hasClass("slick-initialized") && t.el.slickSliderWrapper.slick("unslick"))
            }, this.breakpointListener = function() {
                t.el.breakpoint.addListener(t.breakpointChecker)
            }
        }
        return _createClass(e, [{
            key: "init",
            value: function() {
                this.breakpointListener(), this.breakpointChecker()
            }
        }]), e
    }(),
    sliderInstance = new Slider;
sliderInstance.init();
var PIXEL_STEP = 10,
    LINE_HEIGHT = 40,
    PAGE_HEIGHT = 800;
! function(e) {
    e("a").on("click", function(t) {
        const i = e(this).data("scroll-id"),
            n = e("#" + i);
        void 0 !== i && (t.preventDefault(), e("body, html").animate({
            scrollTop: n.position().top
        }))
    })
}(jQuery.noConflict()), ! function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";
    var t = window.Slick || {};
    (t = function() {
        var t = 0;
        return function(i, n) {
            var r, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: e(i),
                appendDots: e(i),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(t, i) {
                    return e('<button type="button" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, e.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = e(i), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, r = e(i).data("slick") || {}, s.options = e.extend({}, s.defaults, n, r), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, void 0 !== document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = e.proxy(s.autoPlay, s), s.autoPlayClear = e.proxy(s.autoPlayClear, s), s.autoPlayIterator = e.proxy(s.autoPlayIterator, s), s.changeSlide = e.proxy(s.changeSlide, s), s.clickHandler = e.proxy(s.clickHandler, s), s.selectHandler = e.proxy(s.selectHandler, s), s.setPosition = e.proxy(s.setPosition, s), s.swipeHandler = e.proxy(s.swipeHandler, s), s.dragHandler = e.proxy(s.dragHandler, s), s.keyHandler = e.proxy(s.keyHandler, s), s.instanceUid = t++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, t.prototype.addSlide = t.prototype.slickAdd = function(t, i, n) {
        var r = this;
        if ("boolean" == typeof i) n = i, i = null;
        else if (i < 0 || i >= r.slideCount) return !1;
        r.unload(), "number" == typeof i ? 0 === i && 0 === r.$slides.length ? e(t).appendTo(r.$slideTrack) : n ? e(t).insertBefore(r.$slides.eq(i)) : e(t).insertAfter(r.$slides.eq(i)) : !0 === n ? e(t).prependTo(r.$slideTrack) : e(t).appendTo(r.$slideTrack), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t)
        }), r.$slidesCache = r.$slides, r.reinit()
    }, t.prototype.animateHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({
                height: t
            }, e.options.speed)
        }
    }, t.prototype.animateSlide = function(t, i) {
        var n = {},
            r = this;
        r.animateHeight(), !0 === r.options.rtl && !1 === r.options.vertical && (t = -t), !1 === r.transformsEnabled ? !1 === r.options.vertical ? r.$slideTrack.animate({
            left: t
        }, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
            top: t
        }, r.options.speed, r.options.easing, i) : !1 === r.cssTransitions ? (!0 === r.options.rtl && (r.currentLeft = -r.currentLeft), e({
            animStart: r.currentLeft
        }).animate({
            animStart: t
        }, {
            duration: r.options.speed,
            easing: r.options.easing,
            step: function(e) {
                e = Math.ceil(e), !1 === r.options.vertical ? (n[r.animType] = "translate(" + e + "px, 0px)", r.$slideTrack.css(n)) : (n[r.animType] = "translate(0px," + e + "px)", r.$slideTrack.css(n))
            },
            complete: function() {
                i && i.call()
            }
        })) : (r.applyTransition(), t = Math.ceil(t), !1 === r.options.vertical ? n[r.animType] = "translate3d(" + t + "px, 0px, 0px)" : n[r.animType] = "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(n), i && setTimeout(function() {
            r.disableTransition(), i.call()
        }, r.options.speed))
    }, t.prototype.getNavTarget = function() {
        var t = this,
            i = t.options.asNavFor;
        return i && null !== i && (i = e(i).not(t.$slider)), i
    }, t.prototype.asNavFor = function(t) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = e(this).slick("getSlick");
            i.unslicked || i.slideHandler(t, !0)
        })
    }, t.prototype.applyTransition = function(e) {
        var t = this,
            i = {};
        !1 === t.options.fade ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.autoPlay = function() {
        var e = this;
        e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
    }, t.prototype.autoPlayClear = function() {
        var e = this;
        e.autoPlayTimer && clearInterval(e.autoPlayTimer)
    }, t.prototype.autoPlayIterator = function() {
        var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
        e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
    }, t.prototype.buildArrows = function() {
        var t = this;
        !0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, t.prototype.buildDots = function() {
        var t, i, n = this;
        if (!0 === n.options.dots) {
            for (n.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(n.options.dotsClass), t = 0; t <= n.getDotCount(); t += 1) i.append(e("<li />").append(n.options.customPaging.call(this, n, t)));
            n.$dots = i.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
        }
    }, t.prototype.buildOut = function() {
        var t = this;
        t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each(function(t, i) {
            e(i).attr("data-slick-index", t).data("originalStyling", e(i).attr("style") || "")
        }), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
    }, t.prototype.buildRows = function() {
        var e, t, i, n, r, s, o, a = this;
        if (n = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
            for (o = a.options.slidesPerRow * a.options.rows, r = Math.ceil(s.length / o), e = 0; e < r; e++) {
                var l = document.createElement("div");
                for (t = 0; t < a.options.rows; t++) {
                    var c = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var u = e * o + (t * a.options.slidesPerRow + i);
                        s.get(u) && c.appendChild(s.get(u))
                    }
                    l.appendChild(c)
                }
                n.appendChild(l)
            }
            a.$slider.empty().append(n), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, t.prototype.checkResponsive = function(t, i) {
        var n, r, s, o = this,
            a = !1,
            l = o.$slider.width(),
            c = window.innerWidth || e(window).width();
        if ("window" === o.respondTo ? s = c : "slider" === o.respondTo ? s = l : "min" === o.respondTo && (s = Math.min(c, l)), o.options.responsive && o.options.responsive.length && null !== o.options.responsive) {
            r = null;
            for (n in o.breakpoints) o.breakpoints.hasOwnProperty(n) && (!1 === o.originalSettings.mobileFirst ? s < o.breakpoints[n] && (r = o.breakpoints[n]) : s > o.breakpoints[n] && (r = o.breakpoints[n]));
            null !== r ? null !== o.activeBreakpoint ? (r !== o.activeBreakpoint || i) && (o.activeBreakpoint = r, "unslick" === o.breakpointSettings[r] ? o.unslick(r) : (o.options = e.extend({}, o.originalSettings, o.breakpointSettings[r]), !0 === t && (o.currentSlide = o.options.initialSlide), o.refresh(t)), a = r) : (o.activeBreakpoint = r, "unslick" === o.breakpointSettings[r] ? o.unslick(r) : (o.options = e.extend({}, o.originalSettings, o.breakpointSettings[r]), !0 === t && (o.currentSlide = o.options.initialSlide), o.refresh(t)), a = r) : null !== o.activeBreakpoint && (o.activeBreakpoint = null, o.options = o.originalSettings, !0 === t && (o.currentSlide = o.options.initialSlide), o.refresh(t), a = r), t || !1 === a || o.$slider.trigger("breakpoint", [o, a])
        }
    }, t.prototype.changeSlide = function(t, i) {
        var n, r, s, o = this,
            a = e(t.currentTarget);
        switch (a.is("a") && t.preventDefault(), a.is("li") || (a = a.closest("li")), s = o.slideCount % o.options.slidesToScroll != 0, n = s ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, t.data.message) {
            case "previous":
                r = 0 === n ? o.options.slidesToScroll : o.options.slidesToShow - n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - r, !1, i);
                break;
            case "next":
                r = 0 === n ? o.options.slidesToScroll : n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + r, !1, i);
                break;
            case "index":
                var l = 0 === t.data.index ? 0 : t.data.index || a.index() * o.options.slidesToScroll;
                o.slideHandler(o.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, t.prototype.checkNavigable = function(e) {
        var t, i;
        if (t = this.getNavigableIndexes(), i = 0, e > t[t.length - 1]) e = t[t.length - 1];
        else
            for (var n in t) {
                if (e < t[n]) {
                    e = i;
                    break
                }
                i = t[n]
            }
        return e
    }, t.prototype.cleanUpEvents = function() {
        var t = this;
        t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
    }, t.prototype.cleanUpSlideEvents = function() {
        var t = this;
        t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.cleanUpRows = function() {
        var e, t = this;
        t.options.rows > 1 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
    }, t.prototype.clickHandler = function(e) {
        !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
    }, t.prototype.destroy = function(t) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), e(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            e(this).attr("style", e(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, t || i.$slider.trigger("destroy", [i])
    }, t.prototype.disableTransition = function(e) {
        var t = this,
            i = {};
        i[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
    }, t.prototype.fadeSlide = function(e, t) {
        var i = this;
        !1 === i.cssTransitions ? (i.$slides.eq(e).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(e).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), t && setTimeout(function() {
            i.disableTransition(e), t.call()
        }, i.options.speed))
    }, t.prototype.fadeSlideOut = function(e) {
        var t = this;
        !1 === t.cssTransitions ? t.$slides.eq(e).animate({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
            opacity: 0,
            zIndex: t.options.zIndex - 2
        }))
    }, t.prototype.filterSlides = t.prototype.slickFilter = function(e) {
        var t = this;
        null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
    }, t.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var n = e(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = n.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, t.prototype.getDotCount = function() {
        var e = this,
            t = 0,
            i = 0,
            n = 0;
        if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow) ++n;
            else
                for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else if (!0 === e.options.centerMode) n = e.slideCount;
        else if (e.options.asNavFor)
            for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        else n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
        return n - 1
    }, t.prototype.getLeft = function(e) {
        var t, i, n, r, s = this,
            o = 0;
        return s.slideOffset = 0, i = s.$slides.first().outerHeight(!0), !0 === s.options.infinite ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, r = -1, !0 === s.options.vertical && !0 === s.options.centerMode && (2 === s.options.slidesToShow ? r = -1.5 : 1 === s.options.slidesToShow && (r = -2)), o = i * s.options.slidesToShow * r), s.slideCount % s.options.slidesToScroll != 0 && e + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (e > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (e - s.slideCount)) * s.slideWidth * -1, o = (s.options.slidesToShow - (e - s.slideCount)) * i * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, o = s.slideCount % s.options.slidesToScroll * i * -1))) : e + s.options.slidesToShow > s.slideCount && (s.slideOffset = (e + s.options.slidesToShow - s.slideCount) * s.slideWidth, o = (e + s.options.slidesToShow - s.slideCount) * i), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, o = 0), !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow ? s.slideOffset = s.slideWidth * Math.floor(s.options.slidesToShow) / 2 - s.slideWidth * s.slideCount / 2 : !0 === s.options.centerMode && !0 === s.options.infinite ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : !0 === s.options.centerMode && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), t = !1 === s.options.vertical ? e * s.slideWidth * -1 + s.slideOffset : e * i * -1 + o, !0 === s.options.variableWidth && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow), t = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === s.options.centerMode && (n = s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite ? s.$slideTrack.children(".slick-slide").eq(e) : s.$slideTrack.children(".slick-slide").eq(e + s.options.slidesToShow + 1), t = !0 === s.options.rtl ? n[0] ? -1 * (s.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0,
            t += (s.$list.width() - n.outerWidth()) / 2)), t
    }, t.prototype.getOption = t.prototype.slickGetOption = function(e) {
        return this.options[e]
    }, t.prototype.getNavigableIndexes = function() {
        var e, t = this,
            i = 0,
            n = 0,
            r = [];
        for (!1 === t.options.infinite ? e = t.slideCount : (i = -1 * t.options.slidesToScroll, n = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); i < e;) r.push(i), i = n + t.options.slidesToScroll, n += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        return r
    }, t.prototype.getSlick = function() {
        return this
    }, t.prototype.getSlideCount = function() {
        var t, i, n = this;
        return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(r, s) {
            if (s.offsetLeft - i + e(s).outerWidth() / 2 > -1 * n.swipeLeft) return t = s, !1
        }), Math.abs(e(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, t.prototype.goTo = t.prototype.slickGoTo = function(e, t) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(e)
            }
        }, t)
    }, t.prototype.init = function(t) {
        var i = this;
        e(i.$slider).hasClass("slick-initialized") || (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), t && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, t.prototype.initADA = function() {
        var t = this,
            i = Math.ceil(t.slideCount / t.options.slidesToShow),
            n = t.getNavigableIndexes().filter(function(e) {
                return e >= 0 && e < t.slideCount
            });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            var r = n.indexOf(i);
            e(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + i,
                tabindex: -1
            }), -1 !== r && e(this).attr({
                "aria-describedby": "slick-slide-control" + t.instanceUid + r
            })
        }), t.$dots.attr("role", "tablist").find("li").each(function(r) {
            var s = n[r];
            e(this).attr({
                role: "presentation"
            }), e(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + r,
                "aria-controls": "slick-slide" + t.instanceUid + s,
                "aria-label": r + 1 + " of " + i,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var r = t.currentSlide, s = r + t.options.slidesToShow; r < s; r++) t.$slides.eq(r).attr("tabindex", 0);
        t.activateADA()
    }, t.prototype.initArrowEvents = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
    }, t.prototype.initDotEvents = function() {
        var t = this;
        !0 === t.options.dots && (e("li", t.$dots).on("click.slick", {
            message: "index"
        }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
    }, t.prototype.initSlideEvents = function() {
        var t = this;
        t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
    }, t.prototype.initializeEvents = function() {
        var t = this;
        t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
    }, t.prototype.initUI = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
    }, t.prototype.keyHandler = function(e) {
        var t = this;
        e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "next" : "previous"
            }
        }) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
            data: {
                message: !0 === t.options.rtl ? "previous" : "next"
            }
        }))
    }, t.prototype.lazyLoad = function() {
        function t(t) {
            e("img[data-lazy]", t).each(function() {
                var t = e(this),
                    i = e(this).attr("data-lazy"),
                    n = e(this).attr("data-srcset"),
                    r = e(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
                    o = document.createElement("img");
                o.onload = function() {
                    t.animate({
                        opacity: 0
                    }, 100, function() {
                        n && (t.attr("srcset", n), r && t.attr("sizes", r)), t.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), s.$slider.trigger("lazyLoaded", [s, t, i])
                    })
                }, o.onerror = function() {
                    t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, i])
                }, o.src = i
            })
        }
        var i, n, r, s = this;
        if (!0 === s.options.centerMode ? !0 === s.options.infinite ? r = (n = s.currentSlide + (s.options.slidesToShow / 2 + 1)) + s.options.slidesToShow + 2 : (n = Math.max(0, s.currentSlide - (s.options.slidesToShow / 2 + 1)), r = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide) : (n = s.options.infinite ? s.options.slidesToShow + s.currentSlide : s.currentSlide, r = Math.ceil(n + s.options.slidesToShow), !0 === s.options.fade && (n > 0 && n--, r <= s.slideCount && r++)), i = s.$slider.find(".slick-slide").slice(n, r), "anticipated" === s.options.lazyLoad)
            for (var o = n - 1, a = r, l = s.$slider.find(".slick-slide"), c = 0; c < s.options.slidesToScroll; c++) o < 0 && (o = s.slideCount - 1), i = (i = i.add(l.eq(o))).add(l.eq(a)), o--, a++;
        t(i), s.slideCount <= s.options.slidesToShow ? t(s.$slider.find(".slick-slide")) : s.currentSlide >= s.slideCount - s.options.slidesToShow ? t(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow)) : 0 === s.currentSlide && t(s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow))
    }, t.prototype.loadSlider = function() {
        var e = this;
        e.setPosition(), e.$slideTrack.css({
            opacity: 1
        }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
    }, t.prototype.next = t.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, t.prototype.orientationChange = function() {
        var e = this;
        e.checkResponsive(), e.setPosition()
    }, t.prototype.pause = t.prototype.slickPause = function() {
        var e = this;
        e.autoPlayClear(), e.paused = !0
    }, t.prototype.play = t.prototype.slickPlay = function() {
        var e = this;
        e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
    }, t.prototype.postSlide = function(t) {
        var i = this;
        i.unslicked || (i.$slider.trigger("afterChange", [i, t]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
    }, t.prototype.prev = t.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, t.prototype.preventDefault = function(e) {
        e.preventDefault()
    }, t.prototype.progressiveLazyLoad = function(t) {
        t = t || 1;
        var i, n, r, s, o, a = this,
            l = e("img[data-lazy]", a.$slider);
        l.length ? (i = l.first(), n = i.attr("data-lazy"), r = i.attr("data-srcset"), s = i.attr("data-sizes") || a.$slider.attr("data-sizes"), (o = document.createElement("img")).onload = function() {
            r && (i.attr("srcset", r), s && i.attr("sizes", s)), i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, n]), a.progressiveLazyLoad()
        }, o.onerror = function() {
            t < 3 ? setTimeout(function() {
                a.progressiveLazyLoad(t + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, n]), a.progressiveLazyLoad())
        }, o.src = n) : a.$slider.trigger("allImagesLoaded", [a])
    }, t.prototype.refresh = function(t) {
        var i, n, r = this;
        n = r.slideCount - r.options.slidesToShow, !r.options.infinite && r.currentSlide > n && (r.currentSlide = n), r.slideCount <= r.options.slidesToShow && (r.currentSlide = 0), i = r.currentSlide, r.destroy(!0), e.extend(r, r.initials, {
            currentSlide: i
        }), r.init(), t || r.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, t.prototype.registerBreakpoints = function() {
        var t, i, n, r = this,
            s = r.options.responsive || null;
        if ("array" === e.type(s) && s.length) {
            r.respondTo = r.options.respondTo || "window";
            for (t in s)
                if (n = r.breakpoints.length - 1, s.hasOwnProperty(t)) {
                    for (i = s[t].breakpoint; n >= 0;) r.breakpoints[n] && r.breakpoints[n] === i && r.breakpoints.splice(n, 1), n--;
                    r.breakpoints.push(i), r.breakpointSettings[i] = s[t].settings
                }
            r.breakpoints.sort(function(e, t) {
                return r.options.mobileFirst ? e - t : t - e
            })
        }
    }, t.prototype.reinit = function() {
        var t = this;
        t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
    }, t.prototype.resize = function() {
        var t = this;
        e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function() {
            t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
        }, 50))
    }, t.prototype.removeSlide = t.prototype.slickRemove = function(e, t, i) {
        var n = this;
        return e = "boolean" == typeof e ? !0 === (t = e) ? 0 : n.slideCount - 1 : !0 === t ? --e : e, !(n.slideCount < 1 || e < 0 || e > n.slideCount - 1) && (n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit(), void 0)
    }, t.prototype.setCSS = function(e) {
        var t, i, n = this,
            r = {};
        !0 === n.options.rtl && (e = -e), t = "left" == n.positionProp ? Math.ceil(e) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(e) + "px" : "0px", r[n.positionProp] = e, !1 === n.transformsEnabled ? n.$slideTrack.css(r) : (r = {}, !1 === n.cssTransitions ? (r[n.animType] = "translate(" + t + ", " + i + ")", n.$slideTrack.css(r)) : (r[n.animType] = "translate3d(" + t + ", " + i + ", 0px)", n.$slideTrack.css(r)))
    }, t.prototype.setDimensions = function() {
        var e = this;
        !1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
            padding: "0px " + e.options.centerPadding
        }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
            padding: e.options.centerPadding + " 0px"
        })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
        var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
        !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
    }, t.prototype.setFade = function() {
        var t, i = this;
        i.$slides.each(function(n, r) {
            t = i.slideWidth * n * -1, !0 === i.options.rtl ? e(r).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : e(r).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, t.prototype.setHeight = function() {
        var e = this;
        if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t)
        }
    }, t.prototype.setOption = t.prototype.slickSetOption = function() {
        var t, i, n, r, s, o = this,
            a = !1;
        if ("object" === e.type(arguments[0]) ? (n = arguments[0], a = arguments[1], s = "multiple") : "string" === e.type(arguments[0]) && (n = arguments[0], r = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) o.options[n] = r;
        else if ("multiple" === s) e.each(n, function(e, t) {
            o.options[e] = t
        });
        else if ("responsive" === s)
            for (i in r)
                if ("array" !== e.type(o.options.responsive)) o.options.responsive = [r[i]];
                else {
                    for (t = o.options.responsive.length - 1; t >= 0;) o.options.responsive[t].breakpoint === r[i].breakpoint && o.options.responsive.splice(t, 1), t--;
                    o.options.responsive.push(r[i])
                }
        a && (o.unload(), o.reinit())
    }, t.prototype.setPosition = function() {
        var e = this;
        e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
    }, t.prototype.setProps = function() {
        var e = this,
            t = document.body.style;
        e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
    }, t.prototype.setSlideClasses = function(e) {
        var t, i, n, r, s = this;
        if (i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(e).addClass("slick-current"), !0 === s.options.centerMode) {
            var o = s.options.slidesToShow % 2 == 0 ? 1 : 0;
            t = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (e >= t && e <= s.slideCount - 1 - t ? s.$slides.slice(e - t + o, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = s.options.slidesToShow + e, i.slice(n - t + 1 + o, n + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : e === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(e).addClass("slick-center")
        } else e >= 0 && e <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(e, e + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (r = s.slideCount % s.options.slidesToShow, n = !0 === s.options.infinite ? s.options.slidesToShow + e : e, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - e < s.options.slidesToShow ? i.slice(n - (s.options.slidesToShow - r), n + r).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }, t.prototype.setupInfinite = function() {
        var t, i, n, r = this;
        if (!0 === r.options.fade && (r.options.centerMode = !1), !0 === r.options.infinite && !1 === r.options.fade && (i = null, r.slideCount > r.options.slidesToShow)) {
            for (n = !0 === r.options.centerMode ? r.options.slidesToShow + 1 : r.options.slidesToShow, t = r.slideCount; t > r.slideCount - n; t -= 1) i = t - 1, e(r.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - r.slideCount).prependTo(r.$slideTrack).addClass("slick-cloned");
            for (t = 0; t < n + r.slideCount; t += 1) i = t, e(r.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + r.slideCount).appendTo(r.$slideTrack).addClass("slick-cloned");
            r.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                e(this).attr("id", "")
            })
        }
    }, t.prototype.interrupt = function(e) {
        var t = this;
        e || t.autoPlay(), t.interrupted = e
    }, t.prototype.selectHandler = function(t) {
        var i = this,
            n = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
            r = parseInt(n.attr("data-slick-index"));
        r || (r = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(r, !1, !0) : i.slideHandler(r)
    }, t.prototype.slideHandler = function(e, t, i) {
        var n, r, s, o, a, l = null,
            c = this;
        if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e))
            if (!1 === t && c.asNavFor(e), n = e, l = c.getLeft(n), o = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? o : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (n = c.currentSlide, !0 !== i ? c.animateSlide(o, function() {
                c.postSlide(n)
            }) : c.postSlide(n));
            else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (n = c.currentSlide, !0 !== i ? c.animateSlide(o, function() {
            c.postSlide(n)
        }) : c.postSlide(n));
        else {
            if (c.options.autoplay && clearInterval(c.autoPlayTimer), r = n < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + n : n >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : n - c.slideCount : n, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, r]), s = c.currentSlide, c.currentSlide = r, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(s), c.fadeSlide(r, function() {
                c.postSlide(r)
            })) : c.postSlide(r), void c.animateHeight();
            !0 !== i ? c.animateSlide(l, function() {
                c.postSlide(r)
            }) : c.postSlide(r)
        }
    }, t.prototype.startLoad = function() {
        var e = this;
        !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
    }, t.prototype.swipeDirection = function() {
        var e, t, i, n, r = this;
        return e = r.touchObject.startX - r.touchObject.curX, t = r.touchObject.startY - r.touchObject.curY, i = Math.atan2(t, e), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === r.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === r.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === r.options.rtl ? "right" : "left" : !0 === r.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
    }, t.prototype.swipeEnd = function(e) {
        var t, i, n = this;
        if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
        if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
        if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
            switch (i = n.swipeDirection()) {
                case "left":
                case "down":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
            }
            "vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
        } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
    }, t.prototype.swipeHandler = function(e) {
        var t = this;
        if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
            case "start":
                t.swipeStart(e);
                break;
            case "move":
                t.swipeMove(e);
                break;
            case "end":
                t.swipeEnd(e)
        }
    }, t.prototype.swipeMove = function(e) {
        var t, i, n, r, s, o, a = this;
        return s = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || s && 1 !== s.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== s ? s[0].pageX : e.clientX, a.touchObject.curY = void 0 !== s ? s[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), o = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && o > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = o), i = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), r = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (r = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + n * r : a.swipeLeft = t + n * (a.$list.height() / a.listWidth) * r, !0 === a.options.verticalSwiping && (a.swipeLeft = t + n * r), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
    }, t.prototype.swipeStart = function(e) {
        var t, i = this;
        return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, i.dragging = !0, void 0)
    }, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function() {
        var e = this;
        null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
    }, t.prototype.unload = function() {
        var t = this;
        e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, t.prototype.unslick = function(e) {
        var t = this;
        t.$slider.trigger("unslick", [t, e]), t.destroy()
    }, t.prototype.updateArrows = function() {
        var e = this;
        Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, t.prototype.updateDots = function() {
        var e = this;
        null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
    }, t.prototype.visibility = function() {
        var e = this;
        e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
    }, e.fn.slick = function() {
        var e, i, n = this,
            r = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            o = n.length;
        for (e = 0; e < o; e++)
            if ("object" == typeof r || void 0 === r ? n[e].slick = new t(n[e], r) : i = n[e].slick[r].apply(n[e].slick, s), void 0 !== i) return i;
        return n
    }
});
var StarWars = StarWars || {};
! function(e, t) {
    var n = {
            init: function() {
                if ("mobile" !== Detectizr.device.type && window.innerWidth > 1200) var t = {
                    ovalWidth: e(".carousel").width() / 2.5,
                    ovalHeight: 0,
                    offsetX: 0,
                    offsetY: 90,
                    angle: 0,
                    activeItem: 0,
                    duration: 300,
                    className: "item"
                };
                else var t = {
                    ovalWidth: 0,
                    ovalHeight: 0,
                    offsetX: 0,
                    offsetY: 0,
                    angle: 0,
                    activeItem: 0,
                    duration: 400,
                    className: "item"
                };
                var i = e(".carousel").CircularCarousel(t);
                i.on("itemBeforeActive", function(t, i) {
                    e(".item").removeClass("slide-prev slide-next")
                }), i.on("itemActive", function(t, i) {
                    e(".item").removeClass("slide-prev slide-next"), e(i).is(":last-child") && e(".item:first-child").addClass("slide-prev"), e(i).is(":first-child") && e(".item:last-child").addClass("slide-prev"), e(i).prev().addClass("slide-prev"), e(i).next().addClass("slide-next")
                }), i.on("itemBeforeDeactivate", function(e, t) {}), i.on("itemAfterDeactivate", function(e, t) {}), e(".controls .previous").click(function(e) {
                    i.cycleActive("previous"), e.preventDefault()
                }), e(".controls .next").click(function(e) {
                    i.cycleActive("next"), e.preventDefault()
                })
            }
        },
        r = {
            init: function(t) {
                var i = new ScrollMagic.Controller,
                    n = [],
                    r = e.map(e(t).find("*[data-animation-value]"), function(t) {
                        if (0 !== Object.keys(e(t).data()).length) return {
                            el: t,
                            data: e(t).data()
                        }
                    });
                r.push({
                    el: t,
                    data: e(t).data()
                }), r.forEach(function(e, t) {
                    var i = {
                        ease: Linear.easeInOut
                    };
                    i[e.data.animationProp] = e.data.animationValue, n[t] = TweenMax.to(e.el, 1, i)
                });
                var s = .75 * e(t).height(),
                    o = (new TimelineMax).add(n);
                new ScrollMagic.Scene({
                    triggerElement: t,
                    duration: s,
                    offset: 0
                }).setTween(o).addTo(i)
            }
        },
        s = {
            init: function() {
                if (!e(".js-map").get(0)) return !1;
                var t = [{
                        featureType: "all",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [{
                            color: "#292929"
                        }, {
                            visibility: "on"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#acacac"
                        }, {
                            weight: "0.45"
                        }]
                    }, {
                        featureType: "transit.line",
                        elementType: "geometry.fill",
                        stylers: [{
                            visibility: "off"
                        }, {
                            color: "#737373"
                        }]
                    }, {
                        featureType: "transit.line",
                        elementType: "geometry.stroke",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "all",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#000000"
                        }]
                    }],
                    n = [],
                    r = new google.maps.DirectionsService,
                    o = {
                        zoom: 9,
                        styles: t,
                        disableDefaultUI: !0,
                        center: {
                            lat: 52.0699486,
                            lng: -9.604426500000022
                        }
                    };
                "mobile" === Detectizr.device.type && (o.center.lng = -10.304426500000021), "tablet" === Detectizr.device.type && (o.center.lng = -10.304426500000021);
                var a = new google.maps.Map(document.querySelector(".js-map"), o);
                places.forEach(function(e) {
                    var t = new google.maps.Marker({
                        position: e,
                        label: {
                            text: e.name.toUpperCase(),
                            color: "#fff",
                            fontSize: "16px"
                        },
                        icon: {
                            url: "undefined" == typeof duracell_theme ? "../img/common/map-marker.png" : duracell_theme.starWars.markerUrl,
                            labelOrigin: new google.maps.Point(25, 0)
                        },
                        map: a
                    });
                    n.push(t), t.addListener("click", function() {
                        const t = {
                            name: e.name,
                            title: e.data.title,
                            content: e.data.content,
                            image: e.data.image
                        };
                        s.popupOpen(t)
                    })
                }), e(".js-close").on("click", function() {
                    s.popupClose()
                }), google.maps.event.addListener(a, "zoom_changed", function() {
                    var e = a.getZoom();
                    if (e < 7)
                        for (i = 0; i < n.length; i++) n[i].setLabel();
                    else
                        for (i = 0; i < n.length; i++) n[i].setLabel({
                            text: places[i].name.toUpperCase(),
                            color: "#fff",
                            fontSize: "16px"
                        })
                });
                var l = new google.maps.DirectionsRenderer({
                        polylineOptions: {
                            strokeColor: "#c98959",
                            strokeWeight: 5,
                            geodesic: !0
                        },
                        preserveViewport: !0,
                        suppressMarkers: !0,
                        map: a
                    }),
                    c = (new google.maps.InfoWindow, []);
                for (i = 0; i < places.length; i++) c[i] = {
                    location: {
                        lat: places[i].lat,
                        lng: places[i].lng
                    }
                };
                c.shift(), c.splice(-1, 1), r.route({
                    origin: {
                        location: {
                            lat: places[0].lat,
                            lng: places[0].lng
                        }
                    },
                    travelMode: "WALKING",
                    destination: {
                        location: {
                            lat: places[places.length - 1].lat,
                            lng: places[places.length - 1].lng
                        }
                    },
                    waypoints: c
                }, function(e, t) {
                    "OK" === t ? l.setDirections(e) : console.log(e)
                })
            },
            popupOpen: function(t) {
                e(".js-popup").addClass("open"), e(".js-popup-title").text(t.title), e(".js-popup-text").html(t.content), e(".js-popup-image").attr("src", t.image)
            },
            popupClose: function() {
                e(".js-popup").removeClass("open")
            }
        },
        o = {
            init: function() {
                "mobile" !== Detectizr.device.type && window.innerWidth > 1200 && e(".js-parallax-section").each(function(e, t) {
                    r.init(t)
                }), n.init(), s.init()
            }
        };
    e(window).on("load", function() {
        o.init()
    })
}(jQuery.noConflict(), StarWars);