import React, { useEffect } from "react";
import Banner from "./shared/Banner";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserActionCreator, getUsersActionCreator } from "../actions/user.action";
import SubmitButtonWrapped from "./shared/SubmitButton";
import PageLoader from "./shared/PageLoader";

class UserListingErrorBoundary extends React.Component {
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
          Something went wrong in UserListing.
        </div>
      );
    }
    return this.props.children;
  }
}

const UserListingWrapped = (props) => {
  return (
    <UserListingErrorBoundary>
      <UserListing {...props} />
    </UserListingErrorBoundary>
  );
};


const UserListing = () => {

  const  dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersActionCreator());
  }, [dispatch]);

  const users = useSelector((state) => {
    return state.userReducer.userList;
  });

  const loader = useSelector((state) => {
    return state.loader.showLoader;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you wanted to delete the User")) {
      dispatch(deleteUserActionCreator(id));
    }
  };

  return (
    <>
      <Banner title="User Listing" slogan="Slogan User Listing" />
      {loader && <PageLoader />}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.password}</td>
                <td>
                  <SubmitButtonWrapped
                    // disabled={!isDisabled}
                    title="X"
                    clsName="btn btn-danger ml-1"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

}

export default UserListingWrapped;
