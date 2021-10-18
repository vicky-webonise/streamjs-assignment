import React from "react";
import Banner from "./shared/Banner";
import ToDoAppWrapped from "./ToDoApp";

class DashboardErrorBoundary extends React.Component {
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
          Something went wrong in Dashboard.
        </div>
      );
    }
    return this.props.children;
  }
}

const DashboardWrapped = (props) => {
  return (
    <DashboardErrorBoundary>
      <Dashboard {...props} />
    </DashboardErrorBoundary>
  );
};


const Dashboard = () => {
  // useEffect(() => {
  //   throw new Error();
  // }, []);

  return (
    <>
      <Banner title="Dashboard" slogan="Slogan Dashboard" />
      <div className="row">
        <div className="col-lg-4 offset-lg-4">
          <ToDoAppWrapped />
        </div>
      </div>
    </>
  );
};

export default DashboardWrapped;
