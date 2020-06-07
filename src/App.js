import React from 'react';
import './App.css';
import WeatherApp from './WeatherApp';
import { AppBar } from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CourseList from "./components/CourseList";

function App() {


  return (
    <div className="App">
      <img name="logo" src="https://www.integradev.com.au/images/iad.png" alt="Integrated Application Development" />
      <WeatherApp />
      <AppBar position="static" color="default">
          <Toolbar>
              <Typography variant="h6" color="inherit">
                  Course list
              </Typography>
          </Toolbar>
      </AppBar>
      <CourseList />
    </div>
  );
}

export default App;
