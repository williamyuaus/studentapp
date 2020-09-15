import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import { SERVER_URL } from "../constants";

const StudentList = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    console.log("FETCH");
    fetch(SERVER_URL + "api/students")
      .then((response) => response.json())
      .then((responseData) => {
        setStudents(responseData._embedded.students);
      })
      .catch((err) => console.error(err));
  };

  // Delete student
  const onDelClick = (link) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(link, { method: "DELETE" })
        .then((res) => {
          toast.success("Student deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          fetchStudents();
        })
        .catch((err) => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error(err);
        });
    }
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

  // Update student
  const updateStudent = (student, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        fetchStudents();
      })
      .catch((err) =>
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      );
  };

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value, row }) => (
        <EditStudent
          student={row}
          link={value}
          updateStudent={updateStudent}
          fetchStudents={fetchStudents}
        />
      ),
    },
    {
      id: "delbutton",
      sortable: false,
      filterable: false,
      width: 100,
      accessor: "_links.self.href",
      Cell: ({ value }) => (
        <Button
          size="small"
          color="secondary"
          onClick={() => {
            onDelClick(value);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="App">
      <Grid container>
        <Grid item>
          <AddStudent addStudent={addStudent} fetchStudents={fetchStudents} />
        </Grid>
      </Grid>
      <ReactTable data={students} columns={columns} filterable={true} />
      <ToastContainer autoClose={1500} />
    </div>
  );
};
export default StudentList;
