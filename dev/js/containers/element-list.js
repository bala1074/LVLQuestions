import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser} from '../actions/index';
import Element from './element';

class ElementList extends Component {

    constructor(props){
        super(props);
        this.state = {...props.elements}
    }

    renderList() {
        console.log(this.props.elements);
        return this.props.elements&&this.props.elements.map((element) => {
            return (
                    <Element key={Math.random()*100} details={element}/>
            );
        });
    }

    render() {
        return (
            <div>
                <ol>{this.renderList()}</ol>
            </div>
        );
    }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render


// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser: selectUser}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(matchDispatchToProps)(ElementList);
