const axios = require('../api');
const md5 = require('md5');
const storageManager = require('../storageManager');

class CarQuery {
    constructor() {
        this.deviceId = storageManager.getItem('deviceid') ? storageManager.getItem('deviceid') : md5(Math.random().toString());
    }

    getHeaders() {
        return {
            rs: '2',
            terminal: 'GW_APP_GWM',
            brand: '6',
            language: 'pt_BR',
            systemtype: '2',
            regioncode: 'BR',
            country: 'BR',
            accessToken: storageManager.getItem('accessToken'),
            refreshToken: storageManager.getItem('refreshToken')
        };
    }

    uuid() {
        return require('crypto').randomUUID().replaceAll('-', '') + '1234'
    }

    async sendCmd(instructions,remoteType,securityPassword,seqNo,type,vin) {
        var res
        try {
            const res = await axios.execReq({
                method: 'post',
                url: 'vehicle/T5/sendCmd',
                headers: this.getHeaders(),
                body: {instructions,remoteType,securityPassword,seqNo,type,vin}
            })
            return res;
        } catch (err) {
            console.log('Error send cmd vehicles:', err, res);
            return false;
        }
    }
    
    async getChargeLogs(vin) {
        var res
        try {
            const res = await axios.execReq({
                method: 'get',
                url: 'vehicleCharge/getChargeLogs',
                headers: this.getHeaders()
            })
            return res.data;
        } catch (err) {
            console.log('Error vehicle basic info vehicles:', err, res);
            return false;
        }
    }
    
    async basicInfo(vin) {
        var res
        try {
            const res = await axios.execReq({
                method: 'get',
                url: 'vehicle/vehicleBasicsInfo?vin=' + vin + '&flag=true',
                headers: this.getHeaders()
            })
            return res;
        } catch (err) {
            console.log('Error vehicle basic info vehicles:', err, res);
            return false;
        }
    }
    async getLastStatus(vin) {
        var res
        try {
            const res = await axios.execReq({
                method: 'get',
                url: 'vehicle/getLastStatus?vin='+vin,
                headers: this.getHeaders()
            })
            return res.data;
        } catch (err) {
            console.log('Error last status vehicles:', err, res);
            return false;
        }
    }
    async acquireVehicles() {
        try {
            const res = await axios.execReq({
                method: 'get',
                url: 'vehicle/acquireVehicles',
                headers: this.getHeaders()
            })
            return res;
        } catch (err) {
            console.error('Error acquiring vehicles:', err);
            return false;
        }
    }
}

module.exports = CarQuery;


