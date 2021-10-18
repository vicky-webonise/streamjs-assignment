import {
  ADD_TODO_ACTION,
  DELETE_TODO_ACTION,
  REMOVE_ALL_TODO_ACTION,
  SET_TODO_ACTION,
  UPDATE_TODO_ACTION,
} from "../actions/todo.action";

const initialState = {
  todolist: [],
};

export const toDoReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_TODO_ACTION:
      return {
        ...state,
        todolist: action.todolist,
      };
    // break;

    case ADD_TODO_ACTION:
      return {
        ...state,
        // todolist: [
        //   ...state.todolist,
        //   action.todo
        //   ]
      };
    // break;

    case UPDATE_TODO_ACTION:
      state.todolist.map((item) => {
        if (item.id === action.id) {
          return { ...state, todolist: [
            ...state.todolist, action.todo
          ]
        };
        }
        return state;
      });
      return state;
    // break;

    case DELETE_TODO_ACTION:
      return {
        ...state,
      };
    // break;

    case REMOVE_ALL_TODO_ACTION:
      return {
        ...state,
        todolist: [],
      };

    default:
      return state;
  }
};
