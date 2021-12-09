import { useEffect, useState } from 'react';
import { Grid, AppBar, Toolbar, IconButton, Typography, Button, Card, CardHeader, Avatar } from '@material-ui/core';
import Task from './Task';
import { TaskDTO } from '../models/task';
import { TaskService } from '../services/task.service';
import ManageTaskModal from './ManageTask';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Stack } from '@mui/material';

function Home() {

  const [currTask, setCurrTask] = useState(new TaskDTO("", ""));
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [manageTaskOpen, setManageTaskOpen] = useState(false);
  
  async function fetchAll() {
    console.log("reloading data");
    const resp = await TaskService.getAll();
    setTasks(resp);
    console.log("new data: ", resp);
  }

  function removeFromTasks(taskId: number) {
    const newTasks: TaskDTO[] = tasks.filter(t => t.id != taskId);
    setTasks(newTasks);
  }

  const createTask = () => {
    setCurrTask(new TaskDTO("", ""));
    setManageTaskOpen(true);
  }

  const handleOnDragEnd = (change: any) => {
    if (!change.destination) { return; }
    console.log(change);
    let newTasks: TaskDTO[] = Array.from(tasks);
    let [itemRemoved] = newTasks.splice(change.source.index, 1);
    newTasks.splice(change.destination.index, 0, itemRemoved);
    console.log(newTasks);
    console.log("old tasks: ", tasks);
    setTasks(newTasks);
    console.log("new tasks: ", tasks);
  };

  useEffect(() => {
    fetchAll();
  }, [])

  return (
    <>
      <Container>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Stack direction="row" spacing={2}>
            <Card className="px-2 w-25 bg-light">
              <CardHeader title="TODO"/>
              <Droppable droppableId="taskList">
                  {(provided) => (
                    <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => {
                        return (
                          <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                  {(provided) => (
                                    <li className="li-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                      <Task reloadData={fetchAll} setCurrTask={setCurrTask} task={task} switch={(toWhat: boolean) => setManageTaskOpen(toWhat)} />
                                    </li>
                                  )}
                          </Draggable>
                          )
                        })}
                      {provided.placeholder}
                    </Stack>
                  )}
              </Droppable>
            </Card>
            <Card className="px-2 w-25 bg-light">
              <CardHeader title="DONE"/>
              <Droppable droppableId="taskList">
                  {(provided) => (
                    <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => {
                        return (
                          <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                                  {(provided) => (
                                    <li className="li-item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                      <Task reloadData={fetchAll} setCurrTask={setCurrTask} task={task} switch={(toWhat: boolean) => setManageTaskOpen(toWhat)} />
                                    </li>
                                  )}
                          </Draggable>
                          )
                        })}
                      {provided.placeholder}
                    </Stack>
                  )}
              </Droppable>
            </Card>
          </Stack>
        </DragDropContext>
      </Container>
      <ManageTaskModal task={currTask} open={manageTaskOpen} switch={(toWhat: boolean) => setManageTaskOpen(toWhat)} />
    </>
  );
}

export default Home;

