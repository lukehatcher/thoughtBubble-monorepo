import { UserInfo, UserDoc } from './model'; // model and type
import { v4 as uuidv4 } from 'uuid';

export const initUserdata = async (userSub: string, projects: any[]): Promise<any> => {
  const newData = {
    _id: uuidv4(),
    userSub,
    projects,
  };
  const doc = new UserInfo(newData);
  await doc.save();
  return newData;
};

export const checkIfUserExists = async (userSub: string): Promise<boolean> => {
  const exists = await UserInfo.findOne({ userSub });
  return !!exists;
};

export const getUserData = async (userSub): Promise<UserDoc> => {
  // missing param type, see server error
  const result = await UserInfo.findOne({ userSub });
  return result;
};

export const deleteProject = async (userSub, projectId): Promise<void> => {
  // missing param types, see server error
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  doc.projects.splice(projectIdx, 1);
  await doc.save();
};
//id
export const addProject = async (userSub: string, newProject: string): Promise<string> => {
  const doc = await UserInfo.findOne({ userSub });
  var newId = uuidv4();
  const emptyProj = {
    _id: newId,
    projectName: newProject,
    todos: [],
  };
  doc.projects.push(emptyProj);
  await doc.save();
  return newId;
};

export const deleteTodo = async (userSub, projectId, todoId): Promise<void> => {
  // missing param types, see server error
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  const todoIdx = doc.projects[projectIdx].todos.findIndex((item) => item._id === todoId); // edited
  doc.projects[projectIdx].todos.splice(todoIdx, 1);
  await doc.save();
};

export const addTodo = async (
  userSub: string,
  projectId: string,
  newTodo: string,
): Promise<string> => {
  const newId = uuidv4();
  const todoObj = {
    _id: newId,
    text: newTodo,
    completed: false,
  };
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  doc.projects[projectIdx].todos.push(todoObj);
  await doc.save();
  return newId;
};

export const toggleTodoCompletion = async (
  userSub: string,
  projectId: string,
  todoId: string,
): Promise<void> => {
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  const todoIdx = doc.projects[projectIdx].todos.findIndex((item) => item._id === todoId);
  const oldState = doc.projects[projectIdx].todos[todoIdx].completed;
  doc.projects[projectIdx].todos[todoIdx].completed = !oldState;
  await doc.save();
};
