import mongoose from 'mongoose';
import dotenv from 'dotenv';


//Environment Variables configuration
dotenv.config()

//MongoDB connection function
const connectDB = async (): Promise<void> => {
  try {
    console.log('Connecting to MongoDB..');

    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb:27017`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

