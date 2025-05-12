import type { Request } from "express";

/**
 * Represents a function that extracts and returns typed data from an Express request object.
 *
 * @template TInput - The type of the data to be selected from the request.
 * @template TRequest - The type of the Express request, defaults to the base Request type.
 * @param {TRequest} req - The Express request object.
 * @returns {TInput} The extracted data from the request.
 */
export type DataSelector<TInput, TRequest extends Request = Request> = (
	req: TRequest,
) => TInput;
