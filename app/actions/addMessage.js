'use server';

import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

// NOTE: here we have previousState as a first argument as in our
// PropertyContactForm we are using the useFormState hook from React DOM to give
// the user some information about the state of the form submission.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  // NOTE: Here we send an { error } object back which we can use to then show
  // the user a toast message.
  // We don't want to throw here like we did in our property server actions as that would
  // then be 'caught' by our error.jsx ErrorBoundry component and show the user
  // our Error page.

  if (!sessionUser || !sessionUser.user) {
    return { error: 'You must be logged in to send a message' };
  }

  const { user } = sessionUser;

  const recipient = formData.get('recipient');

  if (user.id === recipient) {
    return { error: 'You can not send a message to yourself' };
  }

  const newMessage = new Message({
    sender: user.id,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  });

  await newMessage.save();

  // revalidate cache
  revalidatePath('/messages', 'page');

  return { submitted: true };
}

export default addMessage;
