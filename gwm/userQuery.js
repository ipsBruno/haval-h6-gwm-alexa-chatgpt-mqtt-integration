
const axios = require('../api');
const md5 = require('md5');
const config = require('../config');
const storageManager = require('../storageManager');

class UserQuery {
    constructor() {
        this.deviceId = storageManager.getItem('deviceid') ? storageManager.getItem('deviceid') : md5(Math.random().toString());
    }

    getHeaders() {
        return {
            appid: '6',
            brand: '6',
            brandid: 'CCZ001',
            country: 'BR',
            devicetype: '0',
            enterpriseid: 'CC01',
            gwid: '',
            language: 'pt_BR',
            rs: '5',
            terminal: 'GW_PC_GWM'
        };
    }

    async login(email, pass) {
        const params = {
            deviceid: this.deviceId,
            password: md5(pass),
            account: email
        };
        let options = {
            headers: this.getHeaders()
        };
        try {
            const res = await axios.post(`${config.apiEndpoint}/userAuth/loginAccount`, params, options);
            if (res.data && res.data.description == 'SUCCESS') {
                Object.keys(res.data.data).forEach(key => {
                    storageManager.setItem(key, res.data.data[key]);
                });
                return res.data;
            }
        } catch (err) {
            console.error('Login error:', err);
            return false;
        }
    }
}

module.exports = UserQuery;

/*
____

Endpoint: userAuth/loginAccount

{code: '000000',data: {country: 'BR',whiteListStatus: 0,flag: 'password_existed',gender: 2,isFirstLogin: 0,completeFirstLogin: 0,newUserFlag: 0,accountExist: '1',accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTUyOTA0OTYsImlhdCI6MTcxNTIwNDA5NiwiaXNzIjoiZ3d0IFNlcnZlciIsImJlYW5JZCI6IjY3MjQ5MDA4NzgyODgzODgzODAiLCJyb2xlQ29kZSI6InJvbGVDb2RlIiwiY2hhbm5lbCI6IjcxYjMzYjZmOWUwNWEyNzRkZTQ0ZGFkMGEzZDk3ZjE0IiwiZ3dJZCI6IjUwMDE3NjA3NiIsImJyYW5kIjoiQ0NaMDAxIiwidmVoaWNsZUJyYW5kIjoiIiwiciI6IjE3ODgzMjE3MTIxNjA1NjMyMDAifQ.Ac426JWi0v7k9f8xz9v7of-UrcsIu0rLoIH9tg3gtpJR9E4H6uK04La-W4wqnM8K0JKCoaJ9lAF0qYndE_NoVNe-5QonoR6UWGhwNwkEG2GnBvYw4BwPvqe-DSL5GSQHJ_vuM5J6PwyAqwBxZCm9gLJB5T85LIpg2VeZb5ssv2OPjUsgzBd7iBiTyzBqjFmYswr771kt6HZigQuvfW0saGd-8dp5Hf4vanbznKcbsvOm7qsU3m5Zyzfo8vRj81Ey8cD-bNAEzTDejZmnQ-RIgYvGfVicWM8G5BjQ3QRZnIodbEmtSVlnz0q8tAJPK94sb0q6jcQ2b2BGnTdRCyKY1BIEiiEvs4o',isSecurityPasswordExist: 1,nick: 'ipsbruno',r: '1788321712160563200',interestFlag: 1,isProtocols: false,userState: '0',gwId: '500176076',beanId: '6724900878288388380',brand: 'CCZ001',email: 'e****@brunodasilva.com',refreshToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjAzODgwOTYsImJlYW5JZCI6IjY3MjQ5MDA4NzgyODgzODgzODAiLCJyb2xlQ29kZSI6InJvbGVDb2RlIn0.AcMIwhZT-C8cUkw72OnPbMswesiXaJpd6ZFqF7IUxEDZZI43UxJoGXS_SDbvuGPtPKlJQd8LrUbWb37wQ2wXiU-Hg73ixGtOyzLZFxGL0VIwmY46Z1WGZ3fADHxTFuo80xDKTxrh5GvlCjSYx_xeXaE7-qn9WWIhhjI3dhkn-TSsCLl_o1uPEqbY1KtvpTxngBNGVaFK_wXYjy6pAQjOHcnM7w1yY5WtpEb2qeQBSjJijbbG5IAYfRcqRzN4HqE4EwTQLgDK9ltMwksYG8-Z1aA3Ae5nvHSsx09vt_Hqhal9Suz76czNSMStSuSaznqXW6ezSwtSPnM1-VCa31mO4qNqYVxGWOs'},description: 'SUCCESS'}



*/
