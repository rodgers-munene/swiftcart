export const formattedPrice = (price, percentage) => {
  const newPrice = ((parseFloat(percentage) + 100) / 100) * parseFloat(price);
  return newPrice.toFixed(2);
};
