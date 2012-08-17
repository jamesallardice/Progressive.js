/*jslint browser: true, plusplus: true */

var Progressive = (function () {

	"use strict";

	var styleElem = document.createElement("style"),
		animationSupport = false,
		animationString,
		keyframePrefix,
		domPrefixes = ["Webkit", "Moz", "O", "ms", "Khtml"],
		numPrefixes = domPrefixes.length,
		prefix,
		enhance,
		i;

	document.getElementsByClassName = document.getElementsByClassName || function (className) {
		var classElements = [],
			els,
			elsLen,
			pattern = new RegExp("(^|\\s)" + className + "(\\s|$)"),
			i,
			j;
		els = document.getElementsByTagName("*");
		elsLen = els.length;
		for (i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	};

	if (styleElem.style.animationName) {
		animationSupport = true;
	} else {
		for (i = 0; i < numPrefixes; i++) {
			if (styleElem.style[domPrefixes[i] + "AnimationName"] !== undefined) {
				prefix = domPrefixes[i];
				animationString = prefix + "Animation";
				keyframePrefix = "-" + prefix.toLowerCase() + "-";
				animationSupport = true;
				break;
			}
		}
	}

	enhance = function (enhancements) {
		var ruleText,
			styleRules = {},
			enhancement,
			onNodeInserted,
			fallback = function () {
				var enhancement,
					elems,
					numElems,
					i;
				for (enhancement in enhancements) {
					if (enhancements.hasOwnProperty(enhancement)) {
						elems = document.getElementsByClassName(enhancements[enhancement].className);
						numElems = elems.length;
						if (!enhancements[enhancement].count || enhancements[enhancement].count < numElems) {
							for (i = 0; i < numElems; i++) {
								enhancements[enhancement].callback.call(elems[i]);
							}
						}
					}
				}
			};
		ruleText = "";
		onNodeInserted = function (e) {
			var enhancement = enhancements[e.animationName];
			enhancement.count = ++enhancement.count || 1;
			if (enhancement) {
				enhancement.callback.call(e.target);
			}
		};

		if (animationSupport) {
			for (enhancement in enhancements) {
				if (enhancements.hasOwnProperty(enhancement)) {
					ruleText += "." + enhancements[enhancement].className + "{";
					ruleText += keyframePrefix + "animation-duration:0.001s;";
					ruleText += keyframePrefix + "animation-name:" + enhancement + ";";
					ruleText += "}";
					ruleText += "@" + keyframePrefix + "keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
				}
			}

			styleRules = document.createTextNode(ruleText);
			styleElem.type = "text/css";
			if (styleElem.styleSheet) {
				styleElem.styleSheet.cssText = styleRules.nodeValue;
			} else {
				styleElem.appendChild(styleRules);
			}

			document.getElementsByTagName("script")[0].parentNode.appendChild(styleElem);

			document.addEventListener("animationstart", onNodeInserted, false);
			document.addEventListener("oanimationstart", onNodeInserted, false);
			document.addEventListener("MSAnimationStart", onNodeInserted, false);
			document.addEventListener("webkitAnimationStart", onNodeInserted, false);
		}

		if (window.addEventListener) {
			window.addEventListener("load", fallback);
		} else if (window.attachEvent) {
			window.attachEvent("onload", fallback);
		}
	};

	return {
		enhance: enhance
	};

}());