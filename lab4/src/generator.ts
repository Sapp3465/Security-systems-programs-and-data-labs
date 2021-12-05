import { prime } from "node-forge";

export const generateSimple = (bits: number) => new Promise(((resolve, reject) => {
    prime.generateProbablePrime(bits, function(err, num) {
        if(err) {
            reject(err);
            return resolve('');
        }
        return resolve(num);
    });
}))
