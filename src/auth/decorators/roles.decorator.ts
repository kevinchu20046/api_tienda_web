import { SetMetadata } from "@nestjs/common";


export enum ListRole {
    Admin = 'Administrador',
    Cliente = 'Cliente',
}


export const ROLES_KEY = 'roles';
export const Roles = (...roles: ListRole[]) => SetMetadata(ROLES_KEY, roles);
