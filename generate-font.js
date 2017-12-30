const TextToSVG = require("text-to-svg");
const path = require("path");
const fs = require("fs");

const textToSVG = TextToSVG.loadSync(
    path.resolve("/Users/npb/Library/Fonts/Junction-regular.otf")
);

const attributes = { fill: "red", stroke: "black" };
const options = {
    x: 0,
    y: 0,
    fontSize: 72,
    anchor: "top",
    attributes: attributes
};

const svg = textToSVG.getSVG("BeMobilePT", options);

fs.writeFile("./public/img/logo-generated.svg", svg);
