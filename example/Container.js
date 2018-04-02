import React from 'react';
import PropTypes from 'prop-types';
import outerClick from '../src/index';

class Container extends React.Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  handleOuterClick(){
    this.props.onClose();
  }

  render(){
    return <div className="card is-fullwidth is-active">
      <header className="card-header">
        <p className="card-header-title">
          {this.props.title}
        </p>
        <a className="card-header-icon">
          <i className="fa fa-angle-down" />
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          <a href="#">@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br />
          <small>11:09 PM - 1 Jan 2016</small>
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item">Save</a>
        <a className="card-footer-item">Edit</a>
        <a className="card-footer-item" onClick={() => this.handleOuterClick()}>Cancel</a>
      </footer>
    </div>
  }
}

export default outerClick(Container);