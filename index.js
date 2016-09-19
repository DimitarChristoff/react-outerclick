import React      from 'react';
import ReactDOM   from 'react-dom';

const listeners   = {};
let listener;

function listen(id, component){
  if (Object.keys(listeners) === 0){
    listener = function(e){
      const node = ReactDOM.findDOMNode(this);
      if (!node || !node.contains(e.target)){
        id in listeners && listeners[id].map(component => component.handleOuterClick(e))
      }
    };
    window.document.addEventListener('click', listener, true);
  }
  if (!id in listeners){
    listeners[id] = [component];
  }
  else {
    return listeners[id].push(component);
  }
}

function stop(id, listenerIndex){
  if (id in listeners){
    listeners[id].splice(listenerIndex, 1);
    if (!listeners[id].length){
      delete listeners[id];
    }
    if (!Object.keys(listeners)){
      window.document.removeEventListener('click', listener);
    }
  }
}

function outerClick(component){

  return component.prototype.handleOuterClick ?
    class extends React.Component {

      displayName = `outerClickWrapper-${component.displayName || component.name}`;

      componentDidMount(){
        this._sub = listen(new Symbol(this.displayName), this.__wrappedComponent);
      }

      componentWillUnmount(){
        stop(new Symbol(this.displayName), this._sub);
        delete this._sub;
      }

      render(){
        return <component {...this.props} ref={c => this.__wrappedComponent = c} />
      }
    } :
  component;
}

export default outerClick;