import React, { useEffect, useState, forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { SERVER_URL } from "../constants";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";

const EnrolStudent = (props) => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
  });
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

  // Open the modal form
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the modal form
  const handleClose = () => {
    setOpen(false);
  };

  // handle the change of input field values
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // Save Student and close modal form
  const handleSave = () => {
    props.addStudent(student);
    handleClose();
  };

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
      Cell: (firstName) => (
        <Link to={"/student/" + firstName.value}> {firstName.value} </Link>
      ),
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
  ];

  return (
    <div>
      <Button
        style={{ marginTop: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
      >
        Enrolment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enrol Student</DialogTitle>
        <DialogContent>
          <div style={{ maxWidth: "100%" }}>
            <MaterialTable
              columns={[
                { title: "First Name", field: "firstName" },
                { title: "Last Name", field: "lastName" },
              ]}
              data={students}
              title="Student List"
              options={{
                selection: true,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnrolStudent;
