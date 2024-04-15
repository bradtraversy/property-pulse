import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';

// NOTE: This has been changed to a server component and now receives props from
// the page parent so no need to make a fetch request to an API route handler.

const Properties = ({ properties, total, page, pageSize }) => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination page={page} pageSize={pageSize} totalItems={total} />
      </div>
    </section>
  );
};
export default Properties;
