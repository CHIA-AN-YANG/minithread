import React, { useEffect, useState } from 'react';
import { registerUser, updateMe } from '../../api/authAdaptor';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectUser } from '../../store/features/user/selectors/authSelectors';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getUserSuccess } from '@/app/store/features/user/actions/userActions';
import { AppDispatch } from '@/app/store/store';
import { UserData } from '@/app/model/model';
import { AxiosResponse } from 'axios';

interface FormData {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

const MeUpdateForm: React.FC = () => {
  const user = useSelector(selectUser);
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
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? '',
        email: user.email ?? '',
        bio: user.bio ?? '',
        profilePicture: user.profilePicture ?? '',
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBioChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePictureSelect = (picture: string) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: `/images/avatar-presets/${picture}.jpg`,
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

    if (!formData.name || !formData.email || !formData.bio || !formData.profilePicture) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('bio', formData.bio);
      data.append('profilePicture', formData.profilePicture);
      const response = await updateMe(data);
      if (response.status === 200 || response.status === 201) {
        dispatch(getUserSuccess((response as AxiosResponse<UserData>).data));
        toast.success('You have updated your profile.');
        router.push('/me/threads');
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="w-full overflow-y-scroll overflow-hidden p-6 bg-white sm:shadow-md rounded-lg">
      <h2 className="text-xl font-bold my-4 text-center">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <label htmlFor="name" className="flex gap-5 items-center text-sm font-medium text-gray-500">
          <p className='w-14'>name</p>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 flex grow px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label htmlFor="email" className="flex gap-5 items-center text-sm font-medium text-gray-500">
          <p className='w-14'>email</p>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 flex grow px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label htmlFor="bio" className="flex gap-5 items-center text-sm font-medium text-gray-500">
          <p className='w-14'>bio</p>
          <textarea
            id="bio"
            name="bio"
            rows={5}
            cols={30}
            value={formData.bio}
            onChange={handleBioChange}
            className="mt-1 flex grow px-3 py-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <br />
        <label className="block text-sm font-medium text-gray-500 mt-5">choose your picture</label>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, index) => {
            const picturePath = `/images/avatar-presets/avatar-${index + 1}.jpg`;
            return (
              <Image
                key={index}
                src={picturePath}
                width={80}
                height={80}
                alt={`Avatar ${index + 1}`}
                className={`rounded-md cursor-pointer ${formData.profilePicture === picturePath ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handlePictureSelect(`avatar-${index + 1}`)}
              />
            );
          })}
        </div>
        <button
          type="submit"
          className="w-full mt-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Update My Profile
        </button>
        {errorMessage && <p className="mt-4 text-sm text-red-500">{errorMessage || apiErrorMsg}</p>}
      </form>
    </div>
  );
};

export default MeUpdateForm;
