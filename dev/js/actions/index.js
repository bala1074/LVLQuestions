export const selectUser = (user) => {
    console.log("You clicked on user: ", user.first);
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};

export const addElement = (element) => {
  console.log("You clicked on addElement: ", element);
  return {
    type: 'ADD_ELEMENT',
    payload: element
  }
};

export const updateElement = (element) => {
  console.log("You clicked on addElement: ", element);
  return {
    type: 'UPDATE_ELEMENT',
    payload: element
  }
};

