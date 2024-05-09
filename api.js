const axios = require('axios');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const config = require('./config')


function btoa(str) {
    return Buffer.from(str, 'binary').toString('base64');
}

axios.execReq = async function(options) {
    let optionsBase64 = btoa(JSON.stringify(options));
    var result
    try {
        result = await exec(`"${config.certificateByPassPath}" "${optionsBase64}"`);
        return JSON.parse(result.stdout);
    } catch (err) {
        console.log('Exec request error:', err, result);
        throw err;
    }
};

module.exports = axios;