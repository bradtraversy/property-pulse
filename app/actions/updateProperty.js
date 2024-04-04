'use server';

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateProperty(propertyId, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  // Verify ownership
  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not own this property.');
  }

  // Access all values from amenities and images
  const amenities = formData.getAll('amenities');

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
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: userId,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  // Revalidate the cache
  revalidatePath('/', 'layout');

  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
