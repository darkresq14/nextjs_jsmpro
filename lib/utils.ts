import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
import { type } from 'os';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type QueryParams = {
  params: string;
};

interface toAdd extends QueryParams {
  key: string;
  value: string | null;
}

interface toRemove extends QueryParams {
  keysToRemove: string[];
}

type UrlQueryParams = toAdd | toRemove;

export function formUrlQuery(props: UrlQueryParams) {
  const currentUrl = qs.parse(props.params);

  if ('keysToRemove' in props) {
    props.keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove];
    });
  } else if ('key' in props) {
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
