'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import PropertySearchForm from '@/components/PropertySearchForm';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(eror);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='px-4 py-6'>
          <div className='container-xl lg:container m-auto px-4 py-6'>
            <Link
              href='/properties'
              className='flex items-center text-blue-500 hover:underline mb-3'
            >
              <FaArrowAltCircleLeft className='mr-2 mb-1' /> Back To Properties
            </Link>
            <h1 className='text-2xl mb-4'>Search Results</h1>
            {properties.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResultsPage;
