import { Role } from "src/app/auth/dto/roledto";

export class UserDTO {
    id?: number;

    name?: string;

    email?: string;

    password?: string;

    role?: Role;
}