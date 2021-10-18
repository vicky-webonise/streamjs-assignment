export const SET_TODO_ACTION = "SET_TODO";
export const ADD_TODO_ACTION = "ADD_TODO";
export const UPDATE_TODO_ACTION = "UPDATE_TODO";
export const DELETE_TODO_ACTION = "DELETE_TODO";
export const REMOVE_ALL_TODO_ACTION = "REMOVE_ALL_TODO";
export const EDIT_TODO_ACTION = "EDIT_TODO";
export const GET_ONE_TODO_ACTION = "GET_ONE_TODO";


export const setTodoActionCreator = (todolist) => {
  // return action
  return {
    type: SET_TODO_ACTION,
    todolist,
  };
};

export const getTodoActionCreator = () => {
  return (dispatch, getState) => {
    fetch("http://localhost:5000/Todos")
      .then((response) => response.json())
      .then((todolist) => {
        // console.log(todolist);
        dispatch(setTodoActionCreator(todolist));
      });
  };
};

export const addedTodoActionCreator = () => {
  return {
    type: ADD_TODO_ACTION,
  };
};

export const updatedTodoActionCreator = (todo) => {
  return {
    type: UPDATE_TODO_ACTION,
    todo,
  };
};

export const addTodoActionCreator = (todo) => {
  // console.log(todo)
  return (dispatch, getState) => {
    fetch("http://localhost:5000/Todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    }).then((res) => {
      // console.log("res", res);
      dispatch(addedTodoActionCreator(res));
      dispatch(getTodoActionCreator());
    });
  };
};


export const deletedTodoActionCreator = () => {
  return {
    type: DELETE_TODO_ACTION,
  };
}

export const deleteTodoActionCreator = (id) => {
  return (dispatch, getState) => {
    fetch("http://localhost:5000/Todos/" + id, {
      method: "DELETE",
    })
    .then((res) => {
      // console.log("res", res);
      dispatch(deletedTodoActionCreator());
      dispatch(getTodoActionCreator());
    });
  }
};

export const updateTodoActionCreator = (id, todo) => {
  // console.log(id, todo);
  return (dispatch, getState) => {
    fetch("http://localhost:5000/Todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, todo }),
    }).then((res) => {
      // console.log("res", res);
      dispatch(updatedTodoActionCreator());
      dispatch(getTodoActionCreator());
    });
  }
};

export const removeAllActionCreator = () => {
  return {
    type: REMOVE_ALL_TODO_ACTION,
  };
};
