import { useState } from 'react';
const useForm = callback => {
  const [values, setValues] = useState({});

  const handleChange = event => {
    event.persist();
    // console.log(event);
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    values
  };
};

export default useForm;
