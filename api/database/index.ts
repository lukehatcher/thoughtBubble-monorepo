import * as mongoose from 'mongoose';
import { UserDocInterface, userDocMongoSchema } from './model';

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.error(err);
  });

const db = mongoose.connection;

db.on('connected', () => console.log('✅ connected to MongoDB'));
db.on('error', (err) => console.error(err));

export const UserInfo = mongoose.model<UserDocInterface>('userInfo', userDocMongoSchema); // the db
