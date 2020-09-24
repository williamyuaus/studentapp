import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { SERVER_URL } from "../constants";
import EnrolStudent from "./EnrolStudent";

const ManageCoursePage = (props) => {
  const [firstName, setFirstName] = useState([]);
  const [course, setCourse] = useState({ courseName: "" });

  useEffect(() => {
    fetchStudents();
    setCourse({ courseName: props.courseName });
  }, []);

  const fetchStudents = () => {
    console.log("FETCH");
    fetch(SERVER_URL + "api/courseRegistrations/5/student")
      .then((response) => response.json())
      .then((responseData) => {
        setFirstName(responseData.firstName);
      })
      .catch((err) => console.error(err));
  };

  // Add new student
  const addStudent = (student) => {
    fetch(SERVER_URL + "api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => fetchStudents())
      .catch((err) => console.error(err));
  };
  return (
    <>
      <h2>Manage the {props.match.params.name}</h2>
      <Grid container>
        <Grid item>
          <EnrolStudent addStudent={addStudent} fetchStudents={fetchStudents} />
        </Grid>
      </Grid>
      <p>{firstName}</p>
    </>
  );
};

export default ManageCoursePage;
