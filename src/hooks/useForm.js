import { useState } from "react";


export const useForm = ( initialValues = {} ) => {
  const [formState, setFormState] = useState(initialValues);

  const onChange = (event) => {
    event.preventDefault();
    setFormState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onReset = () => {
    setFormState(initialValues);
  };

  return {
    onChange,
    ...formState,
    onReset,
    formState
  };
};
