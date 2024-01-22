import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

dotenv.config({
  path: './config/config.env',
});
const URI = process.env.MONGO_DB;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDb Conneected: ${conn.connection.host}`.blue.bold
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
