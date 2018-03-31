import React,{Component} from 'react';
import {connect} from 'react-redux';
import ElementList from '../containers/element-list';
import AddElement from '../containers/add-element';
import {QUESTION} from '../constants/index';
require('../../scss/style.scss');

class App extends Component {
  render() {
    const {elements }= this.props;

  return (
    <div>
      <h2>Questions List</h2>
      <ElementList elements={elements}/>
      <hr />
      <AddElement type={QUESTION}/>
    </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    elements: state.allElements.elements
  };
}
export default connect(mapStateToProps)(App);
