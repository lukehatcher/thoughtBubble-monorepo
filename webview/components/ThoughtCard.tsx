import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'reactjs-popup';
import { deleteThoughtAction, editThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/interfaces';
import { VscEllipsis, VscTrash, VscTag, VscCloudUpload, VscEdit } from 'react-icons/vsc';
import { BsCheckBox } from 'react-icons/bs';

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, projectId, thoughtId }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleThoughtDeletion = function (): void {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtToggle = function (): void {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
  };

  const handleThoughtEdit = function (): void {
    if (input) dispatch(editThoughtAction(input, projectId, thoughtId));
    setInput('');
  };

  const handleThoughtTag = function (): void {
    // dispath action
    // coming soon
  };
  return (
    <div className="thoughtCard-container">
      <p className={thought.completed ? 'completed-text' : 'incomplete-text'}>{thought.text}</p>
      <Popup
        // contentStyle={{ border: '2px solid #AAB2C0', borderRadius: '10px' }}
        trigger={
          <div className="submenu-trigger">
            <VscEllipsis size="2em" />
          </div>
        }
        position="right top"
        on="hover"
        mouseLeaveDelay={100}
        mouseEnterDelay={100}
        arrow={false}
        nested
      >
        <div className="menu-item top-corners" onClick={() => handleThoughtToggle()}>
          <BsCheckBox size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; toggle status
        </div>
        <div className="menu-item" onClick={() => handleThoughtTag()}>
          <VscTag size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; tag (coming soon)
        </div>
        <div className="menu-item" onClick={() => handleThoughtDeletion()}>
          <VscTrash size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; delete thought
        </div>
        <form className="menu-item bottom-corners" onSubmit={() => handleThoughtEdit()}>
          <VscEdit size="1em" color="#AAB2C0" />
          <input
            className="edit-input"
            type="text"
            value={input}
            placeholder="edit thought..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="edit-input-submit" type="submit">
            <VscCloudUpload size="1.5em" />
          </button>
        </form>
      </Popup>
    </div>
  );
};
