(function () {
'use strict';

var QUOTES = [
    {
        quote:
            "I worked with Andrew after having two hip surgeries in 2016. From the first day we met I knew he took PT seriously and was ready to work. It was a long and productive time of therapy. Andrew consistently changed things up allowing my recovery a quicker healing time. I would recommend using him to anyone.",
        cite: "Riley"
    },
    {
        quote:
            "Andrew has helped me to walk again and improved my energy level. People are noticing how healthy I am looking and how well I am walking. Andrew is caring, kind, thorough, considerate, knowledgeable and absolutely wonderful. I am definitely passing his name around to others.",
        cite: "Paula"
    },
    {
        quote:
            "I would highly recommend Dr. Ball as a physical therapist! He is a true professional with great knowledge of healing and strengthening the body. I was a collegiate athlete-and with three ACL tears and other injuries- I've been around the profession for quite sometime. Andrew gave me great tips on how to heal and took the time to listen to creatively come up with solutions. The technique and personality combined make him one of the best in the country! Now, I'm trail running three times a week and in better shape than I've ever been. Grateful for the specific and unique care I received from Andrew.",
        cite: "Zach"
    },
    {
        quote:
            "I was a patient of Andrew’s and I can not say enough good things about him! He is an amazing Physical Therapist and helped me improve after a difficult start to my rehab for a torn ACL/meniscus at a different PT clinic. Andrew is patient, very knowledgeable and does everything he can to help his patients restore maximum improvement after injury.  Thank you Andrew for helping me succeed and recover from my injury!",
        cite: "Angela"
    }
];

var SPEED = 7000;
var timer;
var currentQuote = 0;
var menu = document.getElementById("dot-menu");
var quote = document.getElementById("quote");
var cite = document.getElementById("cite");
var blockquote = document.getElementById("blockquote");

function setActiveDot(index) {
    var dots = Array.prototype.slice.call(menu.childNodes);

    dots.forEach(function (dot, i) {
        if (i === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function queueChange() {
    clearTimeout(timer);

    timer = setTimeout(function() {
        var nextIndex = (currentQuote + 1) % QUOTES.length;
        setActiveQuote(nextIndex);
    }, SPEED);
}

function setActiveQuote(index) {
    var nextQuote = QUOTES[index];
    currentQuote = index;
    clearTimeout(timer);

    function onTransitionEnd() {
        quote.textContent = nextQuote.quote;
        cite.textContent = nextQuote.cite;
        setActiveDot(index);
        blockquote.style.opacity = 1;
        blockquote.removeEventListener("transitionend", onTransitionEnd);
        queueChange();
    }

    blockquote.addEventListener("transitionend", onTransitionEnd);
    blockquote.style.opacity = 0;
}

function initMenu() {
    var quoteCount = QUOTES.length;
    var fragment = document.createDocumentFragment();
    var i;

    for (i = 0; i < quoteCount; i++) {
        var dot = document.createElement("div");
        var dotInner = document.createElement("div");
        dot.classList.add("dot");
        dotInner.classList.add("dot-inner");
        dot.setAttribute("data-index", i);
        dot.appendChild(dotInner);

        if (i === 0) {
            dot.classList.add("active");
        }
        fragment.appendChild(dot);
    }

    menu.appendChild(fragment);

    menu.addEventListener("click", function(e) {
        var target = e.target;

        if (target === menu) {
            return;
        }

        while (target.parentNode !== menu) {
            target = target.parentNode;
        }

        var index = target.dataset.index;

        if (index) {
            index = parseInt(index, 10);
            setActiveQuote(index);
        }
    });
}

function initReviews () {
    initMenu();
    queueChange();
}

var isBottom = function (pos) { return window.innerHeight + pos >= document.body.offsetHeight; };
var getSectionId = function (anchor) { return anchor.getAttribute("href").slice(1); };

function scrollSpy($navEls, onActive) {
    var targets = $navEls.map(function(anchor) {
        var id = getSectionId(anchor);
        var el = document.getElementById(id);

        return {
            nav: anchor,
            id: id,
            el: el,
            offset: el.offsetTop
        };
    });

    var lastScrollY = window.scrollY;
    var ticking = false;

    function update() {
        ticking = false;
        var top = lastScrollY;
        var noneActive = true;

        targets.forEach(function(target) {
            if (top >= target.offset - 30) {
                onActive(target.nav);
                noneActive = false;
            }
        });

        if (isBottom(top)) {
            onActive(targets[targets.length - 1].nav);
        }

        if (noneActive) {
            onActive(null);
        }
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    window.addEventListener("scroll", onScroll);
}

var globalNav = document.getElementById("global-nav");
var $navEls = Array.prototype.slice.call(globalNav.querySelectorAll("a"));
var easing = function (t) { return t * (2 - t); };
var DURATION = 300;

var now = function () { return "now" in window.performance ? performance.now() : new Date().getTime(); };

var makeNavActive = function (el) {
    $navEls.forEach(function ($el) {
        if ($el === el) {
            $el.classList.add("active");
        } else {
            $el.classList.remove("active");
        }
    });
};

function scrollIt(destination, callback) {
    var start = window.pageYOffset;
    var startTime = now();
    var documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    var windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;
    var destinationOffset = destination.offsetTop;
    var destinationOffsetToScroll = Math.round(
        documentHeight - destinationOffset < windowHeight
            ? documentHeight - windowHeight
            : destinationOffset
    );

    if ("requestAnimationFrame" in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }

    function scroll() {
        var _now = now();
        var time = Math.min(1, (_now - startTime) / DURATION);
        var timeFunction = easing(time);
        window.scroll(
            0,
            Math.ceil(
                timeFunction * (destinationOffsetToScroll - start) + start
            )
        );

        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}

function listenForNavClicks() {
    globalNav.addEventListener("click", function(e) {
        e.preventDefault();

        var target = e.target;
        var href = target.getAttribute("href");
        var sectionTarget = document.getElementById(href.slice(1));

        if (sectionTarget) {
            scrollIt(sectionTarget, function() {
                history.replaceState(null, null, href);
            });
        }
    });
}

function initNav() {
    listenForNavClicks();
    scrollSpy($navEls, makeNavActive);
}

initReviews();
initNav();

}());
//# sourceMappingURL=app.js.map
