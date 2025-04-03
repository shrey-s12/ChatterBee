import React from 'react'
import { X } from 'lucide-react'
import useChatStore from '../store/useChatStore';
import useAuthStore from '../store/useAuthStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className='p-2.5 boredr-b border-base-300'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Avatar */}
          <div className='avatar'>
            <div className='rounded-full size-10 relative'>
              <img src={selectedUser.profilePic} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User Info */}
          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className='text-base-content/70 text-sm'>
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader