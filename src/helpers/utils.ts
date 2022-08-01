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
