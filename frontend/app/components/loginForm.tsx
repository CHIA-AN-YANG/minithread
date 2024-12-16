import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('/login', formData);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Login successful!');
        setFormData({ email: '', password: '' });
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage}</p>}
      {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
    </div>
  );
};

export default LoginForm;