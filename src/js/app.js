(function() {
    /**
     * Reviews
     *
     */
    var quote = document.getElementById("quote");
    var cite = document.getElementById("cite");
    var blockquote = document.getElementById("blockquote");

    var currentQuote = -1;
    var quotes = [
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

    setInterval(function() {
        currentQuote = (currentQuote + 1) % quotes.length;
        var nextQuote = quotes[currentQuote];

        blockquote.style.opacity = 0;

        setTimeout(function() {
            quote.textContent = nextQuote.quote;
            cite.textContent = nextQuote.cite;

            blockquote.style.opacity = 1;
        }, 300);
    }, 6000);

    // Sticky header
    var header = document.querySelector("#header");
    var main = document.querySelector("#main");
    var lastScrollY = 0;
    var scheduledAnimationFrame = false;

    function updateScrollValues() {
        scheduledAnimationFrame = false;

        if (lastScrollY > header.offsetTop) {
            document.body.classList.add("sticky");
            main.style.paddingTop = header.offsetHeight + "px";
        } else {
            document.body.classList.remove("sticky");
            main.style.paddingTop = 0;
        }
    }

    function onScroll(evt) {
        lastScrollY = window.scrollY;

        if (scheduledAnimationFrame) {
            return;
        }

        scheduledAnimationFrame = true;
        requestAnimationFrame(updateScrollValues);
    }

    document.addEventListener("scroll", onScroll);
})();
