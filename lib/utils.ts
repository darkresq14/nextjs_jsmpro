import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type QueryParams = {
  params: string;
};

interface ToAdd extends QueryParams {
  key: string;
  value: string | null;
}

interface ToRemove extends QueryParams {
  keysToRemove: string[];
}

type UrlQueryParams =
  | (ToAdd & { keysToRemove?: never })
  | (ToRemove & { key?: never; value?: never });

export function formUrlQuery(props: UrlQueryParams) {
  const currentUrl = qs.parse(props.params);

  if ('keysToRemove' in props && props.keysToRemove) {
    props.keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove];
    });
  } else {
    currentUrl[props.key] = props.value;
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
