import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectAction } from '../actions/projectActions';
import { RootState } from '../reducers/rootReducer';

interface ProjectFormProps {}

export const ProjectForm: React.FC<ProjectFormProps> = function () {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const selector = (state: RootState) => state.userData;
  const userData = useSelector(selector);

  const handleProjectDeletion = function (e) {
    // dispatch action
  };

  const handleProjectAddition = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addProjectAction(input));
    setInput('');
  };

  return (
    <div>
      <form onSubmit={(e) => handleProjectAddition(e)}>
        <label>add new project</label>
        <input type="text" placeholder="add a new project" onChange={(e) => setInput(e.target.value)}></input>
        <button type="submit">submit new proj</button>
      </form>

      <form
        onSubmit={(e) => {
          handleProjectDeletion(e);
        }}
      >
        <label>delete a project</label>
        <select>
          {userData.map((proj) => (
            <option value={proj._id} key={proj._id}>
              {proj.projectName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};
