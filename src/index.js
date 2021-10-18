import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store";

import App from './App';

import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/global.scss";

class ErrorBoundary extends React.Component {
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
          Something went wrong in App.
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
