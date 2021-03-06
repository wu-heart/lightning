/* jquery.mCustomScrollbar.js v3.0.9 */
(function(a) {
	if(typeof module !== "undefined" && module.exports) {
		module.exports = a
	} else {
		a(jQuery, window, document)
	}
}(function(a) {
	(function(f) {
		var d = typeof define === "function" && define.amd,
			e = typeof module !== "undefined" && module.exports,
			b = ("https:" == document.location.protocol) ? "https:" : "http:",
			c = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
		if(!d) {
			if(e) {
				require("jquery-mousewheel")(a)
			} else {
				a.event.special.mousewheel || a("head").append(decodeURI("%3Cscript src=" + b + "//" + c + "%3E%3C/script%3E"))
			}
		}
		f()
	}(function() {
		var n = "mCustomScrollbar",
			k = "mCS",
			e = ".mCustomScrollbar",
			H = {
				setTop: 0,
				setLeft: 0,
				axis: "y",
				scrollbarPosition: "inside",
				scrollInertia: 950,
				autoDraggerLength: true,
				alwaysShowScrollbar: 0,
				snapOffset: 0,
				mouseWheel: {
					enable: true,
					scrollAmount: "auto",
					axis: "y",
					deltaFactor: "auto",
					disableOver: ["select", "option", "keygen", "datalist", "textarea"]
				},
				scrollButtons: {
					scrollType: "stepless",
					scrollAmount: "auto"
				},
				keyboard: {
					enable: true,
					scrollType: "stepless",
					scrollAmount: "auto"
				},
				contentTouchScroll: 25,
				advanced: {
					autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
					updateOnContentResize: true,
					updateOnImageLoad: true,
					autoUpdateTimeout: 60
				},
				theme: "light",
				callbacks: {
					onTotalScrollOffset: 0,
					onTotalScrollBackOffset: 0,
					alwaysTriggerOffsets: true
				}
			},
			y = 0,
			T = {},
			Q = (window.attachEvent && !window.addEventListener) ? 1 : 0,
			U = false,
			i, f = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
			J = {
				init: function(ag) {
					var ag = a.extend(true, {}, H, ag),
						af = E.call(this);
					if(ag.live) {
						var ai = ag.liveSelector || this.selector || e,
							ah = a(ai);
						if(ag.live === "off") {
							z(ai);
							return
						}
						T[ai] = setTimeout(function() {
							ah.mCustomScrollbar(ag);
							if(ag.live === "once" && ah.length) {
								z(ai)
							}
						}, 500)
					} else {
						z(ai)
					}
					ag.setWidth = (ag.set_width) ? ag.set_width : ag.setWidth;
					ag.setHeight = (ag.set_height) ? ag.set_height : ag.setHeight;
					ag.axis = (ag.horizontalScroll) ? "x" : t(ag.axis);
					ag.scrollInertia = ag.scrollInertia > 0 && ag.scrollInertia < 17 ? 17 : ag.scrollInertia;
					if(typeof ag.mouseWheel !== "object" && ag.mouseWheel == true) {
						ag.mouseWheel = {
							enable: true,
							scrollAmount: "auto",
							axis: "y",
							preventDefault: false,
							deltaFactor: "auto",
							normalizeDelta: false,
							invert: false
						}
					}
					ag.mouseWheel.scrollAmount = !ag.mouseWheelPixels ? ag.mouseWheel.scrollAmount : ag.mouseWheelPixels;
					ag.mouseWheel.normalizeDelta = !ag.advanced.normalizeMouseWheelDelta ? ag.mouseWheel.normalizeDelta : ag.advanced.normalizeMouseWheelDelta;
					ag.scrollButtons.scrollType = c(ag.scrollButtons.scrollType);
					K(ag);
					return a(af).each(function() {
						var ak = a(this);
						if(!ak.data(k)) {
							ak.data(k, {
								idx: ++y,
								opt: ag,
								scrollRatio: {
									y: null,
									x: null
								},
								overflowed: null,
								contentReset: {
									y: null,
									x: null
								},
								bindEvents: false,
								tweenRunning: false,
								sequential: {},
								langDir: ak.css("direction"),
								cbOffsets: null,
								trigger: null
							});
							var an = ak.data(k),
								am = an.opt,
								al = ak.data("mcs-axis"),
								aj = ak.data("mcs-scrollbar-position"),
								ao = ak.data("mcs-theme");
							if(al) {
								am.axis = al
							}
							if(aj) {
								am.scrollbarPosition = aj
							}
							if(ao) {
								am.theme = ao;
								K(am)
							}
							ad.call(this);
							a("#mCSB_" + an.idx + "_container img:not(." + f[2] + ")").addClass(f[2]);
							J.update.call(null, ak)
						}
					})
				},
				update: function(ah, ag) {
					var af = ah || E.call(this);
					return a(af).each(function() {
						var ak = a(this);
						if(ak.data(k)) {
							var am = ak.data(k),
								al = am.opt,
								ai = a("#mCSB_" + am.idx + "_container"),
								aj = [a("#mCSB_" + am.idx + "_dragger_vertical"), a("#mCSB_" + am.idx + "_dragger_horizontal")];
							if(!ai.length) {
								return
							}
							if(am.tweenRunning) {
								q(ak)
							}
							if(ak.hasClass(f[3])) {
								ak.removeClass(f[3])
							}
							if(ak.hasClass(f[4])) {
								ak.removeClass(f[4])
							}
							A.call(this);
							D.call(this);
							if(al.axis !== "y" && !al.advanced.autoExpandHorizontalScroll) {
								ai.css("width", v(ai.children()))
							}
							am.overflowed = R.call(this);
							ae.call(this);
							if(al.autoDraggerLength) {
								x.call(this)
							}
							M.call(this);
							r.call(this);
							var an = [Math.abs(ai[0].offsetTop), Math.abs(ai[0].offsetLeft)];
							if(al.axis !== "x") {
								if(!am.overflowed[0]) {
									w.call(this);
									if(al.axis === "y") {
										C.call(this)
									} else {
										if(al.axis === "yx" && am.overflowed[1]) {
											s(ak, an[1].toString(), {
												dir: "x",
												dur: 0,
												overwrite: "none"
											})
										}
									}
								} else {
									if(aj[0].height() > aj[0].parent().height()) {
										w.call(this)
									} else {
										s(ak, an[0].toString(), {
											dir: "y",
											dur: 0,
											overwrite: "none"
										});
										am.contentReset.y = null
									}
								}
							}
							if(al.axis !== "y") {
								if(!am.overflowed[1]) {
									w.call(this);
									if(al.axis === "x") {
										C.call(this)
									} else {
										if(al.axis === "yx" && am.overflowed[0]) {
											s(ak, an[0].toString(), {
												dir: "y",
												dur: 0,
												overwrite: "none"
											})
										}
									}
								} else {
									if(aj[1].width() > aj[1].parent().width()) {
										w.call(this)
									} else {
										s(ak, an[1].toString(), {
											dir: "x",
											dur: 0,
											overwrite: "none"
										});
										am.contentReset.x = null
									}
								}
							}
							if(ag && am) {
								if(ag === 2 && al.callbacks.onImageLoad && typeof al.callbacks.onImageLoad === "function") {
									al.callbacks.onImageLoad.call(this)
								} else {
									if(ag === 3 && al.callbacks.onSelectorChange && typeof al.callbacks.onSelectorChange === "function") {
										al.callbacks.onSelectorChange.call(this)
									} else {
										if(al.callbacks.onUpdate && typeof al.callbacks.onUpdate === "function") {
											al.callbacks.onUpdate.call(this)
										}
									}
								}
							}
							Z.call(this)
						}
					})
				},
				scrollTo: function(ah, ag) {
					if(typeof ah == "undefined" || ah == null) {
						return
					}
					var af = E.call(this);
					return a(af).each(function() {
						var ak = a(this);
						if(ak.data(k)) {
							var an = ak.data(k),
								am = an.opt,
								al = {
									trigger: "external",
									scrollInertia: am.scrollInertia,
									scrollEasing: "mcsEaseInOut",
									moveDragger: false,
									timeout: 60,
									callbacks: true,
									onStart: true,
									onUpdate: true,
									onComplete: true
								},
								ai = a.extend(true, {}, al, ag),
								ao = p.call(this, ah),
								aj = ai.scrollInertia > 0 && ai.scrollInertia < 17 ? 17 : ai.scrollInertia;
							ao[0] = aa.call(this, ao[0], "y");
							ao[1] = aa.call(this, ao[1], "x");
							if(ai.moveDragger) {
								ao[0] *= an.scrollRatio.y;
								ao[1] *= an.scrollRatio.x
							}
							ai.dur = aj;
							setTimeout(function() {
								if(ao[0] !== null && typeof ao[0] !== "undefined" && am.axis !== "x" && an.overflowed[0]) {
									ai.dir = "y";
									ai.overwrite = "all";
									s(ak, ao[0].toString(), ai)
								}
								if(ao[1] !== null && typeof ao[1] !== "undefined" && am.axis !== "y" && an.overflowed[1]) {
									ai.dir = "x";
									ai.overwrite = "none";
									s(ak, ao[1].toString(), ai)
								}
							}, ai.timeout)
						}
					})
				},
				stop: function() {
					var af = E.call(this);
					return a(af).each(function() {
						var ag = a(this);
						if(ag.data(k)) {
							q(ag)
						}
					})
				},
				disable: function(ag) {
					var af = E.call(this);
					return a(af).each(function() {
						var ah = a(this);
						if(ah.data(k)) {
							var ai = ah.data(k);
							Z.call(this, "remove");
							C.call(this);
							if(ag) {
								w.call(this)
							}
							ae.call(this, true);
							ah.addClass(f[3])
						}
					})
				},
				destroy: function() {
					var af = E.call(this);
					return a(af).each(function() {
						var ai = a(this);
						if(ai.data(k)) {
							var ak = ai.data(k),
								aj = ak.opt,
								ag = a("#mCSB_" + ak.idx),
								ah = a("#mCSB_" + ak.idx + "_container"),
								al = a(".mCSB_" + ak.idx + "_scrollbar");
							if(aj.live) {
								z(aj.liveSelector || a(af).selector)
							}
							Z.call(this, "remove");
							C.call(this);
							w.call(this);
							ai.removeData(k);
							W(this, "mcs");
							al.remove();
							ah.find("img." + f[2]).removeClass(f[2]);
							ag.replaceWith(ah.contents());
							ai.removeClass(n + " _" + k + "_" + ak.idx + " " + f[6] + " " + f[7] + " " + f[5] + " " + f[3]).addClass(f[4])
						}
					})
				}
			},
			E = function() {
				return(typeof a(this) !== "object" || a(this).length < 1) ? e : this
			},
			K = function(ai) {
				var ah = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
					ag = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
					af = ["minimal", "minimal-dark"],
					ak = ["minimal", "minimal-dark"],
					aj = ["minimal", "minimal-dark"];
				ai.autoDraggerLength = a.inArray(ai.theme, ah) > -1 ? false : ai.autoDraggerLength;
				ai.autoExpandScrollbar = a.inArray(ai.theme, ag) > -1 ? false : ai.autoExpandScrollbar;
				ai.scrollButtons.enable = a.inArray(ai.theme, af) > -1 ? false : ai.scrollButtons.enable;
				ai.autoHideScrollbar = a.inArray(ai.theme, ak) > -1 ? true : ai.autoHideScrollbar;
				ai.scrollbarPosition = a.inArray(ai.theme, aj) > -1 ? "outside" : ai.scrollbarPosition
			},
			z = function(af) {
				if(T[af]) {
					clearTimeout(T[af]);
					W(T, af)
				}
			},
			t = function(af) {
				return(af === "yx" || af === "xy" || af === "auto") ? "yx" : (af === "x" || af === "horizontal") ? "x" : "y"
			},
			c = function(af) {
				return(af === "stepped" || af === "pixels" || af === "step" || af === "click") ? "stepped" : "stepless"
			},
			ad = function() {
				var ao = a(this),
					an = ao.data(k),
					ah = an.opt,
					aj = ah.autoExpandScrollbar ? " " + f[1] + "_expand" : "",
					ar = ["<div id='mCSB_" + an.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + an.idx + "_scrollbar mCS-" + ah.theme + " mCSB_scrollTools_vertical" + aj + "'><div class='" + f[12] + "'><div id='mCSB_" + an.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + an.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + an.idx + "_scrollbar mCS-" + ah.theme + " mCSB_scrollTools_horizontal" + aj + "'><div class='" + f[12] + "'><div id='mCSB_" + an.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
					ak = ah.axis === "yx" ? "mCSB_vertical_horizontal" : ah.axis === "x" ? "mCSB_horizontal" : "mCSB_vertical",
					am = ah.axis === "yx" ? ar[0] + ar[1] : ah.axis === "x" ? ar[1] : ar[0],
					al = ah.axis === "yx" ? "<div id='mCSB_" + an.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
					ai = ah.autoHideScrollbar ? " " + f[6] : "",
					af = (ah.axis !== "x" && an.langDir === "rtl") ? " " + f[7] : "";
				if(ah.setWidth) {
					ao.css("width", ah.setWidth)
				}
				if(ah.setHeight) {
					ao.css("height", ah.setHeight)
				}
				ah.setLeft = (ah.axis !== "y" && an.langDir === "rtl") ? "989999px" : ah.setLeft;
				ao.addClass(n + " _" + k + "_" + an.idx + ai + af).wrapInner("<div id='mCSB_" + an.idx + "' class='mCustomScrollBox mCS-" + ah.theme + " " + ak + "'><div id='mCSB_" + an.idx + "_container' class='mCSB_container' style='position:relative; top:" + ah.setTop + "; left:" + ah.setLeft + ";' dir=" + an.langDir + " /></div>");
				var ag = a("#mCSB_" + an.idx),
					ap = a("#mCSB_" + an.idx + "_container");
				if(ah.axis !== "y" && !ah.advanced.autoExpandHorizontalScroll) {
					ap.css("width", v(ap.children()))
				}
				if(ah.scrollbarPosition === "outside") {
					if(ao.css("position") === "static") {
						ao.css("position", "relative")
					}
					ao.css("overflow", "visible");
					ag.addClass("mCSB_outside").after(am)
				} else {
					ag.addClass("mCSB_inside").append(am);
					ap.wrap(al)
				}
				ac.call(this);
				var aq = [a("#mCSB_" + an.idx + "_dragger_vertical"), a("#mCSB_" + an.idx + "_dragger_horizontal")];
				aq[0].css("min-height", aq[0].height());
				aq[1].css("min-width", aq[1].width())
			},
			v = function(af) {
				return Math.max.apply(Math, af.map(function() {
					return a(this).outerWidth(true)
				}).get())
			},
			D = function() {
				var ag = a(this),
					ai = ag.data(k),
					ah = ai.opt,
					af = a("#mCSB_" + ai.idx + "_container");
				if(ah.advanced.autoExpandHorizontalScroll && ah.axis !== "y") {
					af.css({
						"position": "absolute",
						"width": "auto"
					}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
						"width": (Math.ceil(af[0].getBoundingClientRect().right + 0.4) - Math.floor(af[0].getBoundingClientRect().left)),
						"position": "relative"
					}).unwrap()
				}
			},
			ac = function() {
				var aj = a(this),
					al = aj.data(k),
					ak = al.opt,
					ah = a(".mCSB_" + al.idx + "_scrollbar:first"),
					ag = !g(ak.scrollButtons.tabindex) ? "" : "tabindex='" + ak.scrollButtons.tabindex + "'",
					ai = ["<a href='#' class='" + f[13] + "' oncontextmenu='return false;' " + ag + " />", "<a href='#' class='" + f[14] + "' oncontextmenu='return false;' " + ag + " />", "<a href='#' class='" + f[15] + "' oncontextmenu='return false;' " + ag + " />", "<a href='#' class='" + f[16] + "' oncontextmenu='return false;' " + ag + " />"],
					af = [(ak.axis === "x" ? ai[2] : ai[0]), (ak.axis === "x" ? ai[3] : ai[1]), ai[2], ai[3]];
				if(ak.scrollButtons.enable) {
					ah.prepend(af[0]).append(af[1]).next(".mCSB_scrollTools").prepend(af[2]).append(af[3])
				}
			},
			A = function() {
				var aj = a(this),
					al = aj.data(k),
					ah = a("#mCSB_" + al.idx),
					ag = aj.css("max-height") || "none",
					ai = ag.indexOf("%") !== -1,
					af = aj.css("box-sizing");
				if(ag !== "none") {
					var ak = ai ? aj.parent().height() * parseInt(ag) / 100 : parseInt(ag);
					if(af === "border-box") {
						ak -= ((aj.innerHeight() - aj.height()) + (aj.outerHeight() - aj.innerHeight()))
					}
					ah.css("max-height", Math.round(ak))
				}
			},
			x = function() {
				var ak = a(this),
					ai = ak.data(k),
					af = a("#mCSB_" + ai.idx),
					al = a("#mCSB_" + ai.idx + "_container"),
					an = [a("#mCSB_" + ai.idx + "_dragger_vertical"), a("#mCSB_" + ai.idx + "_dragger_horizontal")],
					aj = [af.height() / al.outerHeight(false), af.width() / al.outerWidth(false)],
					ag = [parseInt(an[0].css("min-height")), Math.round(aj[0] * an[0].parent().height()), parseInt(an[1].css("min-width")), Math.round(aj[1] * an[1].parent().width())],
					ah = Q && (ag[1] < ag[0]) ? ag[0] : ag[1],
					am = Q && (ag[3] < ag[2]) ? ag[2] : ag[3];
				an[0].css({
					"height": ah,
					"max-height": (an[0].parent().height() - 10)
				}).find(".mCSB_dragger_bar").css({
					"line-height": ag[0] + "px"
				});
				an[1].css({
					"width": am,
					"max-width": (an[1].parent().width() - 10)
				})
			},
			M = function() {
				var aj = a(this),
					al = aj.data(k),
					ag = a("#mCSB_" + al.idx),
					ah = a("#mCSB_" + al.idx + "_container"),
					ai = [a("#mCSB_" + al.idx + "_dragger_vertical"), a("#mCSB_" + al.idx + "_dragger_horizontal")],
					ak = [ah.outerHeight(false) - ag.height(), ah.outerWidth(false) - ag.width()],
					af = [ak[0] / (ai[0].parent().height() - ai[0].height()), ak[1] / (ai[1].parent().width() - ai[1].width())];
				al.scrollRatio = {
					y: af[0],
					x: af[1]
				}
			},
			h = function(ag, ai, af) {
				var ah = af ? f[0] + "_expanded" : "",
					aj = ag.closest(".mCSB_scrollTools");
				if(ai === "active") {
					ag.toggleClass(f[0] + " " + ah);
					aj.toggleClass(f[1]);
					ag[0]._draggable = ag[0]._draggable ? 0 : 1
				} else {
					if(!ag[0]._draggable) {
						if(ai === "hide") {
							ag.removeClass(f[0]);
							aj.removeClass(f[1])
						} else {
							ag.addClass(f[0]);
							aj.addClass(f[1])
						}
					}
				}
			},
			R = function() {
				var aj = a(this),
					ak = aj.data(k),
					ag = a("#mCSB_" + ak.idx),
					ai = a("#mCSB_" + ak.idx + "_container"),
					ah = ak.overflowed == null ? ai.height() : ai.outerHeight(false),
					af = ak.overflowed == null ? ai.width() : ai.outerWidth(false);
				return [ah > ag.height(), af > ag.width()]
			},
			w = function() {
				var aj = a(this),
					al = aj.data(k),
					ak = al.opt,
					ag = a("#mCSB_" + al.idx),
					ah = a("#mCSB_" + al.idx + "_container"),
					ai = [a("#mCSB_" + al.idx + "_dragger_vertical"), a("#mCSB_" + al.idx + "_dragger_horizontal")];
				q(aj);
				if((ak.axis !== "x" && !al.overflowed[0]) || (ak.axis === "y" && al.overflowed[0])) {
					ai[0].add(ah).css("top", 0);
					s(aj, "_resetY")
				}
				if((ak.axis !== "y" && !al.overflowed[1]) || (ak.axis === "x" && al.overflowed[1])) {
					var af = dx = 0;
					if(al.langDir === "rtl") {
						af = ag.width() - ah.outerWidth(false);
						dx = Math.abs(af / al.scrollRatio.x)
					}
					ah.css("left", af);
					ai[1].css("left", dx);
					s(aj, "_resetX")
				}
			},
			r = function() {
				var ah = a(this),
					aj = ah.data(k),
					ai = aj.opt;
				if(!aj.bindEvents) {
					I.call(this);
					if(ai.contentTouchScroll) {
						l.call(this)
					}
					F.call(this);
					if(ai.mouseWheel.enable) {
						function ag() {
							af = setTimeout(function() {
								if(!a.event.special.mousewheel) {
									ag()
								} else {
									clearTimeout(af);
									o.call(ah[0])
								}
							}, 100)
						}
						var af;
						ag()
					}
					d.call(this);
					Y.call(this);
					if(ai.advanced.autoScrollOnFocus) {
						P.call(this)
					}
					if(ai.scrollButtons.enable) {
						ab.call(this)
					}
					if(ai.keyboard.enable) {
						O.call(this)
					}
					aj.bindEvents = true
				}
			},
			C = function() {
				var ai = a(this),
					ak = ai.data(k),
					aj = ak.opt,
					af = k + "_" + ak.idx,
					al = ".mCSB_" + ak.idx + "_scrollbar",
					ah = a("#mCSB_" + ak.idx + ",#mCSB_" + ak.idx + "_container,#mCSB_" + ak.idx + "_container_wrapper," + al + " ." + f[12] + ",#mCSB_" + ak.idx + "_dragger_vertical,#mCSB_" + ak.idx + "_dragger_horizontal," + al + ">a"),
					ag = a("#mCSB_" + ak.idx + "_container");
				if(aj.advanced.releaseDraggableSelectors) {
					ah.add(a(aj.advanced.releaseDraggableSelectors))
				}
				if(ak.bindEvents) {
					a(document).unbind("." + af);
					ah.each(function() {
						a(this).unbind("." + af)
					});
					clearTimeout(ai[0]._focusTimeout);
					W(ai[0], "_focusTimeout");
					clearTimeout(ak.sequential.step);
					W(ak.sequential, "step");
					clearTimeout(ag[0].onCompleteTimeout);
					W(ag[0], "onCompleteTimeout");
					ak.bindEvents = false
				}
			},
			ae = function(ag) {
				var aj = a(this),
					al = aj.data(k),
					ak = al.opt,
					af = a("#mCSB_" + al.idx + "_container_wrapper"),
					ah = af.length ? af : a("#mCSB_" + al.idx + "_container"),
					am = [a("#mCSB_" + al.idx + "_scrollbar_vertical"), a("#mCSB_" + al.idx + "_scrollbar_horizontal")],
					ai = [am[0].find(".mCSB_dragger"), am[1].find(".mCSB_dragger")];
				if(ak.axis !== "x") {
					if(al.overflowed[0] && !ag) {
						am[0].add(ai[0]).add(am[0].children("a")).css("display", "block");
						ah.removeClass(f[8] + " " + f[10])
					} else {
						if(ak.alwaysShowScrollbar) {
							if(ak.alwaysShowScrollbar !== 2) {
								ai[0].css("display", "none")
							}
							ah.removeClass(f[10])
						} else {
							am[0].css("display", "none");
							ah.addClass(f[10])
						}
						ah.addClass(f[8])
					}
				}
				if(ak.axis !== "y") {
					if(al.overflowed[1] && !ag) {
						am[1].add(ai[1]).add(am[1].children("a")).css("display", "block");
						ah.removeClass(f[9] + " " + f[11])
					} else {
						if(ak.alwaysShowScrollbar) {
							if(ak.alwaysShowScrollbar !== 2) {
								ai[1].css("display", "none")
							}
							ah.removeClass(f[11])
						} else {
							am[1].css("display", "none");
							ah.addClass(f[11])
						}
						ah.addClass(f[9])
					}
				}
				if(!al.overflowed[0] && !al.overflowed[1]) {
					aj.addClass(f[5])
				} else {
					aj.removeClass(f[5])
				}
			},
			j = function(ah) {
				var af = ah.type;
				switch(af) {
					case "pointerdown":
					case "MSPointerDown":
					case "pointermove":
					case "MSPointerMove":
					case "pointerup":
					case "MSPointerUp":
						return ah.target.ownerDocument !== document ? [ah.originalEvent.screenY, ah.originalEvent.screenX, false] : [ah.originalEvent.pageY, ah.originalEvent.pageX, false];
						break;
					case "touchstart":
					case "touchmove":
					case "touchend":
						var ai = ah.originalEvent.touches[0] || ah.originalEvent.changedTouches[0],
							ag = ah.originalEvent.touches.length || ah.originalEvent.changedTouches.length;
						return ah.target.ownerDocument !== document ? [ai.screenY, ai.screenX, ag > 1] : [ai.pageY, ai.pageX, ag > 1];
						break;
					default:
						return [ah.pageY, ah.pageX, false]
				}
			},
			I = function() {
				var ak = a(this),
					ai = ak.data(k),
					af = ai.opt,
					ah = k + "_" + ai.idx,
					aj = ["mCSB_" + ai.idx + "_dragger_vertical", "mCSB_" + ai.idx + "_dragger_horizontal"],
					al = a("#mCSB_" + ai.idx + "_container"),
					am = a("#" + aj[0] + ",#" + aj[1]),
					ar, ao, aq, ap = af.advanced.releaseDraggableSelectors ? am.add(a(af.advanced.releaseDraggableSelectors)) : am;
				am.bind("mousedown." + ah + " touchstart." + ah + " pointerdown." + ah + " MSPointerDown." + ah, function(aw) {
					aw.stopImmediatePropagation();
					aw.preventDefault();
					if(!V(aw)) {
						return
					}
					U = true;
					if(Q) {
						document.onselectstart = function() {
							return false
						}
					}
					an(false);
					q(ak);
					ar = a(this);
					var ax = ar.offset(),
						ay = j(aw)[0] - ax.top,
						at = j(aw)[1] - ax.left,
						av = ar.height() + ax.top,
						au = ar.width() + ax.left;
					if(ay < av && ay > 0 && at < au && at > 0) {
						ao = ay;
						aq = at
					}
					h(ar, "active", af.autoExpandScrollbar)
				}).bind("touchmove." + ah, function(au) {
					au.stopImmediatePropagation();
					au.preventDefault();
					var av = ar.offset(),
						aw = j(au)[0] - av.top,
						at = j(au)[1] - av.left;
					ag(ao, aq, aw, at)
				});
				a(document).bind("mousemove." + ah + " pointermove." + ah + " MSPointerMove." + ah, function(au) {
					if(ar) {
						var av = ar.offset(),
							aw = j(au)[0] - av.top,
							at = j(au)[1] - av.left;
						if(ao === aw) {
							return
						}
						ag(ao, aq, aw, at)
					}
				}).add(ap).bind("mouseup." + ah + " touchend." + ah + " pointerup." + ah + " MSPointerUp." + ah, function(at) {
					if(ar) {
						h(ar, "active", af.autoExpandScrollbar);
						ar = null
					}
					U = false;
					if(Q) {
						document.onselectstart = null
					}
					an(true)
				});

				function an(at) {
					var au = al.find("iframe");
					if(!au.length) {
						return
					}
					var av = !at ? "none" : "auto";
					au.css("pointer-events", av)
				}

				function ag(av, aw, ay, at) {
					al[0].idleTimer = af.scrollInertia < 233 ? 250 : 0;
					if(ar.attr("id") === aj[1]) {
						var au = "x",
							ax = ((ar[0].offsetLeft - aw) + at) * ai.scrollRatio.x
					} else {
						var au = "y",
							ax = ((ar[0].offsetTop - av) + ay) * ai.scrollRatio.y
					}
					s(ak, ax.toString(), {
						dir: au,
						drag: true
					})
				}
			},
			l = function() {
				var at = a(this),
					aI = at.data(k),
					aF = aI.opt,
					aC = k + "_" + aI.idx,
					ao = a("#mCSB_" + aI.idx),
					au = a("#mCSB_" + aI.idx + "_container"),
					ap = [a("#mCSB_" + aI.idx + "_dragger_vertical"), a("#mCSB_" + aI.idx + "_dragger_horizontal")],
					aB, aD, aJ, aK, az = [],
					aA = [],
					aE, av, an, am, aG, ar, ah = 0,
					ag, al = aF.axis === "yx" ? "none" : "all",
					aL = [],
					aM, aH, ax = au.find("iframe"),
					ai = ["touchstart." + aC + " pointerdown." + aC + " MSPointerDown." + aC, "touchmove." + aC + " pointermove." + aC + " MSPointerMove." + aC, "touchend." + aC + " pointerup." + aC + " MSPointerUp." + aC];
				au.bind(ai[0], function(aN) {
					aq(aN)
				}).bind(ai[1], function(aN) {
					aw(aN)
				});
				ao.bind(ai[0], function(aN) {
					ak(aN)
				}).bind(ai[2], function(aN) {
					aj(aN)
				});
				if(ax.length) {
					ax.each(function() {
						a(this).load(function() {
							if(m(this)) {
								a(this.contentDocument || this.contentWindow.document).bind(ai[0], function(aN) {
									aq(aN);
									ak(aN)
								}).bind(ai[1], function(aN) {
									aw(aN)
								}).bind(ai[2], function(aN) {
									aj(aN)
								})
							}
						})
					})
				}

				function aq(aN) {
					if(!S(aN) || U || j(aN)[2]) {
						i = 0;
						return
					}
					i = 1;
					aM = 0;
					aH = 0;
					at.removeClass("mCS_touch_action");
					var aO = au.offset();
					aB = j(aN)[0] - aO.top;
					aD = j(aN)[1] - aO.left;
					aL = [j(aN)[0], j(aN)[1]]
				}

				function aw(aQ) {
					if(!S(aQ) || U || j(aQ)[2]) {
						return
					}
					aQ.stopImmediatePropagation();
					if(aH && !aM) {
						return
					}
					av = N();
					var aP = ao.offset(),
						aS = j(aQ)[0] - aP.top,
						aU = j(aQ)[1] - aP.left,
						aR = "mcsLinearOut";
					az.push(aS);
					aA.push(aU);
					aL[2] = Math.abs(j(aQ)[0] - aL[0]);
					aL[3] = Math.abs(j(aQ)[1] - aL[1]);
					if(aI.overflowed[0]) {
						var aO = ap[0].parent().height() - ap[0].height(),
							aT = ((aB - aS) > 0 && (aS - aB) > -(aO * aI.scrollRatio.y) && (aL[3] * 2 < aL[2] || aF.axis === "yx"))
					}
					if(aI.overflowed[1]) {
						var aN = ap[1].parent().width() - ap[1].width(),
							aV = ((aD - aU) > 0 && (aU - aD) > -(aN * aI.scrollRatio.x) && (aL[2] * 2 < aL[3] || aF.axis === "yx"))
					}
					if(aT || aV) {
						aQ.preventDefault();
						aM = 1
					} else {
						aH = 1;
						at.addClass("mCS_touch_action")
					}
					ar = aF.axis === "yx" ? [(aB - aS), (aD - aU)] : aF.axis === "x" ? [null, (aD - aU)] : [(aB - aS), null];
					au[0].idleTimer = 250;
					if(aI.overflowed[0]) {
						ay(ar[0], ah, aR, "y", "all", true)
					}
					if(aI.overflowed[1]) {
						ay(ar[1], ah, aR, "x", al, true)
					}
				}

				function ak(aN) {
					if(!S(aN) || U || j(aN)[2]) {
						i = 0;
						return
					}
					i = 1;
					aN.stopImmediatePropagation();
					q(at);
					aE = N();
					var aO = ao.offset();
					aJ = j(aN)[0] - aO.top;
					aK = j(aN)[1] - aO.left;
					az = [];
					aA = []
				}

				function aj(aP) {
					if(!S(aP) || U || j(aP)[2]) {
						return
					}
					aP.stopImmediatePropagation();
					aM = 0;
					aH = 0;
					an = N();
					var aN = ao.offset(),
						aT = j(aP)[0] - aN.top,
						aV = j(aP)[1] - aN.left;
					if((an - av) > 30) {
						return
					}
					aG = 1000 / (an - aE);
					var aQ = "mcsEaseOut",
						aR = aG < 2.5,
						aW = aR ? [az[az.length - 2], aA[aA.length - 2]] : [0, 0];
					am = aR ? [(aT - aW[0]), (aV - aW[1])] : [aT - aJ, aV - aK];
					var aO = [Math.abs(am[0]), Math.abs(am[1])];
					aG = aR ? [Math.abs(am[0] / 4), Math.abs(am[1] / 4)] : [aG, aG];
					var aU = [Math.abs(au[0].offsetTop) - (am[0] * af((aO[0] / aG[0]), aG[0])), Math.abs(au[0].offsetLeft) - (am[1] * af((aO[1] / aG[1]), aG[1]))];
					ar = aF.axis === "yx" ? [aU[0], aU[1]] : aF.axis === "x" ? [null, aU[1]] : [aU[0], null];
					ag = [(aO[0] * 4) + aF.scrollInertia, (aO[1] * 4) + aF.scrollInertia];
					var aS = parseInt(aF.contentTouchScroll) || 0;
					ar[0] = aO[0] > aS ? ar[0] : 0;
					ar[1] = aO[1] > aS ? ar[1] : 0;
					if(aI.overflowed[0]) {
						ay(ar[0], ag[0], aQ, "y", al, false)
					}
					if(aI.overflowed[1]) {
						ay(ar[1], ag[1], aQ, "x", al, false)
					}
				}

				function af(aP, aN) {
					var aO = [aN * 1.5, aN * 2, aN / 1.5, aN / 2];
					if(aP > 90) {
						return aN > 4 ? aO[0] : aO[3]
					} else {
						if(aP > 60) {
							return aN > 3 ? aO[3] : aO[2]
						} else {
							if(aP > 30) {
								return aN > 8 ? aO[1] : aN > 6 ? aO[0] : aN > 4 ? aN : aO[2]
							} else {
								return aN > 8 ? aN : aO[3]
							}
						}
					}
				}

				function ay(aP, aR, aS, aO, aN, aQ) {
					if(!aP) {
						return
					}
					s(at, aP.toString(), {
						dur: aR,
						scrollEasing: aS,
						dir: aO,
						overwrite: aN,
						drag: aQ
					})
				}
			},
			F = function() {
				var am = a(this),
					al = am.data(k),
					ah = al.opt,
					ao = al.sequential,
					ai = k + "_" + al.idx,
					an = a("#mCSB_" + al.idx + "_container"),
					af = an.parent(),
					aj;
				an.bind("mousedown." + ai, function(ap) {
					if(i) {
						return
					}
					if(!aj) {
						aj = 1;
						U = true
					}
				}).add(document).bind("mousemove." + ai, function(aq) {
					if(!i && aj && ak()) {
						var ar = an.offset(),
							at = j(aq)[0] - ar.top + an[0].offsetTop,
							ap = j(aq)[1] - ar.left + an[0].offsetLeft;
						if(at > 0 && at < af.height() && ap > 0 && ap < af.width()) {
							if(ao.step) {
								ag("off", null, "stepped")
							}
						} else {
							if(ah.axis !== "x" && al.overflowed[0]) {
								if(at < 0) {
									ag("on", 38)
								} else {
									if(at > af.height()) {
										ag("on", 40)
									}
								}
							}
							if(ah.axis !== "y" && al.overflowed[1]) {
								if(ap < 0) {
									ag("on", 37)
								} else {
									if(ap > af.width()) {
										ag("on", 39)
									}
								}
							}
						}
					}
				}).bind("mouseup." + ai, function(ap) {
					if(i) {
						return
					}
					if(aj) {
						aj = 0;
						ag("off", null)
					}
					U = false
				});

				function ak() {
					return window.getSelection ? window.getSelection().toString() : document.selection && document.selection.type != "Control" ? document.selection.createRange().text : 0
				}

				function ag(ap, ar, aq) {
					ao.type = aq && aj ? "stepped" : "stepless";
					ao.scrollAmount = 10;
					b(am, ap, ar, "mcsLinearOut", aq ? 60 : null)
				}
			},
			o = function() {
				if(!a(this).data(k)) {
					return
				}
				var ak = a(this),
					am = ak.data(k),
					al = am.opt,
					ah = k + "_" + am.idx,
					ag = a("#mCSB_" + am.idx),
					aj = [a("#mCSB_" + am.idx + "_dragger_vertical"), a("#mCSB_" + am.idx + "_dragger_horizontal")],
					af = a("#mCSB_" + am.idx + "_container").find("iframe");
				if(af.length) {
					af.each(function() {
						a(this).load(function() {
							if(m(this)) {
								a(this.contentDocument || this.contentWindow.document).bind("mousewheel." + ah, function(an, ao) {
									ai(an, ao)
								})
							}
						})
					})
				}
				ag.bind("mousewheel." + ah, function(an, ao) {
					ai(an, ao)
				});

				function ai(ar, aw) {
					q(ak);
					if(B(ak, ar.target)) {
						return
					}
					var au = al.mouseWheel.deltaFactor !== "auto" ? parseInt(al.mouseWheel.deltaFactor) : (Q && ar.deltaFactor < 100) ? 100 : ar.deltaFactor || 100;
					if(al.axis === "x" || al.mouseWheel.axis === "x") {
						var ao = "x",
							av = [Math.round(au * am.scrollRatio.x), parseInt(al.mouseWheel.scrollAmount)],
							aq = al.mouseWheel.scrollAmount !== "auto" ? av[1] : av[0] >= ag.width() ? ag.width() * 0.9 : av[0],
							ax = Math.abs(a("#mCSB_" + am.idx + "_container")[0].offsetLeft),
							at = aj[1][0].offsetLeft,
							ap = aj[1].parent().width() - aj[1].width(),
							an = ar.deltaX || ar.deltaY || aw
					} else {
						var ao = "y",
							av = [Math.round(au * am.scrollRatio.y), parseInt(al.mouseWheel.scrollAmount)],
							aq = al.mouseWheel.scrollAmount !== "auto" ? av[1] : av[0] >= ag.height() ? ag.height() * 0.9 : av[0],
							ax = Math.abs(a("#mCSB_" + am.idx + "_container")[0].offsetTop),
							at = aj[0][0].offsetTop,
							ap = aj[0].parent().height() - aj[0].height(),
							an = ar.deltaY || aw
					}
					if((ao === "y" && !am.overflowed[0]) || (ao === "x" && !am.overflowed[1])) {
						return
					}
					if(al.mouseWheel.invert || ar.webkitDirectionInvertedFromDevice) {
						an = -an
					}
					if(al.mouseWheel.normalizeDelta) {
						an = an < 0 ? -1 : 1
					}
					if((an > 0 && at !== 0) || (an < 0 && at !== ap) || al.mouseWheel.preventDefault) {
						ar.stopImmediatePropagation();
						ar.preventDefault()
					}
					s(ak, (ax - (an * aq)).toString(), {
						dir: ao
					})
				}
			},
			m = function(ag) {
				var af = null;
				try {
					var ai = ag.contentDocument || ag.contentWindow.document;
					af = ai.body.innerHTML
				} catch(ah) {}
				return(af !== null)
			},
			B = function(ah, aj) {
				var af = aj.nodeName.toLowerCase(),
					ag = ah.data(k).opt.mouseWheel.disableOver,
					ai = ["select", "textarea"];
				return a.inArray(af, ag) > -1 && !(a.inArray(af, ai) > -1 && !a(aj).is(":focus"))
			},
			d = function() {
				var ai = a(this),
					aj = ai.data(k),
					ag = k + "_" + aj.idx,
					ah = a("#mCSB_" + aj.idx + "_container"),
					ak = ah.parent(),
					af = a(".mCSB_" + aj.idx + "_scrollbar ." + f[12]);
				af.bind("touchstart." + ag + " pointerdown." + ag + " MSPointerDown." + ag, function(al) {
					U = true
				}).bind("touchend." + ag + " pointerup." + ag + " MSPointerUp." + ag, function(al) {
					U = false
				}).bind("click." + ag, function(ap) {
					if(a(ap.target).hasClass(f[12]) || a(ap.target).hasClass("mCSB_draggerRail")) {
						q(ai);
						var am = a(this),
							ao = am.find(".mCSB_dragger");
						if(am.parent(".mCSB_scrollTools_horizontal").length > 0) {
							if(!aj.overflowed[1]) {
								return
							}
							var al = "x",
								an = ap.pageX > ao.offset().left ? -1 : 1,
								aq = Math.abs(ah[0].offsetLeft) - (an * (ak.width() * 0.9))
						} else {
							if(!aj.overflowed[0]) {
								return
							}
							var al = "y",
								an = ap.pageY > ao.offset().top ? -1 : 1,
								aq = Math.abs(ah[0].offsetTop) - (an * (ak.height() * 0.9))
						}
						s(ai, aq.toString(), {
							dir: al,
							scrollEasing: "mcsEaseInOut"
						})
					}
				})
			},
			P = function() {
				var ah = a(this),
					aj = ah.data(k),
					ai = aj.opt,
					af = k + "_" + aj.idx,
					ag = a("#mCSB_" + aj.idx + "_container"),
					ak = ag.parent();
				ag.bind("focusin." + af, function(an) {
					var am = a(document.activeElement),
						ao = ag.find(".mCustomScrollBox").length,
						al = 0;
					if(!am.is(ai.advanced.autoScrollOnFocus)) {
						return
					}
					q(ah);
					clearTimeout(ah[0]._focusTimeout);
					ah[0]._focusTimer = ao ? (al + 17) * ao : 0;
					ah[0]._focusTimeout = setTimeout(function() {
						var at = [u(am)[0], u(am)[1]],
							ar = [ag[0].offsetTop, ag[0].offsetLeft],
							ap = [(ar[0] + at[0] >= 0 && ar[0] + at[0] < ak.height() - am.outerHeight(false)), (ar[1] + at[1] >= 0 && ar[0] + at[1] < ak.width() - am.outerWidth(false))],
							aq = (ai.axis === "yx" && !ap[0] && !ap[1]) ? "none" : "all";
						if(ai.axis !== "x" && !ap[0]) {
							s(ah, at[0].toString(), {
								dir: "y",
								scrollEasing: "mcsEaseInOut",
								overwrite: aq,
								dur: al
							})
						}
						if(ai.axis !== "y" && !ap[1]) {
							s(ah, at[1].toString(), {
								dir: "x",
								scrollEasing: "mcsEaseInOut",
								overwrite: aq,
								dur: al
							})
						}
					}, ah[0]._focusTimer)
				})
			},
			Y = function() {
				var ag = a(this),
					ah = ag.data(k),
					af = k + "_" + ah.idx,
					ai = a("#mCSB_" + ah.idx + "_container").parent();
				ai.bind("scroll." + af, function(aj) {
					if(ai.scrollTop() !== 0 || ai.scrollLeft() !== 0) {
						a(".mCSB_" + ah.idx + "_scrollbar").css("visibility", "hidden")
					}
				})
			},
			ab = function() {
				var aj = a(this),
					al = aj.data(k),
					ak = al.opt,
					af = al.sequential,
					ah = k + "_" + al.idx,
					ai = ".mCSB_" + al.idx + "_scrollbar",
					ag = a(ai + ">a");
				ag.bind("mousedown." + ah + " touchstart." + ah + " pointerdown." + ah + " MSPointerDown." + ah + " mouseup." + ah + " touchend." + ah + " pointerup." + ah + " MSPointerUp." + ah + " mouseout." + ah + " pointerout." + ah + " MSPointerOut." + ah + " click." + ah, function(ao) {
					ao.preventDefault();
					if(!V(ao)) {
						return
					}
					var an = a(this).attr("class");
					af.type = ak.scrollButtons.scrollType;
					switch(ao.type) {
						case "mousedown":
						case "touchstart":
						case "pointerdown":
						case "MSPointerDown":
							if(af.type === "stepped") {
								return
							}
							U = true;
							al.tweenRunning = false;
							am("on", an);
							break;
						case "mouseup":
						case "touchend":
						case "pointerup":
						case "MSPointerUp":
						case "mouseout":
						case "pointerout":
						case "MSPointerOut":
							if(af.type === "stepped") {
								return
							}
							U = false;
							if(af.dir) {
								am("off", an)
							}
							break;
						case "click":
							if(af.type !== "stepped" || al.tweenRunning) {
								return
							}
							am("on", an);
							break
					}

					function am(ap, aq) {
						af.scrollAmount = ak.snapAmount || ak.scrollButtons.scrollAmount;
						b(aj, ap, aq)
					}
				})
			},
			O = function() {
				var am = a(this),
					al = am.data(k),
					ag = al.opt,
					aq = al.sequential,
					ai = k + "_" + al.idx,
					ah = a("#mCSB_" + al.idx),
					ao = a("#mCSB_" + al.idx + "_container"),
					af = ao.parent(),
					an = "input,textarea,select,datalist,keygen,[contenteditable='true']",
					aj = ao.find("iframe"),
					ap = ["blur." + ai + " keydown." + ai + " keyup." + ai];
				if(aj.length) {
					aj.each(function() {
						a(this).load(function() {
							if(m(this)) {
								a(this.contentDocument || this.contentWindow.document).bind(ap[0], function(ar) {
									ak(ar)
								})
							}
						})
					})
				}
				ah.attr("tabindex", "0").bind(ap[0], function(ar) {
					ak(ar)
				});

				function ak(ax) {
					switch(ax.type) {
						case "blur":
							if(al.tweenRunning && aq.dir) {
								ar("off", null)
							}
							break;
						case "keydown":
						case "keyup":
							var au = ax.keyCode ? ax.keyCode : ax.which,
								av = "on";
							if((ag.axis !== "x" && (au === 38 || au === 40)) || (ag.axis !== "y" && (au === 37 || au === 39))) {
								if(((au === 38 || au === 40) && !al.overflowed[0]) || ((au === 37 || au === 39) && !al.overflowed[1])) {
									return
								}
								if(ax.type === "keyup") {
									av = "off"
								}
								if(!a(document.activeElement).is(an)) {
									ax.preventDefault();
									ax.stopImmediatePropagation();
									ar(av, au)
								}
							} else {
								if(au === 33 || au === 34) {
									if(al.overflowed[0] || al.overflowed[1]) {
										ax.preventDefault();
										ax.stopImmediatePropagation()
									}
									if(ax.type === "keyup") {
										q(am);
										var aw = au === 34 ? -1 : 1;
										if(ag.axis === "x" || (ag.axis === "yx" && al.overflowed[1] && !al.overflowed[0])) {
											var at = "x",
												ay = Math.abs(ao[0].offsetLeft) - (aw * (af.width() * 0.9))
										} else {
											var at = "y",
												ay = Math.abs(ao[0].offsetTop) - (aw * (af.height() * 0.9))
										}
										s(am, ay.toString(), {
											dir: at,
											scrollEasing: "mcsEaseInOut"
										})
									}
								} else {
									if(au === 35 || au === 36) {
										if(!a(document.activeElement).is(an)) {
											if(al.overflowed[0] || al.overflowed[1]) {
												ax.preventDefault();
												ax.stopImmediatePropagation()
											}
											if(ax.type === "keyup") {
												if(ag.axis === "x" || (ag.axis === "yx" && al.overflowed[1] && !al.overflowed[0])) {
													var at = "x",
														ay = au === 35 ? Math.abs(af.width() - ao.outerWidth(false)) : 0
												} else {
													var at = "y",
														ay = au === 35 ? Math.abs(af.height() - ao.outerHeight(false)) : 0
												}
												s(am, ay.toString(), {
													dir: at,
													scrollEasing: "mcsEaseInOut"
												})
											}
										}
									}
								}
							}
							break
					}

					function ar(az, aA) {
						aq.type = ag.keyboard.scrollType;
						aq.scrollAmount = ag.snapAmount || ag.keyboard.scrollAmount;
						if(aq.type === "stepped" && al.tweenRunning) {
							return
						}
						b(am, az, aA)
					}
				}
			},
			b = function(ah, ak, ai, an, at) {
				var ao = ah.data(k),
					ag = ao.opt,
					ar = ao.sequential,
					ap = a("#mCSB_" + ao.idx + "_container"),
					af = ar.type === "stepped" ? true : false,
					am = ag.scrollInertia < 26 ? 26 : ag.scrollInertia,
					aq = ag.scrollInertia < 1 ? 17 : ag.scrollInertia;
				switch(ak) {
					case "on":
						ar.dir = [(ai === f[16] || ai === f[15] || ai === 39 || ai === 37 ? "x" : "y"), (ai === f[13] || ai === f[15] || ai === 38 || ai === 37 ? -1 : 1)];
						q(ah);
						if(g(ai) && ar.type === "stepped") {
							return
						}
						aj(af);
						break;
					case "off":
						al();
						if(af || (ao.tweenRunning && ar.dir)) {
							aj(true)
						}
						break
				}

				function aj(au) {
					var aA = ar.type !== "stepped",
						aE = at ? at : !au ? 1000 / 60 : aA ? am / 1.5 : aq,
						aw = !au ? 2.5 : aA ? 7.5 : 40,
						aD = [Math.abs(ap[0].offsetTop), Math.abs(ap[0].offsetLeft)],
						az = [ao.scrollRatio.y > 10 ? 10 : ao.scrollRatio.y, ao.scrollRatio.x > 10 ? 10 : ao.scrollRatio.x],
						ax = ar.dir[0] === "x" ? aD[1] + (ar.dir[1] * (az[1] * aw)) : aD[0] + (ar.dir[1] * (az[0] * aw)),
						aC = ar.dir[0] === "x" ? aD[1] + (ar.dir[1] * parseInt(ar.scrollAmount)) : aD[0] + (ar.dir[1] * parseInt(ar.scrollAmount)),
						aB = ar.scrollAmount !== "auto" ? aC : ax,
						ay = an ? an : !au ? "mcsLinear" : aA ? "mcsLinearOut" : "mcsEaseInOut",
						av = !au ? false : true;
					if(au && aE < 17) {
						aB = ar.dir[0] === "x" ? aD[1] : aD[0]
					}
					s(ah, aB.toString(), {
						dir: ar.dir[0],
						scrollEasing: ay,
						dur: aE,
						onComplete: av
					});
					if(au) {
						ar.dir = false;
						return
					}
					clearTimeout(ar.step);
					ar.step = setTimeout(function() {
						aj()
					}, aE)
				}

				function al() {
					clearTimeout(ar.step);
					W(ar, "step");
					q(ah)
				}
			},
			p = function(ah) {
				var ag = a(this).data(k).opt,
					af = [];
				if(typeof ah === "function") {
					ah = ah()
				}
				if(!(ah instanceof Array)) {
					af[0] = ah.y ? ah.y : ah.x || ag.axis === "x" ? null : ah;
					af[1] = ah.x ? ah.x : ah.y || ag.axis === "y" ? null : ah
				} else {
					af = ah.length > 1 ? [ah[0], ah[1]] : ag.axis === "x" ? [null, ah[0]] : [ah[0], null]
				}
				if(typeof af[0] === "function") {
					af[0] = af[0]()
				}
				if(typeof af[1] === "function") {
					af[1] = af[1]()
				}
				return af
			},
			aa = function(aj, ak) {
				if(aj == null || typeof aj == "undefined") {
					return
				}
				var ao = a(this),
					an = ao.data(k),
					ai = an.opt,
					ap = a("#mCSB_" + an.idx + "_container"),
					ag = ap.parent(),
					ar = typeof aj;
				if(!ak) {
					ak = ai.axis === "x" ? "x" : "y"
				}
				var af = ak === "x" ? ap.outerWidth(false) : ap.outerHeight(false),
					aq = ak === "x" ? ap[0].offsetLeft : ap[0].offsetTop,
					am = ak === "x" ? "left" : "top";
				switch(ar) {
					case "function":
						return aj();
						break;
					case "object":
						var al = aj.jquery ? aj : a(aj);
						if(!al.length) {
							return
						}
						return ak === "x" ? u(al)[1] : u(al)[0];
						break;
					case "string":
					case "number":
						if(g(aj)) {
							return Math.abs(aj)
						} else {
							if(aj.indexOf("%") !== -1) {
								return Math.abs(af * parseInt(aj) / 100)
							} else {
								if(aj.indexOf("-=") !== -1) {
									return Math.abs(aq - parseInt(aj.split("-=")[1]))
								} else {
									if(aj.indexOf("+=") !== -1) {
										var ah = (aq + parseInt(aj.split("+=")[1]));
										return ah >= 0 ? 0 : Math.abs(ah)
									} else {
										if(aj.indexOf("px") !== -1 && g(aj.split("px")[0])) {
											return Math.abs(aj.split("px")[0])
										} else {
											if(aj === "top" || aj === "left") {
												return 0
											} else {
												if(aj === "bottom") {
													return Math.abs(ag.height() - ap.outerHeight(false))
												} else {
													if(aj === "right") {
														return Math.abs(ag.width() - ap.outerWidth(false))
													} else {
														if(aj === "first" || aj === "last") {
															var al = ap.find(":" + aj);
															return ak === "x" ? u(al)[1] : u(al)[0]
														} else {
															if(a(aj).length) {
																return ak === "x" ? u(a(aj))[1] : u(a(aj))[0]
															} else {
																ap.css(am, aj);
																J.update.call(null, ao[0]);
																return
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
						break
				}
			},
			Z = function(ag) {
				var aj = a(this),
					aw = aj.data(k),
					ap = aw.opt,
					al = a("#mCSB_" + aw.idx + "_container");
				if(ag) {
					clearTimeout(al[0].autoUpdate);
					W(al[0], "autoUpdate");
					return
				}
				var ai = al.parent(),
					af = [a("#mCSB_" + aw.idx + "_scrollbar_vertical"), a("#mCSB_" + aw.idx + "_scrollbar_horizontal")],
					au = function() {
						return [af[0].is(":visible") ? af[0].outerHeight(true) : 0, af[1].is(":visible") ? af[1].outerWidth(true) : 0]
					},
					av = ao(),
					an, ak = [al.outerHeight(false), al.outerWidth(false), ai.height(), ai.width(), au()[0], au()[1]],
					ay, ar = ax(),
					am;
				at();

				function at() {
					clearTimeout(al[0].autoUpdate);
					if(aj.parents("html").length === 0) {
						aj = null;
						return
					}
					al[0].autoUpdate = setTimeout(function() {
						if(ap.advanced.updateOnSelectorChange) {
							an = ao();
							if(an !== av) {
								ah(3);
								av = an;
								return
							}
						}
						if(ap.advanced.updateOnContentResize) {
							ay = [al.outerHeight(false), al.outerWidth(false), ai.height(), ai.width(), au()[0], au()[1]];
							if(ay[0] !== ak[0] || ay[1] !== ak[1] || ay[2] !== ak[2] || ay[3] !== ak[3] || ay[4] !== ak[4] || ay[5] !== ak[5]) {
								ah(ay[0] !== ak[0] || ay[1] !== ak[1]);
								ak = ay
							}
						}
						if(ap.advanced.updateOnImageLoad) {
							am = ax();
							if(am !== ar) {
								al.find("img").each(function() {
									aq(this)
								});
								ar = am
							}
						}
						if(ap.advanced.updateOnSelectorChange || ap.advanced.updateOnContentResize || ap.advanced.updateOnImageLoad) {
							at()
						}
					}, ap.advanced.autoUpdateTimeout)
				}

				function ax() {
					var az = 0;
					if(ap.advanced.updateOnImageLoad) {
						az = al.find("img").length
					}
					return az
				}

				function aq(aC) {
					if(a(aC).hasClass(f[2])) {
						ah();
						return
					}
					var az = new Image();

					function aB(aD, aE) {
						return function() {
							return aE.apply(aD, arguments)
						}
					}

					function aA() {
						this.onload = null;
						a(aC).addClass(f[2]);
						ah(2)
					}
					az.onload = aB(az, aA);
					az.src = aC.src
				}

				function ao() {
					if(ap.advanced.updateOnSelectorChange === true) {
						ap.advanced.updateOnSelectorChange = "*"
					}
					var az = 0,
						aA = al.find(ap.advanced.updateOnSelectorChange);
					if(ap.advanced.updateOnSelectorChange && aA.length > 0) {
						aA.each(function() {
							az += a(this).height() + a(this).width()
						})
					}
					return az
				}

				function ah(az) {
					clearTimeout(al[0].autoUpdate);
					J.update.call(null, aj[0], az)
				}
			},
			L = function(ah, af, ag) {
				return(Math.round(ah / af) * af - ag)
			},
			q = function(af) {
				var ah = af.data(k),
					ag = a("#mCSB_" + ah.idx + "_container,#mCSB_" + ah.idx + "_container_wrapper,#mCSB_" + ah.idx + "_dragger_vertical,#mCSB_" + ah.idx + "_dragger_horizontal");
				ag.each(function() {
					X.call(this)
				})
			},
			s = function(ag, ai, ak) {
				var aA = ag.data(k),
					aw = aA.opt,
					av = {
						trigger: "internal",
						dir: "y",
						scrollEasing: "mcsEaseOut",
						drag: false,
						dur: aw.scrollInertia,
						overwrite: "all",
						callbacks: true,
						onStart: true,
						onUpdate: true,
						onComplete: true
					},
					ak = a.extend(av, ak),
					ay = [ak.dur, (ak.drag ? 0 : ak.dur)],
					al = a("#mCSB_" + aA.idx),
					at = a("#mCSB_" + aA.idx + "_container"),
					ap = at.parent(),
					aC = aw.callbacks.onTotalScrollOffset ? p.call(ag, aw.callbacks.onTotalScrollOffset) : [0, 0],
					af = aw.callbacks.onTotalScrollBackOffset ? p.call(ag, aw.callbacks.onTotalScrollBackOffset) : [0, 0];
				aA.trigger = ak.trigger;
				if(ap.scrollTop() !== 0 || ap.scrollLeft() !== 0) {
					a(".mCSB_" + aA.idx + "_scrollbar").css("visibility", "visible");
					ap.scrollTop(0).scrollLeft(0)
				}
				if(ai === "_resetY" && !aA.contentReset.y) {
					if(aj("onOverflowYNone")) {
						aw.callbacks.onOverflowYNone.call(ag[0])
					}
					aA.contentReset.y = 1
				}
				if(ai === "_resetX" && !aA.contentReset.x) {
					if(aj("onOverflowXNone")) {
						aw.callbacks.onOverflowXNone.call(ag[0])
					}
					aA.contentReset.x = 1
				}
				if(ai === "_resetY" || ai === "_resetX") {
					return
				}
				if((aA.contentReset.y || !ag[0].mcs) && aA.overflowed[0]) {
					if(aj("onOverflowY")) {
						aw.callbacks.onOverflowY.call(ag[0])
					}
					aA.contentReset.x = null
				}
				if((aA.contentReset.x || !ag[0].mcs) && aA.overflowed[1]) {
					if(aj("onOverflowX")) {
						aw.callbacks.onOverflowX.call(ag[0])
					}
					aA.contentReset.x = null
				}
				if(aw.snapAmount) {
					ai = L(ai, aw.snapAmount, aw.snapOffset)
				}
				switch(ak.dir) {
					case "x":
						var an = a("#mCSB_" + aA.idx + "_dragger_horizontal"),
							aq = "left",
							au = at[0].offsetLeft,
							az = [al.width() - at.outerWidth(false), an.parent().width() - an.width()],
							ah = [ai, ai === 0 ? 0 : (ai / aA.scrollRatio.x)],
							aD = aC[1],
							aB = af[1],
							ar = aD > 0 ? aD / aA.scrollRatio.x : 0,
							am = aB > 0 ? aB / aA.scrollRatio.x : 0;
						break;
					case "y":
						var an = a("#mCSB_" + aA.idx + "_dragger_vertical"),
							aq = "top",
							au = at[0].offsetTop,
							az = [al.height() - at.outerHeight(false), an.parent().height() - an.height()],
							ah = [ai, ai === 0 ? 0 : (ai / aA.scrollRatio.y)],
							aD = aC[0],
							aB = af[0],
							ar = aD > 0 ? aD / aA.scrollRatio.y : 0,
							am = aB > 0 ? aB / aA.scrollRatio.y : 0;
						break
				}
				if(ah[1] < 0 || (ah[0] === 0 && ah[1] === 0)) {
					ah = [0, 0]
				} else {
					if(ah[1] >= az[1]) {
						ah = [az[0], az[1]]
					} else {
						ah[0] = -ah[0]
					}
				}
				if(!ag[0].mcs) {
					ax();
					if(aj("onInit")) {
						aw.callbacks.onInit.call(ag[0])
					}
				}
				clearTimeout(at[0].onCompleteTimeout);
				if(!aA.tweenRunning && ((au === 0 && ah[0] >= 0) || (au === az[0] && ah[0] <= az[0]))) {
					return
				}
				G(an[0], aq, Math.round(ah[1]), ay[1], ak.scrollEasing);
				G(at[0], aq, Math.round(ah[0]), ay[0], ak.scrollEasing, ak.overwrite, {
					onStart: function() {
						if(ak.callbacks && ak.onStart && !aA.tweenRunning) {
							if(aj("onScrollStart")) {
								ax();
								aw.callbacks.onScrollStart.call(ag[0])
							}
							aA.tweenRunning = true;
							h(an);
							aA.cbOffsets = ao()
						}
					},
					onUpdate: function() {
						if(ak.callbacks && ak.onUpdate) {
							if(aj("whileScrolling")) {
								ax();
								aw.callbacks.whileScrolling.call(ag[0])
							}
						}
					},
					onComplete: function() {
						if(ak.callbacks && ak.onComplete) {
							if(aw.axis === "yx") {
								clearTimeout(at[0].onCompleteTimeout)
							}
							var aE = at[0].idleTimer || 0;
							at[0].onCompleteTimeout = setTimeout(function() {
								if(aj("onScroll")) {
									ax();
									aw.callbacks.onScroll.call(ag[0])
								}
								if(aj("onTotalScroll") && ah[1] >= az[1] - ar && aA.cbOffsets[0]) {
									ax();
									aw.callbacks.onTotalScroll.call(ag[0])
								}
								if(aj("onTotalScrollBack") && ah[1] <= am && aA.cbOffsets[1]) {
									ax();
									aw.callbacks.onTotalScrollBack.call(ag[0])
								}
								aA.tweenRunning = false;
								at[0].idleTimer = 0;
								h(an, "hide")
							}, aE)
						}
					}
				});

				function aj(aE) {
					return aA && aw.callbacks[aE] && typeof aw.callbacks[aE] === "function"
				}

				function ao() {
					return [aw.callbacks.alwaysTriggerOffsets || au >= az[0] + aD, aw.callbacks.alwaysTriggerOffsets || au <= -aB]
				}

				function ax() {
					var aG = [at[0].offsetTop, at[0].offsetLeft],
						aH = [an[0].offsetTop, an[0].offsetLeft],
						aE = [at.outerHeight(false), at.outerWidth(false)],
						aF = [al.height(), al.width()];
					ag[0].mcs = {
						content: at,
						top: aG[0],
						left: aG[1],
						draggerTop: aH[0],
						draggerLeft: aH[1],
						topPct: Math.round((100 * Math.abs(aG[0])) / (Math.abs(aE[0]) - aF[0])),
						leftPct: Math.round((100 * Math.abs(aG[1])) / (Math.abs(aE[1]) - aF[1])),
						direction: ak.dir
					}
				}
			},
			G = function(ah, ak, ai, ag, ar, aj, aC) {
				if(!ah._mTween) {
					ah._mTween = {
						top: {},
						left: {}
					}
				}
				var aC = aC || {},
					az = aC.onStart || function() {},
					at = aC.onUpdate || function() {},
					aA = aC.onComplete || function() {},
					ap = N(),
					an, al = 0,
					av = ah.offsetTop,
					aw = ah.style,
					aq, ay = ah._mTween[ak];
				if(ak === "left") {
					av = ah.offsetLeft
				}
				var ao = ai - av;
				ay.stop = 0;
				if(aj !== "none") {
					au()
				}
				af();

				function aB() {
					if(ay.stop) {
						return
					}
					if(!al) {
						az.call()
					}
					al = N() - ap;
					ax();
					if(al >= ay.time) {
						ay.time = (al > ay.time) ? al + an - (al - ay.time) : al + an - 1;
						if(ay.time < al + 1) {
							ay.time = al + 1
						}
					}
					if(ay.time < ag) {
						ay.id = aq(aB)
					} else {
						aA.call()
					}
				}

				function ax() {
					if(ag > 0) {
						ay.currVal = am(ay.time, av, ao, ag, ar);
						aw[ak] = Math.round(ay.currVal) + "px"
					} else {
						aw[ak] = ai + "px"
					}
					at.call()
				}

				function af() {
					an = 1000 / 60;
					ay.time = al + an;
					aq = (!window.requestAnimationFrame) ? function(aD) {
						ax();
						return setTimeout(aD, 0.01)
					} : window.requestAnimationFrame;
					ay.id = aq(aB)
				}

				function au() {
					if(ay.id == null) {
						return
					}
					if(!window.requestAnimationFrame) {
						clearTimeout(ay.id)
					} else {
						window.cancelAnimationFrame(ay.id)
					}
					ay.id = null
				}

				function am(aF, aE, aJ, aI, aG) {
					switch(aG) {
						case "linear":
						case "mcsLinear":
							return aJ * aF / aI + aE;
							break;
						case "mcsLinearOut":
							aF /= aI;
							aF--;
							return aJ * Math.sqrt(1 - aF * aF) + aE;
							break;
						case "easeInOutSmooth":
							aF /= aI / 2;
							if(aF < 1) {
								return aJ / 2 * aF * aF + aE
							}
							aF--;
							return -aJ / 2 * (aF * (aF - 2) - 1) + aE;
							break;
						case "easeInOutStrong":
							aF /= aI / 2;
							if(aF < 1) {
								return aJ / 2 * Math.pow(2, 10 * (aF - 1)) + aE
							}
							aF--;
							return aJ / 2 * (-Math.pow(2, -10 * aF) + 2) + aE;
							break;
						case "easeInOut":
						case "mcsEaseInOut":
							aF /= aI / 2;
							if(aF < 1) {
								return aJ / 2 * aF * aF * aF + aE
							}
							aF -= 2;
							return aJ / 2 * (aF * aF * aF + 2) + aE;
							break;
						case "easeOutSmooth":
							aF /= aI;
							aF--;
							return -aJ * (aF * aF * aF * aF - 1) + aE;
							break;
						case "easeOutStrong":
							return aJ * (-Math.pow(2, -10 * aF / aI) + 1) + aE;
							break;
						case "easeOut":
						case "mcsEaseOut":
						default:
							var aH = (aF /= aI) * aF,
								aD = aH * aF;
							return aE + aJ * (0.499999999999997 * aD * aH + -2.5 * aH * aH + 5.5 * aD + -6.5 * aH + 4 * aF)
					}
				}
			},
			N = function() {
				if(window.performance && window.performance.now) {
					return window.performance.now()
				} else {
					if(window.performance && window.performance.webkitNow) {
						return window.performance.webkitNow()
					} else {
						if(Date.now) {
							return Date.now()
						} else {
							return new Date().getTime()
						}
					}
				}
			},
			X = function() {
				var ah = this;
				if(!ah._mTween) {
					ah._mTween = {
						top: {},
						left: {}
					}
				}
				var ag = ["top", "left"];
				for(var af = 0; af < ag.length; af++) {
					var ai = ag[af];
					if(ah._mTween[ai].id) {
						if(!window.requestAnimationFrame) {
							clearTimeout(ah._mTween[ai].id)
						} else {
							window.cancelAnimationFrame(ah._mTween[ai].id)
						}
						ah._mTween[ai].id = null;
						ah._mTween[ai].stop = 1
					}
				}
			},
			W = function(ah, af) {
				try {
					delete ah[af]
				} catch(ag) {
					ah[af] = null
				}
			},
			V = function(af) {
				return !(af.which && af.which !== 1)
			},
			S = function(ag) {
				var af = ag.originalEvent.pointerType;
				return !(af && af !== "touch" && af !== 2)
			},
			g = function(af) {
				return !isNaN(parseFloat(af)) && isFinite(af)
			},
			u = function(af) {
				var ag = af.parents(".mCSB_container");
				return [af.offset().top - ag.offset().top, af.offset().left - ag.offset().left]
			};
		a.fn[n] = function(af) {
			if(J[af]) {
				return J[af].apply(this, Array.prototype.slice.call(arguments, 1))
			} else {
				if(typeof af === "object" || !af) {
					return J.init.apply(this, arguments)
				} else {
					a.error("Method " + af + " does not exist")
				}
			}
		};
		a[n] = function(af) {
			if(J[af]) {
				return J[af].apply(this, Array.prototype.slice.call(arguments, 1))
			} else {
				if(typeof af === "object" || !af) {
					return J.init.apply(this, arguments)
				} else {
					a.error("Method " + af + " does not exist")
				}
			}
		};
		a[n].defaults = H;
		window[n] = true;
		a(window).load(function() {
			a(e)[n]();
			a.extend(a.expr[":"], {
				mcsInView: a.expr[":"].mcsInView || function(ag) {
					var af = a(ag),
						ai = af.parents(".mCSB_container"),
						aj, ah;
					if(!ai.length) {
						return
					}
					aj = ai.parent();
					ah = [ai[0].offsetTop, ai[0].offsetLeft];
					return ah[0] + u(af)[0] >= 0 && ah[0] + u(af)[0] < aj.height() - af.outerHeight(false) && ah[1] + u(af)[1] >= 0 && ah[1] + u(af)[1] < aj.width() - af.outerWidth(false)
				},
				mcsOverflow: a.expr[":"].mcsOverflow || function(af) {
					var ag = a(af).data(k);
					if(!ag) {
						return
					}
					return ag.overflowed[0] || ag.overflowed[1]
				}
			})
		})
	}))
}));