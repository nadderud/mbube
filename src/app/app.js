/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import NavBar from "./components/NavBar"
import Main from "./main"
import Email from "./email"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./login"

// remember everything in /app/* is dynamic now!
const App = () => (
  <>
    <NavBar />
    <Router>
      <PublicRoute path="/app">
        <PrivateRoute path="/" component={Main} />
        <PrivateRoute path="/e-post" component={Email} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  </>
)
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
