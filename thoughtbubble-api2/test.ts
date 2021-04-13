import axios from 'axios';
import { User } from './entities/User';

const userSub = 'github|52586655';

const testPost = async function (s: string) {
  try {
    const response = await axios.post('http://localhost:3001/api/projects', {
      userSub,
      projectName: s,
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testPost('asd');
// testPost('asdf');
// testPost('sdfd');
// testPost('aaa');

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

// testDel();

const testAddThought = async function (s: string) {
  try {
    const response = await axios.post('http://localhost:3001/api/thoughts', {
      userSub,
      projectId: 'd47c424e-edac-4444-915f-245ba1c84dec',
      thought: s,
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testAddThought('hello');
// testAddThought('thoughts');
// testAddThought('blah');
// testAddThought('asldkjfhl');

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

const testUpdateThought = async function () {
  try {
    const response = await axios.put('http://localhost:3001/api/thoughts', {
      userSub: 'luke',
      projectId: 1,
      thoughtId: 16,
      newThought: 'this is new',
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

// testUpdateThought();

const testToggle = async function () {
  try {
    const response = await axios.put('http://localhost:3001/api/thoughts/status', {
      userSub: 'luke',
      projectId: 0,
      thoughtId: 16,
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};
// testToggle();

const testFetch = async function () {
  try {
    const response = await axios.get('http://localhost:3001/api/projects', {
      params: {
        userSub,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};
testFetch();
