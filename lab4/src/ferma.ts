import big from "big.js";

export const ferma : (n : big) => big[] = (n ) => {
    if (n.mod(2).eq(0)) return [big(2), n.div(2)]
    let b, a = big(n).sqrt().round(0, 3);
    if (a.pow(2).eq(n)) return [a, a];
    while (true) {
        let potential_answer = a.pow(2).minus(n);
        b = big(potential_answer).sqrt().round(0, 3);
        if (b.pow(2).eq(potential_answer)) break
        a = a.plus(1);
    }
    return [a.minus(b), a.plus(b)]
}

export const isSimple = (n: big) => ferma(n)[0].eq(1);
