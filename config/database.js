import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  // NOTE: here we don't need to catch a error and log to the console as any
  // thrown error will be caught by our error page
  mongoose.set('strictQuery', true);

  // If the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);
  connected = true;
  console.log('MongoDB connected...');
};

export default connectDB;
