const UserQuery = require('./gwm/userQuery');
const CarQuery = require('./gwm/carQuery');
const storageManager = require('./storageManager');

async function main() {
    
    let userApp = new UserQuery();
    let carApp = new CarQuery();
    
    let vin = 'LGWFFUA59RH935162' // mude para seu vin
    let email = "yourgwmemail@com" // mude para seu email
    let senha = "senha" // sua senha do my gqm

    if (!storageManager.getItem('accessToken')) {
        if (!(await userApp.login(email, senha))) {
            console.log('Erro ao logar...');
            return;
        }
    }

    let lastStatus = await carApp.getLastStatus(vin); // ele vai pegar os códigos mqtt atualizados do seu veiculo tem mais outras funcoes em carQuery.js e userQUery.js em desenvolvimento
    if(!lastStatus) {
        if (!(await userApp.login(email, senha))) {
            console.log('Erro ao logar...');
            return;
        }
    }

    console.log('Client vehicles:', lastStatus);

}

main();