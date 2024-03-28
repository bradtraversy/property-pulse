'use client';

// TODO: change the buttons to Link components and server render.

import { useRouter } from 'next/navigation';
const Pagination = ({ page, pageSize, totalItems }) => {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      <button
        className='mr-2 px-2 py-1 border border-gray-300 rounded'
        disabled={page === 1}
        onClick={() => router.push(`/properties?page=${page - 1}`)}
      >
        Previous
      </button>
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      <button
        className='ml-2 px-2 py-1 border border-gray-300 rounded'
        disabled={page === totalPages}
        onClick={() => router.push(`/properties?page=${page + 1}`)}
      >
        Next
      </button>
    </section>
  );
};
export default Pagination;
