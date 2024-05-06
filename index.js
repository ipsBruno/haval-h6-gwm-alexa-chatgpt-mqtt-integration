const https = require("https")
const axios = require("axios")

const forge = require('node-forge');
const fs = require('fs');

// this is useful late for mqtt requests
class CertificateHandler {
  constructor() {
    this.certPem = fs.readFileSync('gwm_general.cer', 'utf8');
    this.chainPem = fs.readFileSync('gwm_root.pem', 'utf8');
    this.keyBase64 = fs.readFileSync('gwm_general.key', 'utf8');

    this.certificate = forge.pki.certificateFromPem(this.certPem);// you need convert .cer at .pem in this point
    this.chain = forge.pki.certificateFromPem(this.chainPem);

    const keyDer = atob(this.keyBase64);
    const asn1 = forge.asn1.fromDer(keyDer);
    this.privateKey = forge.pki.privateKeyFromAsn1(asn1);
    //Do stuff RCA calculations to request 
  }

  getCertificateWithPrivateKey() {


    return {
      cert: forge.pki.certificateToPem(this.certificate) + forge.pki.privateKeyToPem(this.privateKey),
      key: forge.pki.privateKeyToPem(this.privateKey)
    };
  }

}





const h5Client = axios.create({
  baseURL: 'https://br-h5-gateway.gwmcloud.com/app-api/api/v1.0',
  headers: {
    "rs": 2,
    "brandid": "CCZ001",
    "enterpriseid": "CC01",// Correct headers to Brazilian App My GWM
    "terminal": "GW_APP_GWM", // Depured with MITM in ANdroid
    "brand": 6,
    "language": "en",
    "systemtype": 2,
    "channel": "APP",
    "accessToken": "an invalid token"
  }
})





async function loginWithPassword(login, password) {
  let loginParams = {
    'account': 'email@brunodasilva.com',
    'password': 'mypassword',
    'appType': 1,
    'deviceId': 'lol',
    'protocol': 1

  }
  return await h5Client.post('/userAuth/loginAccount', loginParams)
}


async function main() {
  console.log(await loginWithPassword('mylogin', 'mypassword'))
  // this is return 
  // data: { code: '550002', description: 'input error: [协议不能为空]' }
  // what hell
}

main()
