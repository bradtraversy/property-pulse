import Link from 'next/link';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import ShareButtons from '@/components/ShareButtons';
import { FaArrowLeft } from 'react-icons/fa';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const PropertyPage = async ({ params }) => {
  // NOTE: No need for making a fetch request here to our API routes, we can
  // simply make this component a server component and query the DB directly.
  // Making a fetch request is an unnecessary additional step.

  // NOTE: here we can check if we are runningin in production on vercel and get
  // the public url at build time for the ShareButtons, or fall back to localhost in development.
  const PUBLIC_DOMAIN = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  await connectDB();

  // query the property in the DB
  const propertyDoc = await Property.findById(params.id).lean();

  // convert the document to a plain js object so we can pass to client
  // components
  const property = convertToSerializeableObject(propertyDoc);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails property={property} />
            <aside className='space-y-4'>
              <BookmarkButton property={property} />
              <ShareButtons property={property} PUBLIC_DOMAIN={PUBLIC_DOMAIN} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};
export default PropertyPage;
