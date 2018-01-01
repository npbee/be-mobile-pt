import buble from "rollup-plugin-buble";
import uglify from "rollup-plugin-uglify";

const isProd = process.env.NODE_ENV === "production";

export default {
    input: "./src/js/app.js",
    output: {
        file: "./dist/js/app.js",
        format: "iife",
        name: "bmpt",
        sourcemap: !isProd
    },
    plugins: [buble(), isProd ? uglify() : {}],
    watch: {
        clearScreen: false
    }
};
