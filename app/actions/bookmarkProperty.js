'use server';

import connectDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  // Find user in database
  const user = await User.findById(userId);

  // Check if property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    // If already bookmarked, remove it
    user.bookmarks.pull(propertyId);
    message = 'Bookmark removed successfully';
    isBookmarked = false;
  } else {
    // If not bookmarked, add it
    user.bookmarks.push(propertyId);
    message = 'Bookmark added successfully';
    isBookmarked = true;
  }

  await user.save();

  // revalidate the cache.
  revalidatePath('/properties/saved', 'page');
  // NOTE: A nice demonstration of NextJS caching can be done here by first
  // commenting out the above line, then bookmark or un-bookmark a property for
  // a user then visit /properties/saved (either via link or going back in the
  // browser) and you will see the old results until
  // you refresh the page. If you then add back in the above line and repeat,
  // you will see the users saved properties are up to date.

  return { message, isBookmarked };
}

export default bookmarkProperty;
