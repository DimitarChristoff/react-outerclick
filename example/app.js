import React from 'react';
import Container from './container';

class Crypt {

  constructor(seed){
    this.seed = Array.from(seed).map(i => i.charCodeAt(0));
  }

  static shift([a, ...rest]){
    return [...rest, a];
  }

  encrypt(str){
    let b = [...this.seed];
    return String.fromCharCode(...Array.from(str).map((letter, index) => {
      b = Crypt.shift(b);
      return (str.charCodeAt(index) ^ (!~~(index % 2) ? b[0] : b[b.length-1])) + 64;
    }));
  }

  decrypt(str){
    let b = [...this.seed];
    return String.fromCharCode(...Array.from(str).map((n, index) => {
      b = Crypt.shift(b);
      return (str.charCodeAt(index) - 64) ^ (!~~(index % 2) ? b[0] : b[b.length-1]);
    }));
  }
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.enc = new Crypt(props.cryptokey);
    console.log(`"${this.enc.encrypt(props.message)}"`)
  }

  componentWillMount(){
    this.setState({
      message: this.enc.decrypt(this.props.message)
    });
  }

  state = {
    message: 'Waiting to decode',
    open: true
  };

  handleClose = () => {
    console.log('closing')
    this.setState({
      open: !this.state.open
    });
  }

  render(){
    const openClass = 'modal' + (this.state.open ? ' is-active' : '');

    return <div className={openClass}>
      <div className="modal-background"/>
      <div className="modal-container">
        <div className="modal-content">
          <Container onClose={this.handleClose} title={this.state.message} />
        </div>
      </div>
    </div>
  }
}

export default App;
