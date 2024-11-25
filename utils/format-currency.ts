export const formatCurrency = (amount?: any) => {
  if (!amount) return "0.00";
  return (typeof amount === "number" ? amount : parseFloat(amount))
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
};