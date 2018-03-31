import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import {QUESTION,OPTION} from './../constants/index';
import {updateElement} from './../actions/index';
import AddElement from './add-element';
import ElementList from './element-list';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Element extends Component {

    constructor(props){
        super(props);
        this.state = {...props.details, isEditEnable:false};
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps);
        if(_.isEmpty(this.state))
            this.setState({...(nextProps.details)});
    }

    handleEditValue(){
        console.log('reach handleEditValue');
        this.setState({isEditEnable:!this.state.isEditEnable},function () {
          if(!this.state.isEditEnable){
            this.handleUpdateElement();
          }
        });
    }


    handleOnChangeValue(event){
        this.setState({value:event.target.value});
    }

    handleUpdateElement(){
        this.props.updateElement(this.state);
    }

    handleOnCahngeType(inputType){
        this.setState({inputType},function () {
          this.handleUpdateElement();
        });

        console.log("handleOnCahngeType");
    }

  handleShowOnSelect(visisbleOnSelectOf){
    console.log("handleShowOnSelect");
    this.setState({visisbleOnSelectOf},function () {
      this.handleUpdateElement();
    });


  }

  renderOnSelectItems(){

      let id = this.state.id.toString();
      let parentId = id.split('-').slice(0,id.split('-').length-1).join('-');
      return this.props.elementById[parentId].elements.map((element)=>{
          console.log(element.type);
          if(id!==element.id && element.type===OPTION && (element.inputType==='checkbox'||element.inputType==='radio')){
            if(this.state.visisbleOnSelectOf === element.id)
              return (<div style={{backgroundColor:'grey'}} onClick={()=>this.handleShowOnSelect(element.id)}>{element.value}</div>);
            return (<div onClick={()=>this.handleShowOnSelect(element.id)}>{element.value}</div>);
          }
      });

  }
    render() {
        console.log("state ",this.state,this.state.id);
        if(this.state.type === QUESTION) {

          return (
              <div style={{border:'0.5px grey solid'}}>
                {this.state.isEditEnable?
                    <div><input type="text" value={this.state.value} onChange={this.handleOnChangeValue.bind(this)}/><span onClick={()=>this.handleEditValue()}>non-edit</span></div>
                    :
                    <div>{this.state.value}
                        <span onClick={()=>this.handleEditValue()}>edit</span>
                        {this.state.id.toString().includes("-")?
                            <div className="dropdown">
                                <button className="dropbtn">show on select</button>
                                <div className="dropdown-content">
                                  {this.renderOnSelectItems()}
                                  <div style={this.state.visisbleOnSelectOf===false?{backgroundColor:'grey'}:''}onClick={()=>this.handleShowOnSelect(false)}>Always Visible</div>
                                </div>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                }
                <ElementList elements={this.state.elements}/>
                <ol>
                    <div style={{display:'flex'}}>
                        <AddElement type={OPTION} parentId = {this.state.id.toString()}/>
                        <AddElement type={QUESTION}  parentId = {this.state.id.toString()}/>
                    </div>
                </ol>
              </div>
          );
        }
        else{
          let selectedInputTypeComponent=null;
          if(this.state.inputType==='radio'||this.state.inputType==='checkbox')
            selectedInputTypeComponent = <div style={{margin:'auto',padding: '15px'}}><input type={this.state.inputType} value={this.state.value} />{this.state.value}</div>
          else if(this.state.inputType==='text')
            selectedInputTypeComponent = <div style={{margin:'auto',padding: '15px'}}><input type={this.state.inputType} placeholder={this.state.value} /></div>
          else if(this.state.inputType==='textarea')
            selectedInputTypeComponent = <div style={{margin:'auto',padding: '15px'}}><textarea type={this.state.inputType} placeholder={this.state.value}></textarea></div>
          else
            selectedInputTypeComponent= <div style={{margin:'auto' ,padding: '15px'}}>{this.state.value}</div>
          return (
              <div style={{display:'flex'}}>
                {this.state.isEditEnable ?
                    <div style={{display:'flex'}}><input type="text" value={this.state.value}
                                onChange={this.handleOnChangeValue.bind(this)}/><span
                        onClick={() => this.handleEditValue()}>non-edit</span></div>
                    :
                    <div style={{display:'flex'}}>
                        {selectedInputTypeComponent}
                        <span style={{margin:'auto',padding: '15px'}} onClick={() => this.handleEditValue()}>edit</span>
                    </div>
                }
                <div className="dropdown">
                    <button className="dropbtn">type</button>
                    <div className="dropdown-content">
                        <div onClick={()=>this.handleOnCahngeType('radio')}>radio</div>
                        <div onClick={()=>this.handleOnCahngeType('checkbox')}>checkbox</div>
                        <div onClick={()=>this.handleOnCahngeType('text')}>text</div>
                        <div onClick={()=>this.handleOnCahngeType('textarea')}>textarea</div>
                    </div>
                </div>
              </div>
          );
        }
    }
}

function mapStateToProps(state) {
    return {
        elementById: state.allElements.elementById
    };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({updateElement: updateElement}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Element);
