import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const EditCourse = (props) => {
    const [open, setOpen] = useState(false);
    const [course, setCourse] = useState({
        name: ''
    });

    // Open the modal form
    const handleOpen = () => {
        setCourse({name: props.course.name})
        setOpen(true);
    }

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    }

    // handle the change of input field values
    const handleChange = (e) => {
        setCourse({...course, [e.target.name]:e.target.value});
    }

    // Save Course and close modal form
    const handleSave = () => {
        props.updateCourse(course, props.link);
        handleClose();
    }

    return (
        <div>
            <Button color="primary" size="small" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Course</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" value={course.name} onChange={handleChange} name="name" label="Course Name" fullwidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCourse;