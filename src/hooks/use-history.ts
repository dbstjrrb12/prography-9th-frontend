import qs from 'qs';
import { useState } from 'react';

type Query = qs.ParsedQs;

const useHistory = () => {
  const [url, setUrl] = useState(new URL(window.location.href));
  const origin = url.origin;
  const pathname = url.pathname;
  const query = qs.parse(url.search.replace('?', ''));

  const getQueryValue = (query: Query, key: string) => {
    const queryValue = key in query ? query[key] : [];
    return (
      (Array.isArray(queryValue) && queryValue) ||
      (typeof queryValue === 'string' && queryValue.split(',')) ||
      []
    ).filter((value): value is string => typeof value === 'string');
  };

  const sortQueryValue = (query: Query) => {
    return Object.fromEntries(
      Object.entries(query).map(([key, value]) => {
        if (Array.isArray(value)) {
          value.sort();
        }

        return [key, value];
      })
    );
  };

  const replace = (url: string) => {
    window.history.replaceState(null, '', url);

    setUrl(new URL(`${origin}${url}`));
  };

  const updateQuery = (query: Query) => {
    const queryObj = sortQueryValue(query);
    const strQuery = qs.stringify(queryObj, {
      arrayFormat: 'comma',
    });

    replace(strQuery ? `${pathname}?${strQuery}` : pathname);
  };

  return {
    query,
    replace,
    pathname,
    updateQuery,
    getQueryValue,
  };
};

export default useHistory;
