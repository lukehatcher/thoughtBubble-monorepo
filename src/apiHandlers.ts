import axios from 'axios';
const PLACE_HOLDER = 'jon doe';

export function fetchData(panel: any) {
  axios.get(`http://localhost:3001/api/projects/get/${PLACE_HOLDER}`)
    .then(async (response) => {
      const userData = response.data;
      panel.webview.postMessage({ command: 'sendingData', responseData: userData }); // whole obj = event.data;
    })
    .catch((err) => {
      console.error('error fetching user data', err);
    });
}

export function handleDbPost(type: string, username: string, projectName: string, todo: string | null, panel: any) {
  axios.post('http://localhost:3001/api/projects/post', {
    type,
    username, // hard coded username for now
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
    username,
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
