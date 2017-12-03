// JS lint

/*jslint browser: true*/
/*global alert, func, document, window, setTimeout*/
/*jslint plusplus: true */

// JS lint - END



// Require dependencies for this module

var isCollection = function (el) {
    if (el === undefined) return false;

    var protoName = el.toString();

    return (
        protoName.indexOf("HTMLCollection") != -1 ||
        protoName.indexOf("NodeList") != -1 ||
        Array.isArray(el)
    );
},
callEach = function (el, callback) {
	if (isCollection(el)) {
		functions.forEach(el, callback);
	} else {
		callback(el);
	}
}

var functions = {
	
    addEventListener: function (el, eventNames, callback, parent) {
        if (parent) {
            callEach(parent, function (e) {
                eventNames.split(" ").forEach(function (eventName) {
                    e.addEventListener(eventName, callback);
                });
            });
        } else {
            callEach(el, function (e) {
                eventNames.split(" ").forEach(function (eventName) {
                    e.addEventListener(eventName, callback);
                });
            });
        }
	},
	
	forEach: function (elements, callback) {
		Array.prototype.forEach.call(elements, callback);
	},
	
	hasClass: function (el, className) {
		if (isCollection(el)) {
			el = el[0];
		}

		return el.classList.contains(className);
	},
	
	setStyle: function (el, property, styleValue) {
		callEach(el, function (e) {
			e.style[property] = styleValue;
		});
	},
	
	select: function (selector, parent) {
        if (isCollection(parent)) {
            parent = parent[0];
        }

        if (!parent) {
            parent = document;
        }

        if (selector.indexOf(" ") === -1 && selector.indexOf(":") === -1) {
            if (selector.lastIndexOf(".") === 0) {
                return parent.getElementsByClassName(selector.substring(1));
            }

            if (selector.lastIndexOf("#") === 0) {
                return parent.getElementById(selector.substring(1));
            }
        }

        return parent.querySelectorAll(selector);
	},
	
    toggleClass: function (el, className) {
        callEach(el, function (e) {
            e.classList.toggle(className);
        });
	}
}

// Short hand for functions
var f = functions;



// Settings

var numberOfReferences = f.select(".references .page").length, // Defining number of references

    pageWidth = 0.8; // Both for .portfolio and .references
//    pageMargin = (1 - pageWidth) / 2; // Both for .portfolio and .references

// Settings - END



function listShowLowPriority() {
	f.toggleClass(f.select('.experience'), 'priorityLowVisible');
			
	setTimeout(function () {
		f.toggleClass(f.select('.priorityLow'), 'hidden');
	}, 100);
}

function listHideLowPriority() {
	f.toggleClass(f.select('.priorityLow'), 'hidden');
	
	setTimeout(function () {
		f.toggleClass(f.select('.experience'), 'priorityLowVisible');
	}, 300);
}



// Document Load

window.onload = function() {
	
// Show more / less

	f.addEventListener(f.select('.toggleExperience'), 'click', function () {
		
		if (!f.hasClass(f.select('.experience'), 'priorityLowVisible')) {
			
			listShowLowPriority();
		} else {
			
			listHideLowPriority();
		}
	});
	
// Show more / less - END
	
	
	
// Width of Portfolio & References
	
	f.setStyle(f.select('.references .horizontalWrapper'), 'width', numberOfReferences * pageWidth * 50 + "%");
	f.setStyle(f.select('.references article.page'), 'width', 100 / numberOfReferences + "%");

// Width of Portfolio & References - END
	
	
	
}

// Document Load - END



//// Google Analytics
//
//var _gaq = _gaq || [];
//_gaq.push(['_setAccount', 'UA-16176823-1']);
//_gaq.push(['_trackPageview']);
//
//(function () {
//    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//})();
//
//// Google Analytics - END