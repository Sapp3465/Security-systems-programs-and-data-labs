import NodeRSA from 'encrypt-rsa';
import * as fs from 'fs';

const algorithm = new NodeRSA();

const { privateKey, publicKey } = algorithm.createPrivateAndPublicKeys()

fs.writeFileSync('./private-key', privateKey);
fs.writeFileSync('./public-key', publicKey);

const encryptedText = algorithm.encryptStringWithRsaPublicKey({
    text: 'some text that i want to encrypted',
    keyPath: __dirname + '/public-key'
});

console.log({ encryptedText });

const decryptedText = algorithm.decryptStringWithRsaPrivateKey({
    text: encryptedText,
    keyPath: __dirname + '/private-key'
});

console.log({ decryptedText });
