const crypto = require('crypto');


const aes = {};

aes.generateKey = (secret) => {
    if (secret == undefined) {
        return crypto.randomBytes(16);
    }
    else {
        const hash = crypto.createHash('sha512');
        hash.update(secret + 'AES128GCM');
        var key = hash.digest().slice(0, 16);
        return key;
    }
};

aes.encrypt = (msg, key) => {
    var iv = crypto.randomBytes(16);
    var cipher = crypto.createCipheriv('aes-128-gcm', key, iv);
    var ct = cipher.update(msg, 'utf8');
    ct = Buffer.concat([ct, cipher.final()]);
    return Buffer.concat([iv, cipher.getAuthTag(), ct]).toString('hex'); 
};

aes.decrypt = (ciphertext, key) => {
    var ct = Buffer.from(ciphertext, 'hex');
    var iv = ct.slice(0, 16);
    var authTag = ct.slice(16, 32);
    var decipher = crypto.createDecipheriv('aes-128-gcm', key, iv);
    decipher.setAuthTag(authTag);
    var msg = decipher.update(ct.slice(32)).toString('utf8');
    return msg;
};

module.exports = aes;
