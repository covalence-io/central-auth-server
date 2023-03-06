import { Response } from "express";

interface ReqBod {
    [key: string]: string | number | boolean | undefined;
}

export const is_email = (email: string) => {
    const pattern =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return !!email.match(pattern);
};

export const is_email_format = (email: string, res: Response) => {
    if (!is_email(email)) {
        res.status(400).json({ message: "The email field is not a valid email format." });
        return false;
    }

    return true;
};

export const is_username_format = (username: string, res: Response) => {
    if (is_email(username)) {
        res.status(400).json({ message: "The username field must not be in the format of an email." });
        return false;
    }

    return true;
};

export const has_missing_data = (data: ReqBod, res: Response) => {
    const entries = Object.entries(data);

    const missing_properties = entries.filter(pair => pair[1] === undefined);

    if (missing_properties.length) {
        const properties = missing_properties.map(pair => pair[0]);

        res.status(400).json({ message: "Bad data", missing_data: properties });
        return true;
    }
    return false;
};
