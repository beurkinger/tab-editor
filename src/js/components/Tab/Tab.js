import Inferno from 'inferno';
import Component from 'inferno-component';

import './Tab.css';
import Line from '../Line/Line';
import { SPACE_CHAR } from '../Note/Note';

class Tab extends Component {
  state = { 
    lines: [],
    selectedLineId: -1,
    selectedNoteId: -1,
   };

  componentWillMount () {
    const lines = this.props.lineNames.map(name => {
      const notes = [];
      for (var i = 0; i < 32; i++) {
        const note = { content: SPACE_CHAR, isBeingEdited: false };
        notes.push(note);
      }
      return { name, notes }
    });
    this.setState({ lines });
  }

  componentWillUnmount () {
    this.removeEventListeners();
  }

  addEventListeners = () => {
    document.addEventListener('mousedown', this.handleWindowClick);
    document.addEventListener('keypress', this.handleKeyPress);
  }

  removeEventListeners = () => {
    document.removeEventListener('mousedown', this.handleWindowClick);
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  handleWindowClick = e => {
    this.setState({ selectedLineId: -1, selectedNoteId: -1 });
    this.removeEventListeners();
  }  

  handleKeyPress = e => {
    const content = e.key === ' ' ? SPACE_CHAR : e.key;
    const lines = this.state.lines.map((line, lineId) => {
      if (lineId !== this.state.selectedLineId) return { ...line };
      const notes = line.notes.map((note, noteId) => {
        if (noteId !== this.state.selectedNoteId) return { ...note };
        return { ...note, content };
      });
      return { ...line, notes };
    });
    this.setState({ lines });
  }

  handleNoteClick = (lineId, noteId) => {
    this.setState({ selectedLineId: lineId, selectedNoteId: noteId });
    this.addEventListeners();
  };

  getLineComponent = (line, i) => (
    <Line 
      id={ i } 
      isSelected={ i === this.state.selectedLineId }
      name={ line.name }
      notes={ line.notes }
      key={ i } 
      noteClickHandler={ this.handleNoteClick }
      selectedNoteId={ this.state.selectedNoteId }
    />
  );

	render () {
		return (
      <div className="tab" >
        { this.state.lines.map(this.getLineComponent) }
        <div className="tab__footer">
          { ` ` }
        </div>
      </div>
    );
	}

}

export default Tab;
