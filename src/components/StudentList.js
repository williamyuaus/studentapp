import React, {Component} from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import {SERVER_URL} from "../constants";

class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = { students: [] };
    }

    componentDidMount() {
        this.fetchStudents();
    }

    fetchStudents = () => {
        console.log("FETCH")
        fetch(SERVER_URL + 'api/students')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState( {
                    students: responseData._embedded.students
                });
            })
            .catch(err => console.error(err));
    }

    // Delete student
    onDelClick = (link) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch(link, {method: 'DELETE'})
                .then(res => {
                    toast.success("Student deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchStudents()
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    // Add new student
    addStudent(student) {
        fetch(SERVER_URL + 'api/students',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student)
            })
            .then(res => this.fetchStudents())
            .catch(err => console.error(err))
    }

    // Update student
    updateStudent(student, link) {
        fetch(link,
            { method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student)
            })
            .then(res => {
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchStudents();
            })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    render() {
        const columns = [{
            Header: 'Student First Name',
            accessor: 'firstName'
        }, {
            Header: 'Student Last Name',
            accessor: 'lastName'
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) => (<EditStudent student={row} link={value} updateStudent={this.updateStudent} fetchStudents={this.fetchStudents} />),
        }, {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (<Button size="small" color="secondary" onClick={() => {this.onDelClick(value)}} >Delete</Button> )
        }]

        return(
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddStudent addStudent={this.addStudent} fetchStudents={this.fetchStudents} />
                    </Grid>
                </Grid>
                <ReactTable data={this.state.students} columns={columns} filterable={true} />
                <ToastContainer autoClose={1500} />
            </div>
        )

    }
}

export default StudentList;