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