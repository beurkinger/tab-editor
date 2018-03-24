import Inferno from 'inferno';
import Component from 'inferno-component';

import './Line.css';

import Note, { SPACE_CHAR } from '../Note/Note';

class Line extends Component {
  handleNoteClick = (noteId) => {
    this.props.noteClickHandler(this.props.id, noteId);
  };

  getNoteComponent = (note, i) => (
    <Note 
      clickHandler={ this.handleNoteClick }
      content={ note.content } 
      id={ i } 
      isSelected={ this.props.isSelected && i === this.props.selectedNoteId }
      key={ i } 
    />
  );

	render () {
		return (
      <div className="line" >
        <span>
          { `${this.props.name}` }
        </span>
        <span>
          { `|` }
        </span>
        { this.props.notes.map(this.getNoteComponent) }
        <span>
          { `|` }
        </span>
      </div>
    );
	}

}

Line.defaultProps = {
  isSelected: false,
  name: '',
  notes: [],
  selectedNoteId: -1,
}

export default Line;
