import qs from 'qs';
import { useEffect, useState } from 'react';
import { CustomEventParams } from './hooks.type';

import type { Window } from '../types/global';

type Query = qs.ParsedQs;

const useHistory = () => {
  const [url, setUrl] = useState(new URL(window.location.href));
  const origin = url.origin;
  const pathname = url.pathname;
  const query = qs.parse(url.search.replace('?', ''));

  const events = {
    on: (
      eventName: 'replaceState' | 'popState',
      callback: (event: CustomEvent<CustomEventParams>) => void
    ) => {
      (window as Window).addEventListener(eventName, callback);
    },
    off: (
      eventName: 'replaceState' | 'popState',
      callback: (event: CustomEvent<CustomEventParams>) => void
    ) => {
      (window as Window).removeEventListener(eventName, callback);
    },
  };

  const getQueryValue = <T extends string>(query: Query, key: string) => {
    const queryValue = key in query ? query[key] : [];
    return (
      (Array.isArray(queryValue) && queryValue) ||
      (typeof queryValue === 'string' && queryValue.split(',')) ||
      []
    ).filter((value): value is T => typeof value === 'string');
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
    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply: (target, thisArg, [data, unused, url]: [unknown, string, string]) => {
        window.dispatchEvent(
          new CustomEvent<CustomEventParams>('replaceState', {
            detail: { url, origin },
          })
        );
        return target.apply(thisArg, [data, unused, url]);
      },
    });
    window.history.replaceState(null, '', url);
  };

  const updateQuery = (query: Query) => {
    const queryObj = sortQueryValue(query);
    const strQuery = qs.stringify(queryObj, {
      arrayFormat: 'comma',
    });

    replace(strQuery ? `${pathname}?${strQuery}` : pathname);
  };

  useEffect(() => {
    const handler = (event: CustomEvent<CustomEventParams>) => {
      setUrl(new URL(event.detail.url, event.detail.origin));
    };

    events.on('replaceState', handler);

    return () => {
      events.off('replaceState', handler);
    };
  }, []);

  return {
    query,
    events,
    updateQuery,
    getQueryValue,
  };
};

export default useHistory;
