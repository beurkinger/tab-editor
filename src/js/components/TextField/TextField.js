
import { Component } from 'inferno'

import './TextField.css';
import OutsideClickListener from '../OutsideClickListener/OutsideClickListener';

class TextField extends Component {
  state = { 
    isBeingEdited: false,
    text: 'test'
  };

  handleClick = () => {
    this.setState({ isBeingEdited: true });
  }

  handleOutsideClick = () => {
    this.setState({ isBeingEdited: false });
  }

  render () {
    return (
      <OutsideClickListener 
        className="textField"
        isListening={ this.state.isBeingEdited }
        onClick={ this.handleOutsideClick } 
      >
        <div 
          className="textField__content"
          onClick={ this.handleClick }
        >
          { this.state.text }
        </div> 
      </OutsideClickListener>
    );
  }
}

export default TextField;
