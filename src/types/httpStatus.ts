/**
 * HTTP success status codes (2xx).
 *
 * @property {number} OK - Successful request (200).
 * @property {number} CREATED - Resource successfully created (201).
 * @property {number} ACCEPTED - Request accepted, processing pending (202).
 * @property {number} NO_CONTENT - Successful request with no content (204).
 * @property {number} PARTIAL_CONTENT - Partial content returned (206).
 */
const HTTPGoodStatus = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	PARTIAL_CONTENT: 206,
} as const;

/**
 * HTTP client error status codes (4xx).
 *
 * @property {number} BAD_REQUEST - Invalid syntax (400).
 * @property {number} UNAUTHORIZED - Authentication required (401).
 * @property {number} FORBIDDEN - Access not allowed (403).
 * @property {number} NOT_FOUND - Resource not found (404).
 * @property {number} METHOD_NOT_ALLOWED - HTTP method not allowed (405).
 * @property {number} REQUEST_TIMEOUT - Request timeout exceeded (408).
 * @property {number} CONFLICT - Conflict with resource state (409).
 * @property {number} UNPROCESSABLE_ENTITY - Semantically invalid input (422).
 * @property {number} TOO_MANY_REQUESTS - Rate limit exceeded (429).
 */
const HTTPBadStatus = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,
	TOO_MANY_REQUESTS: 429,
} as const;

/**
 * HTTP server error status codes (5xx).
 *
 * @property {number} INTERNAL_SERVER_ERROR - Generic internal error (500).
 * @property {number} BAD_GATEWAY - Invalid response from upstream (502).
 * @property {number} SERVICE_UNAVAILABLE - Server temporarily unavailable (503).
 * @property {number} GATEWAY_TIMEOUT - Timeout communicating with upstream (504).
 */
const HTTPServerErrorStatus = {
	INTERNAL_SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Maps all available HTTP status codes combining success, client errors, and server errors.
 */
export const HTTPStatusMap = {
	...HTTPGoodStatus,
	...HTTPBadStatus,
	...HTTPServerErrorStatus,
} as const;

/**
 * Type for the keys of success status codes (2xx).
 */
export type TGoodStatus = keyof typeof HTTPGoodStatus;

/**
 * Type for the keys of client error status codes (4xx).
 */
export type TBadStatus = keyof typeof HTTPBadStatus;

/**
 * Type for the keys of server error status codes (5xx).
 */
export type TServerStatus = keyof typeof HTTPServerErrorStatus;

/**
 * Type for the keys of all available HTTP status codes.
 */
export type TStatus = keyof typeof HTTPStatusMap;

/**
 * Utility function to get the HTTP status code number from a status key.
 *
 * @param {TStatus} status - Name of the HTTP status key (e.g., 'OK', 'BAD_REQUEST').
 * @returns {HTTpStatusMap[number]} - Corresponding HTTP status code (e.g., 200, 400).
 */
export const getHTTPStatus = (status: TStatus) => HTTPStatusMap[status];
