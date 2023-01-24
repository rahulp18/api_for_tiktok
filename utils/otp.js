import twilio from "twilio";
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
export const generateOtp = (otp_length) => {
  var OTP = "";
  var digits = "0123456789";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

// export const sendsmsOtp = async ({ number, message }) => {
//   const client = twilio(accountSid, authToken);
//   client.messages
//     .create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: number,
//     })
//     .then((message) => {
//       console.log(
//         `SMS message sent from ${process.env.TWILIO_PHONE_NUMBER} to ${number}. Message SID: ${message.sid}`
//       );
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
