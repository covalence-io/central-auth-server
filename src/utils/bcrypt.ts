import bcrypt from "bcrypt";

export const hash = (plaintext: string) => bcrypt.hash(plaintext, 12);

export const compare = (plaintext: string, hashed: string) => bcrypt.compare(plaintext, hashed);
