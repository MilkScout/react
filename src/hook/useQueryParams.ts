import { QueryParams, QueryParamDefinition, QueryParamMap, QueryParamMapType } from '../interface';

const QUERY_PARAM_MAP_FUNC: Record<QueryParamMapType, (value: string) => any> = {
  BOOLEAN: (value) => !!value,
  NUMBER: (value) => parseFloat(value),
  STRING: (value) => value,
};

export const useQueryParams = (mapper: QueryParamMap = {}): QueryParams => {
  const response: QueryParams = {};
  let { search } = window.location;

  if (search.startsWith('?')) {
    search = search.substring(1);
  }

  search
    .split('&')
    .filter((pair) => !!pair)
    .map((pair) => pair.split('='))
    .map((pair) => [decodeURIComponent(pair[0]), decodeURIComponent(pair[1])])
    .forEach(([queryKey, queryValue]) => {
      const typeDefinition: QueryParamDefinition = mapper[queryKey] || 'STRING';
      const mappedValue = QUERY_PARAM_MAP_FUNC[typeDefinition.type](queryValue);
      if (typeof response[queryKey] === 'undefined' && typeDefinition.isArray) {
        response[queryKey] = [];
      }
      const currentValue = response[queryKey];
      if (typeDefinition.isArray && Array.isArray(currentValue)) {
        currentValue.push(mappedValue);
      } else {
        response[queryKey] = mappedValue;
      }
    });
  return response;
};
