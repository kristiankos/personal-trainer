import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';


export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        console.log('loading trainings');
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
                method: 'DELETE'
            })
                .then(_ => getTrainings())
                .then(_ => {
                    setSnackbarMessage('Training deleted successfully');
                    handleSnackbarOpen();
                })
                .catch(err => console.error(err))
        }
    }

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    const columns = [
        { field: 'activity', headerName: 'Activity', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'duration', headerName: 'Duration (min)', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        {
            field: 'date', headerName: 'Date', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" },
            cellRendererFramework: params => moment().format('MMMM Do YYYY, h:mm:ss a')

        },
        { field: 'customer.firstname', headerName: 'First Name', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'customer.lastname', headerName: 'Last Name', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        {
            field: 'id', headerName: '',
            width: 100,
            cellRendererFramework: params =>
                <IconButton color='secondary' onClick={() => deleteTraining(params.value)}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
        }
    ]


    return (
        <div className='ag-theme-material' style={{ height: '500px', width: '60%', margin: 'auto', marginTop: 10 }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columns}
                pagination={true}
                paginationAutoPageSize={true}
                ref={gridRef}
                onGridReady={params => {
                    gridRef.current = params.api;
                    params.api.sizeColumnsToFit();
                }}
                suppressCellSelection={true}
                animateRows={true}
            >
            </AgGridReact>
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={2500}
                message={snackbarMessage}
            />
        </div>
    )
}