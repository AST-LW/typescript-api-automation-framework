import Container from "typedi";
import { UserActions } from "./user.actions";
import { TasksActions } from "./tasks.actions";

export const Actions = {
    user: Container.get(UserActions),
    tasks: Container.get(TasksActions),
};
