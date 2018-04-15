
import { Component } from 'inferno'

import './TextField.css';
import InputListener from '../InputListener/InputListener';
import OutsideClickListener from '../OutsideClickListener/OutsideClickListener';

class TextField extends Component {
  ghostTextarea = null;
  visibleTextarea = null;
  state = { 
    isBeingEdited: false,
    height: null,
    text: 'test',
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.state.isBeingEdited && !prevState.isBeingEdited) {
      this.visibleTextarea.focus();
    }
    if (this.state.text !== prevState.text) {
      const { scrollHeight } = this.ghostTextarea;
      const { clientHeight } = this.visibleTextarea;
      if (clientHeight !== scrollHeight) this.setState({ height: scrollHeight });
    }
  }

  handleClick = () => {
    this.setState({ isBeingEdited: true });
  }

  handleBlur = () => {
    this.setState({ isBeingEdited: false });
  }

  handleInput = (e) => {
    const { value: text } = e.target;
    this.setState({ text });
  }

  render () {
    return (
      <div className="textField" onClick={ this.handleClick }>
        <div 
          className="textField__text"
          style={ {display: (!this.state.isBeingEdited ? null : 'none') } }
        >
          { this.state.text }
        </div> 
        <textarea 
          className="textField__textarea"
          onBlur={ this.handleBlur }
          onInput={ this.handleInput } 
          ref={ elt => { this.visibleTextarea = elt; } }
          style={ { height: this.state.height + 'px', display: (this.state.isBeingEdited ? null : 'none') } }
          value={ this.state.text }
        />
        <textarea 
          className="textField__textarea --ghost"
          ref={ elt => { this.ghostTextarea = elt; } }
          value={ this.state.text }
        />
      </div> 
    );
  }
}

export default TextField;
