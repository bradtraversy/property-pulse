'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  // NOTE: throwing an Error from our server actions will be caught by our
  // error.jsx ErrorBoundry component and show the user an Error page with
  // message of the thrown error.

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  // Access all values from amenities and images
  const amenities = formData.getAll('amenities');

  const images = formData.getAll('images').filter((image) => image.name !== '');

  // Create propertyData object for database
  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId,
  };

  // Upload image(s) to Cloudinary
  // NOTE: this will be an array of strings, not a array of Promises
  // So imageUploadPromises has been changed to imageUrls to more
  // declaratively represent it's type.

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert the image data to base64
    const imageBase64 = imageData.toString('base64');

    // Make request to upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      {
        folder: 'propertypulse',
      }
    );

    imageUrls.push(result.secure_url);
  }

  // NOTE: here there is no need to await the resolution of
  // imageUploadPromises as it's not a array of Promises it's an array of
  // strings, additionally we should not await on every iteration of our loop.

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  // Revalidate the cache
  // NOTE: since properties are pretty much on every page, we can simply
  // revalidate everything that uses our top level layout
  revalidatePath('/', 'layout');

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
