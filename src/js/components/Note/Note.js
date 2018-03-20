import Inferno from 'inferno';
import Component from 'inferno-component';


// export const NOTE_LENGTHS = {
//   WHOLE: 'whole note',
//   HALF: 'half note',
//   QUARTER: 'quarter note',
//   EIGHTH: 'eighth note',
//   SIXTEENTH: 'sixteenth note'
// };

export const SPACE_CHAR = '-';

class Note extends Component {
  state = { isBeingEdited: false };

  handleClick = () => {
    if (!this.isBeingEdited) this.setState({ isBeingEdited: true });
  };

	render () {
    console.log(this.props, this.state)


		return (
      <span className="note" onClick={ this.handleClick }>
        { this.props.content }
        { this.state.isBeingEdited &&
          <div className="noteEditor">
            <input type="text" value={ this.props.content } />
          </div>
        }
      </span>
    );
	}

}

Note.defaultProps = {
  id: -1,
  content: ''
}

export default Note;
