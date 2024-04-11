import Image from 'next/image';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/ProfileProperties';
import connectDB from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import Property from '@/models/Property';

// NOTE: This component has been changed to a server component and now fetches
// the users properties by querying the database directly.
// We use a new client component - ProfileProperties which takes state from this
// page component and updates when a property is deleted by using a server
// action.

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const propertiesDocs = await Property.find({ owner: userId }).lean();
  const properties = propertiesDocs.map(convertToSerializeableObject);

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image
                  className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0'
                  src={sessionUser.user.image || profileDefault}
                  width={200}
                  height={200}
                  alt='User'
                />
              </div>
              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span>{' '}
                {sessionUser.user.name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span>{' '}
                {sessionUser.user.email}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              {properties.length === 0 ? (
                <p>You have no property listings</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
