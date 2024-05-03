import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
  // NOTE: Here we have removed the try catch block so that at build time NextJS
  // can catch the error and know not to try and statically generate pages that
  // require a auth session.
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
