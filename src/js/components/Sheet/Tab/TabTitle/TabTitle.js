import Component from 'inferno-component';

import './TabTitle.css';

class TabTitle extends Component {
  handleInput = e => {
    const { value } = e.target;
    this.props.updateTabTitle(value);
  }

	render () {
		return (
      <div className="tabTitle">
        <input 
          className="tabTitle__input"
          onInput={ this.handleInput } 
          type="text" 
          value={ this.props.title }
        />
      </div>
    );
	}
}

export default TabTitle;
