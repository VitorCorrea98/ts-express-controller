import type {
	TBadStatus,
	TGoodStatus,
	TServerStatus,
} from "../types/httpStatus";

/**
 * Represents a successful response returned by a service.
 *
 * @template T - Type of the optional returned data.
 * @property {TGoodStatus} status - HTTP success code (e.g., 'OK', 'CREATED').
 * @property {string} message - Descriptive message of the response.
 * @property {T} [data] - Additional data returned by the service.
 */
export type ServiceSuccessResponse<T = unknown> = {
	status: TGoodStatus;
	message: string;
	data?: T;
};

/**
 * Represents an error response returned by a service.
 *
 * @template T - Type of the detailed error value.
 * @property {TBadStatus | TServerStatus} status - HTTP error code (e.g., 'BAD_REQUEST', 'INTERNAL_SERVER_ERROR').
 * @property {string} message - Descriptive error message.
 * @property {T} error - Detailed error information.
 */
export type ServiceErrorResponse<T = unknown> = {
	status: TBadStatus | TServerStatus;
	message: string;
	error: T;
};

/**
 * Represents a general service response, which can be either success or error.
 *
 * @type {ServiceSuccessResponse | ServiceErrorResponse}
 */
export type ServiceResponse = ServiceSuccessResponse | ServiceErrorResponse;

/**
 * Generic type for defining service functions.
 *
 * @template TInput - Type of the expected input for the function.
 * @template TResponse - Type of the response that will be returned.
 * @param {TInput} input - Input data for the service.
 * @returns {Promise<TResponse>} - A promise that resolves with the service response.
 */
export type ServiceFunction<TInput, TResponse> = (
	input: TInput,
) => Promise<TResponse>;
