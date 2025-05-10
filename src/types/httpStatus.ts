/**
 * Códigos HTTP de sucesso (2xx).
 *
 * @property {number} OK - Requisição bem-sucedida (200).
 * @property {number} CREATED - Recurso criado com sucesso (201).
 * @property {number} ACCEPTED - Requisição aceita, processamento pendente (202).
 * @property {number} NO_CONTENT - Requisição bem-sucedida, sem conteúdo (204).
 * @property {number} PARTIAL_CONTENT - Conteúdo parcial retornado (206).
 */
export const HTTPGoodStatus = {
	OK: 200,
	CREATED: 201,
	ACCEPTED: 202,
	NO_CONTENT: 204,
	PARTIAL_CONTENT: 206,
} as const;

/**
 * Códigos HTTP de erro do cliente (4xx).
 *
 * @property {number} BAD_REQUEST - Sintaxe inválida (400).
 * @property {number} UNAUTHORIZED - Autenticação necessária (401).
 * @property {number} FORBIDDEN - Acesso não permitido (403).
 * @property {number} NOT_FOUND - Recurso não encontrado (404).
 * @property {number} METHOD_NOT_ALLOWED - Método HTTP não permitido (405).
 * @property {number} REQUEST_TIMEOUT - Tempo de requisição excedido (408).
 * @property {number} CONFLICT - Conflito com estado do recurso (409).
 * @property {number} UNPROCESSABLE_ENTITY - Entrada semanticamente inválida (422).
 * @property {number} TOO_MANY_REQUESTS - Limite de requisições excedido (429).
 */
export const HTTPBadStatus = {
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
 * Códigos HTTP de erro do servidor (5xx).
 *
 * @property {number} INTERNAL_SERVER_ERROR - Erro interno genérico (500).
 * @property {number} BAD_GATEWAY - Resposta inválida do upstream (502).
 * @property {number} SERVICE_UNAVAILABLE - Servidor temporariamente indisponível (503).
 * @property {number} GATEWAY_TIMEOUT - Timeout na comunicação com upstream (504).
 */
export const HTTPServerErrorStatus = {
	INTERNAL_SERVER_ERROR: 500,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
} as const;

/**
 * Mapeia todos os códigos HTTP disponíveis combinando sucessos, erros do cliente e erros do servidor.
 */
export const HTTPStatusMap = {
	...HTTPGoodStatus,
	...HTTPBadStatus,
	...HTTPServerErrorStatus,
} as const;

/**
 * Tipo para as chaves dos códigos de sucesso (2xx).
 */
export type TGoodStatus = keyof typeof HTTPGoodStatus;

/**
 * Tipo para as chaves dos códigos de erro do cliente (4xx).
 */
export type TBadStatus = keyof typeof HTTPBadStatus;

/**
 * Tipo para as chaves dos códigos de erro do servidor (5xx).
 */
export type TServerStatus = keyof typeof HTTPServerErrorStatus;

/**
 * Tipo para as chaves de todos os códigos HTTP disponíveis.
 */
export type TStatus = keyof typeof HTTPStatusMap;

/**
 * Função utilitária para obter o número do código HTTP a partir de uma chave de status.
 *
 * @param {TStatus} status - Nome da chave do status HTTP (ex: 'OK', 'BAD_REQUEST').
 * @returns {number} - Número do código HTTP correspondente (ex: 200, 400).
 */
export const getHTTPStatus = (status: TStatus) => HTTPStatusMap[status];
