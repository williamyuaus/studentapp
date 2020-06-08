import React, {Component} from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";

class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = { courses: [] };
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = () => {
        console.log("FETCH")
        fetch('http://localhost:8080/api/courses')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState( {
                    courses: responseData._embedded.courses
                });
            })
            .catch(err => console.error(err));
    }

    // Delete course
    onDelClick = (link) => {
        if (window.confirm('Are you sure to delete?')) {
            fetch(link, {method: 'DELETE'})
                .then(res => {
                    toast.success("Course deleted", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    this.fetchCourses()
                })
                .catch(err => {
                    toast.error("Error when deleting", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error(err)
                })
        }
    }

    // Add new course
    addCourse(course) {
        fetch('http://localhost:8080/api/courses',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course)
            })
            .then(res => this.fetchCourses())
            .catch(err => console.error(err))
    }

    // Update course
    updateCourse(course, link) {
        fetch(link,
            { method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(course)
            })
            .then(res => {
                toast.success("Changes saved", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchCourses();
            })
            .catch(err =>
                toast.error("Error when saving", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            )
    }

    render() {
        const columns = [{
            Header: 'Course Name',
            accessor: 'name'
        }, {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) => (<EditCourse course={row} link={value} updateCourse={this.updateCourse} fetchCourses={this.fetchCourses} />),
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
                        <AddCourse addCourse={this.addCourse} fetchCourses={this.fetchCourses} />
                    </Grid>
                </Grid>
                <ReactTable data={this.state.courses} columns={columns} filterable={true} />
                <ToastContainer autoClose={1500} />
            </div>
        )

    }
}

export default CourseList;