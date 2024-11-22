import { useState } from 'react';

export default function useErros() {
  const [erros, setErros] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExits = erros.find((error) => error.field === field);

    if (errorAlreadyExits) {
      return;
    }

    setErros((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fieldName) {
    setErros((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldName) {
    return erros.find((error) => error.field === fieldName)?.message;
  }

  return {
    setError, removeError, getErrorMessageByFieldName, erros,
  };
}
