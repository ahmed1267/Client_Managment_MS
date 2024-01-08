import mongoose from 'mongoose';
import dotenv from 'dotenv';


//Environment Variables configuration
dotenv.config()

//MongoDB connection function
const connectDB = async (): Promise<void> => {
  try {
    const connString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb`;
    console.log(connString);
    await mongoose.connect(connString);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

