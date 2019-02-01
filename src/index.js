import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles.css";

const members = [
  { name: "Bill", age: 16, gender: "male" },
  { name: "Jenny", age: 21, gender: "female" },
  { name: "Danielle", age: 28, gender: "female" }
];

const Card = ({ data }) => {
  const member = members.find(m => m.name.toLowerCase() === data);
  const { name, age, gender } = member;
  if (!member) {
    return <Redirect to="/" />;
  }
  return (
    <div className="card">
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Sex: {gender}</p>
    </div>
  );
};

const Sidebar = () => (
  <nav>
    <NavLink to="/bill" activeClassName="active">
      Bill
    </NavLink>
    <NavLink to="/jenny" activeClassName="active">
      Jenny
    </NavLink>
    <NavLink to="/danielle" activeClassName="active">
      Danielle
    </NavLink>
  </nav>
);

const Members = ({ location }) => (
  <div>
    <Sidebar />
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Route path="/:member">
          {({ match }) => <Card data={match.params.member} />}
        </Route>
      </CSSTransition>
    </TransitionGroup>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/bill" />} />
        <Route path="/:member" component={Members} />
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
