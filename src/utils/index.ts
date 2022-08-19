import { formatPhone } from "@/helpers/utils";
import axios from "axios";

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export interface ISMSPayload {
  phone: string;
  message: string;
}

// export const sendSMS = async (phone: string, message: string) => {
//   await axios.get(
//     `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${
//       process.env.SMS_KEY
//     }&to=${formatPhone(phone)}&from=Dishplug&sms=${message}`
//   );
// };

export const sendSMS = (recipients: string[], message: string) => {
  axios.post(
    `https://sms.arkesel.com/api/v2/sms/send`,
    {
      sender: "Dishplug",
      message,
      recipients: recipients.map(phone => formatPhone(phone))
    },
    {
      headers: {
        "api-key": process.env.SMS_API_KEY
      }
    }
  );
};
