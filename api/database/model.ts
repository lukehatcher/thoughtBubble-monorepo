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

// https://stackoverflow.com/questions/42275358/mongoose-property-x-does-not-exist-on-type-document
export interface UserDocInterface extends mongoose.Document { // UserDocInterface // UserDoc
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
