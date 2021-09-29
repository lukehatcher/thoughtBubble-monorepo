import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'reactjs-popup';
import {
  deleteThoughtAction,
  editThoughtAction,
  thoughtStatusChangeAction,
  thoughtTagChangeAction,
} from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/componentProps';
import { VscEllipsis, VscTrash, VscTag, VscCloudUpload, VscEdit, VscStarFull, VscCircleSlash } from 'react-icons/vsc';
import { BsCheckBox } from 'react-icons/bs';
import styled from 'styled-components';
import { tagColors } from '../constants/colors';
import { Tags } from '../interfaces/interfaces';

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, projectId, thoughtId }) => {
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();

  const handleThoughtDeletion = function (): void {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtToggle = function (): void {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
  };

  const handleThoughtEdit = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (input) dispatch(editThoughtAction(input, projectId, thoughtId));
    setInput('');
  };

  const handleThoughtTag = (tagColor: Tags): void => {
    dispatch(thoughtTagChangeAction(projectId, thoughtId, tagColor));
  };

  return (
    <div className="thoughtCard-container">
      <p className={thought.completed ? 'completed-text' : 'incomplete-text'}>{thought.text}</p>
      <Popup
        // contentStyle={{ border: '2px solid #AAB2C0', borderRadius: '10px' }}
        trigger={
          <div className="submenu-trigger">
            <VscEllipsis size="2em" color="#AAB2C0" />
          </div>
        }
        position="right top"
        on="hover"
        arrow={false}
        nested
      >
        <div className="menu-item top-corners" onClick={() => handleThoughtToggle()}>
          <BsCheckBox size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; toggle status
        </div>

        {/* === creating a popup trigger on the tag icon inside the "..." popup === */}
        <Popup
          trigger={
            <div className="menu-item">
              <VscTag size="1em" color="#AAB2C0" />
              &nbsp;&nbsp; tag
            </div>
          }
          position="right top"
          on="hover"
          arrow={false}
          nested
        >
          <PickTagPopupContainer>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.red} onClick={() => handleThoughtTag('red')} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.orange} onClick={() => handleThoughtTag('orange')} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.green} onClick={() => handleThoughtTag('green')} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.blue} onClick={() => handleThoughtTag('blue')} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.purple} onClick={() => handleThoughtTag('purple')} />
            </TagItem>
            <TagItem>
              <VscStarFull size="1.5em" color={tagColors.gold} onClick={() => handleThoughtTag('favorite')} />
            </TagItem>
            <TagItem>
              <VscCircleSlash size="1.5em" color="sliver" onClick={() => handleThoughtTag(null)} />
            </TagItem>
          </PickTagPopupContainer>
        </Popup>
        {/* === === */}
        <div className="menu-item" onClick={() => handleThoughtDeletion()}>
          <VscTrash size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; delete thought
        </div>
        <form className="menu-item bottom-corners" onSubmit={(e) => handleThoughtEdit(e)}>
          <VscEdit size="1em" color="#AAB2C0" />
          <input
            className="edit-thought-input"
            type="text"
            value={input}
            placeholder="edit thought..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="edit-thought-submit" type="submit">
            <VscCloudUpload size="1.5em" />
          </button>
        </form>
      </Popup>
      {/* conditionally show tag if thought has one */}
      {thought.tag ? (
        <TagIconContainer>
          {/* if tag is favorite, show star icon, else show tag icon */}
          {thought.tag === 'favorite' ? (
            <VscStarFull size="2em" color={tagColors.gold} />
          ) : (
            <VscTag size="2em" color={thought.tag} />
          )}
        </TagIconContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

const popupBackground = '#1b1f24'; // from CSS file

const TagIconContainer = styled.div`
  border: 1px solid grey;
`;

const PickTagPopupContainer = styled.div`
  background-color: ${popupBackground};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  align-items: center;
`;

const TagItem = styled.div`
  padding: 5px;

  &:hover {
    cursor: pointer;
  }
`;
