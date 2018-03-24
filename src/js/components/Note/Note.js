import Inferno from 'inferno';
import Component from 'inferno-component';

import './Note.css';

// export const NOTE_LENGTHS = {
//   WHOLE: 'whole note',
//   HALF: 'half note',
//   QUARTER: 'quarter note',
//   EIGHTH: 'eighth note',
//   SIXTEENTH: 'sixteenth note'
// };

export const SPACE_CHAR = '-';

const Note = ({ clickHandler, content, id, isSelected }) => { 
	return (
    <div 
      className={`note ${isSelected ? '--selected' : ''}`}
      onClick={ () => { if (!isSelected) clickHandler(id); } }
    >
      { content }
    </div>
  );
}

export default Note;
