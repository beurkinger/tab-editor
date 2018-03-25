import Inferno from 'inferno';
import Component from 'inferno-component';

import './Note.css';
import Cell from '../Cell/Cell';

export const SPACE_CHAR = '-';

const Note = ({ clickHandler, content, id, isSelected }) => { 
	return (
    <Cell 
      content={ content }
      className={`note ${isSelected ? '--selected' : ''}`}
      onClick={ () => { if (!isSelected) clickHandler(id); } }
    />
  );
}

export default Note;
