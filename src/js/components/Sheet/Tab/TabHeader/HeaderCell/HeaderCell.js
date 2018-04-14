
import { Component } from 'inferno'

import './HeaderCell.css';

const HeaderCell = ({ clickHandler, id, isSelected }) => { 
	return (
    <div 
      className={`headerCell ${isSelected ? '--selected' : ''}`}
      onClick={ () => { if (!isSelected) clickHandler(id); } }
    />
  );
}

export default HeaderCell;