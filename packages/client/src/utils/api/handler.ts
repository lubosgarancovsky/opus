import { auth } from '@/auth';
import axios, { AxiosRequestConfig } from 'axios';
import { NextRequest } from 'next/server';

export const baseUrl = () => {
  return process.env.API_BASE_URL ?? '';
};

export const authFetch = async (request: NextRequest) => {
  const session = await auth();

  let token;

  if (session) {
    token = session.accessToken;
  }

  const headers = {
    ...request.headers,
    ...(!!token ? { Authorization: `Bearer ${token}` } : {})
  };

  let data;

  try {
    data = await request.json();
  } catch (_) {
    // do nothing
  }

  const config = {
    method: request.method,
    headers,
    data
  } as unknown as AxiosRequestConfig;

  const url = request.nextUrl.pathname.includes('/api/')
    ? `${baseUrl()}${request.nextUrl.pathname.replace('/api', '')}`
    : request.nextUrl.pathname;

  return axios(url, config);
};

export const handler = async (request: NextRequest) => {
  try {
    const result = await authFetch(request);
    return Response.json({
      status: result.status,
      data: result.data
    });
  } catch (e: any) {
    return Response.json({
      status: e?.response?.status ?? 503,
      data: e?.response?.data ?? null
    });
  }
};
