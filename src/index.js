import React from 'react';
import {findDOMNode} from 'react-dom';

const __listeners = [];

function notifyComponents(e){
  __listeners.map(component => {
    const node = findDOMNode(component);
    if (!node){
      return;
    }
    if (!node.contains(e.target)){
      component.handleOuterClick(e)
    }
  });
}

/**
 * Adds a click listener to component's ownerDocument, max one per page
 * @param {React.Component} wrappedComponent
 * @returns {number || *}
 * @private
 */
function __listen(wrappedComponent){
  const node = findDOMNode(wrappedComponent);
  if (!node)
    return;

  if (__listeners.length === 0){
    node.ownerDocument.addEventListener('click', notifyComponents, true);
  }
  return __listeners.push(wrappedComponent)
}

/**
 * Stops listening for a outer click for a particular delegate or cleans up all listeners
 * @param {Number} listenerIndex handle in case more than 1
 * @param {React.Component} wrappedComponent
 * @private
 */
function __stop(listenerIndex, wrappedComponent){
  __listeners.splice(listenerIndex, 1)
  if (!__listeners.length){
    const node = findDOMNode(wrappedComponent);
    node && node.ownerDocument.removeEventListener('click', notifyComponents);
  }
}

/**
 * Returns a new Class or the old class if the ComponentConstructor passed does not implement handleOuterClick
 * @param {React.Component} ComponentConstructor
 * @returns {OuterClickWrap || React.Component}
 */
function outerClick(ComponentConstructor){
  let __id = 0;

  return ComponentConstructor.prototype.handleOuterClick ?
    class OuterClickWrap extends React.Component {

      __wrappedComponent = React.createRef()

      displayName = `outerClickWrapper-${ComponentConstructor.displayName || ComponentConstructor.name}-${__id++}`;

      componentDidMount(){
        this._sub = __listen(this.__wrappedComponent.current);
      }

      componentWillUnmount(){
        __stop(this._sub);
        delete this._sub;
      }

      render(){
        return <ComponentConstructor {...this.props} ref={this.__wrappedComponent}/>
      }
    } :
    ComponentConstructor;
}

export default outerClick;
