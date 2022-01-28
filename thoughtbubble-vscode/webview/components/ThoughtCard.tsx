import * as React from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Popup } from 'reactjs-popup';
import {
  deleteThoughtAction,
  editThoughtAction,
  thoughtStatusChangeAction,
  thoughtTagChangeAction,
} from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/componentProps';
import { VscEllipsis, VscTrash, VscTag, VscCloudUpload, VscEdit, VscStarFull, VscCircleSlash } from 'react-icons/vsc';
import { BsCheck2 } from 'react-icons/bs';
import styled from 'styled-components';
import { tagColors } from '../constants/colors';
import { Tags, Tag } from '../constants/tags';
import { PopupActions } from 'reactjs-popup/dist/types';

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, projectId, thoughtId }) => {
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();

  // have to null check ref.current later, could also use document.createElement('form') and avoid null checks
  const textBoxRef = useRef<HTMLFormElement>(null);
  const popupRef = useRef<PopupActions>(null);
  const closePopup = () => {
    if (!popupRef.current) return;
    // see https://react-popup.elazizi.com/controlled-popup/#using-ref-to-access-popup-actions for close documentation
    popupRef.current.close();
  };

  const handleThoughtDeletion = (): void => {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtToggle = (): void => {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
  };

  const handleThoughtEdit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input) {
      dispatch(editThoughtAction(input, projectId, thoughtId));
    }
    setInput('');
  };

  const handleThoughtTag = (tagColor: Tags): void => {
    dispatch(thoughtTagChangeAction(projectId, thoughtId, tagColor));
  };

  const showEditThoughtBox = (): void => {
    if (!textBoxRef.current) return; // might be undefined first time cause of null initial ref status
    // close the tooltip dropdown when we want to show the edit thought box
    closePopup();
    if (textBoxRef.current.style.height) {
      textBoxRef.current.style.height = ''; // 0px in css equates to '' in js
    } else {
      // textBoxRef.style.maxHeight = textBoxRef.scrollHeight + 'px';
      textBoxRef.current.style.height = '200px';
    }
  };

  return (
    <div className="thoughtCard-container">
      <p className={thought.completed ? 'completed-text' : 'incomplete-text'}>{thought.text}</p>

      <form className="collapsible" ref={textBoxRef} onSubmit={(e) => handleThoughtEdit(e)}>
        <textarea
          className="edit-thought-input"
          value={input}
          placeholder="add a new thought..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="edit-thought-submit" type="submit">
          <VscCloudUpload size="2em" />
        </button>
        {/* button for closing edit thought textbox */}
        <button onClick={showEditThoughtBox}>&times;</button>
      </form>
      <Popup
        ref={popupRef}
        // contentStyle={{ border: '2px solid #AAB2C0', borderRadius: '10px' }}
        trigger={
          <div className="submenu-trigger">
            <VscEllipsis size="2em" color="#AAB2C0" />
          </div>
        }
        position="right top"
        on="hover"
        arrow={false}
      >
        <div className="menu-item top-corners" onClick={() => handleThoughtToggle()}>
          <BsCheck2 size="1em" color="#AAB2C0" />
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
              <VscTag size="1.5em" color={tagColors.red} onClick={() => handleThoughtTag(Tag.RED)} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.orange} onClick={() => handleThoughtTag(Tag.ORANGE)} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.green} onClick={() => handleThoughtTag(Tag.GREEN)} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.blue} onClick={() => handleThoughtTag(Tag.BLUE)} />
            </TagItem>
            <TagItem>
              <VscTag size="1.5em" color={tagColors.purple} onClick={() => handleThoughtTag(Tag.PURPLE)} />
            </TagItem>
            <TagItem>
              <VscStarFull size="1.5em" color={tagColors.gold} onClick={() => handleThoughtTag(Tag.FAVORITE)} />
            </TagItem>
            <TagItem>
              <VscCircleSlash size="1.5em" color="sliver" onClick={() => handleThoughtTag(null)} />
            </TagItem>
          </PickTagPopupContainer>
        </Popup>
        {/* === edit and delete dropdown buttons === */}
        <div className="menu-item" onClick={() => showEditThoughtBox()}>
          <VscEdit size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; edit thought
        </div>
        <div className="menu-item" onClick={() => handleThoughtDeletion()}>
          <VscTrash size="1em" color="#AAB2C0" />
          &nbsp;&nbsp; delete thought
        </div>
        {/* === === */}
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
