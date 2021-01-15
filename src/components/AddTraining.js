import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateTimePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function AddTraining(props) {

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [training, setTraining] = useState({
        date: selectedDate.toISOString(),
        activity: '',
        duration: '',
        customer: props.customer
    });

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setTraining({ ...training, date: date.toISOString() });
    };


    const handleDialogOpen = () => {
        setDialogOpen(true)
    }

    const handleDialogClose = () => {
        setDialogOpen(false)
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        props.addTraining(training);
        handleDialogClose();
        setTraining({...training, 
            date: selectedDate.toISOString(),
            activity: '',
            duration: ''
        });
    }

    return (
        <div>
            <Button
                variant='outlined'
                color='primary'
                onClick={handleDialogOpen}>
                Add Training
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogOpen}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DateTimePicker
                            label="Date and time"
                            inputVariant="outlined"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration (min)"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color='primary'>
                        Save
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}