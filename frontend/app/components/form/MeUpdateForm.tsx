import React, { useEffect, useState } from 'react';
import { registerUser, updateMe } from '../../api/authAdaptor';
import { useSelector } from 'react-redux';
import { selectError } from '../../store/features/user/selectors/authSelectors';
import { useRouter } from 'next/router';
import RegisterForm from './RegisterForm';
import { authedPost, authedPut } from '@/app/api/baseAdaptor';

interface FormData {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const MeUpdateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const apiErrorMsg = useSelector(selectError) as string;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (apiErrorMsg && apiErrorMsg.includes('401')) {
      setErrorMessage("The info you entered is not valid.");
    }
  }, [apiErrorMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.bio || !formData.profilePicture) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('bio', formData.bio);
      //data.append('profilePicture', formData.profilePicture);
      const response = await updateMe(data);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('User update successful!');
        router.push('/me/threads');
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="w-full p-6 bg-white sm:shadow-md rounded-lg">
      <h2 className="text-xl font-bold my-4 text-center">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-500">name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="email" className="block text-sm font-medium text-gray-500">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="bio" className="block text-sm font-medium text-gray-500">bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-500">profilePicture</label>
        <input
          type="text"
          id="profilePicture"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Update My Profile
        </button>
        <button
          className="w-full bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => router.back()}>
          Hold on, go back
        </button>
      </form>
      {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage || apiErrorMsg}</p>}
      {successMessage && <p className="mt-4 text-sm text-green-500">{successMessage}</p>}
    </div>
  );
};

export default MeUpdateForm;
