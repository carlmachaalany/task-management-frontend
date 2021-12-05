import { Box, Button, makeStyles, Modal } from "@material-ui/core";
import {useEffect, useState} from "react";
import { TextField } from "@material-ui/core";
import { TaskService } from "../services/task.service";
import { TaskDTO } from "../models/task";
import Task from "./Task";

export interface ManageTasksProps {
    task: TaskDTO;
    open: boolean;
    switch: (toWhat: boolean) => void;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
  
 // PROBLEMS ARE:
 // 1) It seems like the response of the TaskAPI.createTask is not a TaskDTO, it seems like res.title
 // and res.description are undefined. So know why the rersponse is like that.
const ManageTaskModal: React.FC<ManageTasksProps> = (props: ManageTasksProps) => {

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 700,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const updateOrCreate = () => {
        props.task.title = title;
        props.task.description = description;
        if (props.task.id) {
            console.log("updating task");
            TaskService.updateTask(props.task).then(() => {
                console.log("task updated");
                props.switch(false);
                setTitle("");
                setDescription("");
                setError("");
            }).catch((err: any) => {
                setError(err);
            });
        } else {
            console.log("creating task");
            TaskService.createTask(props.task).then(() => {
                console.log("task created");
                props.switch(false);
                window.location.reload();
                setTitle("");
                setDescription("");
                setError("");
            }).catch((err: any) => {
                setError(err);
            });
        }
    }

    useEffect(() => {
        console.log(props.task);
        setTitle(props.task.title);
        setDescription(props.task.description);
    }, [props.task]);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{props.task.id ? "Edit Task" : "Create Task" }</h2>
            <Box component="form">
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2" fullWidth id="standard-basic" label="Title" variant="standard" />
                <TextField
                    className="mt-4"
                    onChange={(e) => setDescription(e.target.value)}                     
                    id="filled-multiline-flexible"
                    label="Description"
                    variant="outlined"
                    multiline
                    fullWidth
                    value={description}
                />            
            </Box>
            <div className="mt-4 w-100 d-flex justify-content-end align-items-center">
                <small className="text-danger mr-4">{error}</small>
                <Button onClick={() => props.switch(false)} variant="text">Cancel</Button>
                <Button onClick={updateOrCreate} className="ml-2" variant="contained">{props.task.id ? "Edit" : "Create" }</Button>
            </div>
        </div>
    );

    return ( 
        <div>
            <Modal
                open={props.open}
                onClose={() => props.switch(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
        </div>
     );
}
 
export default ManageTaskModal;