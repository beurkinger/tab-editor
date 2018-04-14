
import { Component } from 'inferno'

import './Note.css';
import Cell from '../../../../../Cell/Cell';

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
