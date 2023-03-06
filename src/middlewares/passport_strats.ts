import passport from "passport";
import { Express } from "express";
import JWTStrategy, { ExtractJwt } from "passport-jwt";
import LocalStrategy from "passport-local";

import { compare } from "../utils/bcrypt";
import { is_email } from "../utils/validators";
import { token } from "../config";
import Users from "../database/queries/users";
import { UserLocatableColumns } from "../types/models/auth";

export const configure_passport = (app: Express) => {
    passport.use(
        new JWTStrategy.Strategy(
            {
                secretOrKey: token.key,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            (payload, done) => {
                done(null, payload);
            }
        )
    );

    passport.use(
        new LocalStrategy.Strategy(
            {
                usernameField: "email",
                session: false
            },
            async (email, password, done) => {
                const field: UserLocatableColumns = is_email(email) ? "email" : "username";

                const [user] = await Users.find(field, email);
                if (!user) {
                    return done(null, false);
                }

                const matches = await compare(password, user.password!);

                if (!matches) {
                    done(null, false);
                } else {
                    delete user.password;
                    done(null, user);
                }
            }
        )
    );

    app.use(passport.initialize());
};
