import jwt from "jsonwebtoken";
import { token } from "../config";
import { Payload } from "../types/globals";

export const sign = (data: Payload) => jwt.sign(data, token.key, { expiresIn: token.expiration });
export const verify = (payload: string) => jwt.verify(payload, token.key);
