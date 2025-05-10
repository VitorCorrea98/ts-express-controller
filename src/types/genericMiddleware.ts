export type GenericPromiseVoidMiddleware<T, U, X> = (
	req: T,
	res: U,
	next: X,
) => Promise<void>;

export type GenericVoidMiddleware<T, U, X> = (req: T, res: U, next: X) => void;

export type GenericMiddleware<T, U, X> =
	| GenericVoidMiddleware<T, U, X>
	| GenericPromiseVoidMiddleware<T, U, X>;
