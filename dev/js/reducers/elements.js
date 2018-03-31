/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */
import _ from 'lodash';
import {OPTION} from './../constants';

const initState = {
  elements:[],
  elementById:{}
};
export default function (state = initState, action) {
  const updatedState = _.cloneDeep(state);
  let ids,temp;
  switch (action.type) {
    case 'ADD_ELEMENT':
      console.log('reach question reducer...',action.payload);
      const parentId=action.payload.parentId;// each level is recursively separated by -
      ids = parentId===false?[]:parentId.split("-");
      temp=updatedState.elements;
      ids.map(function (id) {
        temp = temp[id].elements;
      });

      const type=action.payload.type;
      const element = {
        id: (parentId?(parentId+"-"+temp.length):(temp.length)),
        type:type,
        inputType: type === OPTION ? 'radio' : null,
        format:'text',
        value:'What stack are you using?',
        visisbleOnSelectOf:false,
        elements:[]
      };
      console.log(temp,'temp--');
      temp.push(element);
      updatedState.elementById[element.id]=element;
      return {...updatedState};
    case 'UPDATE_ELEMENT':
      console.log('reach UPDATE_ELEMENT reducer...',action.payload);
      temp=updatedState.elements;
      const {id}=action.payload;// each level is recursively separated by -
      ids = (id===false)?[]:id.toString().split("-");
      ids.forEach(function (id,ind) {
        if(ind+1>=ids.length)
          return;
        else
          temp = temp[id].elements;
      });
      //need to update
      //updatedState.elements[id] = action.payload;
      temp[ids[ids.length-1]] = action.payload;
      updatedState.elementById[id]=action.payload;
      return {...updatedState};
  }
  return state;
}
