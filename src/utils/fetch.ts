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

const HOST = "http://localhost:3001/";

const fetchUtility = async <T>(
  path: string,
  options: FetchOptions
): Promise<FetchResult<T>> => {
  let url = HOST + path;
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const { method, params, body } = options;

  const fetchOptions: RequestInit = {
    method: method,
    headers: { ...defaultHeaders, ...options.headers },
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
  headers?: Record<string, string>
): Promise<FetchResult<T>> => {
  return fetchUtility<T>(path, { method: "GET", headers, params });
};

export const post = async <T>(
  path: string,
  body?: Object,
  headers?: Record<string, string>
): Promise<FetchResult<T>> => {
  return fetchUtility<T>(path, { method: "POST", body, headers });
};

export const myFetch = { get, post };