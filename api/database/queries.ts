import { UserInfo, UserDoc } from './model'; // model and type
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

export const initUserdata = async (data): Promise<void> => {
  const doc = new UserInfo(data);
  await doc.save();
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
// id
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
// id
export const deleteTodo = async (userSub, projectId, todoId): Promise<void> => {
  // missing param types, see server error
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  const todoIdx = doc.projects[projectIdx].todos.findIndex((item) => item._id === todoId); // edited
  doc.projects[projectIdx].todos.splice(todoIdx, 1);
  await doc.save();
};
// id
export const addTodo = async (
  userSub: string,
  project: string,
  newTodo: string,
): Promise<string> => {
  const newId = uuidv4();
  const todoObj = {
    _id: newId,
    text: newTodo,
    completed: false,
  };
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item.projectName === project);
  doc.projects[projectIdx].todos.push(todoObj);
  await doc.save();
  return newId;
};
// id
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
