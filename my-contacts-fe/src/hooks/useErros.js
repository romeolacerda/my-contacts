import { useCallback, useState } from 'react';

export default function useErros() {
  const [erros, setErros] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExits = erros.find((error) => error.field === field);

    if (errorAlreadyExits) {
      return;
    }

    setErros((prevState) => [...prevState, { field, message }]);
  }, [erros]);

  const removeError = useCallback((fieldName) => {
    setErros((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }, []);

  const getErrorMessageByFieldName = useCallback((fieldName) => erros.find((error) => error.field
    === fieldName)?.message, [erros]);

  return {
    setError, removeError, getErrorMessageByFieldName, erros,
  };
}
