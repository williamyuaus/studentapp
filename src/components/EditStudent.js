import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const EditStudent = (props) => {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        firstName: '',
        lastName:''
    });

    // Open the modal form
    const handleOpen = () => {
        setStudent({firstName: props.student.firstName, lastName: props.student.last})
        setOpen(true);
    }

    // Close the modal form
    const handleClose = () => {
        setOpen(false);
    }

    // handle the change of input field values
    const handleChange = (e) => {
        setStudent({...student, [e.target.name]:e.target.value});
    }

    // Save Student and close modal form
    const handleSave = () => {
        props.updateStudent(student, props.link);
        handleClose();
    }

    return (
        <div>
            <Button color="primary" size="small" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Student</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" value={student.firstName} onChange={handleChange} name="firstName" label="First Name" fullWidth/>
                    <TextField margin="dense" value={student.lastName} onChange={handleChange} name="lastName" label="Last Name" fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditStudent;