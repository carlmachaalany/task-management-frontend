import { useEffect, useState } from 'react';
import './App.css';
import { TaskService } from './services/task.service';
import { TaskDTO } from './models/task';
import { Grid, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import Task from './components/Task';
import ManageTaskModal from './components/ManageTask';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;

