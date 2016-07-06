#Send an SMS in response to events
==================================
 In this demo, we show how to use Openwhisk to response in various ways to events. As an example, we will configure Openwhisk to send an SMS in response to events to IoT Real-Time insights.


##Prerequisite:
 - An IBM Bluemix Openwhisk account.
 - An up and running IoT Real-Time insights service.
 - Up and running instances of the services to be used (e.g. Twilio, MessageHub, Box... etc)

##Setting up event source
The event source here is the Real-Time Insights. In order to register/subscribe for receiving events from IoT Real-Time insights service, Openwhisk provide a feed that allows users to achieve that. (Please refer to [IoT-RTI package repository](https://github.com/tareqmamari/openwhisk-package-iotRTInsights) where you can find all necessary information about the package and the webhook especially.

`wsk package bind "/talmaam@de.ibm.com_mainSpace/iot-rti" iot-rti-binded -p apiKey "YYYYY" -p authToken "XXXX" `

_OUTPUT_:
`ok: created binding iot-binded`
This binding command will pass the apiKey as well as the authToken credentials. Thus, both passed parameters will be passed to all actions and feed whenever they invoked.

##Event subscription
To achieve that, you can set up the webhook. To achieve that:
`wsk trigger rtiFeed --feed iot-rti-binded/webhook -p schemaName "HERE_SCHEMA_NAME" -p condition "CONDITION_HERE"`

_OUTPUT_:
`ok: created trigger feed rtiFeed`
![Overall Architecture](images/demoArchitecture.jpg?raw=true "Overall Architecture")


##Send SMS
Within twilio package, there is an action that allows you to send an SMS. This action receives three parameters in above of the credentials, these are; to, from and message. As we are receiving different parameters from the event source, it is not possible to bind the action directly to the trigger with such parameters(received from event source), so you have to create an additional action to achieve that. Let's call it: iotToSMS. which contains the following:
```javascript
function main(params) {
var message = JSON.parse(params.message);
var smsMessage = {"value":message.value};
console.log();
    whisk.invoke({
        name: "/saschoff@de.ibm.com_dev/twilio/sendSMS",
        parameters: {
            "to":params.to,
            "from":params.from,
            "message": JSON.stringify(smsMessage)
        },
        next: function(error, activation) {
            if (error) {
                return whisk.error();
            } else {
                return whisk.done();
            }
        }
    });

    return whisk.async();
}
```

`wsk action create iotToSMS iotToSMS.js -p from "+49000000" -p to "+4917672231272"`

#Associate Actions to Triggers through rules
Openwhisk provides a powerful event subscription management through both triggers and rules. Triggers allow you to subscribe, pause and unpause subscription, and rules, allow you to associate multiple actions to a single trigger. In addition, rules allow you to enable and disable individual actions.

Now, in order to associate an action to a trigger, that is can be done through rules. To create a rule:

`wsk action rule create iotToSMSRule --enable rtiFeed iotToSMS`

#Send data to IoT Platform
You can use sendEvent.js to send data to simulate a device.