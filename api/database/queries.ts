import { v4 as uuidv4 } from 'uuid';
import { UserInfo } from './index'; // model
import { UserDocInterface } from './model'; // type

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

export const getUserData = async (userSub): Promise<UserDocInterface> => {
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

export const deleteThought = async (userSub, projectId, thoughtId): Promise<void> => {
  // missing param types, see server error
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  const thoughtIdx = doc.projects[projectIdx].todos.findIndex((item) => item._id === thoughtId);
  doc.projects[projectIdx].todos.splice(thoughtIdx, 1);
  await doc.save();
};

export const addThought = async (
  userSub: string,
  projectId: string,
  newThought: string,
): Promise<string> => {
  const newId = uuidv4();
  const thoughtObj = {
    _id: newId,
    text: newThought,
    completed: false,
  };
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  doc.projects[projectIdx].todos.push(thoughtObj);
  await doc.save();
  return newId;
};

export const toggleThoughtCompletion = async (
  userSub: string,
  projectId: string,
  thoughtId: string,
): Promise<void> => {
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  const thoughtIdx = doc.projects[projectIdx].todos.findIndex((item) => item._id === thoughtId);
  const oldState = doc.projects[projectIdx].todos[thoughtIdx].completed;
  doc.projects[projectIdx].todos[thoughtIdx].completed = !oldState;
  await doc.save();
};

export const editThought = async (
  userSub: string,
  projectId: string,
  thoughtId: string,
  newThought: string,
): Promise<void> => {
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item._id === projectId);
  const thoughtIdx = doc.projects[projectIdx].todos.findIndex((item) => item._id === thoughtId);
  doc.projects[projectIdx].todos[thoughtIdx].text = newThought;
  await doc.save();
};
