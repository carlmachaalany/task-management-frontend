
// this is the interface between the frontend and the backend
import { TaskDTO } from "../models/task";

export class TaskService  {

    // function that returns all the tasks from the database
    public static async getAll(): Promise<TaskDTO[]> {
        const resp = await fetch("http://localhost:3000/tasks", {
            method: "GET"
        });

        const data = await resp.json();
        return data;
    }

    // function that returns all the tasks from the database
    public static async updateTask(taskDTO: TaskDTO): Promise<any> {
        await fetch("http://localhost:3000/tasks", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskDTO)
        });
    }

    public static async createTask(taskDTO: TaskDTO): Promise<any> {
        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskDTO)
        });
    }

    public static async deleteTask(taskId: number | null): Promise<any> {
        if (taskId == null) { throw new Error("Could not delete a task with no id"); }
        const resp = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "DELETE"
        });
        return resp;
    }
}