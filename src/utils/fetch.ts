import { message } from "antd";
import { GetServerSidePropsContext } from "next";

type HttpMethod = "GET" | "POST";

interface FetchOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
}

interface FetchResult<T> {
  data: T | null;
  error: Error | null;
}

const buildQueryParams = (params: Record<string, string>): string => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : "";
};

export const HOST =
  process.env.NODE_ENV === "production"
    ? "https://charlescrazy.fun/api/"
    : "http://localhost:3001/api/";

// export const HOST = "https://charlescrazy.fun/api/";

const fetchUtility = async <T>(
  path: string,
  options: FetchOptions,
  ctx?: GetServerSidePropsContext
): Promise<FetchResult<T>> => {
  let url = HOST + path;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const { method, params, body } = options;

  if (ctx) {
    // @ts-ignore
    defaultHeaders.Cookie = ctx?.req?.headers?.cookie;
  }

  const fetchOptions: RequestInit = {
    method: method,
    headers: { ...defaultHeaders, ...options.headers },
    mode: "cors",
    credentials: "include",
  };

  if (method === "GET" && params) {
    url += buildQueryParams(params);
  }

  if (method === "POST" && body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errMsg = `${url} --->  ${response.status} ${response.statusText}`;
      if (!ctx) {
        message.error(errMsg);
      }
      console.error(errMsg);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
};

export const get = async <T>(
  path: string,
  params?: Record<string, string>,
  ctx?: GetServerSidePropsContext
): Promise<FetchResult<T>> => {
  return fetchUtility<T>(path, { method: "GET", params }, ctx);
};

export const post = async <T>(
  path: string,
  body?: Object,
  headers?: Record<string, string>
): Promise<FetchResult<T>> => {
  return fetchUtility<T>(path, { method: "POST", body, headers });
};

export const myFetch = { get, post };