/*
Endpoint: vehicleCharge/getChargeLogs


Endpoint: vehicle/vehicleBasicsInfo
{code: '000000',description: 'SUCCESS',data: {time: null,appFenceVO: {address: 'Rua Valdemar Fontana, 133, Charqueadas, Caxias do Sul - RS, 95110-360, Brasil',radius: 15,createdTime: 1711943204385,id: '441e59f6599b4006b5970866d3d6d264',name: 'Casa',lon: -51.21672,lat: -29.18533,valid: '1'},score: null,config: {engineStatusTime: '600',defrostTime: '600',leftFrontWindow: 0,leftBackWindow: 0,rightFrontWindow: 0,rightBackWindow: 0,skyLight: 0,shadeScreen: 100,airConditionerStatusTime: '900',airConditionerTemperature: '25',blowingMode: '2',powerGear: '10',seatHeatingControlTime: '300',seatHeatingType: '2',leftFrontSeat: 3,rightFrontSeat: 3,frontDefrostStatus: 2,backDefrostStatus: 2,userId: '6724900878288388380',airPurifierStatus: 1,purifierTime: '900',cabinCleanNum: 0,cabinCleanTime: null,vin: 'LGWFFUA59RH935162',quickSettings: '2,6,4,3'},subscribe: '0'}}

Endpoint: vehicle/getLastStatus
{"code":"000000","description":"SUCCESS","data":{"id":"LGWFFUA59RH935162_0_STATUS","deviceId":"LGWFFUA59RH935162","deviceType":0,"command":"STATUS","items":[{"code":"2013021","value":"13","unit":"%"},{"code":"2013022","value":"1022","unit":"minute"},{"code":"2013023","value":"0","unit":null},{"code":"2210001","value":"1","unit":"-"},{"code":"2210002","value":"1","unit":"-"},{"code":"2210005","value":"3","unit":"-"},{"code":"2210003","value":"1","unit":"-"},{"code":"2210004","value":"1","unit":"-"},{"code":"2210012","value":"1","unit":null},{"code":"2210013","value":"1","unit":null},{"code":"2210010","value":"1","unit":null},{"code":"2210011","value":"1","unit":null},{"code":"4105008","value":2,"unit":null},{"code":"2310001","value":1,"unit":null},{"code":"2013005","value":"93","unit":"%"},{"code":"2206005","value":"0","unit":"-"},{"code":"2206004","value":"0","unit":"-"},{"code":"2206003","value":"0","unit":"-"},{"code":"2206002","value":"0","unit":"-"},{"code":"2206001","value":"0","unit":"-"},{"code":"2011007","value":"495","unit":"km"},{"code":"2102001","value":"0","unit":"-"},{"code":"2102002","value":"0","unit":"-"},{"code":"2102003","value":"0","unit":"-"},{"code":"2102004","value":"0","unit":"-"},{"code":"2102007","value":"0","unit":"-"},{"code":"2102008","value":"0","unit":"-"},{"code":"2102009","value":"0","unit":"-"},{"code":"2102010","value":"0","unit":"-"},{"code":"2042082","value":"0","unit":"-"},{"code":"2220003","value":"0","unit":"-"},{"code":"2220004","value":"0","unit":"-"},{"code":"2103010","value":1273,"unit":"Km"},{"code":"2208001","value":"1","unit":"-"},{"code":"2041142","value":"0","unit":"7"},{"code":"2202099","value":"0","unit":"-"},{"code":"2101001","value":268,"unit":"kPa"},{"code":"2101002","value":259,"unit":"kPa"},{"code":"2101003","value":265,"unit":"kPa"},{"code":"2101004","value":266,"unit":"kPa"},{"code":"2101005","value":"30","unit":"�C"},{"code":"2101006","value":"29","unit":"�C"},{"code":"2101007","value":"26","unit":"�C"},{"code":"2101008","value":"27","unit":"�C"},{"code":"2011501","value":"5","unit":"Km"},{"code":"2017002","value":"46","unit":"L"},{"code":"2202001","value":"0","unit":null}],"acquisitionTime":1715192477172,"uploadTime":null,"updateTime":1715192478192,"longitude":-51.216146,"latitude":-29.185412,"globalStatusList":null,"oilQty":4,"charge":null,"percentageOfOil":null}}

Endpoint: vehicle/acquireVehicles
{"code":"000000","description":"SUCCESS","data":[{"serviceType":null,"ownerModel":null,"engineType":"GW4B15D","lon":null,"type":null,"shareCount":0,"startTime":null,"endTime":null,"hasScyPwd":null,"hasSsWin":null,"etype":4,"vin":"LGWFFUA59RH935162","airConditionModel":null,"lat":null,"engineNo":"23456562673","brandName":"HAVAL","modelName":"H6 GT_CC6470BK23CPHEV_BASIC_HIGH DELUXE","modelCode":"1575390068328280064","vtype":"H6 GT","styleName":"BASIC","hasWinControl":null,"hasIdNo":null,"ownership":0,"canSignalType":"H6 GT","vehicleSts":null,"lastUpdate":null,"config":"HIGH DELUXE","isEcallforever":null,"bluetoothKey":null,"bluetoothInduction":null,"bluetoothBind":null,"belongPlatform":"beantech","licenseNumber":null,"shareId":"17104","tankCapacity":55.0,"buyDate":null,"vehicleNick":null,"simIccid":"89550532180071309137","imsi":"724051826143832","imageUrl":null,"staticImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1704866466827png","dynamicImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1704866473694png","backgroundImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1704866480858png","fontColor":0,"color":"SUN BLACK","realNameAuth":"UNCERTIFIED","bluetoothAbility":null,"agreementVersion":"T5","defaultVehicle":true,"dealerName":null,"remote":null,"customizedCarUrl":null,"telematicsType":null,"material90Url":null,"material45Url":null,"materialBgUrl":null,"colorValue":null,"colorUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1677634790346png","minImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1694711174659png","materialCode":null,"rudder":"1","showedVin":"LGWFF*******35162","otBrandName":"HAVAL","vehicleId":13067,"signAgreementState":"2","simVerifyState":null,"signRule":0,"userAgreementVersion":"1.0.0","appShowSeriesName":"HAVAL H6 GT","powerType":"PHEV","ecallServiceEndDate":null,"ecallServiceStartDate":null,"ecallServiceStatus":null,"tserviceStartDate":null,"tserviceEndDate":null,"ecallServiceRemainDays":null,"vTypeName":"CC6470BK23CPHEV","tServiceStatus":"2"}]}



*/