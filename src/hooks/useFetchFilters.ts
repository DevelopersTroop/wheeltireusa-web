import { customFetch } from '@/lib/commonFetch';
import { TFilters } from '@/types/filter';
import { IApiRes } from '@/types/reduxHelper';
import { useEffect, useState } from 'react';

export const useFetchFilters = (
  category: 'wheels' | 'tire' | 'accessories',
  options?: {
    queryParams?: Record<string, string>;
  }
) => {
  const [filters, setFilters] = useState<TFilters | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      setLoading(true);
      try {
        const { data } = await customFetch<IApiRes<{ filters: TFilters }>>(
          'products/filter-list',
          'GET',
          {
            queryParams: {
              category,
              ...options?.queryParams,
            },
          }
        );
        setFilters(data.filters);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, options?.queryParams]);

  return {
    filters,
    loading,
  };
};
