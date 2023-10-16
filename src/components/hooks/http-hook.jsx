import { useState, useCallback } from 'react';

export const useHttpRequest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  const sendRequest = useCallback(async function (url, uploadData = undefined) {
    setIsSubmitting(true);
    try {
      const fetchPro = uploadData
        ? fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(url);

      // if timeout finishes 1st, will result in rejected promise and trigger catch block;
      const res = await Promise.race([
        fetchPro,
        timeout(+`${import.meta.env.VITE_TIMEOUT_SEC}`),
      ]);
      // console.log('getJSON res:', res);

      const data = await res.json();
      console.log('getJSON data:', data);

      if (!res.ok) throw new Error(`${data.message} (${res.status}😫)`);

      setIsSubmitting(false);
      return data;
    } catch (err) {
      console.log('sendrequest err:', err);
      setError(err);
      setIsSubmitting(false);
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(undefined);
  };

  return { isSubmitting, error, sendRequest, clearError };
};
