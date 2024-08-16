const UserQuery = require('./gwm/userQuery');
const CarQuery = require('./gwm/carQuery');
const storageManager = require('./storageManager');
const dotenv = require('dotenv');

async function main() {

    let userApp = new UserQuery();
    let carApp = new CarQuery();

    let vin = process.env.VIN;
    let email = process.env.EMAIL
    let senha = process.env.SENHA;
    let pin = process.env.PIN;

    if (!vin || !email || !senha) {
        console.log('Variáveis de ambiente não configuradas');
        return;
    }

    if (!storageManager.getItem('accessToken')) {
        if (!(await userApp.login(email, senha))) {
            console.log('Erro ao logar...');
            return;
        }

    }
    let vehicles = await carApp.acquireVehicles()
    console.log('Vehs', vehicles)
    let lastStatus = await carApp.getLastStatus(vin); // ele vai pegar os códigos mqtt atualizados do seu veiculo tem mais outras funcoes em carQuery.js e userQUery.js em desenvolvimento
    if (!lastStatus) {
        if (!(await userApp.login(email, senha))) {
            console.log('Erro ao logar...');
            return;
        }
    }

    console.log('Client vehicles:', lastStatus.data.items);

    let basicInfo = await carApp.basicInfo();
    console.log('Basic Info logs:', basicInfo);
    let uniqueId = carApp.uuid()
    let arCond = await carApp.sendCmd(
        {
            "0x04": {
                "airConditioner": {
                    "operationTime": "15", // 15 minutos
                    "switchOrder": "1", // ligado
                    "temperature": "18" // temperstura 18
                }
            }
        },
        0,
        pin,
        uniqueId,
        2,
        vin
    )
    console.log(arCond)
}
dotenv.config();
main();