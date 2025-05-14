import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ServiceResponse } from "../utils/serviceResponse";
import { getHTTPStatus } from "../types";

export type TAllowedRequestKeys =
	| "body"
	| "params"
	| "query"
	| "headers"
	| "locals";

export type TExtractedRequest<T extends TAllowedRequestKeys> = {
	[K in T]: K extends "locals"
		? Record<string, unknown>
		: K extends keyof Request
			? Request[K]
			: never;
};

export const getRequestObjectKeys = <T extends TAllowedRequestKeys>(
	keys: T[],
	req: Request,
	res: Response,
): TExtractedRequest<T> => {
	const result = {} as TExtractedRequest<T>;
	for (const key of keys) {
		result[key] = key === "locals" ? res.locals : req[key as keyof Request];
	}
	return result;
};

export type ControllerConfig<
	T extends TAllowedRequestKeys,
	R extends TExtractedRequest<T>,
> = {
	service: (input: R) => Promise<ServiceResponse>;
	requestKeys: T[];
	middlewares: RequestHandler[];
};

export const genericController = <
	T extends TAllowedRequestKeys,
	R extends TExtractedRequest<T>,
>(
	config: ControllerConfig<T, R>,
) => [
	...config.middlewares,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const input = getRequestObjectKeys(config.requestKeys, req, res);

			const response = await config.service(input as R);

			res.status(getHTTPStatus(response.status)).json(response);
			return;
		} catch (error) {
			next(error);
		}
	},
];
