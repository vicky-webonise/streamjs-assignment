import { hideLoaderActionCreator, showLoaderActionCreator } from "./loader.action";

export const SET_USER_ACTION = "SET_USER";
export const GET_USER_ACTION = "GET_USER";

export const UPDATE_USER_ACTION = "UPDATE_USER";
export const ADD_USER_ACTION = "ADD_USER";
export const DELETE_USER_ACTION = "DELETE_USER";
export const REMOVE_ALL_USER_ACTION = "REMOVE_ALL_USER";
export const EDIT_USER_ACTION = "EDIT_USER";
export const GET_ONE_USER_ACTION = "GET_ONE_USER";

export const setUser = (data) => {
  // console.log(data);
  return {
    type: SET_USER_ACTION,
    userList: data,
  };
};

export const getUsersActionCreator = () => {
  return (dispatch, getState) => {
    dispatch(showLoaderActionCreator());
    fetch("http://localhost:5000/Users")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      dispatch(setUser(data));
      dispatch(hideLoaderActionCreator());
      });
  };
}

export const deletedUser = () => {
  return {
    type: DELETE_USER_ACTION,
  };
};

export const deleteUserActionCreator = (id) => {
  return (dispatch, getState) => {
    dispatch(showLoaderActionCreator());
    fetch("http://localhost:5000/Users/" + id, {
      method: "DELETE",
    }).then((res) => {
      // console.log("res", res);
      dispatch(deletedUser());
      dispatch(getUsersActionCreator());
      dispatch(hideLoaderActionCreator());
    });
  };
};


export const addedUser = () => {
  return {
    type: ADD_USER_ACTION,
    // user,
  };
};

export const addUserActionCreator = (user) => {
  return (dispatch, getState) => {
    dispatch(showLoaderActionCreator());
    fetch("http://localhost:5000/Users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      // console.log("res", res);
      dispatch(addedUser());
      dispatch(getUsersActionCreator());
      dispatch(hideLoaderActionCreator());
    });
  };
};
