import { useEffect, useState } from 'react';
import { Grid, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import Task from './Task';
import { TaskDTO } from '../models/task';
import { TaskService } from '../services/task.service';
import ManageTaskModal from './ManageTask';

function NavBar() {

  return (
    <AppBar className="mb-4" position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          News
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

