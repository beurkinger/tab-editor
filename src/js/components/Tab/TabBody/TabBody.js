import Inferno from 'inferno';
import Component from 'inferno-component';

import './TabBody.css';
import Column from './Column/Column';
import Line from './Line/Line';

class TabBody extends Component {
  getColumnNotes (lines, columnId) {
    return lines.map(line => line.notes[columnId])
  }

  getLineComponent = (line, i) => (
    <Line 
      { ...line }
      id={ i }
      key={ i } 
      isSelected={ i === this.props.selectedLineId }
      noteClickHandler={ this.props.noteClickHandler }
      selectedNoteId={ this.props.selectedNoteId }
    />
  );

	render () {
		return (
      <div className="tabBody">
        { this.props.lines.map(this.getLineComponent) }
        { this.props.selectedColumnId !== -1 &&
          <Column 
            id={ this.props.selectedColumnId }
            notes={ this.getColumnNotes(this.props.lines, this.props.selectedColumnId) } 
          />
        }
      </div>
    );
	}

}

TabBody.defaultProps = {
  noteClickHandler: () => {},
  selectedColumnId: -1,
  selectedLineId: -1,
  selectedNoteId: -1,
}

export default TabBody;
