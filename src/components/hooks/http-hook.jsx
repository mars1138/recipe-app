import { useState, useCallback } from 'react';

// Hook returns: sendRequest for API calls; isSubmitting & error states; function to clear errors
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
      // uploadData exists, send POST; else default to GET
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

      const data = await res.json();
      if (!res.ok)
        throw new Error(
          `${data.message ? data.message : ''}\nUnable to complete request:  ${
            res.statusText ? res.statusText : 'Unknown error'
          } (${res.status})`
        );
      if (data.data?.recipes?.length === 0)
        throw new Error(`No results found for query`);

      setIsSubmitting(false);
      return data;
    } catch (err) {
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
