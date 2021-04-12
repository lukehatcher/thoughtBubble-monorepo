import axios from 'axios';

const userSub = 'github|52586655';

const testPost = async function () {
  try {
    const response = await axios.post('http://localhost:3001/api/projects', {
      userSub: '1337',
      projectName: 'tsdfbsde',
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testPost();
// testPost();
// testPost();
// testPost();
// testPost();
// testPost();
// testPost();
// testPost();
// testPost();

const testDel = async function () {
  try {
    const response = await axios.delete('http://localhost:3001/api/projects', {
      params: { userSub: '1337', projectId: 8 },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

testDel();

const testAddThought = async function (x: number) {
  try {
    const response = await axios.post('http://localhost:3001/api/thoughts', {
      userSub: '1337',
      projectId: x,
      thought: 'asdf',
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testAddThought(2);
// testAddThought(3);
// testAddThought(4);
// testAddThought(5);

const testDelThought = async function () {
  try {
    const response = await axios.delete('http://localhost:3001/api/thoughts', {
      params: {
        userSub: 'bob',
        projectId: 0,
        thoughtId: 15,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testDelThought();
