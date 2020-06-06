import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const AddItem = (props) => {
    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState({product:'', amount:''});

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    // handle the change of input field values
    const handleChange = (e) => {
        setItem({...item, [e.target.name]:e.target.value});
    }

    // Calls addItem function (in props) and pass item state into it
    const addItem = () => {
        props.addItem(item);
        handleClose();
    }

    return (
        <div>
            <Button style={{marginTop: 10}} variant="outlined" color="primary" onClick={handleOpen}>
                Add Item
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Item</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" value={item.product} onChange={handleChange} name="product" label="Product" fullwidth />
                    <TextField margin="dense" value={item.amount} onChange={handleChange} name="amount" label="amount" fullwidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addItem} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default AddItem