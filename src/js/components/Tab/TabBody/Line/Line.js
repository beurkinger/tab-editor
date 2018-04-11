import Inferno from 'inferno';
import Component from 'inferno-component';

import './Line.css';

import Cell from '../../../Cell/Cell';
import Note, { SPACE_CHAR } from './Note/Note';

class Line extends Component {
  handleNoteClick = (noteId) => {
    this.props.noteClickHandler(this.props.id, noteId);
  };

  getNoteComponent = (note, i) => (
    <Note 
      content={ note }
      clickHandler={ this.handleNoteClick }
      id={ i }
      isSelected={ this.props.isSelected && i === this.props.selectedNoteId }
      key={ i } 
    />
  );

	render () {
		return (
      <div className="line" >
        <Cell content={this.props.name} />
        <Cell content={'|'} />
        { this.props.notes.map(this.getNoteComponent) }
        <Cell content={'|'} />
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
