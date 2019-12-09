import { useState } from 'react';

const useForm = callback => {
  const [values, setValues] = useState({});

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };
  
  const handleSubmit =event => {
      return values;
  }

  return {
    handleChange,
    handleSubmit,
    values
  };
};

export default useForm;
