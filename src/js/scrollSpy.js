const isBottom = pos => window.innerHeight + pos >= document.body.offsetHeight;
const getSectionId = anchor => anchor.getAttribute("href").slice(1);

export default function scrollSpy($navEls, onActive) {
    const targets = $navEls.map(function(anchor) {
        var id = getSectionId(anchor);
        var el = document.getElementById(id);

        return {
            nav: anchor,
            id,
            el,
            offset: el.offsetTop
        };
    });

    let lastScrollY = window.scrollY;
    let ticking = false;

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
