import React      from 'react';
import ReactDOM   from 'react-dom';

const listeners   = {};
let listener;

function listen(id, component){
  if (Object.keys(listeners).length === 0){
    listener = function(e){
      const node = ReactDOM.findDOMNode(component);
      if (!node || (node && !node.contains(e.target))){
        id in listeners && listeners[id].map(component => component.handleOuterClick(e))
      }
    };
    window.document.addEventListener('click', listener, true);
  }
  if (!(id in listeners)){
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
    if (!Object.keys(listeners).length){
      window.document.removeEventListener('click', listener);
    }
  }
}

/**
 * Returns a new Class or the old class if the ComponentConstructor passed does not implement handleOuterClick
 * @param {React.Component} ComponentConstructor
 * @returns {OuterclickWrap || React.Component}
 */
function outerClick(ComponentConstructor){
  return ComponentConstructor.prototype.handleOuterClick ?
    class OuterClickWrap extends React.Component {

      displayName = `outerClickWrapper-${ComponentConstructor.displayName || ComponentConstructor.name}`;

      componentDidMount(){
        this._sub = listen(this.displayName, this.__wrappedComponent);
      }

      componentWillUnmount(){
        stop(this.displayName, this._sub);
        delete this._sub;
      }

      render(){
        return <ComponentConstructor {...this.props} ref={c => this.__wrappedComponent = c} />
      }
    } :
  ComponentConstructor;
}

export default outerClick;