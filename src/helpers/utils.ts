export const currencyFormat = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "narrowSymbol"
  });

  return formatter.format(value);
};

export const formatPhone = (
  phone: string,
  format: "intl" | "local" = "intl"
) => {
  if (format === "intl") {
    return phone.startsWith("0") ? phone.replace("0", "+233") : phone;
  }

  return phone.startsWith("+233") ? phone.replace("+233", "0") : phone;
};

export interface IPayload {
  name: string;
  phone: string;
  location: string;
  paid: boolean;
  topic: string;
  items: string[];
}

export const sendNotificationToVendors = (payload: IPayload) => {
  fetch(
    `${process.env.NEXT_PUBLIC_VENDORS_ORIGIN}/api/messages/send-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );
};

export const sendNotificationToAdmins = (
  payload: Omit<IPayload, "topic"> & { stores: { id: string; name: string }[] }
) => {
  fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_ORIGIN}/api/messages/send-notification`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );
};
