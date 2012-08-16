/*jslint browser: true */

var Progressive = (function () {

	"use strict";

	var enhance = function (enhancements) {
		var styleElem = document.createElement("style"),
			ruleText = "",
			styleRules,
			enhancement,
			onNodeInserted = function (e) {
				var enhancement = enhancements[e.animationName];
				if (enhancement) {
					enhancement.callback(e);
				}
			};

		for (enhancement in enhancements) {
			if (enhancements.hasOwnProperty(enhancement)) {
				ruleText += enhancements[enhancement].selector + "{";
				ruleText += "animation-duration:0.001s;";
				ruleText += "-o-animation-duration:0.001s;";
				ruleText += "-ms-animation-duration: 0.001s;";
				ruleText += "-moz-animation-duration: 0.001s;";
				ruleText += "-webkit-animation-duration:0.001s;";
				ruleText += "animation-name:" + enhancement + ";";
				ruleText += "-o-animation-name:" + enhancement + ";";
				ruleText += "-ms-animation-name:" + enhancement + ";";
				ruleText += "-moz-animation-name:" + enhancement + ";";
				ruleText += "-webkit-animation-name:" + enhancement + ";";
				ruleText += "}";
				ruleText += "@keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
				ruleText += "@-o-keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
				ruleText += "@-ms-keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
				ruleText += "@-moz-keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
				ruleText += "@-webkit-keyframes " + enhancement + "{from{clip:rect(1px,auto,auto,auto);}to{clip:rect(0px,auto,auto,auto);}}";
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
	};

	return {
		enhance: enhance
	};

}());