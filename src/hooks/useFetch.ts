import { useEffect, useState, useTransition } from 'react';

import { IData } from '../types';

export const useFetch = (url: string) => {
  const [data, setData] = useState<IData[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<boolean>(false);

  const newUrl = new URL(url);

  async function fetchData(params?: string) {
    try {
      const res = await fetch(`${newUrl.href}/?${params || ''}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(true);
    }
  }

  async function refetch({ params }: { params: object }) {
    const mappedParams = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const thisParams = new URLSearchParams(mappedParams);
    return startTransition(() => fetchData(thisParams.toString()));
  }

  useEffect(() => {
    startTransition(fetchData);
  }, [url]);

  return {
    data,
    isLoading: isPending,
    error,
    refetch,
  };
};
