import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('MONGO_URI_PROD:', process.env.MONGO_URI_PROD); // Vérifiez l'URI chargé
    const conn = await mongoose.connect(process.env.MONGO_URI_PROD, {
      serverSelectionTimeoutMS: 5000, // Timeout après 5 secondes
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
