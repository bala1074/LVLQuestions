import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addElement} from '../actions/index';
import { QUESTION,OPTION } from '../constants/index';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class AddElement extends Component {

    constructor(props){
      super(props);
      console.log("add-element",props);
      this.state = {
        type : props.type,
        parentId : (props.parentId===false||props.parentId===undefined)?false:props.parentId,
      };
    }
    handleAddElement(type){
      console.log(type,' added..',this.state.parentId);
      this.props.addElement({type,parentId:this.state.parentId});
    }

  render() {

    return (
        <div>
          {
            (this.state.type === QUESTION)?
                <div><span onClick={this.handleAddElement.bind(this,QUESTION)}>Add Question</span></div>
                :
                <div><span onClick={this.handleAddElement.bind(this,OPTION)}>Add Option</span></div>
          }
        </div>
    );
  }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
  return bindActionCreators({addElement: addElement}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AddElement);
