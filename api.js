const axios = require('axios');
const https = require('https');
const fs = require('fs');

const certData = fs.readFileSync("./certs/gwm_general.cer",{encoding: 'utf8'});
const certKey = fs.readFileSync("./certs/gwm_general.key",{encoding: 'utf8'});
const ca = fs.readFileSync("./certs/gwm_root.cer",{encoding: 'utf8'});

const httpsAgent = new https.Agent({
    cert: certData,
    ca: ca,
    key:certKey,
    rejectUnauthorized: false,
    ciphers: "DEFAULT:@SECLEVEL=0"
});

axios.defaults.httpsAgent = httpsAgent;

module.exports = axios;