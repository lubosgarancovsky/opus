export const baseUrl = (): string => {
  return process.env.API_BASE_URL ?? "";
};

export const apiUrl = (url: string, version = "v1"): string => {
  return `${baseUrl()}/${version}${url.split("api")[1]}`;
};
