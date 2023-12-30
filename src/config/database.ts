import mongoose from 'mongoose';
import dotenv from 'dotenv';


//Environment Variables configuration
dotenv.config()

//MongoDB connection function
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fvqxbu9.mongodb.net/`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

