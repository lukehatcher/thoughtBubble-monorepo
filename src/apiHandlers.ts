import axios from 'axios';

export function handleDbPost(type: string, username: string, projectName: string, todo: string | null, dataFetchCB: any) {
  axios.post('http://localhost:3001/api/projects/post', {
    type,
    username, // hard coded username for now
    projectName,
    todo
  })
  .then(() => {
    dataFetchCB();
  })
  .catch((err) => {
    console.error('error posting new data to db', err);
  });
}

export function handleDbDelete(type: string, username: string, projectName: string, todo: string | null, dataFetchCB: any) {
  axios.delete('http://localhost:3001/api/projects/delete', {
    params: {
      type,
      username, // hard coded username for now;
      projectName,
      todo
    }
  })
  .then(() => {
    dataFetchCB();
  })
  .catch((err) => {
    console.error('error deleting data from db', err);
  });
}
