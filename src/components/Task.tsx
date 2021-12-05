import { TaskDTO } from "../models/task";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from "@material-ui/core";
import { TaskService } from "../services/task.service";
import ManageTaskModal from "./ManageTask";
import App from '../App';
import { useEffect } from "react";

interface TaskProps {
    task: TaskDTO;
    setCurrTask: (task: TaskDTO) => void;
    reloadData: () => void;
    switch: (toWhat: boolean) => void;
}
 
const Task: React.FC<TaskProps> = ({task, setCurrTask, reloadData, ...props}: TaskProps) => {

    const openModal = () => {
        setCurrTask(task);
        props.switch(true);
    }

    const deleteTask = () => {
        TaskService.deleteTask(task.id).then(res => {
            reloadData();
        }).catch(err => {
            console.log("Delete response: ", err);
        })
    }

    useEffect(() => {
        // console.log(task);
    }, []);

    return ( 
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {task.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {task.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Container>
                    <Button onClick={openModal} size="small" variant="contained" color="primary" style={{margin: 5}}>Edit</Button>
                    <Button onClick={deleteTask} size="small" variant="contained" color="secondary" style={{margin: 5}}>Delete</Button>
                </Container>
            </CardActions>
        </Card>
     );
}
 
export default Task;

// Created = 0,
// InProgress = 1,
// Done = 2