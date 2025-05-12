import type { NextFunction, Request, Response } from "express";
import type { GenericMiddleware } from "../types/genericMiddleware";
import { getHTTPStatus } from "../types/httpStatus";
import type {
	ServiceFunction,
	ServiceResponse,
} from "../utils/serviceResponse";

/**
 * Creates a generic controller for Express that executes a service function, processes the input,
 * and automatically responds with the correct HTTP status and JSON.
 *
 * @template TInput - Type of the input data processed by the service function.
 * @template TResponse - Type expected as the return value from the service function (should extend ServiceResponse).
 * @template TRequest - Type of the Express Request, defaults to Request.
 *
 * @param {ServiceFunction<TInput, TResponse>} serviceFunction - The service function that executes the main logic.
 * @param {(req: TRequest) => TInput} [selector=(req) => req.body as TInput] - Optional function to extract data from the Request.
 * @param {GenericMiddleware<TRequest, Response, NextFunction>[]} [middlewares=[]] - Optional array of additional middlewares.
 *
 * @returns {Array} An array of Express middlewares, ready to be used in routes.
 *
 * @example
 * import express from 'express';
 * import { genericController } from 'my-lib';
 * import { myServiceFunction } from './services';
 *
 * const router = express.Router();
 *
 * router.post(
 *   '/user',
 *   genericController(myServiceFunction)
 * );
 *
 * @example
 * // Using a custom selector and middlewares
 * router.post(
 *   '/user',
 *   genericController(
 *     myServiceFunction,
 *     (req) => ({ userId: req.params.id }),
 *     [authMiddleware]
 *   )
 * );
 */
export const genericController = <
	TInput,
	TResponse extends ServiceResponse,
	TRequest extends Request = Request,
>(
	serviceFunction: ServiceFunction<TInput, TResponse>,
	selector: (req: TRequest) => TInput = (req) => req.body as TInput,
	middlewares: GenericMiddleware<TRequest, Response, NextFunction>[] = [],
) => [
	...middlewares,
	async (req: TRequest, res: Response): Promise<void> => {
		try {
			const inputData = selector(req);
			const serviceResponse = await serviceFunction(inputData);

			const httpStatus = getHTTPStatus(serviceResponse.status);

			res.status(httpStatus).json(serviceResponse);
		} catch (error) {
			res.status(500).json({
				status: "ERROR",
				message: "Internal server error",
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	},
];
