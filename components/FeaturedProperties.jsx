import FeaturedPropertyCard from './FeaturedPropertyCard';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const FeaturedProperties = async () => {
  // NOTE: here we can use a server component and simply query the database
  // directly.

  await connectDB();

  const properties = await Property.find({
    is_featured: true,
  }).lean();

  // NOTE: don't use logical && for conditional rendering especially on the
  // length of an array - https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx

  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};
export default FeaturedProperties;
