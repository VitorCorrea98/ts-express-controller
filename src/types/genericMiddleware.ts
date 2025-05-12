/**
 * Represents an asynchronous middleware function that returns a Promise<void>.
 *
 * @template T - Type of the request object.
 * @template U - Type of the response object.
 * @template X - Type of the next function.
 * @param {T} req - Request object.
 * @param {U} res - Response object.
 * @param {X} next - Next middleware function.
 * @returns {Promise<void>} A promise that resolves when the middleware is done.
 */
export type GenericPromiseVoidMiddleware<T, U, X> = (
	req: T,
	res: U,
	next: X,
) => Promise<void>;

/**
 * Represents a synchronous middleware function.
 *
 * @template T - Type of the request object.
 * @template U - Type of the response object.
 * @template X - Type of the next function.
 * @param {T} req - Request object.
 * @param {U} res - Response object.
 * @param {X} next - Next middleware function.
 */
export type GenericVoidMiddleware<T, U, X> = (req: T, res: U, next: X) => void;

/**
 * Represents a generic middleware function, which can be either synchronous or asynchronous.
 *
 * @template T - Type of the request object.
 * @template U - Type of the response object.
 * @template X - Type of the next function.
 */
export type GenericMiddleware<T, U, X> =
	| GenericVoidMiddleware<T, U, X>
	| GenericPromiseVoidMiddleware<T, U, X>;
