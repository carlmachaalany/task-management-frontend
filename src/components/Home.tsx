import { useEffect, useState } from 'react';
import { Grid, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import Task from './Task';
import { TaskDTO } from '../models/task';
import { TaskService } from '../services/task.service';
import ManageTaskModal from './ManageTask';

function Home() {

  const [currTask, setCurrTask] = useState(new TaskDTO("", ""));
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [manageTaskOpen, setManageTaskOpen] = useState(false);
  
  async function fetchAll() {
    console.log("reloading data");
    const resp = await TaskService.getAll();
    setTasks(resp);
    console.log("new data: ", tasks);
  }

  function removeFromTasks(taskId: number) {
    const newTasks: TaskDTO[] = tasks.filter(t => t.id != taskId);
    setTasks(newTasks);
  }

  const createTask = () => {
    setCurrTask(new TaskDTO("", ""));
    setManageTaskOpen(true);
  }

  useEffect(() => {
    fetchAll();
  }, [])

  return (
      <>
      <div className="mx-4">
        <Button className="float-right" variant="contained" color="primary" onClick={createTask}>Create Task</Button>
        <Grid container spacing={3} style={{ padding: 10 }}>
          {
            tasks.map(task => {
              return (
                <Grid item xs={3} key={task.id}>
                  <Task reloadData={fetchAll} setCurrTask={setCurrTask} task={task} switch={(toWhat: boolean) => setManageTaskOpen(toWhat)} />
                </Grid>
              )
            })
          }
        </Grid>
      </div>
      <ManageTaskModal task={currTask} open={manageTaskOpen} switch={(toWhat: boolean) => setManageTaskOpen(toWhat)} />
      </>
  );
}

export default Home;

