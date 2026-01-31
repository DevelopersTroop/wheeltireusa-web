import { apiBaseUrl } from "@/utils/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Define request options with conditional body requirements
type RequestOptions<M extends HttpMethod> = {
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
} & (M extends "POST" | "PUT" | "PATCH"
  ? { body: Record<string, any> } // Require body for these methods
  : { body?: never }); // Disallow body for GET, DELETE

export async function customFetch<T extends Record<string, any>>(
  url: string,
  method: HttpMethod = "GET",
  options?: RequestOptions<HttpMethod>
): Promise<{ data: T }> {
  const { queryParams = {}, headers = {} } = options || {};
  const body =
    options && "body" in options ? JSON.stringify(options.body) : undefined;
  // Construct query string from queryParams object
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = `${apiBaseUrl}/${url}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(fullUrl, {
    method, // Include HTTP method
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body, // Include body only when necessary
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
