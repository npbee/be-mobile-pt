import scrollSpy from "./scrollSpy";

const globalNav = document.getElementById("global-nav");
const $navEls = Array.prototype.slice.call(globalNav.querySelectorAll("a"));
const easing = t => t * (2 - t);
const DURATION = 300;

const now = () =>
    "now" in window.performance ? performance.now() : new Date().getTime();

const makeNavActive = el => {
    $navEls.forEach($el => {
        if ($el === el) {
            $el.classList.add("active");
        } else {
            $el.classList.remove("active");
        }
    });
};

function scrollIt(destination, callback) {
    const start = window.pageYOffset;
    const startTime = now();
    const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName("body")[0].clientHeight;
    const destinationOffset = destination.offsetTop;
    const destinationOffsetToScroll = Math.round(
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

        const target = e.target;
        const href = target.getAttribute("href");
        const sectionTarget = document.getElementById(href.slice(1));

        if (sectionTarget) {
            scrollIt(sectionTarget, function() {
                history.replaceState(null, null, href);
            });
        }
    });
}

export default function initNav() {
    listenForNavClicks();
    scrollSpy($navEls, makeNavActive);
}
