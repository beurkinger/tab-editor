
import { Component } from 'inferno'

import './TextField.css';

class TextField extends Component {
  ghostTextarea = null;
  visibleTextarea = null;
  state = { height: null, value: 'test text' };

  componentDidUpdate (prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      const { scrollHeight } = this.ghostTextarea;
      const { clientHeight } = this.visibleTextarea;
      if (clientHeight !== scrollHeight) this.setState({ height: scrollHeight });
    }
  }

  handleInput = (e) => {
    const { value } = e.target;
    this.setState({ value })
    // if (this.props.onInput) this.props.onInput(e);
  }

  render () {
    return (
      <div className={`${this.props.className} textField` }>
        <textarea 
          className="textField__textarea"
          onInput={ this.handleInput } 
          ref={ elt => { this.visibleTextarea = elt; } }
          style={ { height: `${this.state.height}px` } } 
          value={ this.state.value }
        />
        <textarea 
          className="textField__textarea --ghost"
          ref={ elt => { this.ghostTextarea = elt; } }
          value={ this.state.value }
        />
      </div> 
    );
  }
}

TextField.defaultProps = {
  className: '',
  onInput: null
}

export default TextField;
