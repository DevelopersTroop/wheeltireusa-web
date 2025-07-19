import { s3BucketUrl } from './api';

export function beautifySlug(slug: string) {
  return slug.toLowerCase().replace(',', '').replace(/\s/g, '-');
}

export function buildQueryString(params: {
  [key: string]: string | undefined;
}): string {
  const queryString: string[] = [];

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value !== undefined) {
        queryString.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
    }
  }

  return queryString.join('&');
}

export function parseQueryString(
  queryString: string
): Record<string, string | string[]> {
  const result: Record<string, string | string[]> = {};

  queryString.split('&').forEach((pair) => {
    const [rawKey, rawValue] = pair.split('=');
    const key = decodeURIComponent(rawKey);
    const value = rawValue !== undefined ? decodeURIComponent(rawValue) : '';

    // Convert comma-separated values into arrays
    if (value.includes(',')) {
      result[key] = value.split(',');
    } else {
      result[key] = value;
    }
  });

  return result;
}
export function parseQueryValuesToArray(
  value: string,
  skip?: string[] | null,
  formatter?: (value: string) => string
) {
  const arr = decodeURIComponent(value).split(',');
  for (const i in arr) {
    // remove empty value
    if (arr[i] === '') {
      arr.splice(arr.indexOf(arr[i]), 1);
    }

    // skip value
    if (typeof skip !== 'undefined' && skip !== null && skip.includes(arr[i])) {
      const index = arr.indexOf(arr[i]);
      if (index !== -1) {
        arr.splice(arr.indexOf(arr[i]), 1);
      }
    }

    // format value
    if (typeof formatter === 'function') {
      arr[i] = formatter(arr[i]);
    }
  }
  return arr;
}

export function normalizeImageUrl(url: string | undefined): string {
  if (!url || url === '') {
    return '/not-available.webp';
  }
  if (
    url.startsWith('http:') ||
    url.startsWith('data:') ||
    url.startsWith('/') ||
    url.startsWith('https:')
  ) {
    return url;
  } else {
    return `${s3BucketUrl}/${url}`;
  }
}

// add query param to history without reloading the page
export function addQueryParamToHistory(key: string, value: string) {
  const url = new URL(window.location.href);
  const currentValue = url.searchParams.get(key);

  // Only push new state if the key doesn't exist or the value is different
  if (currentValue !== value) {
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  }
}
