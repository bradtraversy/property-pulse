const Message = ({ message }) => {
  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        Mark As Read
      </button>
      <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};
export default Message;
