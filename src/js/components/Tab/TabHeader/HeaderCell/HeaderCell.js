import Inferno from 'inferno';
import Component from 'inferno-component';

import './HeaderCell.css';

const HeaderCell = ({ addButtonHandler, clickHandler, deleteButtonHandler, id, isSelected, numberOfLines }) => { 
	return (
    <div 
      className={`headerCell ${isSelected ? '--selected' : ''}`}
      onClick={ () => { if (!isSelected) clickHandler(id); } }
    >
      { isSelected &&
        <div className="headerCell__menu">
          <button onClick={ addButtonHandler }>
            +
          </button>
          <button onClick={ deleteButtonHandler }>
            -
          </button>
        </div>
      }
    </div>
  );
}

export default HeaderCell;

// style={ { height: (numberOfLines + 1) * 15, left: id * 10 } }