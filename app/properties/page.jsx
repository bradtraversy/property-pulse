import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';
import Property from '@/models/Property';
import connectDB from '@/config/database';

// NOTE: this is a server component so we can use the url search parameters here
// to query our database directly and then pass the properties to our Properties
// component. This then means the Properties component can be rendered server
// side and no longer needs to make a fetch reqeust to an API route handler.

const PropertiesPage = async ({ searchParams: { pageSize = 6, page = 1 } }) => {
  await connectDB();

  const skip = (page - 1) * pageSize;

  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <Properties
        properties={properties}
        total={total}
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
      />
    </>
  );
};
export default PropertiesPage;
