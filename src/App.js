import React from "react";
import "./App.css";
import WeatherApp from "./components/WeatherApp";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import StudentList from "./components/StudentList";
import { Route } from "react-router-dom";
import CourseList from "./components/CourseList";
import FeedbackPage from "./components/FeedbackPage";

function App() {
  return (
    <div className="App">
      <img
        id="logo"
        name="logo"
        src="https://www.integradev.com.au/images/iad.png"
        alt="Integrated Application Development"
      />
      <WeatherApp className="WeatherApp" />
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Student list
          </Typography>
        </Toolbar>
      </AppBar>
      <Route path="/students" component={StudentList} />
      <Route path="/courses" component={CourseList} />
      <Route path="/student/:firstName" component={FeedbackPage} />
    </div>
  );
}

export default App;
