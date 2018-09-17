import React from 'react';
import {findDOMNode} from 'react-dom';

const __listeners = [];

function notifyComponents(e){
  const gone = [];
  __listeners.map((component, index) => {
    try {
      const node = findDOMNode(component);
      if (!node){
        return;
      }
      if (!node.contains(e.target)){
        component.handleOuterClick(e);
      }
    }
    catch(e){
      // unexpectedly removed from DOM, we need to clean up
      gone.push([index, component])
    }
  });
  gone.length && gone.forEach(toRemove => __stop.apply(null, toRemove))
}

function doc(node){
  return node.ownerDocument || window.document;
}

/**
 * Adds a click listener to component's ownerDocument, max one per page
 * @param {React.Component} wrappedComponent
 * @returns {number || *}
 * @private
 */
function __listen(wrappedComponent){
  let node = findDOMNode(wrappedComponent);
  if (!node)
    return;

  if (__listeners.length === 0){
    doc(node).addEventListener('click', notifyComponents, true);
  }
  return __listeners.push(wrappedComponent);
}

/**
 * Stops listening for a outer click for a particular delegate or cleans up all listeners
 * @param {Number} listenerIndex handle in case more than 1
 * @param {React.Component} wrappedComponent
 * @private
 */
function __stop(listenerIndex, wrappedComponent){
  __listeners.splice(listenerIndex, 1);
  if (!__listeners.length){
    let node;
    try {
      node = findDOMNode(wrappedComponent);
    }
    catch(e){
      node = {};
    }
    finally {
      doc(node).removeEventListener('click', notifyComponents);
    }
  }
}

/**
 * Returns a new Class or the old class if the ComponentConstructor passed does not implement handleOuterClick
 * @param {React.Component} ComponentConstructor
 * @returns {OuterClickWrap || React.Component}
 */
function outerClick(ComponentConstructor){
  return ComponentConstructor.prototype.handleOuterClick ?
    class OuterClickWrap extends React.Component {

      __wrappedComponent = React.createRef();

      static displayName = `outerClickWrapper-${ComponentConstructor.displayName || ComponentConstructor.name}`;

      componentDidCatch(error){
        // hot reload can break this. we want to fail silently.
      }

      componentDidMount(){
        this._sub = __listen(this.__wrappedComponent.current);
      }

      componentWillUnmount(){
        __stop(this._sub, this.__wrappedComponent.current);
        delete this._sub;
      }

      render(){
        return <ComponentConstructor {...this.props} ref={this.__wrappedComponent}/>
      }
    } :
    ComponentConstructor;
}

export default outerClick;
