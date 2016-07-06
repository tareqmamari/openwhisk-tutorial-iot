var Client = require("ibmiotf");
var config = {
     "org" : "XXXXXX",
    "id" : "YYYYYYY",
    "type" : "ZZZZZZ",
    "auth-method" : "token",
    "auth-token" : "XXXXXXX"
};

var deviceClient = new Client.IotfDevice(config);

deviceClient.connect();
 
deviceClient.on('connect', function () {
 
 var i=0;
        console.log("connected");
        setInterval(function function_name () {
          i++;
          deviceClient.publish('myevt', 'json', '{"value":' + i + '}', 2);
          console.log(i + " is published");
        },2000);
});
