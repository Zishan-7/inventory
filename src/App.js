import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Search from "./Search";
import SignIn from "./SignIn";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import AddListing from './AddListing';
import Add from './Add'

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Router>
          <div>
            <Route exact path="/login" component={SignIn} />
            <div>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/product/:id" component={Product} />
              <PrivateRoute exact path="/search" component={Search} />
              <PrivateRoute exact path="/add" component={AddListing} />
              <PrivateRoute exact path="/add2" component={Add} />
            </div>
          </div>
        </Router>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
// <Switch>
//         <Route exact path="/signin" component={SignIn} />
//         <div>
//           <Nav />
//           <Route exact path="/" component={Home} />
//           <Route exact path="/product" component={Product} />
//           <Route exact path="/search" component={Search} />
//         </div>
//       </Switch>
