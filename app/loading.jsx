'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

// NOTE: Here 'loading' will be undefined as a loading file doesn't receive any
// props:
// https://nextjs.org/docs/app/api-reference/file-conventions/loading

const LoadingPage = () => {
  return (
    <ClipLoader
      color='#3b82f6'
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};
export default LoadingPage;
