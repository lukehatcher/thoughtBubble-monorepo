import axios from 'axios';

const userSub = 'github|52586655';

const testPost = async function () {
  try {
    const response = await axios.post('http://localhost:3001/api/projects', {
      userSub: '1337',
      projectName: 'testing new structure',
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testPost();

const testDel = async function () {
  try {
    const response = await axios.delete('http://localhost:3001/api/projects', {
      params: { userSub: '1337', projectId: 9 },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testDel();

const testAddThought = async function () {
  try {
    const response = await axios.post('http://localhost:3001/api/thoughts', {
      userSub: '1337',
      projectId: 8,
      thought: 'hello world',
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testAddThought();
// testAddThought();

const testDelThought = async function () {
  try {
    const response = await axios.delete('http://localhost:3001/api/thoughts', {
      params: {
        userSub: 'bob',
        projectId: 2,
        thoughtId: 8,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

testDelThought();
