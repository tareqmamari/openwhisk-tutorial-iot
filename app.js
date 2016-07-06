\ //https://docs.internetofthings.ibmcloud.com/devices/libraries/nodejs.html
//https://www.npmjs.com/package/ibmiotf
//https://github.com/ibm-watson-iot/iot-nodejs
//https://docs.internetofthings.ibmcloud.com/devices/device_mgmt/index.html
var Client = require("ibmiotf");
var config = {
    // "org" : "hqrsf7",
    "org": "zxdo1w",
    "id": "newDevice",
    "type": "sampleiot",
    "auth-method": "token",
    "auth-token": "newYemen123"
};
//U-wF6jSjQY8@-JHzC@
//a-hqrsf7-ymwwmsqmrh
var deviceClient = new Client.IotfDevice(config);

deviceClient.connect();

deviceClient.on('connect', function() {

    var i = 0;
    console.log("connected");
    setInterval(function function_name() {
        i++;
        deviceClient.publish('myevt', 'json', '{"value":' + i + '}', 2);
        console.log(i + " is published");
    }, 2000);
});