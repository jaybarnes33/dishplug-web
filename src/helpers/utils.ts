export const currencyFormat = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GHS",
    currencyDisplay: "narrowSymbol"
  });

  return formatter.format(value);
};
