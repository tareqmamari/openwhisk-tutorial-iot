var message = JSON.parse(params.message);
var smsMessage = {"value":message.value};
console.log();
  whisk.invoke({
      name: "/saschoff@de.ibm.com_dev/messagehub/produceMessage",
      parameters: {
          "topic":params.topic,
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