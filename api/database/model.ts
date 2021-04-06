import * as mongoose from 'mongoose';

export const userDocMongoSchema = new mongoose.Schema({ // userDocMongoSchema
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

export interface UserDocInterface extends mongoose.Document {
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
