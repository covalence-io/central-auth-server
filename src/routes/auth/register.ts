import express from "express";
import { MysqlError } from "mysql";
import { v4 } from "uuid";

import Users from "../../database/queries/users";
import { has_missing_data, is_email_format, is_username_format } from "../../utils/validators";
import { hash } from "../../utils/bcrypt";
import { sign } from "../../utils/tokens";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, username, password } = req.body;
    const newUser = { name, email, username, password };

    if (has_missing_data(newUser, res)) return;
    if (!is_email_format(email, res)) return;
    if (!is_username_format(username, res)) return;

    try {
        const id = v4();
        newUser.password = await hash(password);
        await Users.register({ id, ...newUser });

        const token = sign({ id, name, email, roles: ["user"] });
        res.status(201).json({ id, message: "Successfully registered!", token });
    } catch (error) {
        console.log(error);
        const err = error as unknown as MysqlError;
        res.status(500).json({ message: err.sqlMessage || "An unknown error occurred :(" });
    }
});

export default router;
