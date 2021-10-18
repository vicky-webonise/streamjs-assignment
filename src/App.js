import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import HomeWrapped from "./components/Home";
import LoginWrapped from "./components/Login";
import SignupWrapped from "./components/Signup";
import DashboardWrapped from "./components/Dashboard";
import UserListingWrapped from "./components/UserListing";


function App() {
  return (
    <div className="App">
      <Header />
      <div className="pageData">
        <div className="container">
          <Switch>
            <Route path="/" component={HomeWrapped} exact />
            <Route path="/login" component={LoginWrapped} />
            <Route path="/signup" component={SignupWrapped} />
            <Route path="/dashboard" component={DashboardWrapped} />
            <Route path="/user-listing" component={UserListingWrapped} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
