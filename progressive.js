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
			styleRules,
			enhancement,
			onNodeInserted;
		if (animationSupport) {
			ruleText = "";
			onNodeInserted = function (e) {
				var enhancement = enhancements[e.animationName];
				if (enhancement) {
					enhancement.callback(e);
				}
			};
			for (enhancement in enhancements) {
				if (enhancements.hasOwnProperty(enhancement)) {
					ruleText += enhancements[enhancement].selector + "{";
					ruleText += keyframePrefix + "animation-duration:0.001s;";
					ruleText += keyframePrefix + "animation-name:" + enhancement + ";";
					ruleText += "}";
					ruleText += "@" + keyframePrefix + "keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
				}
			}

			styleRules = document.createTextNode(ruleText);

			if (styleElem.styleSheet) {
				styleElem.styleSheet.cssText = styleRules.nodeValue;
			} else {
				styleElem.appendChild(styleRules);
			}

			document.getElementsByTagName("script")[0].parentNode.appendChild(styleElem);

			document.addEventListener("animationstart", onNodeInserted, false);
			document.addEventListener("MSAnimationStart", onNodeInserted, false);
			document.addEventListener("webkitAnimationStart", onNodeInserted, false);
		}
		// TODO: CSS animations are not supported... fall back to DOM loaded
	};

	return {
		enhance: enhance
	};

}());