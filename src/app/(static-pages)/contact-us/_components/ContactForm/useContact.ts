'use client';

import { useState, useEffect } from 'react';
import { apiBaseUrl } from '@/utils/api';
import { toast } from 'sonner';

export const useContact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      toast('Success', { description: message });
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      toast('Error', { description: error || 'Something went wrong' });
      return () => clearTimeout(timer);
    }
  }, [error]);

  const submitContact = async (
    values: { name: string; email: string; subject: string; message: string },
    resetForm: () => void
  ) => {
    setIsLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/contact-us/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        setMessage(data.message);
        setIsSubmitted(true);
        setName(values.name);
        resetForm();
      } else if (data.errors?.length > 0) {
        setError(data.errors[0].message);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isSubmitted, name, submitContact };
};
