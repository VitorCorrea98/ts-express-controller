import type {
	TBadStatus,
	TGoodStatus,
	TServerStatus,
} from "../types/httpStatus";

/**
 * Representa uma resposta de sucesso retornada por um serviço.
 *
 * @template T - Tipo dos dados opcionais retornados.
 * @property {TGoodStatus} status - Código HTTP de sucesso (ex: 'OK', 'CREATED').
 * @property {string} message - Mensagem descritiva da resposta.
 * @property {T} [data] - Dados adicionais retornados pelo serviço.
 */
export type ServiceSuccessResponse<T = unknown> = {
	status: TGoodStatus;
	message: string;
	data?: T;
};

/**
 * Representa uma resposta de erro retornada por um serviço.
 *
 * @template T - Tipo do valor de erro detalhado.
 * @property {TBadStatus | TServerStatus} status - Código HTTP de erro (ex: 'BAD_REQUEST', 'INTERNAL_SERVER_ERROR').
 * @property {string} message - Mensagem descritiva do erro.
 * @property {T} error - Informação detalhada do erro.
 */
export type ServiceErrorResponse<T = unknown> = {
	status: TBadStatus | TServerStatus;
	message: string;
	error: T;
};

/**
 * Representa a resposta geral de um serviço, que pode ser sucesso ou erro.
 *
 * @type {ServiceSuccessResponse | ServiceErrorResponse}
 */
export type ServiceResponse = ServiceSuccessResponse | ServiceErrorResponse;

/**
 * Tipo genérico para definir funções de serviço.
 *
 * @template TInput - Tipo do input esperado pela função.
 * @template TResponse - Tipo da resposta que será retornada.
 * @param {TInput} input - Dados de entrada do serviço.
 * @returns {Promise<TResponse>} - Promessa que resolve com a resposta do serviço.
 */
export type ServiceFunction<TInput, TResponse> = (
	input: TInput,
) => Promise<TResponse>;
