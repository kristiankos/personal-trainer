import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer.js';
import AddTraining from './AddTraining.js';
import EditCustomer from './EditCustomer.js';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params, {
                method: 'DELETE'
            })
                .then(_ => getCustomers())
                .then(_ => {
                    setSnackbarMessage('Customer deleted successfully');
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

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setSnackbarMessage('Customer added successfully');
                    handleSnackbarOpen();
                    getCustomers();
                }
            })
            .catch(err => console.error(err))
    }

    const editCustomer = (link, customer) => {
        fetch(link, {
			method: 'PUT',
			headers: {
				'Content-type' : 'application/json'
			},
			body: JSON.stringify(customer)
		})
		.then(response => {
            if (response.ok) {
                setSnackbarMessage('Customer edited successfully');
                handleSnackbarOpen();
                getCustomers();
            }
        })
		.catch(err => console.error(err))
	
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response);
                    setSnackbarMessage('Training added successfully');
                    handleSnackbarOpen();
                }
            })
            .catch(err => console.error(err))
    }

    const columns = [
        { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'postcode', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'city', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'email', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        { field: 'phone', sortable: true, filter: true, resizable: true, cellStyle: { textAlign: "left" } },
        {
            field: 'links', headerName: '',
            cellRendererFramework: params =>
                <AddTraining customer={params.value[0].href} addTraining={addTraining} />
        },
        {
            headerName: '',
            width: 100,
            cellRendererFramework: params =>
                <EditCustomer customer={params} editCustomer={editCustomer} />
        },
        {
            field: 'links', headerName: '',
            width: 100,
            cellRendererFramework: params =>
                <IconButton color='secondary' onClick={() => deleteCustomer(params.value[0].href)}>
                    <DeleteIcon fontSize='small' />
                </IconButton>
        }
    ]

    return (
        <div className='ag-theme-material' style={{ height: '500px', width: '60%', margin: 'auto', marginTop: 10 }}>
            <AgGridReact
                rowData={customers}
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
            <AddCustomer addCustomer={addCustomer} />
            <Snackbar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={2500}
                message={snackbarMessage}
            />
        </div>
    )
}