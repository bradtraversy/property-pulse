import { fetchProperties } from '@/utils/requests';

const FeaturedProperties = async () => {
  const properties = await fetchProperties({
    showFeatured: true,
  });

  console.log(properties);

  return (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-blue-500 mb-6 text-center'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
            <img
              src='images/properties/f1.jpg'
              alt=''
              className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
            />
            <div className='p-6'>
              <h3 className='text-xl font-bold'>Seaside Retreat</h3>
              <div className='text-gray-600 mb-4'>Condo</div>
              <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
                $2,500/wk
              </h3>
              <div className='flex justify-center gap-4 text-gray-500 mb-4'>
                <p>
                  <i className='fa-solid fa-bed'></i> 4
                  <span className='md:hidden lg:inline'>Beds</span>
                </p>
                <p>
                  <i className='fa-solid fa-bath'></i> 3
                  <span className='md:hidden lg:inline'>Baths</span>
                </p>
                <p>
                  <i className='fa-solid fa-ruler-combined'></i>
                  2,800 <span className='md:hidden lg:inline'>sqft</span>
                </p>
              </div>

              <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
                <p>
                  <i className='fa-solid fa-money-bill'></i> Nightly
                </p>
                <p>
                  <i className='fa-solid fa-money-bill'></i> Weekly
                </p>
              </div>

              <div className='border border-gray-200 mb-5'></div>

              <div className='flex flex-col lg:flex-row justify-between'>
                <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
                  <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
                  <span className='text-orange-700'> Boston MA </span>
                </div>
                <a
                  href='property.html'
                  className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
                >
                  Details
                </a>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
            <img
              src='images/properties/e1.jpg'
              alt=''
              className='object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
            />
            <div className='p-6'>
              <h3 className='text-xl font-bold'>Modern Downtown Studio</h3>
              <div className='text-gray-600 mb-4'>Studio</div>
              <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
                $4,200/mo
              </h3>
              <div className='flex justify-center gap-4 text-gray-500 mb-4'>
                <p>
                  <i className='fa-solid fa-bed'></i> 1
                  <span className='md:hidden lg:inline'>Beds</span>
                </p>
                <p>
                  <i className='fa-solid fa-bath'></i> 1
                  <span className='md:hidden lg:inline'>Baths</span>
                </p>
                <p>
                  <i className='fa-solid fa-ruler-combined'></i>
                  900 <span className='md:hidden lg:inline'>sqft</span>
                </p>
              </div>

              <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
                <p>
                  <i className='fa-solid fa-money-bill'></i> Nightly
                </p>
                <p>
                  <i className='fa-solid fa-money-bill'></i> Weekly
                </p>
              </div>

              <div className='border border-gray-200 mb-5'></div>

              <div className='flex flex-col lg:flex-row justify-between'>
                <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
                  <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
                  <span className='text-orange-700'> Chicago IL </span>
                </div>
                <a
                  href='property.html'
                  className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
                >
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturedProperties;
