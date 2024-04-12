'use client';
import { useGlobalContext } from '@/context/GlobalContext';

// NOTE: here the logic for getting the unread message count has been moved to
// GlobalContext since that component is also responsible for managing that
// state, additionally we can use a server action to get the unread message
// count.

const UnreadMessageCount = () => {
  const { unreadCount } = useGlobalContext();

  return unreadCount > 0 ? (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadCount}
    </span>
  ) : null;
};
export default UnreadMessageCount;
