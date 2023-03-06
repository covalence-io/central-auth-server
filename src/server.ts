import express from "express";
import setup from "./middlewares/setup";
import { configure_passport } from "./middlewares/passport_strats";

const app = express();

setup(app);
configure_passport(app);

app.listen(process.env.PORT || 3000, () => console.log(`Server's up!`));
