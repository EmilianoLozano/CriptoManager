
export class Usuario {

    constructor(
        public nombre: string,
        public uid:string,
        public apellido : string,
        public dni : number,
        public email:string,
        public saldo:number,
        public emailVerified:string,
        public role: 'ADMIN_ROLE' | 'USER_ROLE',
        public domicilio?:string,
        public telefono?: number,
    ) {}

}
