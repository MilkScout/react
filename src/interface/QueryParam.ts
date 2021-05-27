export type QueryParamMapType = 'STRING' | 'BOOLEAN' | 'NUMBER';

export interface QueryParamDefinition {
  type: QueryParamMapType;
  isArray: boolean;
}

export interface QueryParamMap {
  [paramName: string]: QueryParamDefinition;
}

export interface QueryParams {
  [key: string]: string | boolean | number | Array<string | boolean | number>;
}
