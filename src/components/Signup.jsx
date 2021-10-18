import React, { useState  } from "react";
import Banner from "./shared/Banner";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import SubmitButtonWrapped from "./shared/SubmitButton";
import UserInputWrapped from "./shared/UserInput";
import { addUserActionCreator } from "../actions/user.action";

class SignupErrorBoundary extends React.Component {
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
          Something went wrong in Signup.
        </div>
      );
    }
    return this.props.children;
  }
}

const SignupWrapped = (props) => {
  return (
    <SignupErrorBoundary>
      <Signup {...props} />
    </SignupErrorBoundary>
  );
};

const Signup = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [singUpInput, setSingUpInput] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const { name, email, contact, password } = singUpInput;

  const [isInputValid, setIsInputValid] = useState({
    isNameValid: false,
    isEmailValid: false,
    isContactValid: false,
    isPasswordValid: false,
  });

  const { isNameValid, isEmailValid, isContactValid, isPasswordValid } = isInputValid;

  const [isDisabled, setIsDisabled] = useState(false);

    const onNameChange = (name) => {
      if (name.length < 4) {
        setIsInputValid({
          ...isInputValid,
          isNameValid: true,
        });
        setIsDisabled(false);
      } else {
        setIsInputValid({
          ...isInputValid,
          isNameValid: false,
        });
        setIsDisabled(
          isNameValid && isEmailValid && isContactValid && isPasswordValid
        );
      }
      setSingUpInput({
        ...singUpInput,
        name: name,
      });
    };

    const onContactChange = (contact) => {
      if (contact.length < 10) {
        setIsInputValid({
          ...isInputValid,
          isContactValid: true,
        });
        setIsDisabled(false);
      } else {
        setIsInputValid({
          ...isInputValid,
          isContactValid: false,
        });
        setIsDisabled(
          isNameValid && isEmailValid && isContactValid && isPasswordValid
        );
      }
      setSingUpInput({
        ...singUpInput,
        contact: contact,
      });
    };


    const onEmailChange = (email) => {
      // console.log(email);
      let validEmail = new RegExp(
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
      ).test(email);

      // email is typing
      if (email) {
        setIsInputValid({
          ...isInputValid,
          isEmailValid: true,
        });
        setIsDisabled(false);
      }

      // check email format
      if (validEmail) {
        setIsInputValid({
          ...isInputValid,
          isEmailValid: false,
        });
        setIsDisabled(
          isNameValid &&
          isEmailValid &&
          isContactValid &&
          isPasswordValid
        );
      }
      setSingUpInput({
        ...singUpInput,
        email: email,
      });
    };
    const onPasswordChange = (password) => {
      var validPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
      if (validPass) {
        setIsInputValid({
          ...isInputValid,
          isPasswordValid: false,
        });
        setIsDisabled(!(setIsDisabled(
          isNameValid &&
          isEmailValid &&
          isContactValid &&
          isPasswordValid
        )));
      } else {
        setIsInputValid({
          ...isInputValid,
          isPasswordValid: true,
        });
        setIsDisabled(false);
      }
      setSingUpInput({
        ...singUpInput,
        password: password,
      });
    };

  const onSubmitClick = (e) => {
    e.preventDefault();
    dispatch(addUserActionCreator(singUpInput));
    history.push("/user-listing");
  }

  return (
    <>
      <Banner title="Signup" slogan="Slogan Signup" />
      <form onSubmit={onSubmitClick}>
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <UserInputWrapped
              label="Name"
              id="name"
              name="name"
              type="text"
              clsName="form-control"
              placeholder="Enter name"
              errorMsg={"Please enter name min 4 character"}
              isValid={isNameValid}
              onChange={onNameChange}
              val={name}
            />
            <UserInputWrapped
              label="Email address"
              id="email"
              name="email"
              type="email"
              clsName="form-control"
              placeholder="Enter email"
              errorMsg={"Please enter valid email id"}
              isValid={isEmailValid}
              onChange={onEmailChange}
              val={email}
            />
            <UserInputWrapped
              label="Contact"
              id="contact"
              name="contact"
              type="number"
              clsName="form-control"
              placeholder="Enter contact no"
              errorMsg={"Please enter valid contact no"}
              isValid={isContactValid}
              onChange={onContactChange}
              val={contact}
            />
            <UserInputWrapped
              label="Password"
              id="password"
              name="password"
              type="password"
              clsName="form-control"
              placeholder="Enter password"
              errorMsg={
                "Please enter min 8 character, least one digit, one lowercase, one uppercase"
              }
              isValid={isPasswordValid}
              onChange={onPasswordChange}
              val={password}
            />
            <SubmitButtonWrapped
              disabled={!isDisabled}
              title="Submit"
              clsName="btn btn-primary mb-4 mr-4"
            />
            <SubmitButtonWrapped
              title="Login"
              clsName="btn btn-primary mb-4"
              onClick={() => {
                history.push("/login");
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SignupWrapped;
