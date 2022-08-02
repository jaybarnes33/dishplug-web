import { formatPhone } from "@/helpers/utils";
import axios from "axios";

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export interface ISMSPayload {
  phone: string;
  message: string;
}

export const sendSMS = async (phone: string, message: string) => {
  const mess = await axios.get(
    `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${
      process.env.NEXT_PUBLIC_SMS_API_KEY
    }&to=${formatPhone(phone)}&from=Dishplug&sms=${message}`
  );

  console.log(mess);
};
