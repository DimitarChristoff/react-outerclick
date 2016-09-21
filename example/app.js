import React from 'react';
import Container from './container';

class App extends React.Component {

  state = {
    open: true
  };

  handleClose(){
    console.log('closing')
    this.setState({
      open: !this.state.open
    });
  }

  render(){
    const openClass = 'modal' + (!this.state.open ? ' is-active' : '');

    return <div className={openClass}>
      <div className="modal-background"></div>
      <div className="modal-container">
        <div className="modal-content">
          <Container onClose={() => this.handleClose()} title="Hello There, click outside the card to close" />
        </div>
      </div>
    </div>
  }
}

export default App;
