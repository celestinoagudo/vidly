import React, { Component } from "react";
import createStore from "./store/configureStore";
import { connect, Provider } from "react-redux";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavigationBar from "./components/navigationBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  store = createStore();
  render() {
    const user = auth.getCurrentUser();

    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <NavigationBar user={user} />
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/notfound" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies" />
            <Provider store={this.store}>
              <Route
                path="/movies"
                render={(props) => <Movies {...props} user={user} />}
              ></Route>
            </Provider>
            <Redirect to="/notfound" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
