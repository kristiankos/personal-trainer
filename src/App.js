import './App.css';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CustomerList from './components/CustomerList.js';
import Trainings from './components/Trainings.js';
import Statistics from './components/Statistics.js';
import TrainingCalendar from './components/TrainingCalendar.js';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <BrowserRouter>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to='/'>Customers</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/trainings'>Trainings</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/calendar'>Calendar</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/statistics'>Statistics</MenuItem>
              </Menu>
              <Typography variant="h6">
                Personal Trainer
          </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={CustomerList} />
            <Route path="/trainings" component={Trainings} />
            <Route path="/calendar" component={TrainingCalendar} />
            <Route path="/statistics" component={Statistics} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiPickersUtilsProvider>
  );
}

export default App;