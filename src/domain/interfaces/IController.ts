export interface IRequest<TBody = unknown, TParams = unknown, TQuery = unknown> {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, unknown>;
}

export interface IController<TBody = unknown, TParams = unknown, TQuery = unknown> {
  handle: (request: IRequest<TBody, TParams, TQuery>) => Promise<IResponse>;
}
