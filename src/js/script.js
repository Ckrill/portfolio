// JS lint

/*jslint browser: true*/
/*global $, jQuery, alert, func*/
/*jslint plusplus: true */

// JS lint - END



// Settings

var numberOfVerticalPages = $(".verticalWrapper section").length,
    numberOfProjects = $(".portfolio .page").length, // Defining number of portfolio
    numberOfReferences = $(".references .page").length, // Defining number of references

    scrollSpeed = 400,
    pageWidth = 0.8, // Both for .portfolio and .references
    pageMargin = (1 - pageWidth) / 2; // Both for .portfolio and .references

// Settings - END



// Keypress mechanics

var activePage = 0;
var activePagePortfolio = 0;
var activePageReferences = 0;

var screenHeight = 0;
var screenWidth = 0;

var positionTop = 0;
var positionLeft = 0;

function calcPosition(activeVertical) {
	if (activeVertical === 0) {
		positionTop = $(window).scrollTop();
	} else if (activeVertical === 1) {
		positionLeft = $(".portfolio").scrollLeft();
	} else if (activeVertical === 2) {
		positionLeft = $(".references").scrollLeft();
	}
}

function calcScreen(direction) {
	if (direction === "vertical") {
		
		screenHeight = $(window).height();
		
	} else if (direction === "horizontal") {
		
		screenWidth = $(window).width();
		
	}
}

function calcPage(direction, activeVertical) {
	if (activeVertical === 0) {
		
		calcPosition(activeVertical);
//console.log("calcPage: positionTop: " + positionTop);
		calcScreen(direction);
//console.log("calcPage: screenHeight: " + screenHeight);
		activePage = Math.round(positionTop / screenHeight);
//console.log("calcPage: activePage: " + activePage);
		
	} else if (activeVertical === 1) {
		
		calcPosition(activeVertical);
//console.log("calcPage: positionLeft: " + positionLeft);
		calcScreen(direction);
//console.log("calcPage: screenWidth: " + screenWidth);
		activePagePortfolio = Math.round(positionLeft / (screenWidth * pageWidth));
//console.log("calcPage: activePagePortfolio: " + activePagePortfolio);
		
	} else if (activeVertical === 2) {
		
		calcPosition(activeVertical);
//console.log("calcPage: positionLeft: " + positionLeft);
		calcScreen(direction);
//console.log("calcPage: screenWidth: " + screenWidth);
//		activePageReferences = Math.round(positionLeft / (screenWidth * pageWidth)); // scroll a full page
		activePageReferences = Math.round(positionLeft / (screenWidth * 0.4)); // scroll a half page
//console.log("calcPage: activePageReferences: " + activePageReferences);
	}
}

function navigateKey(direction, plusMinus) {
	
	calcPage("vertical", 0);
	
	if (direction === "vertical") {

		calcPage(direction, 0);
		
        $("html, body").animate({scrollTop: (activePage + plusMinus) * screenHeight}, scrollSpeed);
		
		activePage = activePage + plusMinus;
		
//	} else if (direction == "horizontal" && activePage > 1) { ***** Dette er ændret for at få slideren til at virke på references i stedet for portfolio *****
	} else if (direction === "horizontal" && activePage === 1) {
		
		calcPage(direction, 2);
//        console.log(activePageReferences, plusMinus, screenWidth, pageWidth, screenWidth, pageMargin);
//		$(".references").animate({scrollLeft: (activePageReferences + plusMinus) * (screenWidth * pageWidth) - (screenWidth * pageMargin)}, scrollSpeed); // Scrolls a full screen
        $(".references").animate({scrollLeft: ((activePageReferences + plusMinus) * (screenWidth * pageWidth) - (screenWidth * pageMargin)) * .5}, scrollSpeed); // only scrolls a half screen
        
		activePageReferences = activePageReferences + plusMinus;
	}
}

// Keypress mechanics - END



// Hide iOS address

window.addEventListener("load", function () { // When ready...
    setTimeout(function () { // Set a timeout...
        window.scrollTo(0, 1); // Hide the address bar!
    }, 0);
});

// Hide iOS address - END



// Document Ready

$(document).ready(function () {



// Width of Portfolio & References

	$(".portfolio .horizontalWrapper").css("width", numberOfProjects * pageWidth * 100 + "%");
	$(".portfolio article.page").css("width", 100 / numberOfProjects + "%");
	
//	$(".references .horizontalWrapper").css("width", numberOfReferences * pageWidth * 100 + "%"); // 100 means that a page takes up the whole width
	$(".references .horizontalWrapper").css("width", numberOfReferences * pageWidth * 50 + "%");
	$(".references article.page").css("width", 100 / numberOfReferences + "%");

// Width of Portfolio & References - END



// Fit Text

	$("h1").fitText(1.3, { minFontSize: '26px', maxFontSize: '60px' });
	$("h2").fitText(2.3, { minFontSize: '18px', maxFontSize: '40px' });
	$(".w50 ul").fitText(3.5, { minFontSize: '12px', maxFontSize: '16px' });
	$(".w100 p").fitText(6, { minFontSize: '12px', maxFontSize: '14px' });
	$(".description").fitText(8, { minFontSize: '12px', maxFontSize: '20px' });
	
// Fit Text - END



// if iOS, add class (I used this to override vmin etc.)
    
	var iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
	if (iOS === true) {
		$("html").addClass("iOS");
	}
    
// if iOS, add class - END

    
    
    $(".toggleExperience").click(function () {
        if (!$('.experience').hasClass("priorityLowVisible")) {
            $('.priorityLow').slideToggle().delay(100).queue(function(){
                $('.experience').toggleClass("priorityLowVisible").dequeue();
            });
        } else {
            $('.experience').toggleClass("priorityLowVisible").delay(100).queue(function(){
                $('.priorityLow').slideToggle().dequeue();
            });
        }
		});

});

// Document Ready - END



// Key bindings

$(document).keyup(function (e) {
	if (e.which === 37) { // Left
        navigateKey("horizontal", -1);
	}
	if (e.which === 39) { // Right
		navigateKey("horizontal", +1);
	}
	if (e.which === 38) { // Up
		if ($(document).height() <= $(window).height() * numberOfVerticalPages) { // No scroll if window is too small
			navigateKey("vertical", -1);
		}
	}
	if (e.which === 40) { // Down
		if ($(document).height() <= $(window).height() * numberOfVerticalPages) { // No scroll if window is too small
			navigateKey("vertical", +1);
		}
	}
});

// Key bindings - END



// Google Analytics

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-16176823-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// Google Analytics - END