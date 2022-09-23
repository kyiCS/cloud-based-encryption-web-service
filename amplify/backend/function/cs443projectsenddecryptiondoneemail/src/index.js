/**
 * Sends the given download link to the given email addresses via SES.
 * Expects an event in the following form:
 * ```
 * {
 *   "file_name": "FILE",
 *   "download_url": "PRE-SIGNED URL",
 *   "notification_emails": ["EMAIL1", "EMAIL2"]
 * }
 * ```
 */
exports.handler = async (event, context) => {
  console.log("ENVIRONMENT VARIABLES:\n", JSON.stringify(process.env, null, 2));
  console.log("EVENT:\n", JSON.stringify(event, null, 2));
  await sendEmails(event);
  return context.logStreamName;
};

const sendEmails = async (event) => {
  const AWS = require("aws-sdk");
  AWS.config.update({ region: "us-east-2" });

  const fileName = event["file_name"];
  const dowloadUrl = event["download_url"];
  const notificationEmails = event["notification_emails"];

  const emailBodyText =
    `Decryption done for "${fileName}"\n` +
    `Download the decrypted version of your file using this link: ${dowloadUrl}"\n` +
    "Note that the link will only be valid for one hour.\n\n" +
    "Cloud-Based Encryption Service: https://master.d1dgte4sl1t021.amplifyapp.com/\n" +
    "One Team Under The Gloud";

  const emailBodyHtml = `<html>
        <head></head>
        <body>
        <h1>Decryption done for "${fileName}"</h1>
        <h2>Download the decrypted version of your file using <a href="${dowloadUrl}">this link</a></h2>
        <h3>Note that the link will only be valid for one hour.</h3>
        <br/>
        <hr/>
        <h4><a href="https://master.d1dgte4sl1t021.amplifyapp.com/">Cloud-Based Encryption Service</a></h4>
        <h5><i>One Team Under The Gloud</i></h5>
        </body>
    </html>`;

  const sendEmailSettings = {
    Destination: { CcAddresses: [], ToAddresses: notificationEmails },
    Message: {
      Body: {
        Text: { Charset: "UTF-8", Data: emailBodyText },
        Html: { Charset: "UTF-8", Data: emailBodyHtml },
      },
      Subject: { Charset: "UTF-8", Data: "Decryption Done" },
    },
    Source: "eolatham@uab.edu",
    ReplyToAddresses: ["eolatham@uab.edu"],
  };
  console.log("EMAIL SETTINGS:\n", JSON.stringify(sendEmailSettings, null, 2));

  const sendEmailPromise = new AWS.SES()
    .sendEmail(sendEmailSettings, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    })
    .promise();

  await sendEmailPromise
    .then(function (data) {
      console.log(data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
      throw new Error(`Send email request failed: ${err.message}`);
    });
};
