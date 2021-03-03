import * as mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.error(err);
  });

const db = mongoose.connection;

db.on('connected', () => {
  console.log('✅ connected to MongoDB');
});

db.on('error', (err) => {
  console.error(err);
});

const userInfoSchema = new mongoose.Schema({
  _id: String,
  userSub: String,
  projects: [{
    _id: String,
    projectName: String,
    todos: [{
      _id: String,
      text: String,
      completed: Boolean,
    }],
  }],
});

// https://stackoverflow.com/questions/42275358/mongoose-property-x-does-not-exist-on-type-document
export interface UserDoc extends mongoose.Document {
  _id: String,
  userSub: String,
  projects: [{
    _id: String,
    projectName: String,
    todos: [{
      _id: String,
      text: String,
      completed: Boolean,
    }] | any[],
  }],
}

export const UserInfo = mongoose.model<UserDoc>('userInfo', userInfoSchema);
