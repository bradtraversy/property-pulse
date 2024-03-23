import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// NOTE: here we need to send back a Content-Type: application/json response
// header rather than a text/plain header.

// NOTE: the GET function is no longer used as we can server render the Messages

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return Response.json({
        message: 'You must be logged in to send a message',
      });
    }

    const { user } = sessionUser;

    // Can not send message to self
    if (user.id === recipient) {
      return Response.json({ message: 'Can not send a message to yourself' });
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return Response.json({ message: 'Message Sent' });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
