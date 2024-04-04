import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// GET /api/properties/:id
// NOTE: We no longer need this route handler as we can use server components
// and query the DB directly for a property by id without making a fetch request
// to a API route.

// DELETE /api/properties/:id
// NOTE: Here we also need to delete images from Cloudinary

export const DELETE = async (_, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response('Property Not Found', { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // extract public id's from image url in DB
    const publicIds = property.images.map((imageUrl) => {
      const parts = imageUrl.split('/');
      return parts.at(-1).split('.').at(0);
    });

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy('propertypulse/' + publicId);
      }
    }

    // Proceed with property deletion
    await property.deleteOne();

    return new Response('Property Deleted', {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

// PUT /api/properties/:id
// NOTE: we no longer need this route handler as we now use a server action to
// update the property
