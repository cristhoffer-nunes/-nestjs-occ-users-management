import * as dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_COLLECTION: process.env.MONGODB_COLLECTION,
  MONGODB_URL: process.env.MONGODB_URL,
};
