import { UserInfo, UserDoc } from './model'; // model and type

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

export const deleteTodo = async (userSub, project, todo): Promise<void> => {
  // missing param types, see server error
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item.projectName === project);
  const todoIdx = doc.projects[projectIdx].todos.findIndex((item) => item.text === todo); // edited
  doc.projects[projectIdx].todos.splice(todoIdx, 1);
  await doc.save();
};

export const deleteProject = async (userSub, project): Promise<void> => {
  // missing param types, see server error
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item.projectName === project);
  doc.projects.splice(projectIdx, 1);
  await doc.save();
};

export const addProject = async (userSub: string, newProject: string): Promise<void> => {
  const doc = await UserInfo.findOne({ userSub });
  const emptyProj = {
    projectName: newProject,
    todos: [],
  };
  doc.projects.push(emptyProj);
  await doc.save();
};

export const addTodo = async (userSub: string, project: string, newTodo: string): Promise<void> => {
  const todoObj = {
    text: newTodo,
    completed: false,
  };
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item.projectName === project);
  doc.projects[projectIdx].todos.push(todoObj);
  await doc.save();
};

export const toggleTodoCompletion = async (
  userSub: string,
  project: string,
  todo: string,
): Promise<void> => {
  const doc = await UserInfo.findOne({ userSub });
  const projectIdx = doc.projects.findIndex((item) => item.projectName === project);
  const todoIdx = doc.projects[projectIdx].todos.findIndex((item) => item.text === todo);
  const oldState = doc.projects[projectIdx].todos[todoIdx].completed;
  doc.projects[projectIdx].todos[todoIdx].completed = !oldState;
  await doc.save();
};
