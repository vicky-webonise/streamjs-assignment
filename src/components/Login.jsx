import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import SubmitButtonWrapped from "./shared/SubmitButton";
import UserInputWrapped from "./shared/UserInput";
import Banner from "./shared/Banner";
import { hideLoaderActionCreator, showLoaderActionCreator } from "../actions/loader.action";
import PageLoader from "./shared/PageLoader";
import { getUsersActionCreator } from "../actions/user.action";

class LoginErrorBoundary extends React.Component {
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
          Something went wrong in Login.
        </div>
      );
    }
    return this.props.children;
  }
}

const LoginWrapped = (props) => {
  return (
    <LoginErrorBoundary>
      <Login {...props} />
    </LoginErrorBoundary>
  );
};


const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPassValid, setIsPassValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const dispatch = useDispatch();
  const loader = useSelector((state) => {
    return state.loader.showLoader;
  });

  const users = useSelector((state) => {
    return state.userReducer.userList;
  });

  useEffect(() => {
    // throw new Error();
    dispatch(getUsersActionCreator());
  }, [dispatch]);

  const onEmailChange = (email) => {
    // console.log(email);
    let validEmail = new RegExp(
      /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    ).test(email);

    // email is typing
    if (email) {
      setIsEmailValid(true);
      setIsDisabled(false);
    }

    // check email format
    if (validEmail) {
      setIsEmailValid(false);
      setIsDisabled(isEmailValid && isPassValid);
    } else {
      // console.log("invalid");
    }
    setEmail(email);
  };
  const onPasswordChange = (pass) => {
    var validPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(pass);
    if (validPass) {
      setIsPassValid(false);
      setIsDisabled(!(isEmailValid && isPassValid));
    } else {
      setIsPassValid(true);
      setIsDisabled(false);
    }
    setPass(pass);
  };

  let checkUser = false;
  const onSubmitClick = (e) => {
    e.preventDefault();
    dispatch(showLoaderActionCreator());
    setTimeout(() => {
      dispatch(hideLoaderActionCreator());
      // console.log("email :" + email);
      // console.log("password : " + pass);


      users.map((item) => {
        // debugger;
        if (email === item.email && pass === item.password) {
          alert("success");
          checkUser = true;
        }
        return checkUser;
      })
      /* if (email === "test@webonise.com" && pass === "Test1234") {
        console.log("success");
        history.push("/dashboard");
      } else {
        setIsFormValid(true);
      } */

      if(checkUser) {
        history.push("/dashboard");
      } else {
        setIsFormValid(true);
      }
    }, 2000);
  };



  return (
    <>
      <Banner title="Login" slogan="Slogan Login" />
      {loader && <PageLoader />}
      {checkUser}
      <form onSubmit={onSubmitClick}>
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            {isFormValid && (
              <div className="alert alert-danger" role="alert">
                You entered an incorrect email / username or password.
              </div>
            )}
            <UserInputWrapped
              label="Email address"
              id="email"
              type="email"
              clsName="form-control"
              placeholder="Enter email"
              errorMsg={"Please enter valid email id"}
              isValid={isEmailValid}
              onChange={onEmailChange}
              val={email}
            />
            <UserInputWrapped
              label="Password"
              id="password"
              type="password"
              clsName="form-control"
              placeholder="Enter password"
              errorMsg={
                "Please enter min 8 character, least one digit, one lowercase, one uppercase"
              }
              isValid={isPassValid}
              onChange={onPasswordChange}
              val={pass}
            />
            <small className="form-text text-muted mb-3">
              check the user listing for existing you to login or create new one
            </small>
            <SubmitButtonWrapped
              disabled={!isDisabled}
              title="Login"
              clsName="btn btn-primary mb-4 mr-4"
            />
            <SubmitButtonWrapped
              title="Sign Up"
              clsName="btn btn-primary mb-4"
              onClick={() => {
                history.push("/signup");
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginWrapped;
