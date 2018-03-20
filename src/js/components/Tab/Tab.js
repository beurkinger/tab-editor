import Inferno from 'inferno';
import Component from 'inferno-component';

import './Tab.css';
import Line from '../Line/Line';

class Tab extends Component {
  state = { lines: [] };

  componentWillMount () {
    const lines = this.props.lineNames.map(name => ({ name }));
    this.setState({ lines });
  }

  getLineComponent = props => <Line { ...props } />;

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

Tab.defaultProps = {
  lineNames: ['e', 'B', 'G', 'D', 'A', 'E'],
  timeSignature: {
    numberOfBeats: 4,
    beatLength: 4,
  },
}

export default Tab;
