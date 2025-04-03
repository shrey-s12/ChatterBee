import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {

  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const render = new FileReader();
    render.readAsDataURL(file);

    render.onload = async () => {
      const base64Image = render.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-lg p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* Image Upload Section */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img src={selectedImg || authUser.profilePic} alt="Profile" className='size-32 rounded-full object-cover border-4' />
              <label
                htmlFor="image-upload"
                className={`
                  absolute bottom-0 right-0 p-2 bg-base-content rounded-full cursor-pointer hover:scale-105 transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}
                `}
              >
                <Camera className='w-5 h-5 text-base-200' />
                <input
                  type="file"
                  id="image-upload"
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera to upload a new profile picture'}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 not-visited:flex items-center gap-2'>
                <User className='w-4 h-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.fullName}</p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 not-visited:flex items-center gap-2'>
                <Mail className='w-4 h-4' />
                Email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.email}</p>
            </div>
          </div>

          <div className='mt-6 bg-base-300 rounded-xl p-6'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex justify-between items-center py-2 border-b border-zinc-700'>
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className='flex justify-between items-center py-2'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage