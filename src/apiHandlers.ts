import axios from 'axios';

const PLACE_HOLDER = 'fill me in';

export function fetchData(panel: any) {
  axios.get(`http://localhost:3001/api/projects/fetch`, {
    params: {
      userSub: PLACE_HOLDER,
    }
  })
    .then(async (response) => {
      const userData = response.data;
      panel.webview.postMessage({ command: 'sendingData', responseData: userData }); // whole obj = event.data;
    })
    .catch((err) => {
      console.error('error fetching user data', err);
    });
}

export async function fetchUserProjectNames() : Promise<any>{
  let usersProjects;
  await axios.get(`http://localhost:3001/api/projects/get/fetch`, {
    params: {
      userSub: PLACE_HOLDER,
    }
  })
    .then((response) => {
      // create & return an array of just the names of a user's projects
      const usersProjectsData = response.data.projects;
      usersProjects = usersProjectsData.map((project: any) => project.projectName);
    })
    .catch((err) => {
      console.error('error fetching user project names', err);
    });
  return usersProjects;
}

export function handleDbPost(type: string, username: string, projectName: string, todo: string | null, panel: any) {
  axios.post('http://localhost:3001/api/projects/post', {
    type,
    username, // hard coded
    projectName,
    todo
  })
  .then(() => {
    fetchData(panel);
  })
  .catch((err) => {
    console.error('error posting new data to db', err);
  });
}

export function handleDbPostInactive(type: string, username: string, projectName: string, todo: string) {
  // add to database without touching the webview (while webview is inactive)
  axios.post('http://localhost:3001/api/projects/post', {
    type,
    username, // hard coded
    projectName,
    todo
  })
  .catch((err) => {
    console.error('error posting new data to db', err);
  });
}

export function handleDbDelete(type: string, username: string, projectName: string, todo: string | null, panel: any) {
  axios.delete('http://localhost:3001/api/projects/delete', {
    params: {
      type,
      username, // hard coded username for now;
      projectName,
      todo
    }
  })
  .then(() => {
    fetchData(panel);
  })
  .catch((err) => {
    console.error('error deleting data from db', err);
  });
}

export function handleTodoCompletionToggle(type: string, username: string, projectName: string, todo: string, panel: any) {
  axios.put('http://localhost:3001/api/projects/put', {
    type,
    username, // hardcoded
    projectName,
    todo,
  })
    .then(() => {
      fetchData(panel);
    })
    .catch((err) => {
      console.error('error toggling todo\'s completion state', err);
    });
}
