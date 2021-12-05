import {generateSimple} from "./src/generator";
import {isSimple} from "./src/ferma";
import big from "big.js";

(async () => {
    const bits = 64;
    const num1 = await generateSimple(bits);
    const num2 = await generateSimple(bits);

    const isNum1Simple = isSimple(big(num1.toString()))
    const isNum2Simple = isSimple(big(num2.toString()))

    console.log(`num 1: ${num1.toString()}, is simple: ${isNum1Simple}`);
    console.log(`num 2: ${num2.toString()}, is simple: ${isNum2Simple}`);
})()
