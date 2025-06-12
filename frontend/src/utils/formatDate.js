export const formatDate = (date) => {
  const dob = new Date(date);
  return dob.toISOString().slice(0, 10);
};
