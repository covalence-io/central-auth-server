import dotenv from "dotenv";
dotenv.config();

interface DBConfig {
    user: string;
    password: string;
    host: string;
    database: string;
}

export type db_keys = "auth" | "foo" | "bar";

export const sql = {
    auth: {
        user: process.env.AUTH_DB_USER,
        password: process.env.AUTH_DB_PASSWORD,
        host: process.env.AUTH_DB_HOST,
        database: process.env.AUTH_DB_NAME
    },
    foo: {
        user: process.env.FOO_DB_USER,
        password: process.env.FOO_DB_PASSWORD,
        host: process.env.FOO_DB_HOST,
        database: process.env.FOO_DB_NAME
    },
    bar: {
        user: process.env.BAR_DB_USER,
        password: process.env.BAR_DB_PASSWORD,
        host: process.env.BAR_DB_HOST,
        database: process.env.BAR_DB_NAME
    }
} as { [key: string]: DBConfig };

if (!process.env.TOKEN_KEY) {
    console.log("Cannot start server without token signing key");
    process.exit(1);
}

export const token = {
    key: process.env.TOKEN_KEY,
    expiration: process.env.TOKEN_EXPIRATION
};
