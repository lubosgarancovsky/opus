import { AxiosRequestConfig } from "axios";
import { auth } from "../../../../../auth";
import { api } from "../shared";
import { apiUrl } from "./helper";

const authHeaders = async () => {
  const { accessToken } = (await auth()) as any;
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

export const handler = async (
  request: Request,
  options?: AxiosRequestConfig
) => {
  const { headers } = options || {};

  const auth = await authHeaders();

  let data;
  if (request.method === "POST" || request.method === "PUT") {
    try {
      data = await request.json();
    } catch (e) {
      console.error(e);
    }
  }

  const response = await api(apiUrl(request.url), {
    method: request.method,
    headers: {
      ...headers,
      ...auth,
    },
    data,
    ...options,
  });

  return new Response(
    JSON.stringify(response.resolved ? response.data : response.error),
    {
      status: response.status,
    }
  );
};
