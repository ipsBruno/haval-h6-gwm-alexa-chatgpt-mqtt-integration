

![image](https://github.com/ipsBruno/haval-h6-gwm-alexa-chatgpt-mqtt-integration/assets/6839604/20545d43-1fce-4c52-943c-d81661e90b8c)


**Introdução:** Imagine que você possa interagir com seu veículo Haval H6 através de comandos de voz simples usando Alexa, Siri ou ChatGPT. O seu carro não só entenderia seus comandos, mas também lembraria você de carregar a bateria quando estivesse baixa. Este projeto visa superar as limitações do sistema atual de comandos do Haval, que é relativamente lento, e explorar o potencial da conectividade Internet-of-Things (IoT) para trazer uma nova dimensão de interatividade e eficiência.

**Problema:** Como proprietário de um Haval H6, percebi que o sistema de comandos do veículo é lento e muitas vezes ineficiente. Através da análise do aplicativo MyGWM, identifiquei uma oportunidade de utilizar a conexão de internet do veículo para emular e executar comandos através de uma API personalizada, permitindo a integração com assistentes virtuais.

**Solução Proposta:** Desenvolver uma API que emule os comandos do sistema MyGWM do Haval H6 e permita a integração com assistentes virtuais como Alexa, Siri e ChatGPT. Isso permitirá que os comandos sejam processados mais rapidamente e que novas funcionalidades sejam adicionadas, melhorando a experiência do usuário.

**Implementação:** A implementação envolve a engenharia reversa das conexões do aplicativo MyGWM, o que foi facilitado por um projeto existente, o @ora2mqtt, que forneceu comandos básicos para interagir com o veículo. Com essas informações, desenvolvemos scripts em JavaScript que podem ser executados em plataformas de nuvem para conectar os assistentes virtuais ao veículo.

**Código de Exemplo em JavaScript:**



**Conclusão:** Este projeto não só melhora a funcionalidade do Haval H6 através da integração com assistentes virtuais, mas também explora a capacidade de IoT para automóveis, oferecendo uma interação mais intuitiva e responsiva entre o veículo e seu dono.

### Documentação:

O projeto está em fase de testes e estou depurando ainda todas funções do aplicativo, faltam melhorias principalmente no que tange ao controle de tokens e descoberta de novas funcionaidades

**main.js** tem um exemplo básico de como logar na conta e pegar o último estado mqtt do veículo você precisa colocar seu e-mail do aplicativo MyGWM e sua senha, além do código VIN do seu veículo, código VIN é do Chassis.



**gwm/userApp.js
gwm/carApp.js**

Tem as chamadas de comandos realizadas pela biblioteca.

O carApp.js utilia uma biblioteca C# pra enviar os comandos em JSON pois não consegui dar pinning nos certificados via NodeJS (essa é uma melhoria apontada hoje a ser feita urgente)


Endpoint: **vehicle/vehicleBasicsInfo**

    {code: '000000',description: 'SUCCESS',data: {time: null,appFenceVO: {address: 'Rua Valdemar Fontana, 133, Charqueadas, Caxias do Sul - RS, 95110-360, Brasil',radius: 15,createdTime: 1711943204385,id: '441e59f6599b4006b5970866d3d6d264',name: 'Casa',lon: -51.21672,lat: -29.18533,valid: '1'},score: null,config: {engineStatusTime: '600',defrostTime: '600',leftFrontWindow: 0,leftBackWindow: 0,rightFrontWindow: 0,rightBackWindow: 0,skyLight: 0,shadeScreen: 100,airConditionerStatusTime: '900',airConditionerTemperature: '25',blowingMode: '2',powerGear: '10',seatHeatingControlTime: '300',seatHeatingType: '2',leftFrontSeat: 3,rightFrontSeat: 3,frontDefrostStatus: 2,backDefrostStatus: 2,userId: '6724900878288388380',airPurifierStatus: 1,purifierTime: '900',cabinCleanNum: 0,cabinCleanTime: null,vin: 'LGWFFUA59RH935162',quickSettings: '2,6,4,3'},subscribe: '0'}}

  

Endpoint: vehicle/getLastStatus

    {"code":"000000","description":"SUCCESS","data":{"id":"LGWFFUA59RH935162_0_STATUS","deviceId":"LGWFFUA59RH935162","deviceType":0,"command":"STATUS","items":[{"code":"2013021","value":"13","unit":"%"},{"code":"2013022","value":"1022","unit":"minute"},{"code":"2013023","value":"0","unit":null},{"code":"2210001","value":"1","unit":"-"},{"code":"2210002","value":"1","unit":"-"},{"code":"2210005","value":"3","unit":"-"},{"code":"2210003","value":"1","unit":"-"},{"code":"2210004","value":"1","unit":"-"},{"code":"2210012","value":"1","unit":null},{"code":"2210013","value":"1","unit":null},{"code":"2210010","value":"1","unit":null},{"code":"2210011","value":"1","unit":null},{"code":"4105008","value":2,"unit":null},{"code":"2310001","value":1,"unit":null},{"code":"2013005","value":"93","unit":"%"},{"code":"2206005","value":"0","unit":"-"},{"code":"2206004","value":"0","unit":"-"},{"code":"2206003","value":"0","unit":"-"},{"code":"2206002","value":"0","unit":"-"},{"code":"2206001","value":"0","unit":"-"},{"code":"2011007","value":"495","unit":"km"},{"code":"2102001","value":"0","unit":"-"},{"code":"2102002","value":"0","unit":"-"},{"code":"2102003","value":"0","unit":"-"},{"code":"2102004","value":"0","unit":"-"},{"code":"2102007","value":"0","unit":"-"},{"code":"2102008","value":"0","unit":"-"},{"code":"2102009","value":"0","unit":"-"},{"code":"2102010","value":"0","unit":"-"},{"code":"2042082","value":"0","unit":"-"},{"code":"2220003","value":"0","unit":"-"},{"code":"2220004","value":"0","unit":"-"},{"code":"2103010","value":1273,"unit":"Km"},{"code":"2208001","value":"1","unit":"-"},{"code":"2041142","value":"0","unit":"7"},{"code":"2202099","value":"0","unit":"-"},{"code":"2101001","value":268,"unit":"kPa"},{"code":"2101002","value":259,"unit":"kPa"},{"code":"2101003","value":265,"unit":"kPa"},{"code":"2101004","value":266,"unit":"kPa"},{"code":"2101005","value":"30","unit":"�C"},{"code":"2101006","value":"29","unit":"�C"},{"code":"2101007","value":"26","unit":"�C"},{"code":"2101008","value":"27","unit":"�C"},{"code":"2011501","value":"5","unit":"Km"},{"code":"2017002","value":"46","unit":"L"},{"code":"2202001","value":"0","unit":null}],"acquisitionTime":1715192477172,"uploadTime":null,"updateTime":1715192478192,"longitude":-51.216146,"latitude":-29.185412,"globalStatusList":null,"oilQty":4,"charge":null,"percentageOfOil":null}}

  

Endpoint: **vehicle/acquireVehicles**

    {"code":"000000","description":"SUCCESS","data":[{"serviceType":null,"ownerModel":null,"engineType":"GW4B15D","lon":null,"type":null,"shareCount":0,"startTime":null,"endTime":null,"hasScyPwd":null,"hasSsWin":null,"etype":4,"vin":"LGWFFUA59RH935162","airConditionModel":null,"lat":null,"engineNo":"23456562673","brandName":"HAVAL","modelName":"H6 GT_CC6470BK23CPHEV_BASIC_HIGH DELUXE","modelCode":"1575390068328280064","vtype":"H6 GT","styleName":"BASIC","hasWinControl":null,"hasIdNo":null,"ownership":0,"canSignalType":"H6 GT","vehicleSts":null,"lastUpdate":null,"config":"HIGH DELUXE","isEcallforever":null,"bluetoothKey":null,"bluetoothInduction":null,"bluetoothBind":null,"belongPlatform":"beantech","licenseNumber":null,"shareId":"17104","tankCapacity":55.0,"buyDate":null,"vehicleNick":null,"simIccid":"89550532180071309137","imsi":"724051826143832","imageUrl":null,"staticImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1704866466827png","dynamicImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1704866473694png","backgroundImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1704866480858png","fontColor":0,"color":"SUN BLACK","realNameAuth":"UNCERTIFIED","bluetoothAbility":null,"agreementVersion":"T5","defaultVehicle":true,"dealerName":null,"remote":null,"customizedCarUrl":null,"telematicsType":null,"material90Url":null,"material45Url":null,"materialBgUrl":null,"colorValue":null,"colorUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1677634790346png","minImageUrl":"https://br-hw-prod.obs.sa-brazil-1.myhuaweicloud.com/files/gwm-operation-dashboard/1694711174659png","materialCode":null,"rudder":"1","showedVin":"LGWFF*******35162","otBrandName":"HAVAL","vehicleId":13067,"signAgreementState":"2","simVerifyState":null,"signRule":0,"userAgreementVersion":"1.0.0","appShowSeriesName":"HAVAL H6 GT","powerType":"PHEV","ecallServiceEndDate":null,"ecallServiceStartDate":null,"ecallServiceStatus":null,"tserviceStartDate":null,"tserviceEndDate":null,"ecallServiceRemainDays":null,"vTypeName":"CC6470BK23CPHEV","tServiceStatus":"2"}]}


#### Comandos MQTT

Aqui a lista de comandos que acreditamos ser referentes ao MQTT próprio da Haval (isso foi encontrado em um aplicativo e tratado por ChatGPT, ainda não foi testado, vá com cuidado



    
    {
      "2206005": "ABSFailSts", // ABS Failure Status
      "2101007": "ACAutoMode", // Air Conditioning Auto Mode
      "2210011": "ACDrvSetTemp", // Air Conditioning Driver Set Temperature
      "2204012": "ACFrntPassSetTemp", // Air Conditioning Front Passenger Set Temperature
      "2101004": "ACOff", // Air Conditioning Off
      "2210012": "ACOn", // Air Conditioning On
      "2204013": "AirBagFailCmd", // Airbag Failure Command
      "2101008": "AlarmOffCmd", // Alarm Off Command
      "2210013": "AlarmOnCmd", // Alarm On Command
      "2204014": "AlertLevel", // Alert Level
      "2012001": "BatteryChargeCmd", // Battery Charge Command
      "2220001": "BatteryChargeError", // Battery Charge Error
      "2212001": "BrakeSystemError", // Brake System Error
      "2012003": "ChargeCompleteCmd", // Charge Complete Command
      "2220002": "ChargeFault", // Charge Fault
      "2204015": "CoolantTempHigh", // Coolant Temperature High
      "2012002": "CoolantTempLow", // Coolant Temperature Low
      "2424001": "CoolantTempNormal", // Coolant Temperature Normal
      "2212002": "CrashDetected", // Crash Detected
      "2013001": "DeepSleepMode", // Deep Sleep Mode
      "2424002": "DeepSleepModeOff", // Deep Sleep Mode Off
      "2208002": "DeepSleepModeOn", // Deep Sleep Mode On
      "2013002": "DoorClosedCmd", // Door Closed Command
      "2220003": "DoorOpenCmd", // Door Open Command
      "2208001": "DrivetrainFault", // Drivetrain Fault
      "2013003": "ElectricMotorError", // Electric Motor Error
      "2220004": "ElectricSystemFailure", // Electric System Failure
      "2210001": "EngineCoolantTempHigh", // Engine Coolant Temperature High
      "2013004": "EngineCoolantTempLow", // Engine Coolant Temperature Low
      "2220018": "EngineOilTempHigh", // Engine Oil Temperature High
      "2210002": "EngineOilTempLow", // Engine Oil Temperature Low
      "2013006": "EngineSystemFault", // Engine System Fault
      "2220021": "EngineSystemOK", // Engine System OK
      "2210003": "ESPFailure", // ESP Failure
      "2014009": "ESPSystemOK", // ESP System OK
      "2220005": "FailSafeModeActive", // Fail-Safe Mode Active
      "2210004": "FuelLevelLow", // Fuel Level Low
      "2014010": "FuelLevelNormal", // Fuel Level Normal
      "2222001": "FuelSystemError", // Fuel System Error
      "2216001": "HighBeamOnCmd", // High Beam On Command
      "2014011": "HighBeamOffCmd", // High Beam Off Command
      "2202099": "HoodOpenCmd", // Hood Open Command
      "2218001": "LowFuelWarning", // Low Fuel Warning
      "2302001": "LowOilPressure", // Low Oil Pressure
      "2210032": "LowTirePressure", // Low Tire Pressure
      "2302002": "LowWindshieldWasherFluid", // Low Windshield Washer Fluid
      "2011501": "LowBatteryWarning", // Low Battery Warning
      "2012006": "MaintenanceDue", // Maintenance Due
      "2302003": "MalfunctionIndicator", // Malfunction Indicator
      "2011007": "NormalOperation", // Normal Operation
      "2062001": "OilChangeRequired", // Oil Change Required
      "2014012": "OilLevelNormal", // Oil Level Normal
      "2078020": "OilLevelLow", // Oil Level Low
      "2011002": "ParkBrakeEngaged", // Parking Brake Engaged
      "2013005": "ParkBrakeReleased", // Parking Brake Released
      "2013022": "PowerSteeringFault", // Power Steering Fault
      "2012576": "PowerSteeringOK", // Power Steering OK
      "2011002": "PurgeValveOpen", // Purge Valve Open
      "2013007": "PurgeValveClosed", // Purge Valve Closed
      "2013023": "SeatbeltFastened", // Seatbelt Fastened
      "2019001": "SeatbeltUnfastened", // Seatbelt Unfastened
      "2013008": "SecuritySystemArmed", // Security System Armed
      "2041142": "SecuritySystemDisarmed", // Security System Disarmed
      "2020001": "StabilityControlEngaged", // Stability Control Engaged
      "2013016": "StabilityControlDisengaged", // Stability Control Disengaged
      "2042082": "SystemCheckOK", // System Check OK
      "2015001": "SystemCheckFailed", // System Check Failed
      "2013017": "TirePressureNormal", // Tire Pressure Normal
      "2042071": "TirePressureLow", // Tire Pressure Low
      "2017001": "TractionControlEngaged", // Traction Control Engaged
      "2014002": "TractionControlDisengaged", // Traction Control Disengaged
      "2310001": "TransmissionFault", // Transmission Fault
      "2104001": "TransmissionSystemOK", // Transmission System OK
      "2014004": "TransmissionSystemFault", // Transmission System Fault
      "2060016": "VehicleSpeedLimitExceeded", // Vehicle Speed Limit Exceeded
      "2016001": "VehicleSpeedNormal", // Vehicle Speed Normal
      "2014013": "VehicleSpeedLow", // Vehicle Speed Low
      "2202111": "WarningLightOn", // Warning Light On
      "2015002": "WarningLightOff", // Warning Light Off
      "2014014": "WindshieldWiperOn", // Windshield Wiper On
      "2444026": "WindshieldWiperOff", // Windshield Wiper Off
      "2210005": "TurnSignalLeftOn", // Left Turn Signal On
      "2056001": "TurnSignalLeftOff", // Left Turn Signal Off
      "2014006": "TurnSignalRightOn", // Right Turn Signal On
      "2202229": "TurnSignalRightOff", // Right Turn Signal Off
      "2210014": "HeadlightsOn", // Headlights On
      "2056002": "HeadlightsOff" // Headlights Off
    }



Agradecimentos ao projeto Alemão  que me ajudou a portar uma versão similar dessas para territórios tupiniquins


https://github.com/zivillian/ora2mqtt




Em breve mais atualizações. Pull requests são bem vindos



Até mais