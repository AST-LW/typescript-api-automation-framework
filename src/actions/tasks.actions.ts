import { Service } from "typedi";

@Service({ transient: true })
export class TasksActions {
    async createTask() {}
}
