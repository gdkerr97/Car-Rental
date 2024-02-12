import { Role } from "./roledto";

export class AuthDTO{

    id!: number;
    role!: Role;

    constructor(id: number, role: Role){
        this.id = id;
        this.role = role;
    }
}