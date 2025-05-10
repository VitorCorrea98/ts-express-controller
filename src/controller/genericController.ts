import type { NextFunction, Request, Response } from "express";
import type {
	ServiceFunction,
	ServiceResponse,
} from "../utils/serviceResponse";
import type { GenericMiddleware } from "../types/genericMiddleware";
import { getHTTPStatus } from "../types/httpStatus";

/**
 * Cria um controller genérico para Express que executa uma função de serviço, processa o input
 * e responde automaticamente com o status HTTP e JSON correto.
 *
 * @template TInput - Tipo dos dados de entrada processados pela serviceFunction.
 * @template TResponse - Tipo esperado como retorno da serviceFunction (deve estender ServiceResponse).
 * @template TRequest - Tipo do Request do Express, default é Request.
 *
 * @param {ServiceFunction<TInput, TResponse>} serviceFunction - Função de serviço que executa a lógica principal.
 * @param {(req: TRequest) => TInput} [selector=(req) => req.body as TInput] - Função opcional para extrair os dados do Request.
 * @param {GenericMiddleware<TRequest, Response, NextFunction>[]} [middlewares=[]] - Array opcional de middlewares adicionais.
 *
 * @returns {Array} Um array de middlewares Express, pronto para ser usado em rotas.
 *
 * @example
 * import express from 'express';
 * import { genericController } from 'minha-lib';
 * import { myServiceFunction } from './services';
 *
 * const router = express.Router();
 *
 * router.post(
 *   '/user',
 *   ...genericController(myServiceFunction)
 * );
 *
 * @example
 * // Usando um selector customizado e middlewares
 * router.post(
 *   '/user',
 *   ...genericController(
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
