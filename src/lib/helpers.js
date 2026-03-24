import cryptoJs from "crypto-js";

/**
 * Retrieves the current URL and its search parameters.
 *
 * @property {URL} url - The URL object representing the current page URL.
 * @property {URLSearchParams} params - An object containing the parsed query string parameters.
 *
 * */
export function getURLAndSearchParams() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  return { url, params };
}

/**
 * Extracts the base path from a URL path by parsing the locale and first segment.
 *
 * @param {string} path - The full URL path to parse (e.g., "/en/dashboard/settings")
 * @returns {string} The base path including locale and first path segment with trailing slash,
 *                   or an empty string if there aren't enough path segments (e.g., "/en/dashboard/")
 
 */
export function getBasePath(path) {
  const [_, locale, ...paths] = path.split("/");

  if (paths.length >= 2) {
    return `/${locale}/${paths[0]}/`;
  }

  return "";
}

export function getUrlWithoutParams(url) {
  return window.location.origin + window.location.pathname;
}

/**
 * Extracts the locale from a URL path. filter(Boolean) removes all "falsy" values from an array.
 *
 * "/en/about".split("/") -> ["", "en", "about"]
 * "/en/about".split("/").filter(Boolean) -> ["en", "about"]
 *
 * @param {string} path - The URL path (e.g., "/en/about", "/ua/contact")
 * @returns {string|undefined} The locale code if found, undefined otherwise
 */
export function getLocale(path) {
  if (!path || typeof path !== "string") {
    return undefined;
  }

  const parts = path.split("/").filter(Boolean);
  return parts[0] || undefined;
}

/**
 * Creates breakpoints classes to use in class:list directive
 */
export function getBreakpoints(prefix, prop) {
  return typeof prop === "object"
    ? {
        [`default:${prefix}-${prop.default}`]: prop.default,
        [`tablet:${prefix}-${prop.tablet}`]: prop.tablet,
        [`tabletS:${prefix}-${prop.tabletS}`]: prop.tabletS,
        [`laptop:${prefix}-${prop.laptop}`]: prop.laptop,
        [`desktop:${prefix}-${prop.desktop}`]: prop.desktop,
      }
    : { [`${prefix}-${prop}`]: prop };
}

/**
 * Replace symbols to double and single quotes
 * @param {String} title
 * @returns Parsed title
 */
export function parseTitle(title) {
  return title.replaceAll("&quot;", `"`).replaceAll("&#39;", `'`);
}

/**
 * Returns aspect ratio based on orientation
 * @param {String} orientation
 * @returns {String} Aspect ratio
 */
export function getRatio(orientation) {
  if (orientation === "landscape") {
    return "3:2";
  }

  if (orientation === "portrait") {
    return "3:4";
  }

  if (orientation === "square") {
    return "1:1";
  }

  if (orientation === "wide") {
    return "16:9";
  }
}

/**
 * Sort projects by publish date from newest to oldest
 * @param {Array} projects
 * @returns {Array} Sorted projects
 */
export function getSortedProjects(projects) {
  return [...projects].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/**
 * Get project index in a projects array
 * @param {Array} projects
 * @param {Object} project
 * @returns {Number} Index number
 */
export function getProjectIndex(projects, project) {
  return projects.findIndex((p) => p.id === project.id);
}

/**
 * Get project time period
 * @param {Object} period
 * @returns {String} Time period
 */
export function getTimePeriod(period) {
  const { startYear, startMonth, endYear, endMonth } = period;

  const isSameYear = startYear === endYear ? "" : startYear;
  return `${startMonth} ${isSameYear} — ${endMonth} ${endYear} р.`;
}

/**
 * Generate liqpay signature hash
 * @param {String} data
 * @param {String} privateKey
 * @returns {String} hash
 */
export function generateLiqPaySignature(data, privateKey) {
  return cryptoJs.enc.Base64.stringify(
    cryptoJs.SHA1(privateKey + data + privateKey)
  );
}

/**
 * Encode string to base64
 * @param {String} string
 * @returns {String}
 */
export function encodeBase64(string) {
  return cryptoJs.enc.Base64.stringify(cryptoJs.enc.Utf8.parse(string));
}

/**
 * Decode string from base64
 * @param {String} string
 * @returns {String}
 */
export function decodeBase64(string) {
  return decodeURIComponent(
    cryptoJs.enc.Utf8.stringify(cryptoJs.enc.Base64.parse(string))
  );
}

/**
 * Creates a Response object with JSON-formatted content.
 *
 * @param {Object} options - The options for creating the response.
 * @param {string} options.message - The message to include in the response body.
 * @param {boolean} options.success - Indicates whether the operation was successful.
 * @param {number} options.status - The HTTP status code for the response.
 * @returns {Response} A new Response object with the specified content and status.
 */
export function createResponse({ message, success, status }) {
  return new Response(JSON.stringify({ message, success }), { status });
}

/**
 * Updates the browser's history state with a new URL without reloading the page.
 * @param {*} url — The new URL to be set in the browser's address bar.
 */
export function updateBrowserHistory(url) {
  window.history.replaceState({}, "", url);
}

/**
 * Generates the appropriate logo filename based on locale and device type.
 *
 * @param {string} locale - The locale code (e.g., 'ua', 'en')
 * @param {boolean} [isMobile=false] - Whether to use the compact mobile version
 * @returns {string} The logo filename without extension (e.g., 'ecomisto-logo-ua-compact')
 *
 * @example
 * // Desktop Ukrainian logo
 * getLogo('ua', false); // → 'ecomisto-logo-ua'
 *
 * @example
 * // Mobile English logo
 * getLogo('en', true); // → 'ecomisto-logo-en-compact'
 *
 * @example
 * // Desktop logo (mobile defaults to false)
 * getLogo('ua'); // → 'ecomisto-logo-ua'
 */
export function getLogo(locale, isMobile) {
  const suffix = isMobile ? "-compact" : "";
  return `ecomisto-logo-${locale}${suffix}`;
}
