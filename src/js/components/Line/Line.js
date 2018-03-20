import Inferno from 'inferno';
import Component from 'inferno-component';

import './Line.css';

import Note, { SPACE_CHAR } from '../Note/Note';

class Line extends Component {
  state = { notes: [] };

  componentWillMount () {
    const notes = [];
    for (var i = 0; i < 32; i++) {
      const note = { content: SPACE_CHAR };
      notes.push(note);
    }
    this.setState({ notes });
  }

  getNoteComponent = ({ content }, i) => <Note content={content} id={i} key={i} />;

	render () {
		return (
      <div className="line" >
        <span>
          { `${this.props.name}|` }
        </span>
        { this.state.notes.map(this.getNoteComponent) }
        <span>
          { `|` }
        </span>
      </div>
    );
	}

}

Line.defaultProps = {
  name: '',
  timeSignature: {
    numberOfBeats: 4,
    beatLength: 4,
  },
}

export default Line;
