import express from "express";
import passport from "passport";
import { sign } from "../../utils/tokens";

const router = express.Router();

router.post("/", passport.authenticate("local", { session: false }), (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate" });

    const token = sign({ id: req.user.id, name: req.user.name, email: req.user.email, roles: req.user.roles });

    res.json({ message: "YOLO", token });
});

export default router;
