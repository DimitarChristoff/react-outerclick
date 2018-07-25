import React          from 'react';
import {findDOMNode}  from 'react-dom';

const __listeners     = {};
  let __listener      = () => null;

/**
 * Adds a click listener to component's ownerDocument, max one per page
 * @param {String} id of component
 * @param {React.Component} component
 * @returns {number || *}
 * @private
 */
function __listen(id, component){
  const node = findDOMNode(component);
  if (!node)
    return;

  if (Object.keys(__listeners).length === 0){
    __listener = e => {
      const node = findDOMNode(component);
      if (!node || node && !node.contains(e.target)){
        id in __listeners && __listeners[id].map(component => component.handleOuterClick(e))
      }
    };
    node.ownerDocument.addEventListener('click', __listener, true);
  }
  if (!(id in __listeners)){
    __listeners[id] = [component];
  }
  else {
    return __listeners[id].push(component);
  }
}

/**
 * Stops listening for a outer click for a particular delegate or cleans up all listeners
 * @param {String} id of component
 * @param {Number} listenerIndex handle in case more than 1
 * @param {React.Component} component
 * @private
 */
function __stop(id, listenerIndex, component){
  if (id in __listeners){
    __listeners[id].splice(listenerIndex, 1);
    if (!__listeners[id].length){
      delete __listeners[id];
    }
    if (!Object.keys(__listeners).length){
      const node = findDOMNode(component);
      node && node.ownerDocument.removeEventListener('click', __listener);
      __listener = ()=>null;
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

      __wrappedComponent = React.createRef()

      displayName = `outerClickWrapper-${ComponentConstructor.displayName || ComponentConstructor.name}`;

      componentDidMount(){
        this._sub = __listen(this.displayName, this.__wrappedComponent.current);
      }

      componentWillUnmount(){
        __stop(this.displayName, this._sub, this.__wrappedComponent.current);
        delete this._sub;
      }

      render(){
        return <ComponentConstructor {...this.props} ref={this.__wrappedComponent} />
      }
    } :
  ComponentConstructor;
}

export default outerClick;