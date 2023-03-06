import { Query } from "..";
import { BaseUser, User, UserLocatableColumns } from "../../types/models/auth";

const register = (newUser: BaseUser) => Query("INSERT INTO Users SET ?", "auth", [newUser]);
const find = (column: UserLocatableColumns, value: string) => Query<User[]>("SELECT * FROM Users WHERE ??=?", "auth", [column, value]);

export default {
    find,
    register
};
