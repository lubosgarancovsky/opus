export const timestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
};
