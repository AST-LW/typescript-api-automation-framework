import Container from "typedi";
import { UserActions } from "./user.actions";

export const Actions = {
    user: Container.get(UserActions),
};
