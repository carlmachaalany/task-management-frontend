
// Define the TaskDTO here. It is exactly the same as the TaskDTO in the api.
export class TaskDTO {
    id: number | null;
    title: string;
    description:  string;
    status: TaskStatus | null;

    constructor(title: string, description: string) {
        this.id = null;
        this.title = title;
        this.description = description;
        this.status = null;
    }
}

export enum TaskStatus {
    Created = 0,
    InProgress = 1,
    Done = 2
}