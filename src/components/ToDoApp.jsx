import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoActionCreator,
  addTodoActionCreator,
  getTodoActionCreator,
  // removeAllActionCreator,
  updateTodoActionCreator,
} from "../actions/todo.action";
import SubmitButtonWrapped from "./shared/SubmitButton";
import UserInputWrapped from "./shared/UserInput";

class ToDoAppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="alert alert-danger" role="alert">
          Something went wrong in ToDoApp.
        </div>
      );
    }
    return this.props.children;
  }
}

const ToDoAppWrapped = (props) => {
  return (
    <ToDoAppErrorBoundary>
      <ToDoApp {...props} />
    </ToDoAppErrorBoundary>
  );
};

const ToDoApp = () => {
  const [inputData, setInputData] = useState("");
  const [inputDataID, setInputDataID] = useState("");
  const [isEditTodo, setIsEditTodo] = useState(null);
  const [isToDoInputValid, setIsToDoInputValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // throw new Error();
    dispatch(getTodoActionCreator());
  }, [dispatch]);

  const todoList = useSelector((state) => {
    return state.toDoReducer.todolist;
  });

  const inputEvent = (inputValue) => {
    setInputData(inputValue);
    setIsDisabled(true);
  };

  const addTodo = (e, inputData) => {
    e.preventDefault();
    if (inputData.length < 4) {
      setIsToDoInputValid(true);
    } else {
      dispatch(addTodoActionCreator(inputData));
      setInputData("");
      setIsToDoInputValid(false);
    }
  };

  const updateTodo = (e) => {
    e.preventDefault();
    dispatch(updateTodoActionCreator(inputDataID, inputData));
    setInputData("");
    setIsEditTodo(false);
  }

  const cancelUpdateTodo = () => {
    setInputData("");
    setIsEditTodo(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you wanted to delete the todo")) {
      dispatch(deleteTodoActionCreator(id));
    }
  };

  const handleEdit = (id) => {
    setIsEditTodo(true);
    // console.log(id);
    let newEditItem = todoList.find((item) => {
      return item.id === id;
    });
    // console.log(newEditItem);
    setInputData(newEditItem.todo);
    setInputDataID(newEditItem.id);

  };

  // const handleDeleteAll = () => {
  //   if (window.confirm("Are you wanted to delete all the todos")) {
  //     dispatch(removeAllActionCreator());
  //   }
  // }

  return (
    <div className="toDoWrap">
      <h3 className="text-center">ToDo App</h3>
      <form
        onSubmit={
          !isEditTodo
            ? (e) => addTodo(e, inputData)
            : (e) => updateTodo(e, inputData)
        }
      >
        <div className="d-flex">
          <UserInputWrapped
            label=""
            id="email"
            type="text"
            clsName="form-control"
            placeholder="Add Items..."
            errorMsg={"Please enter min 4 character new item"}
            onChange={inputEvent || ""}
            isValid={isToDoInputValid}
            val={inputData}
          />
          <div>
            {!isEditTodo ? (
              <SubmitButtonWrapped
                disabled={!isDisabled}
                title="Add"
                clsName="btn btn-success ml-1"
                // onClick={() => addTodo(inputData)}
              />
            ) : (
              <>
                <SubmitButtonWrapped
                  disabled={!isDisabled}
                  title="Update"
                  clsName="btn btn-primary ml-1"
                  // onClick={() => updateTodo(inputData)}
                />
                <SubmitButtonWrapped
                  disabled={!isDisabled}
                  title="X"
                  clsName="btn btn-danger ml-1"
                  onClick={() => cancelUpdateTodo()}
                />
              </>
            )}
          </div>
        </div>
      </form>

      <ul className="list-group mb-4">
        {todoList.map((item) => {
          return (
            <li key={item.id} className="list-group-item text-success">
              <div className="row no-gutters">
                <div className="col">{item.todo}</div>
                <div className="col-4 text-right">
                  <span
                    onClick={() => handleEdit(item.id)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-warning btn-sm ml-2"
                  >
                    X
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {/* {todoList.length ? (
        <button
          className="btn btn-primary mb-2"
          onClick={() => handleDeleteAll()}
        >
          Delete All
        </button>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default ToDoAppWrapped;
