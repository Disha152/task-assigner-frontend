import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ /* initial state */ });
  const { handleRegister } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Form fields for registration */}
    </form>
  );
};

export default RegisterForm;
