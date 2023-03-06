import { UserRoles } from "./models/auth";

export {};

declare global {
    namespace Express {
        interface User extends Payload {}
    }
}

export interface Payload {
    id: string;
    email: string;
    name: string;
    roles: UserRoles[];
}
