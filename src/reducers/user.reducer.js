import { SET_USER_ACTION, DELETE_USER_ACTION, ADD_USER_ACTION } from "../actions/user.action";

const initialState = {
  userList: [],
}

export const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_ACTION:
      return {
        ...state,
        userList: action.userList,
      };
    // break;

    case DELETE_USER_ACTION:
      return {
        ...state,
      };
    // break;

    case ADD_USER_ACTION:
      return {
        ...state,
        // userList: [...state.userList, action.user],
      };
    // break;

    default:
      return state;
  }

}
