const QUOTES = [
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

const SPEED = 7000;
let timer;
let currentQuote = 0;
const menu = document.getElementById("dot-menu");
const quote = document.getElementById("quote");
const cite = document.getElementById("cite");
const blockquote = document.getElementById("blockquote");

function setActiveDot(index) {
    var dots = Array.prototype.slice.call(menu.childNodes);

    dots.forEach((dot, i) => {
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

export default () => {
    initMenu();
    queueChange();
};
